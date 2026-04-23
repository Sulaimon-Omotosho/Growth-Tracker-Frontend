'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Loader2,
  LogOut,
  Settings,
  ShieldCheck,
  User,
  LayoutGrid,
} from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useMe } from '@/hooks/use-user'
import { useLogout } from '@/hooks/use-auth'

const Profile = () => {
  const { data: user, isLoading, error } = useMe()
  const logout = useLogout()

  if (isLoading)
    return <Loader2 className='h-5 w-5 animate-spin text-zinc-400' />
  if (error || !user) return <User className='text-red-500' size={20} />

  const name = (
    <p>
      {user.firstName} {user.lastName}
    </p>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='h-9 w-9 border border-zinc-200 dark:border-zinc-800 transition-all hover:ring-4 hover:ring-zinc-100 dark:hover:ring-zinc-900/50'>
          <AvatarImage src={user?.image} />
          <AvatarFallback className='bg-zinc-50 dark:bg-zinc-900 text-zinc-500'>
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={12}
        align='end'
        className='w-56 p-1 rounded-xl shadow-xl'
      >
        <DropdownMenuLabel className='px-3 py-3'>
          <div className='flex flex-col gap-1'>
            <p className='text-xs font-bold leading-none text-zinc-900 dark:text-zinc-100 truncate'>
              {name || 'System Administrator'}
            </p>
            <div className='flex items-center gap-1.5'>
              <ShieldCheck size={10} className='text-blue-500' />
              <span className='text-[9px] font-black uppercase tracking-widest text-zinc-500'>
                {user.role}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className='bg-zinc-100 dark:bg-zinc-900' />

        <div className='p-1'>
          <DropdownMenuItem asChild>
            <Link
              href='/admin/dashboard'
              className='flex items-center gap-2 cursor-pointer py-2 rounded-lg'
            >
              <LayoutGrid size={16} className='text-zinc-400' />
              <span className='text-xs font-medium'>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href='/admin/settings'
              className='flex items-center gap-2 cursor-pointer py-2 rounded-lg'
            >
              <Settings size={16} className='text-zinc-400' />
              <span className='text-xs font-medium'>Account Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className='bg-zinc-100 dark:bg-zinc-900' />

        <div className='p-1'>
          <DropdownMenuItem
            className='flex items-center gap-2 cursor-pointer py-2 rounded-lg text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30'
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            <LogOut size={16} />
            <span className='text-xs font-bold uppercase tracking-wider'>
              {logout.isPending ? 'Terminating...' : 'Logout'}
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
