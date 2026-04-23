'use client'

import { SidebarTrigger } from '../ui/sidebar'
import Profile from '../Profile'
import Theme from '../Theme'
import Notification from './Notification'
import { useUser } from '@/utils/userContext'
import { Separator } from '../ui/separator'

const Navbar = () => {
  const { user } = useUser()

  return (
    <nav className='sticky top-0 z-30 w-full border-b border-gray-100 dark:border-gray-800 bg-background/80 backdrop-blur-md px-4 py-3'>
      <div className='flex items-center justify-between'>
        {/* LEFT: Navigation & Breadcrumbs */}
        <div className='flex items-center gap-3'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <div className='hidden md:flex flex-col'>
            <span className='text-[10px] font-bold text-blue-600 uppercase tracking-tight leading-none'>
              The Growth Tracker
            </span>
            <span className='text-sm font-semibold text-foreground leading-tight'>
              Dashboard Overview
            </span>
          </div>
        </div>

        {/* RIGHT: Actions & User Context */}
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* Search Placeholder - Optional but fills the space nicely */}
          <div className='hidden lg:flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-full text-muted-foreground text-xs gap-2 border border-transparent focus-within:border-blue-300 transition-all cursor-pointer'>
            <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100'>
              <span className='text-xs'>⌘</span>K
            </kbd>
            <span>Search dashboard...</span>
          </div>

          <div className='flex items-center gap-1 sm:gap-2'>
            <Notification />
            <Theme />
          </div>

          <Separator
            orientation='vertical'
            className='h-6 mx-1 hidden sm:block'
          />

          <div className='flex items-center gap-3 pl-1'>
            <div className='hidden sm:flex flex-col items-end text-right'>
              <span className='text-xs font-bold leading-none'>
                {user?.firstName} {user?.lastName}
              </span>
              <span className='text-[10px] text-muted-foreground'>
                Level 2 Member
              </span>
            </div>
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
