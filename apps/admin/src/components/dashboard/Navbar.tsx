'use client'

import { SidebarTrigger } from '../ui/sidebar'
import Theme from './Theme'
import Profile from './Profile'
import Notification from './Notification'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-30 w-full border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 h-16 flex items-center justify-between'>
      {/* LEFT: System Controls */}
      <div className='flex items-center gap-4'>
        <SidebarTrigger className='hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors' />
        <div className='h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block' />
        <Link
          href='/'
          className='hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors'
        >
          <LayoutDashboard size={14} />
          Home
        </Link>
      </div>

      {/* RIGHT: User Controls */}
      <div className='flex items-center gap-2 sm:gap-4'>
        <Notification />
        <Theme />
        <div className='h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1' />
        <Profile />
      </div>
    </nav>
  )
}

export default Navbar
