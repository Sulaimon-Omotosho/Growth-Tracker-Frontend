'use client'

import { Progress } from '@/components/ui/progress'
import { ArrowUpRight, Dot, Megaphone, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import NextStepCard from '@/components/dashboard/NextStepCard'
import Events from '@/components/dashboard/Events'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import MessageCard from '@/components/dashboard/MessageCard'
import { useUser } from '@/utils/userContext'
import { User } from '@repo/types'

const UserDashboard = () => {
  const { user, isLoading } = useUser()

  // Loading UI
  if (isLoading) {
    return (
      <div className='p-6 space-y-6 animate-pulse'>
        <div className='flex justify-between items-end'>
          <div className='space-y-2'>
            <div className='h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded' />
            <div className='h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded' />
          </div>
          <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800' />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 h-150 bg-gray-100 dark:bg-gray-900 rounded-xl' />
          <div className='h-150 bg-gray-100 dark:bg-gray-900 rounded-xl' />
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 md:px-8 py-8 max-w-400 mx-auto'>
      {user ? (
        <>
          {/* HEADER  */}
          <header className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8'>
            <div className='space-y-1'>
              <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
                Welcome,{' '}
                <Link
                  href={`/dashboard/${user.id}`}
                  className='text-blue-600 hover:underline inline-flex items-center gap-1'
                >
                  {user?.firstName} <ArrowUpRight className='w-5 h-5' />
                </Link>
              </h1>
              <p className='text-muted-foreground text-sm md:text-base'>
                Here&apos;s what&apos;s happening with your growth track today.
              </p>
            </div>

            {/* PROGRESS WIDGET */}
            <div className='bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 w-full md:w-72'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-[10px] uppercase font-bold text-gray-500 tracking-wider'>
                  Growth Track
                </span>
                <span className='text-sm font-bold text-blue-600'>75%</span>
              </div>
              <Progress value={75} className='h-2' />
              <p className='text-[10px] text-gray-400 mt-2 italic'>
                1 class remaining to completion
              </p>
            </div>
          </header>

          {/* MAIN GRID LAYOUT */}
          <main className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left  */}
            <div className='lg:col-span-2 space-y-8'>
              <NextStepCard user={user} />

              <section className='space-y-4'>
                <h2 className='text-lg font-bold flex items-center gap-2'>
                  <span className='w-1 h-6 bg-blue-600 rounded-full' />
                  Upcoming Events
                </h2>
                <Events />
              </section>

              <section className='bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm'>
                <h2 className='text-lg font-bold mb-6'>Engagement Overview</h2>
                <AttendanceChart />
              </section>
            </div>

            {/* Right  */}
            <aside className='space-y-8'>
              {/* Messages  */}
              <div className='flex flex-col'>
                <div className='flex items-center justify-between mb-4 px-1'>
                  <h2 className='font-bold flex items-center gap-2'>
                    <MessageSquare className='w-4 h-4 text-blue-500' />
                    Messages
                  </h2>
                  <Link
                    href='/messages'
                    className='text-[10px] font-bold text-blue-600 uppercase hover:underline'
                  >
                    View All
                  </Link>
                </div>
                <div className='flex flex-col gap-3'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <MessageCard key={i} />
                  ))}

                  {/* PAGINATION DOTS */}
                  <div className='w-full flex items-center justify-center mt-2 gap-1'>
                    <Dot className='w-6 h-6 text-blue-600' />
                    <Dot className='w-6 h-6 text-gray-300 dark:text-gray-700' />
                    <Dot className='w-6 h-6 text-gray-300 dark:text-gray-700' />
                  </div>
                </div>
              </div>

              {/* Announcements  */}
              <div className='flex flex-col'>
                <div className='flex items-center justify-between mb-4 px-1'>
                  <h2 className='font-bold flex items-center gap-2'>
                    <Megaphone className='w-4 h-4 text-orange-500' />
                    Announcements
                  </h2>
                </div>
                <div className='flex flex-col gap-3 bg-orange-50/50 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-100 dark:border-orange-900/30'>
                  {[1, 2, 3, 4].map((i) => (
                    <MessageCard key={i} />
                  ))}

                  <button className='w-full py-2 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition-colors'>
                    See All Announcements
                  </button>
                </div>
              </div>
            </aside>
          </main>
        </>
      ) : (
        <div className='flex h-[60vh] items-center justify-center flex-col gap-4'>
          <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
          <p className='text-gray-500 font-medium'>
            Preparing your dashboard...
          </p>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
