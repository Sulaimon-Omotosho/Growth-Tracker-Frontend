import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export function DepartmentSkeleton() {
  return (
    <div className='max-w-5xl mx-auto space-y-6 animate-pulse'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-14 w-14 rounded-2xl bg-zinc-200' />
          <div className='space-y-2'>
            <Skeleton className='h-6 w-48 bg-zinc-200' />
            <Skeleton className='h-4 w-32 bg-zinc-100' />
          </div>
        </div>
        <div className='flex gap-2'>
          <Skeleton className='h-10 w-24 rounded-xl bg-zinc-100' />
          <Skeleton className='h-10 w-32 rounded-xl bg-zinc-200' />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-2 rounded-3xl border-none shadow-sm h-64 bg-zinc-50' />
        <div className='space-y-6'>
          <Skeleton className='h-40 rounded-3xl bg-zinc-200' />
          <Skeleton className='h-48 rounded-3xl bg-zinc-900' />
        </div>
      </div>
    </div>
  )
}
