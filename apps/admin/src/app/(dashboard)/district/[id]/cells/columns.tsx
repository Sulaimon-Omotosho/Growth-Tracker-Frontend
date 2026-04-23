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
import { Cell } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Layers, MapPinned, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const columns: ColumnDef<Cell>[] = [
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
    header: 'Cell Unit',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='h-8 w-8 rounded-lg bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center text-violet-600 dark:text-violet-400'>
          <Layers size={14} />
        </div>
        <div className='flex flex-col'>
          <span className='font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight'>
            {row.getValue('name')}
          </span>
          <div className='flex items-center gap-1 text-[9px] text-zinc-400 font-bold'>
            <MapPinned size={10} />
            {row.original.zone?.name || 'NO ZONE'}
          </div>
        </div>
      </div>
    ),
  },
  {
    header: 'Leader',
    cell: ({ row }) => {
      const leader = row.original.leader
      return (
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-[9px] font-black text-white dark:text-zinc-900'>
            {leader ? `${leader.firstName[0]}${leader.lastName[0]}` : '?'}
          </div>
          <span className='text-xs font-medium text-zinc-600 dark:text-zinc-400'>
            {leader ? `${leader.firstName} ${leader.lastName}` : 'Unassigned'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: '_count.users',
    header: 'Capacity',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <span className='px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-[10px] font-black border border-zinc-200 dark:border-zinc-800'>
          {row.original.users?.length || 0} MEMBERS
        </span>
      </div>
    ),
  },

  { accessorKey: 'zone.name', header: 'Zone' },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <p className='text-[11px] text-zinc-400 line-clamp-1 max-w-45'>
        {row.getValue('description') || 'No cell objectives listed...'}
      </p>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cell = row.original

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
              onClick={() => navigator.clipboard.writeText(cell.id.toString())}
            >
              Message Pastor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/district/${cell.communityId}/cells/${cell.id}`}>
                {' '}
                View Cell
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
