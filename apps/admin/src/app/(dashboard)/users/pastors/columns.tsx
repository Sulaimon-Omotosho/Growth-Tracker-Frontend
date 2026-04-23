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
import { ArrowUpDown, Heart, Mail, MoreHorizontal } from 'lucide-react'
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
    id: 'pastor_profile',
    header: 'Pastor',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 relative overflow-hidden rounded-2xl border-2 border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-950 shadow-inner'>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.firstName}
                fill
                className='object-cover'
                sizes='48px'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <Heart size={20} className='text-amber-500/40' />
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase'>
              Pastor {user.firstName} {user.lastName}
            </span>
            <span className='text-[10px] font-bold text-zinc-400 tracking-tighter'>
              ID: {user.id.toString().toUpperCase().slice(0, 10)}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Office',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <div className='h-2 w-2 rounded-full bg-amber-500 animate-pulse' />
        <span className='text-[10px] font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300'>
          {row.original.role || 'Pastorate'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Contact Info',
    cell: ({ row }) => (
      <span className='text-xs font-mono font-bold text-zinc-500'>
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
            'px-2 py-1 rounded text-xs capitalize',
            gender === 'MALE' && 'bg-blue-100 text-blue-700',
            gender === 'FEMALE' && 'bg-pink-100 text-pink-700',
          )}
        >
          {gender || '-'}
        </span>
      )
    },
  },
  {
    accessorKey: 'cell',
    header: 'Assigned Cell',
    cell: ({ row }) => (
      <span className='text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-900/30'>
        {row.original.cell?.name || 'General Oversight'}
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
              <Mail size={14} /> Email Pastor
            </DropdownMenuItem>
            <DropdownMenuItem>Message Pastor</DropdownMenuItem>
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
