'use client'

import Image from 'next/image'
import { useGoogleLogin as useAuthMutation } from '@/hooks/use-auth'
import { useGoogleLogin } from '@react-oauth/google'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const LoginGoogle = () => {
  const mutation = useAuthMutation()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      mutation.mutate(tokenResponse.access_token)
    },
    onError: (error) => {
      console.error('Google Login Failed', error)
    },
  })

  return (
    <button
      type='button'
      disabled={mutation.isPending}
      onClick={() => login()}
      className={cn(
        'group relative flex items-center justify-center w-full h-11 px-4 gap-3',
        'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800',
        'rounded-xl transition-all duration-200 active:scale-[0.98]',
        'hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700',
        'disabled:opacity-50 disabled:cursor-not-allowed',
      )}
    >
      {mutation.isPending ? (
        <div className='flex items-center gap-2'>
          <Loader2 className='w-4 h-4 animate-spin text-zinc-500' />
          <span className='text-[11px] font-black uppercase tracking-widest text-zinc-500'>
            Verifying...
          </span>
        </div>
      ) : (
        <>
          <div className='relative w-5 h-5 transition-all duration-300 group-hover:grayscale-0 grayscale'>
            <Image
              src='/assets/google.png'
              alt='Google'
              fill
              className='object-contain'
            />
          </div>
          <span className='text-sm font-bold text-zinc-700 dark:text-zinc-300'>
            Continue with Google
          </span>
        </>
      )}
    </button>
  )
}

export default LoginGoogle
