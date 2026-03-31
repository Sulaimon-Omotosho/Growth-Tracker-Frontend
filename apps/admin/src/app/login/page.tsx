// 'use client'

import { ModeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/forms/AuthForm'
import LoginGoogle from '@/components/LoginGoogle'
import { cookies } from 'next/headers'

const LoginPage = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (accessToken) {
    redirect('/admin')
  }

  return (
    <div className='flex items-center justify-center w-full h-screen relative'>
      <div className='absolute top-6 right-6'>
        <ModeToggle />
      </div>
      <div className='outline-1 rounded-lg shadow-2xl shadow-gray-600 w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] flex items-center justify-center flex-col gap-3 py-6'>
        <AuthForm />
        <div className='w-[80%] '>
          <p className='text-center pb-1'>Or</p>
          <LoginGoogle />
        </div>
        <div className='w-full flex justify-end pr-8'>
          <Link href='/' className='text-xs font-semibold'>
            Not authorized? Click here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
