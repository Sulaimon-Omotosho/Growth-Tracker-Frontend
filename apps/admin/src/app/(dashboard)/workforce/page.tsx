'use client'

import React, { useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { SkeletonTable } from '@/components/Skeleton'
import { useGetTeams } from '@/hooks/get-church'
import { useDeleteTeams } from '@/hooks/use-church'
import { Plus, Search, Users2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Teams } from '@repo/types'

const WorkForce = () => {
  const { data, isLoading, isError } = useGetTeams()
  const deleteTeams = useDeleteTeams()
  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = (ids: string[]) => {
    if (window.confirm(`Delete ${ids.length} item(s)?`)) {
      deleteTeams.mutate(ids)
    }
  }

  // Filter logic
  const filteredData =
    data?.filter((team: Teams) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? []

  if (isLoading)
    return (
      <div className='p-8'>
        <SkeletonTable />
      </div>
    )

  return (
    <div className='p-6 space-y-6'>
      {/* HEADER SECTION */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>
            Management
          </p>
          <h1 className='text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
            Workforce Directory{' '}
            <span className='text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-full'>
              {data?.length || 0}
            </span>
          </h1>
        </div>
        <Button className='bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:opacity-90'>
          <Plus size={16} className='mr-2' /> Create New Team
        </Button>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className='flex items-center gap-4 bg-white dark:bg-zinc-950 p-4 border border-zinc-100 dark:border-zinc-900 rounded-xl'>
        <div className='relative flex-1 max-w-sm'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
            size={16}
          />
          <Input
            placeholder='Search teams...'
            className='pl-10 bg-zinc-50 dark:bg-zinc-900 border-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='hidden sm:flex gap-2'>
          {/* Optional: Add status filters here */}
        </div>
      </div>

      {/* THE TABLE */}
      <div className='bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden'>
        <DataTable
          columns={columns}
          data={filteredData}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default WorkForce
