'use client'

import { useLogout } from '@/hooks/use-auth'
import { useMe } from '@/hooks/use-user'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isError, error } = useMe()
  const logout = useLogout()

  useEffect(() => {
    const isUnauthorized =
      (isError as any).status === 401 || (error as any)?.statusCode === 401

    if (isError && isUnauthorized) {
      logout.mutate()
    }
  }, [isError, error, logout])

  return <>{children}</>
}
