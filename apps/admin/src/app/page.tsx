// 'use client'

import { ModeToggle } from '@/components/ThemeToggle'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (accessToken) {
    redirect('/admin')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black relative'>
      <div className='absolute top-6 right-6'>
        <ModeToggle />
      </div>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black'>
        <h1 className='font-black text-4xl text-center'>The Growth Tracker</h1>
        <p className='text-2xl font-semibold'>(Admin App)</p>
        <Link href='/login' className='text-sm'>
          Authorized?{' '}
          <span className='hover:text-blue-500 hover:underline underline-offset-1'></span>
          Click here
        </Link>
      </main>
    </div>
  )
}
