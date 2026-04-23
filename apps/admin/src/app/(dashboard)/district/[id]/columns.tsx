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
import { Community } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Home, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const columns: ColumnDef<Community>[] = [
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
    accessorKey: 'name',
    header: 'Community',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400'>
          <Home size={14} />
        </div>
        <span className='font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight'>
          {row.getValue('name')}
        </span>
      </div>
    ),
  },
  {
    header: 'Community Pastor',
    cell: ({ row }) => {
      const leader = row.original.leader
      return (
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[9px] font-black'>
            {leader ? `${leader.firstName[0]}${leader.lastName[0]}` : '?'}
          </div>
          <span className='text-xs font-semibold text-zinc-600 dark:text-zinc-400'>
            {leader ? `${leader.firstName} ${leader.lastName}` : 'TBD'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: '_count.cells',
    header: 'Active Cells',
    cell: ({ row }) => (
      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800'>
        {row.original.cellsCount || 0} CELLS
      </span>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Area Description',
    cell: ({ row }) => (
      <span className='text-xs text-zinc-400 line-clamp-1 italic'>
        {row.getValue('description') || 'No locality notes...'}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const community = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 cursor-pointer'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(community.id.toString())
              }
            >
              Message Pastor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/district/${community.id}/cells`}>
                {' '}
                View Community
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
