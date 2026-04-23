'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { User } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
  {
    id: 'worker_profile',
    header: 'Worker',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 relative overflow-hidden rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30'>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.firstName}
                fill
                className='object-cover'
                sizes='40px'
              />
            ) : (
              <User2 className='h-5 w-5 text-emerald-600/50' />
            )}
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight'>
              {user.firstName} {user.lastName}
            </span>
            <span className='text-[10px] text-zinc-400 font-medium'>
              ID: {user.id.toString().slice(-6)}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Designation',
    cell: ({ row }) => (
      <span className='text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'>
        {row.original.role || 'Volunteer'}
      </span>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => {
      const firstDept = row.original.departments?.[0]

      return (
        <div className='flex items-center gap-2'>
          <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
          <span className='text-xs font-bold text-zinc-500 capitalize'>
            {firstDept?.name || 'Unassigned'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'phone',
    id: 'worker_phone',
    header: 'Mobile',
    cell: ({ row }) => (
      <span className='text-xs font-medium text-zinc-400'>
        {row.original.phone || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => {
      const gender = row.original.gender
      return (
        <span
          className={cn(
            'text-[9px] font-black px-2 py-0.5 rounded-md border uppercase',
            gender === 'MALE'
              ? 'bg-blue-50/50 text-blue-600 border-blue-100'
              : 'bg-pink-50/50 text-pink-600 border-pink-100',
          )}
        >
          {gender || '-'}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48'>
            <DropdownMenuLabel className='text-[10px] uppercase font-black text-zinc-400'>
              Worker Options
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy Worker ID
            </DropdownMenuItem>
            <DropdownMenuItem>Message Worker</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='font-bold text-blue-600 dark:text-blue-400'>
              <Link href={`/users/${user.id}`} className='w-full'>
                View Full Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
