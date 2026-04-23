'use client'

import { useLogout } from '@/hooks/use-auth'
import { useMe } from '@/hooks/get-user'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError, error } = useMe()
  const logout = useLogout()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isUnauthorized =
      (error as any)?.status === 401 || (error as any)?.statusCode === 401

    if (isError && isUnauthorized) {
      logout.mutate()
      return
    }

    if (!isLoading && user) {
      const hasUsername = !!user.username
      const isOnboardingPage = pathname === '/onboarding'

      if (!hasUsername && !isOnboardingPage) {
        router.push('/onboarding')
      } else if (hasUsername && isOnboardingPage) {
        router.push('/dashboard')
      }
    }
  }, [isError, error, logout, user, isLoading, pathname, router])

  // Loading UI
  // if (isLoading) {
  //   return (
  //     <div className='p-6 animate-pulse'>
  //       <div className='h-40 w-40 rounded-full bg-gray-300 mb-6' />
  //       <div className='h-4 w-48 bg-gray-300 mb-2' />
  //       <div className='h-4 w-32 bg-gray-300 mb-2' />
  //       <div className='h-4 w-64 bg-gray-300 mb-2' />
  //     </div>
  //   )
  // }

  return <>{children}</>
}
