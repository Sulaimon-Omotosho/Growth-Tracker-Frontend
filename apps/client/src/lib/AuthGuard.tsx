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

    if (!isLoading && !user && !isError && pathname !== '/login') {
      router.push('/login')
    }
  }, [isError, error, logout, user, isLoading, pathname, router])
  return <>{children}</>
}
