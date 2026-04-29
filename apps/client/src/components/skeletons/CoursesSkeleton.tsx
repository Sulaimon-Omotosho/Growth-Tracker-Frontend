import React from 'react'

export const CoursesSkeleton = () => {
  return (
    <div className='w-full space-y-4 animate-pulse'>
      {/* Search & Filter Bar Skeleton */}
      <div className='flex items-center gap-4 mb-6'>
        <div className='h-10 w-full max-w-sm bg-zinc-100 dark:bg-zinc-900 rounded-xl' />
        <div className='h-10 w-24 bg-zinc-100 dark:bg-zinc-900 rounded-xl hidden sm:block' />
      </div>

      {/* Table Header Skeleton */}
      <div className='rounded-2xl border border-zinc-100 dark:border-zinc-900 overflow-hidden'>
        <div className='bg-zinc-50 dark:bg-zinc-900/50 p-4 border-b border-zinc-100 dark:border-zinc-900 grid grid-cols-4 gap-4'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded'
            />
          ))}
        </div>

        {/* Table Rows Skeleton */}
        <div className='divide-y divide-zinc-100 dark:divide-zinc-900'>
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className='p-4 grid grid-cols-4 gap-4 items-center'>
              {/* Column 1: Info with "Icon" */}
              <div className='flex items-center gap-3'>
                <div className='h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800' />
                <div className='h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded' />
              </div>
              {/* Column 2: Secondary Text */}
              <div className='h-3 w-32 bg-zinc-50 dark:bg-zinc-900 rounded' />
              {/* Column 3: Badge/Status */}
              <div className='h-5 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full' />
              {/* Column 4: Action button */}
              <div className='flex justify-end'>
                <div className='h-8 w-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg' />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className='flex items-center justify-between pt-2'>
        <div className='h-3 w-32 bg-zinc-100 dark:bg-zinc-900 rounded' />
        <div className='flex gap-2'>
          <div className='h-8 w-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg' />
          <div className='h-8 w-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg' />
        </div>
      </div>
    </div>
  )
}
