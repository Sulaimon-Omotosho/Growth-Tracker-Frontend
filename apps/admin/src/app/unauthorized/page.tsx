'use client'

import { UnauthorizedCard } from '@/components/UnauthorizedCard'
import { useMe } from '@/hooks/use-user'

const Unauthorized = () => {
  const { data, isLoading, isError } = useMe()
  console.log('USER:', data)

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen w-full'>
        <p className='animate-pulse'>Checking permissions...</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='flex items-center justify-center h-screen w-full'>
        <p>Could not verify user role.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full gap-4'>
      <h1 className='font-bold text-xl'>
        Access Denied: You are a{' '}
        <span className='text-amber-600'>{data.role}</span>
      </h1>
      <UnauthorizedCard />
    </div>
  )
}

export default Unauthorized
