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
import { MoreHorizontal, User2, Crown, Mail } from 'lucide-react'
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
    id: 'leader_identity',
    header: 'Executive Name',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 relative overflow-hidden rounded-full border-2 border-rose-100 dark:border-rose-900 bg-rose-50 dark:bg-rose-950 shrink-0'>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.firstName}
                fill
                className='object-cover'
                sizes='40px'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <Crown size={16} className='text-rose-400' />
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight'>
              {user.firstName} {user.lastName}
            </span>
            <span className='text-[10px] text-rose-500 font-bold uppercase tracking-widest'>
              Official Board
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    id: 'leader_role',
    header: 'Leadership Role',
    cell: ({ row }) => (
      <span className='text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-rose-600 text-white dark:bg-rose-500 shadow-sm'>
        {row.original.role || 'LEADER'}
      </span>
    ),
  },
  {
    accessorKey: 'phone',
    id: 'leader_contact',
    header: 'Direct Line',
    cell: ({ row }) => (
      <span className='text-xs font-mono text-zinc-500'>
        {row.original.phone || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'gender',
    id: 'leader_gender',
    header: 'Gender',
    cell: ({ row }) => {
      const gender = row.original.gender
      return (
        <span
          className={cn(
            'text-[9px] font-black px-2 py-0.5 rounded-full border uppercase',
            gender === 'MALE'
              ? 'bg-blue-50 text-blue-600 border-blue-100'
              : 'bg-pink-50 text-pink-600 border-pink-100',
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
              className='h-8 w-8 p-0 hover:bg-rose-50 dark:hover:bg-rose-950'
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48'>
            <DropdownMenuLabel className='text-[10px] font-black uppercase text-zinc-400'>
              Executive Actions
            </DropdownMenuLabel>
            <DropdownMenuItem className='gap-2'>
              <Mail size={14} /> Email Leader
            </DropdownMenuItem>
            <DropdownMenuItem>Message Leader</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-rose-600 dark:text-rose-400 font-bold'>
              <Link href={`/users/${user.id}`} className='w-full'>
                Executive Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
