'use client'

import { useLogout } from '@/hooks/use-auth'
import { LogOut } from 'lucide-react'

const SignOutButton = () => {
  const logout = useLogout()

  return (
    <button
      onClick={() => logout.mutate()}
      className='flex items-center justify-center gap-1 cursor-pointer'
    >
      <LogOut className='w-6 h-6 md:w-4 md:h-4' />
    </button>
  )
}

export default SignOutButton
