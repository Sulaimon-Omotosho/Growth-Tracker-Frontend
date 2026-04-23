'use client'

import React, { useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useGetWorkers } from '@/hooks/get-users'
import { SkeletonTable } from '@/components/Skeleton'
import { Search, UserCheck, Filter, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Workers = () => {
  const { data, isLoading, isError } = useGetWorkers()
  const [searchQuery, setSearchQuery] = useState('')
  console.log('Workers:', data)

  const filteredData =
    data?.filter((worker) =>
      `${worker.firstName} ${worker.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) ?? []

  if (isLoading)
    return (
      <div className='p-8'>
        <SkeletonTable />
      </div>
    )

  return (
    <div className='p-6 space-y-6'>
      {/* WORKFORCE HEADER */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-1'>
            Personnel Management
          </p>
          <h1 className='text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
            Active Workers
            <span className='text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-full'>
              {data?.length || 0}
            </span>
          </h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='hidden md:flex border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-tighter'
          >
            <Download size={14} className='mr-2' /> Export CSV
          </Button>
          <Button className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-100 dark:shadow-none'>
            <UserCheck size={16} className='mr-2' /> Verify Worker
          </Button>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className='flex items-center gap-4 bg-white dark:bg-zinc-950 p-4 border border-zinc-100 dark:border-zinc-900 rounded-xl'>
        <div className='relative flex-1 max-w-sm'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
            size={16}
          />
          <Input
            placeholder='Search worker name...'
            className='pl-10 bg-zinc-50 dark:bg-zinc-900 border-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-400 hover:text-emerald-600'
        >
          <Filter size={18} />
        </Button>
      </div>

      {/* WORKERS TABLE */}
      <div className='bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden'>
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}

export default Workers
