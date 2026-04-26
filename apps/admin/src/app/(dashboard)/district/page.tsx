'use client'

import React, { useState } from 'react'
import { useGetDistricts } from '@/hooks/get-church'
import { columns } from './columns'
import { DataTable } from './data-table'
import { SkeletonTable } from '@/components/Skeleton'
import { MapPin, Plus, Search, Globe2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { District as DistrictType } from '@repo/types'

const District = () => {
  const { data, isLoading, isError } = useGetDistricts()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData =
    data?.filter((district: DistrictType) =>
      district.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? []

  if (isLoading)
    return (
      <div className='p-8'>
        <SkeletonTable />
      </div>
    )

  if (isError) {
    return (
      <div className='p-8 text-red-500 font-bold'>
        Critical Error: Failed to retrieve district hierarchy.
      </div>
    )
  }

  return (
    <div className='p-6 space-y-6'>
      {/* GEOGRAPHIC HEADER */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1'>
            Administration
          </p>
          <h1 className='text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
            Regional Districts
            <span className='text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-full'>
              {data?.length || 0}
            </span>
          </h1>
        </div>
        <Button className='bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold shadow-lg shadow-zinc-200 dark:shadow-none'>
          <Plus size={16} className='mr-2' /> Add District
        </Button>
      </div>

      {/* SEARCH BAR */}
      <div className='flex items-center gap-4 bg-white dark:bg-zinc-950 p-4 border border-zinc-100 dark:border-zinc-900 rounded-xl'>
        <div className='relative flex-1 max-w-sm'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
            size={16}
          />
          <Input
            placeholder='Find district...'
            className='pl-10 bg-zinc-50 dark:bg-zinc-900 border-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className='bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden'>
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}

export default District
