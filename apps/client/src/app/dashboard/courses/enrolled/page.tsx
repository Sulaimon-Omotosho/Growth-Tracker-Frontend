'use client'

import { BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CourseCard from '@/components/dashboard/CourseCard'
import { Button } from '@/components/ui/button'
import { useMyEnrollments } from '@/hooks/get-church'
import { CoursesSkeleton } from '@/components/skeletons/CoursesSkeleton'
import { CourseStatus } from '@repo/types'

const Enrolled = () => {
  const { data, isLoading } = useMyEnrollments()
  const enrollments = data as any[]
  console.log('Enrollments:', enrollments)

  if (isLoading)
    return (
      <div className='p-8'>
        <CoursesSkeleton />
      </div>
    )

  const inProgress =
    enrollments?.filter((e) => e.status === 'IN_PROGRESS') || []
  const completed =
    enrollments?.filter((e) => e.status === CourseStatus.COMPLETED) || []

  return (
    <div className='p-6 max-w-7xl mx-auto space-y-8'>
      <header className='space-y-2'>
        <Link
          href='/dashboard/courses'
          className='text-xs font-bold text-zinc-400 hover:text-indigo-600 transition-colors'
        >
          ← BACK TO CATALOG
        </Link>
        <h1 className='text-4xl font-black tracking-tight flex items-center gap-3'>
          My Learning Journey <GraduationCap className='text-indigo-600' />
        </h1>
      </header>

      <Tabs defaultValue='active' className='w-full'>
        <TabsList className='bg-zinc-100 p-1 rounded-xl mb-8'>
          <TabsTrigger value='active' className='rounded-lg font-bold px-8'>
            In Progress ({inProgress.length})
          </TabsTrigger>
          <TabsTrigger value='completed' className='rounded-lg font-bold px-8'>
            Completed ({completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='active'>
          {inProgress.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {inProgress.map((enr) => (
                <CourseCard
                  key={enr.id}
                  course={enr.course}
                  status={enr.status}
                  progress={enr.progress}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message="You aren't currently taking any courses."
              actionLabel='Browse Catalog'
            />
          )}
        </TabsContent>

        <TabsContent value='completed'>
          {completed.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {completed.map((enr) => (
                <CourseCard
                  key={enr.id}
                  course={enr.course}
                  status={enr.status}
                  isCompleted
                />
              ))}
            </div>
          ) : (
            <EmptyState message="You haven't finished any tracks yet. Keep going!" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EmptyState({
  message,
  actionLabel,
}: {
  message: string
  actionLabel?: string
}) {
  return (
    <div className='text-center py-20 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl'>
      <BookOpen className='mx-auto text-zinc-300 mb-4' size={48} />
      <p className='text-zinc-500 font-medium mb-6'>{message}</p>
      {actionLabel && (
        <Link href='/dashboard/courses'>
          <Button variant='outline' className='rounded-xl font-bold'>
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  )
}

export default Enrolled
