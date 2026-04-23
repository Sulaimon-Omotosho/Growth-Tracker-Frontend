'use client'

import Image from 'next/image'
import { useGoogleLogin as useAuthMutation } from '@/hooks/use-auth'
import { useGoogleLogin } from '@react-oauth/google'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const LoginGoogle = () => {
  const mutation = useAuthMutation()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Pass the access token to your custom backend mutation
      mutation.mutate(tokenResponse.access_token)
    },
    onError: (error) => {
      console.error('Google Login Failed', error)
    },
  })

  // Check if the mutation is currently hitting your backend
  const isLoading = mutation.isPending

  return (
    <Button
      type='button'
      variant='outline'
      disabled={isLoading}
      onClick={() => login()}
      className='cursor-pointer w-full h-11 relative flex items-center justify-center gap-3 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-[0.98]'
    >
      {isLoading ? (
        <>
          <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
          <span className='text-sm font-medium text-muted-foreground'>
            Authenticating...
          </span>
        </>
      ) : (
        <>
          <div className='relative w-5 h-5'>
            <Image
              src='/assets/google.png'
              alt='google'
              fill
              className='object-contain'
            />
          </div>
          <span className='text-sm font-bold tracking-tight'>
            Continue with Google
          </span>
        </>
      )}
    </Button>
  )
}

export default LoginGoogle
