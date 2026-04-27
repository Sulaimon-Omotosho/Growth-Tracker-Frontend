import { Skeleton } from '../ui/skeleton'

export function InterestSkeleton() {
  return (
    <div className='max-w-6xl mx-auto space-y-8 animate-pulse pt-5'>
      <div className='flex gap-4'>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className='h-20 w-20 rounded-3xl bg-zinc-100' />
        ))}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='lg:col-span-3 space-y-4'>
          <Skeleton className='h-8 w-64 bg-zinc-100' />
          <Skeleton className='h-40 w-full rounded-3xl bg-zinc-50' />
          <Skeleton className='h-40 w-full rounded-3xl bg-zinc-50' />
        </div>
      </div>
    </div>
  )
}
