'use client'

import AuthForm from '@/components/forms/AuthForm'
import LoginGoogle from '@/components/LoginGoogle'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useMe } from '@/hooks/get-user'

const SignIn = () => {
  const { data, isLoading } = useMe()
  if (data) redirect('/dashboard')

  return (
    <div className='min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 md:p-8 bg-gray-50/50 dark:bg-transparent'>
      <section className='w-full max-w-5xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row md:min-h-150'>
        {/* LEFT: Image & Branding  */}
        <div className='relative w-full h-48 md:h-auto md:w-1/2 overflow-hidden'>
          <Image
            src='/assets/Growthtrack-img1.jpg'
            alt='Growth Track'
            fill
            className='object-cover'
            priority
          />

          <div className='absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent' />

          <div className='absolute bottom-8 left-8 right-8 text-white hidden md:block'>
            <h2 className='text-2xl font-black italic tracking-tighter'>
              WELCOME BACK
            </h2>
            <p className='text-sm text-gray-100 font-medium opacity-90'>
              Continue your journey of spiritual growth and purpose.
            </p>
          </div>
        </div>

        {/* RIGHT: Form Container */}
        <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold tracking-tight'>Sign in</h1>
            <p className='text-sm text-muted-foreground mt-1'>
              Enter your credentials to access your dashboard
            </p>
          </div>

          <div className='space-y-6'>
            <AuthForm />

            <div className='relative py-2'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-[10px] uppercase tracking-widest font-bold'>
                <span className='bg-white dark:bg-gray-950 px-3 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <LoginGoogle />
          </div>

          <p className='mt-8 text-center text-xs text-muted-foreground'>
            Having issues?{' '}
            <Link
              href='/sign-up'
              className='text-blue-600 font-bold hover:underline'
            >
              Contact Admin
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default SignIn
