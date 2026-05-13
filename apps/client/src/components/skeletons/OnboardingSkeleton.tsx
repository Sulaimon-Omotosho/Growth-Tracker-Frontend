import { Skeleton } from '@/components/ui/skeleton'

export const OnboardingSkeleton = () => (
  <div className='max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-500'>
    <div className='flex justify-between items-center'>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-64' />
        <Skeleton className='h-4 w-40' />
      </div>
      <Skeleton className='h-10 w-24 rounded-full' />
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2 space-y-6'>
        <Skeleton className='h-50 w-full rounded-xl' />
        <Skeleton className='h-75 w-full rounded-xl' />
      </div>
      <div className='space-y-6'>
        <Skeleton className='h-63 w-full rounded-xl' />
        <Skeleton className='h-38 w-full rounded-xl' />
      </div>
    </div>
  </div>
)
