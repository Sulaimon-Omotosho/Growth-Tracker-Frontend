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
import { MoreHorizontal, User2, MapPin } from 'lucide-react'
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
    id: 'member_identity',
    header: 'Member Identity',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 relative overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0'>
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
                <User2 className='text-zinc-300' size={20} />
              </div>
            )}
          </div>
          <div className='flex flex-col min-w-0'>
            <span className='text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate uppercase tracking-tight'>
              {user.firstName} {user.lastName}
            </span>
            <div className='flex items-center gap-1 text-[10px] font-medium text-zinc-400'>
              <MapPin size={10} className='text-blue-500/50' />
              {user.cell?.name || 'No Cell Assigned'}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    id: 'member_role',
    header: 'System Role',
    cell: ({ row }) => (
      <span className='text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'>
        {row.original.role || 'MEMBER'}
      </span>
    ),
  },
  {
    accessorKey: 'phone',
    id: 'member_phone',
    header: 'Contact',
    cell: ({ row }) => (
      <span className='text-xs font-medium font-mono text-zinc-500'>
        {row.original.phone || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'gender',
    id: 'member_gender',
    header: 'Gender',
    cell: ({ row }) => {
      const gender = row.original.gender
      return (
        <span
          className={cn(
            'text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider',
            gender === 'MALE'
              ? 'bg-blue-50/50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400'
              : 'bg-pink-50/50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400',
          )}
        >
          {gender || '—'}
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
              Member Options
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy Member ID
            </DropdownMenuItem>
            <DropdownMenuItem>Message Member</DropdownMenuItem>
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
