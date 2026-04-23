'use client'

import { Bell } from 'lucide-react'
import Link from 'next/link'

const Notification = () => {
  return (
    <Link
      href='/admin/notifications'
      className='relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group'
    >
      <Bell
        size={20}
        className='text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors'
      />
      <span className='absolute top-1.5 right-1.5 h-4 min-w-4 px-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full flex items-center justify-center text-[9px] font-black leading-none border-2 border-white dark:border-zinc-950'>
        6
      </span>
    </Link>
  )
}

export default Notification
