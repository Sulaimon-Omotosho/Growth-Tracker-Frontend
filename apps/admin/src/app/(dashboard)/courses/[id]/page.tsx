'use client'

import { useParams } from 'next/navigation'
import { SkeletonTable } from '@/components/Skeleton'
import {
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  BookOpen,
  ChevronLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetCourseById } from '@/hooks/get-church'
import CourseStatCard from '@/components/dashboard/CourseStatCard'

const CourseDetailsPage = () => {
  const { id } = useParams()
  const { data: course, isLoading } = useGetCourseById(id as string)

  if (isLoading)
    return (
      <div className='p-8'>
        <SkeletonTable />
      </div>
    )
  if (!course) return <div className='p-8 text-center'>Course not found.</div>

  // Calculate some quick stats
  const totalEnrolled = (course as any)._count?.enrollments || 0
  const completedCount =
    course.enrollments?.filter((e: any) => e.status === 'COMPLETED').length || 0
  const completionRate =
    totalEnrolled > 0 ? Math.round((completedCount / totalEnrolled) * 100) : 0

  return (
    <div className='p-6 space-y-8 max-w-7xl mx-auto'>
      {/* HEADER */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center justify-between'>
        <div className='space-y-1'>
          <Link
            href='/courses'
            className='text-xs font-bold text-zinc-400 flex items-center gap-1 hover:text-zinc-600 transition-colors'
          >
            <ChevronLeft size={14} /> BACK TO DIRECTORY
          </Link>
          <h1 className='text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100'>
            {course.title}
          </h1>
          <p className='text-zinc-500 max-w-2xl text-sm'>
            {course.description}
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' className='font-bold'>
            Export Report
          </Button>
          <Button className='bg-zinc-900 text-white font-bold'>
            Edit Course
          </Button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <CourseStatCard
          title='Total Enrolled'
          value={totalEnrolled}
          icon={<Users className='text-blue-500' />}
        />
        <CourseStatCard
          title='Completion Rate'
          value={`${completionRate}%`}
          icon={<TrendingUp className='text-emerald-500' />}
        />
        <CourseStatCard
          title='Active Students'
          value={totalEnrolled - completedCount}
          icon={<Clock className='text-amber-500' />}
        />
        <CourseStatCard
          title='Total Sessions'
          value={course.sessions?.length || 0}
          icon={<BookOpen className='text-purple-500' />}
        />
      </div>

      <Tabs defaultValue='students' className='w-full'>
        <TabsList className='bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl'>
          <TabsTrigger value='students' className='rounded-lg font-bold'>
            Student Progress
          </TabsTrigger>
          <TabsTrigger value='curriculum' className='rounded-lg font-bold'>
            Curriculum & Grading
          </TabsTrigger>
        </TabsList>

        <TabsContent value='students' className='pt-4'>
          <div className='bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden'>
            {/* You can reuse your DataTable here with a new set of columns for StudentEnrollment */}
            <p className='p-8 text-center text-zinc-400 text-sm italic'>
              Student enrollment table goes here (showing progress %, status,
              and join date)
            </p>
          </div>
        </TabsContent>

        <TabsContent value='curriculum' className='pt-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {course.sessions?.map((session: any) => (
              <div
                key={session.id}
                className='p-5 bg-zinc-50 border border-zinc-100 rounded-2xl space-y-3'
              >
                <div className='flex justify-between items-center'>
                  <span className='text-[10px] font-black text-zinc-400 uppercase tracking-widest'>
                    Session {session.order}
                  </span>
                  <span className='text-[10px] font-bold px-2 py-0.5 bg-zinc-200 rounded-full'>
                    Pass: {session.passGrade}
                  </span>
                </div>
                <h4 className='font-bold text-zinc-900'>{session.title}</h4>
                <p className='text-xs text-zinc-500 line-clamp-2'>
                  {session.description}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CourseDetailsPage
