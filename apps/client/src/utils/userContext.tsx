'use client'

import { useMe } from '@/hooks/get-user'
import { User } from '@repo/types'
import { createContext, useContext } from 'react'

type UserContextType = {
  user: User | null
  isLoading: boolean
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useMe()

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be within UserProvider')
  return ctx
}
