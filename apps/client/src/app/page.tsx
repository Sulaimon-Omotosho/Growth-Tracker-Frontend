import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, LayoutDashboard, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function PortalPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  return (
    <div className='relative flex min-h-screen items-center justify-center bg-white dark:bg-black overflow-hidden'>
      {/* Background Decorative Elements - Matches your Web3/Tech vibe */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]' />
        <div className='absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]' />
      </div>

      <div className='relative z-10 w-full max-w-md px-6'>
        <div className='bg-white/80 dark:bg-zinc-900/50 backdrop-blur-2xl border border-gray-100 dark:border-zinc-800 rounded-3xl p-10 shadow-2xl'>
          <div className='flex flex-col items-center text-center gap-8'>
            {/* Branding */}
            <div className='space-y-4'>
              <div className='flex justify-center'>
                <Image
                  src='/assets/Logo.jpeg'
                  alt='HICC'
                  width={60}
                  height={60}
                  className='rounded-2xl shadow-lg'
                />
              </div>
              <div>
                <h1 className='text-3xl font-black tracking-tighter text-black dark:text-white italic uppercase'>
                  Growth Track
                </h1>
                <p className='text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2'>
                  The Harvesters Spiritual Measurement System
                </p>
              </div>
            </div>

            <div className='flex w-full flex-col gap-4'>
              {accessToken ? (
                <Button
                  asChild
                  size='lg'
                  className='w-full h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] transition-transform text-lg font-bold'
                >
                  <Link href='/dashboard'>
                    Go to Dashboard
                    <LayoutDashboard className='ml-2 h-5 w-5' />
                  </Link>
                </Button>
              ) : (
                <div className='space-y-3 w-full'>
                  <Button
                    asChild
                    size='lg'
                    className='w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02] transition-transform text-lg font-bold'
                  >
                    <Link href='/sign-in'>
                      Login to Account
                      <LogIn className='ml-2 h-5 w-5' />
                    </Link>
                  </Button>

                  <Link
                    href='/home'
                    className='flex items-center justify-center gap-2 text-sm font-bold text-zinc-500 hover:text-black dark:hover:text-white transition-colors py-2'
                  >
                    View Homepage
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className='text-center mt-8 text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold'>
          Harvesters International Christian Center
        </p>
      </div>
    </div>
  )
}
