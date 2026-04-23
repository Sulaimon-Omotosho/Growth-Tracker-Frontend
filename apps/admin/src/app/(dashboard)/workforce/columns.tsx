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
import { Teams } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Users2 } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<Teams>[] = [
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
    header: 'Team',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500'>
          <Users2 size={14} />
        </div>
        <span className='font-bold text-zinc-900 dark:text-zinc-100'>
          {row.getValue('name')}
        </span>
      </div>
    ),
  },
  {
    id: 'pastor',
    header: 'Pastor-in-Charge',
    cell: ({ row }) => {
      const leader = row.original.leader
      return (
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold'>
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
    accessorKey: '_count.departments',
    header: 'Departments',
    cell: ({ row }) => (
      <span className='px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-black'>
        {row.original.departmentCount || 0} DEPT
      </span>
    ),
  },
  { accessorKey: 'description', header: 'Description' },
  {
    id: 'actions',
    cell: ({ row }) => {
      const teams = row.original
      // const product = row.original

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
            // onClick={() => navigator.clipboard.writeText(teams.id.toString())}
            >
              Message Pastor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/workforce/${teams.id}`}> View Team</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
