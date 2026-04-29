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
import { Course } from '@repo/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, BookOpen, GraduationCap, Calendar } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<Course>[] = [
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
    accessorKey: 'title',
    header: 'Course Name',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600'>
          <BookOpen size={14} />
        </div>
        <span className='font-bold text-zinc-900 dark:text-zinc-100'>
          {row.getValue('title')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <span className='px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold uppercase'>
        {row.getValue('category') || 'General'}
      </span>
    ),
  },
  {
    id: 'sessions',
    header: 'Curriculum',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <GraduationCap size={14} className='text-zinc-400' />
        <span className='text-sm font-medium'>
          {(row.original as any)._count?.sessions || 0} Sessions
        </span>
      </div>
    ),
  },
  {
    id: 'students',
    header: 'Enrollment',
    cell: ({ row }) => (
      <span className='text-xs font-black text-zinc-500'>
        {(row.original as any)._count?.enrollments || 0} STUDENTS
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const course = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 cursor-pointer'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/courses/edit/${course.id}`} className='w-full'>
                Edit Curriculum
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/courses/${course.id}`} className='w-full'>
                View Progress
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
