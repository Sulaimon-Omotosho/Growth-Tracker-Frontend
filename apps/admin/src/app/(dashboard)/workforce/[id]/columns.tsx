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
import { Department } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { LayoutGrid, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const columns: ColumnDef<Department>[] = [
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
    // id: 'dept_name',
    header: 'Department',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500'>
          <LayoutGrid size={14} />
        </div>
        <div className='flex flex-col'>
          <span className='font-bold text-zinc-900 dark:text-zinc-100'>
            {row.getValue('name')}
          </span>
          <span className='text-[10px] text-zinc-400 uppercase font-bold tracking-tighter'>
            {row.original.churchTeam?.name || 'Independent'}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'head',
    header: 'HOD',
    cell: ({ row }) => {
      const leader = row.original.leader
      return (
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black'>
            {leader ? `${leader.firstName[0]}${leader.lastName[0]}` : '?'}
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-zinc-700 dark:text-zinc-300'>
              {leader ? `${leader.firstName} ${leader.lastName}` : 'Unassigned'}
            </span>
            <span className='text-[10px] text-zinc-400'>{leader?.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: '_count.members',
    header: 'Personnel',
    id: 'member_count',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <div className='w-full bg-zinc-100 dark:bg-zinc-900 rounded-full h-1.5 max-w-15'>
          <div
            className='bg-zinc-900 dark:bg-zinc-100 h-1.5 rounded-full'
            style={{
              width: `${Math.min((row.original.membersCount || 0) * 5, 100)}%`,
            }}
          />
        </div>
        <span className='text-[10px] font-black text-zinc-500'>
          {row.original.membersCount || 0}
        </span>
      </div>
    ),
  },

  { accessorKey: 'leader.email', header: 'Email' },
  { accessorKey: 'description', header: 'Description' },
  {
    id: 'actions',
    cell: ({ row }) => {
      const department = row.original
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
              onClick={() =>
                navigator.clipboard.writeText(department.id.toString())
              }
            >
              Message HOD
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/workforce/${department.id}/members`}>
                {' '}
                View department
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
