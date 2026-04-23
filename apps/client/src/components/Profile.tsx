'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  LogOut,
  Settings,
  TriangleAlert,
  User,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useMe } from '@/hooks/get-user'
import { useLogout } from '@/hooks/use-auth'
import { Skeleton } from './ui/skeleton'

const Profile = () => {
  const { data: user, isLoading, error } = useMe()
  const logout = useLogout()

  if (isLoading) {
    return (
      <Skeleton className='h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800' />
    )
  }

  if (error || !user) {
    return (
      <Avatar className='h-9 w-9 opacity-50'>
        <AvatarFallback>
          <TriangleAlert className='h-4 w-4 text-destructive' />
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <Avatar className='h-9 w-9 cursor-pointer border-2 border-transparent hover:border-blue-500/20 transition-all'>
          <AvatarImage src={user.image || ''} className='object-cover' />
          <AvatarFallback className='bg-blue-600 text-white font-bold text-xs'>
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={12}
        align='end'
        className='w-64 rounded-xl p-2 shadow-2xl'
      >
        {/* User Info Header */}
        <div className='flex flex-col space-y-1 p-3'>
          <p className='text-sm font-bold leading-none'>
            {user.firstName} {user.lastName}
          </p>
          <p className='text-xs leading-none text-muted-foreground'>
            {user.email}
          </p>
          {user.role && (
            <div className='mt-2 flex items-center gap-1.5 rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-[10px] font-bold text-blue-600 uppercase tracking-tight w-fit'>
              <ShieldCheck className='h-3 w-3' />
              {user.role}
            </div>
          )}
        </div>

        <DropdownMenuSeparator className='my-2' />

        <DropdownMenuItem asChild>
          <Link
            href='/dashboard'
            className='flex items-center gap-3 cursor-pointer py-2'
          >
            <LayoutDashboard className='h-4 w-4 text-muted-foreground' />
            <span className='font-medium text-sm'>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/${user.id}`}
            className='flex items-center gap-3 cursor-pointer py-2'
          >
            <Settings className='h-4 w-4 text-muted-foreground' />
            <span className='font-medium text-sm'>Account Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className='my-2' />

        <DropdownMenuItem
          className='flex items-center gap-3 cursor-pointer py-2 text-destructive focus:bg-destructive/10 focus:text-destructive'
          onClick={() => logout.mutate()}
        >
          <LogOut className='h-4 w-4' />
          <span className='font-bold text-sm'>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
