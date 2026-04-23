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
import { ArrowUpDown, MoreHorizontal, User2 } from 'lucide-react'
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
    id: 'identity',
    header: 'Member Identity',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 relative overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 shadow-sm'>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.firstName}
                fill
                className='object-cover'
                sizes='40px'
              />
            ) : (
              <User2 className='h-5 w-5 text-zinc-400' />
            )}
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-black text-zinc-900 dark:text-zinc-100 leading-tight'>
              {user.firstName} {user.lastName}
            </span>
            <span className='text-[10px] text-zinc-400 font-mono'>
              {user.id.toString().slice(0, 8)}...
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Status',
    cell: ({ row }) => (
      <span className='text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-900/10 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30'>
        {row.original.role || 'Member'}
      </span>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Contact',
    cell: ({ row }) => (
      <span className='text-xs font-medium text-zinc-500'>
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
            'text-[10px] font-black px-2 py-0.5 rounded-full border uppercase',
            gender === 'MALE'
              ? 'bg-blue-50/50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/30'
              : 'bg-pink-50/50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400 dark:border-pink-900/30',
          )}
        >
          {gender || '-'}
        </span>
      )
    },
  },
  {
    accessorKey: 'department',
    header: 'Dept.',
    cell: ({ row }) => (
      <span className='text-[11px] font-bold text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded'>
        {row.original.cell?.name || 'General'}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Send Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/users/${user.id}`}> View User</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
