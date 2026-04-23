import { ModeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/forms/AuthForm'
import LoginGoogle from '@/components/LoginGoogle'
import { cookies } from 'next/headers'
import { Lock } from 'lucide-react'

const LoginPage = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (accessToken) {
    redirect('/admin')
  }

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-white dark:bg-[#09090b] relative font-sans'>
      <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1c1c1f_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]' />

      <div className='absolute top-6 right-6 z-20'>
        <ModeToggle />
      </div>

      <div className='z-10 w-full max-w-100 px-6'>
        <div className='flex flex-col items-center mb-8'>
          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'>
            <Lock size={18} className='text-zinc-600 dark:text-zinc-400' />
          </div>
          <h1 className='text-xl font-bold tracking-tight'>Admin Login</h1>
          <p className='text-xs text-muted-foreground mt-1'>
            Enter your credentials to access the console
          </p>
        </div>

        <div className='border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 rounded-2xl shadow-sm space-y-6'>
          <AuthForm />

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-zinc-100 dark:border-zinc-900' />
            </div>
            <div className='relative flex justify-center text-[10px] uppercase font-bold tracking-widest'>
              <span className='bg-white dark:bg-zinc-950 px-2 text-zinc-400'>
                Security Provider
              </span>
            </div>
          </div>

          <div className='w-full'>
            <LoginGoogle />
          </div>
        </div>

        <div className='mt-6 text-center'>
          <Link
            href='/'
            className='text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors'
          >
            ← Back to Terminal
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
