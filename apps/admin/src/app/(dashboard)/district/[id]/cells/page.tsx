'use client'

import React, { useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useGetCells } from '@/hooks/get-church'
import { useParams } from 'next/navigation'
import { SkeletonTable } from '@/components/Skeleton'
import { Layers, Plus, Search, ChevronRight, MapPinned } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Cell } from '@repo/types'

const Cells = () => {
  const params = useParams()
  const communityId = params.id as string
  const { data, isLoading, isError } = useGetCells(communityId)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData =
    data?.filter((cell: Cell) =>
      cell.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? []

  if (isLoading)
    return (
      <div className='p-8'>
        <SkeletonTable />
      </div>
    )
  if (isError)
    return (
      <div className='p-8 text-red-500 font-bold'>
        Error: Unable to sync with Cell network.
      </div>
    )

  return (
    <div className='p-6 space-y-6'>
      {/* CELLULAR HIERARCHY HEADER */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1'>
            <span>Community</span>
            <ChevronRight size={10} />
            <span className='text-zinc-500'>Cell Units</span>
          </div>
          <h1 className='text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
            Operational Cells
            <span className='text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-full'>
              {data?.length || 0}
            </span>
          </h1>
        </div>
        <Button className='bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold'>
          <Plus size={16} className='mr-2' /> Initialize New Cell
        </Button>
      </div>

      {/* TOOLBAR */}
      <div className='flex items-center gap-4 bg-white dark:bg-zinc-950 p-4 border border-zinc-100 dark:border-zinc-900 rounded-xl'>
        <div className='relative flex-1 max-w-sm'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
            size={16}
          />
          <Input
            placeholder='Filter by cell name...'
            className='pl-10 bg-zinc-50 dark:bg-zinc-900 border-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* THE DATA TABLE */}
      <div className='bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden'>
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}

export default Cells
