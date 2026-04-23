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
import { District } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MapPin, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<District>[] = [
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
    // id: 'district_name',
    header: 'District Name',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400'>
          <MapPin size={14} />
        </div>
        <span className='font-bold text-zinc-900 dark:text-zinc-100'>
          {row.getValue('name')}
        </span>
      </div>
    ),
  },
  {
    id: 'district_pastor',
    header: 'District Pastor',
    cell: ({ row }) => {
      const leader = row.original.leader
      return (
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500'>
            {leader ? `${leader.firstName[0]}${leader.lastName[0]}` : '?'}
          </div>
          <span className='text-sm text-zinc-600 dark:text-zinc-400'>
            {leader ? `${leader.firstName} ${leader.lastName}` : 'Unassigned'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: '_count.communities',
    id: 'community_count', // Explicit Unique ID
    header: 'Communities',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <div className='flex -space-x-2 overflow-hidden'>
          {/* Visual fluff: tiny circles representing communities */}
          <div className='inline-block h-4 w-4 rounded-full ring-2 ring-white dark:ring-zinc-950 bg-zinc-200 dark:bg-zinc-800' />
          <div className='inline-block h-4 w-4 rounded-full ring-2 ring-white dark:ring-zinc-950 bg-zinc-300 dark:bg-zinc-700' />
        </div>
        <span className='text-xs font-black text-zinc-500 tracking-tighter'>
          {row.original.communitiesCount || 0} UNITS
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    // id: 'district_desc',
    header: 'Description',
    cell: ({ row }) => (
      <p className='text-xs text-zinc-400 line-clamp-1 max-w-50 italic'>
        {row.getValue('description') || 'No regional notes...'}
      </p>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const district = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 cursor-pointer'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4 cursor-pointer' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            // onClick={() =>
            //   navigator.clipboard.writeText(district.id.toString())
            // }
            >
              Message Pastor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/district/${district.id}`}> View District</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
//  <Link href={`/workforce/${teams.id}`}> View Team</Link>
