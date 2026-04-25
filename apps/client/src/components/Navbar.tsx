'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Home, LogIn } from 'lucide-react'
import Theme from './Theme'
import Profile from './Profile'
import { Button } from './ui/button'
import { useMe } from '@/hooks/get-user'

const HomeNavbar = () => {
  const { data, isLoading } = useMe()

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-black/70 backdrop-blur-xl'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 h-16 md:px-10'>
        {/* LEFT: Logo */}
        <Link href='/' className='flex items-center gap-3 group'>
          <div className='relative overflow-hidden rounded-lg'>
            <Image
              src='/assets/Logo.jpeg'
              alt='HICC'
              width={40}
              height={40}
              className='w-10 h-10 transition-transform duration-300 group-hover:scale-110'
            />
          </div>
          <p className='hidden sm:block text-sm font-black tracking-tighter text-foreground'>
            THE GROWTH TRACKER
          </p>
        </Link>

        {/* RIGHT: Actions */}
        <div className='flex items-center gap-2 md:gap-6'>
          <Link
            href='/'
            className='hidden md:flex items-center gap-2 text-sm font-semibold hover:text-blue-600 transition-colors'
          >
            Home
          </Link>

          <div className='h-4 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block' />

          <div className='flex items-center gap-3'>
            <Theme />

            {data ? (
              <Profile />
            ) : (
              <Button
                asChild
                variant='default'
                className='rounded-full px-6 font-bold shadow-md hover:shadow-blue-500/20'
              >
                <Link href='/sign-in' className='flex items-center gap-2'>
                  <LogIn className='w-4 h-4' />
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar
