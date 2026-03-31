'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { useGoogleLogin as useAuthMutation } from '@/hooks/use-auth'
import { useGoogleLogin } from '@react-oauth/google'

const LoginGoogle = () => {
  const mutation = useAuthMutation()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      mutation.mutate(tokenResponse.access_token)
    },
    onError: (error) => {
      console.error('Google Login Failed')
    },
  })

  return (
    <Button
      type='button'
      onClick={() => login()}
      className='flex items-center justify-center p-1 gap-4 ring-1 ring-amber-600 dark:ring-amber-400 rounded-md mb-2 w-full'
    >
      <Image
        src='/assets/google.png'
        alt='google'
        width={20}
        height={20}
        className='object-contain'
      />
      <span>Use Google</span>
    </Button>
  )
}

export default LoginGoogle
