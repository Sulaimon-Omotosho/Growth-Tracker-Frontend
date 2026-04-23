'use client'

import React, { useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useGetLeaders } from '@/hooks/get-users'
import { SkeletonTable } from '@/components/Skeleton'
import { ShieldCheck, Search, Crown, Filter, UserCog } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Leaders = () => {
  const { data, isLoading, isError } = useGetLeaders()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData =
    data?.filter((leader) =>
      `${leader.firstName} ${leader.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) ?? []

  if (isLoading)
    return (
      <div className='p-8'>
        <SkeletonTable />
      </div>
    )
  if (isError)
    return (
      <div className='p-8 text-rose-500 font-bold italic'>
        Error: Leadership data currently restricted or unavailable.
      </div>
    )

  return (
    <div className='p-6 space-y-6'>
      {/* EXECUTIVE HEADER */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <p className='text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400 mb-1'>
            Administrative Board
          </p>
          <h1 className='text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
            Organization Leaders
            <span className='text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-full'>
              {data?.length || 0}
            </span>
          </h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button className='bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-100 dark:shadow-none transition-all'>
            <ShieldCheck size={16} className='mr-2' /> Grant Leadership Access
          </Button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className='flex items-center gap-4 bg-white dark:bg-zinc-950 p-4 border border-zinc-100 dark:border-zinc-900 rounded-xl'>
        <div className='relative flex-1 max-w-sm'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
            size={16}
          />
          <Input
            placeholder='Find a leader...'
            className='pl-10 bg-zinc-50 dark:bg-zinc-900 border-none focus-visible:ring-rose-500'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='text-zinc-400 hover:text-rose-600 transition-colors'
        >
          <UserCog size={18} />
        </Button>
      </div>

      {/* TABLE */}
      <div className='bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-sm'>
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}

export default Leaders
