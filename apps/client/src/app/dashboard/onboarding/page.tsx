'use client'

import { PlusCircle, LayoutDashboard, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { OnboardingCard } from '@/components/dashboard/onboarding/OnboardingCard'
import { OnboardingSkeleton } from '@/components/skeletons/OnboardingSkeleton'
import { useGetMyOnboardings } from '@/hooks/get-church'

export default function OnboardingOverview() {
  const { data, isLoading } = useGetMyOnboardings()

  // Safely extract the array from the object
  const onboardingList = data?.onboardingParticipations || []

  if (isLoading) return <OnboardingSkeleton />

  const hasOnboardings = onboardingList?.length > 0

  return (
    <div className='max-w-6xl mx-auto p-6 md:p-10'>
      <header className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10'>
        <div>
          <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3'>
            <LayoutDashboard className='text-primary' /> My Onboarding Hub
          </h1>
          <p className='text-slate-500 mt-2'>
            Track your progress and access your active probation rooms.
          </p>
        </div>
        <Link href='/dashboard/explore'>
          <Button className='gap-2 rounded-full px-6'>
            <PlusCircle size={18} /> Join New Group
          </Button>
        </Link>
      </header>

      {!hasOnboardings ? (
        <EmptyOnboardingState />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {onboardingList.map((item: any) => (
            <OnboardingCard key={item.id} participant={item} />
          ))}
        </div>
      )}
    </div>
  )
}

const EmptyOnboardingState = () => (
  <div className='text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800'>
    <div className='bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
      <Users className='text-slate-400' size={40} />
    </div>
    <h2 className='text-2xl font-bold mb-2'>No Active Onboardings</h2>
    <p className='text-slate-500 max-w-xs mx-auto mb-8'>
      You aren't currently in probation for any groups. Ready to start your
      journey?
    </p>
    <Link href='/dashboard/explore'>
      <Button size='lg' className='rounded-full px-8'>
        Explore Groups
      </Button>
    </Link>
  </div>
)
