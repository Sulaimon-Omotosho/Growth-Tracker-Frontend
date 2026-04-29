'use client'

import { useParams } from 'next/navigation'
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Trophy,
  FileDown,
  Calendar,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useGetCourseProgress } from '@/hooks/get-church'
import { CoursesSkeleton } from '@/components/skeletons/CoursesSkeleton'
import EnrollButton from '@/components/dashboard/CourseEnrollButton'
import { CourseStatus } from '@repo/types'

const CourseDetailView = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetCourseProgress(id as string)
  const course = data as any
  // console.log('Course Detail:', course)

  // --- DYNAMIC DATA MAPPING ---
  const enrollment = course?.enrollments?.[0]
  // const enrollment = null
  const isEnrolled = !!enrollment
  const isCompleted = enrollment?.status === CourseStatus.COMPLETED
  // const isCompleted = 'COMPLETED'

  // Use the stats object from your backend
  const progressPercent = course?.stats?.progress || 0
  const completedSessions = course?.stats?.completedCount || 0
  const totalSessions = course?.stats?.totalSessions || 0

  if (isLoading)
    return (
      <div className='p-8'>
        <CoursesSkeleton />
      </div>
    )
  if (!course) return <div className='p-8 text-center'>Course not found.</div>

  return (
    <div className='p-6 max-w-5xl mx-auto space-y-8'>
      {/* HERO / HEADER SECTION */}
      <div className='relative p-8 rounded-3xl bg-zinc-900 text-white overflow-hidden'>
        <div className='relative z-10 space-y-4'>
          <Badge className='bg-indigo-500/20 text-indigo-300 border-indigo-500/30'>
            {course.category}
          </Badge>
          <h1 className='text-3xl md:text-4xl font-black tracking-tight'>
            {course.title}
          </h1>
          <p className='text-zinc-400 max-w-2xl'>{course.description}</p>

          <div className='flex flex-wrap gap-4 pt-4'>
            {!isEnrolled ? (
              <EnrollButton
                courseId={id as string}
                courseTitle={course.title}
              />
            ) : isCompleted ? (
              <div className='flex gap-3'>
                <Button
                  size='lg'
                  className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl'
                >
                  <Trophy className='mr-2' size={18} /> Course Completed
                </Button>
                {/* Certificate Download - Only visible if completed */}
                <Button
                  size='lg'
                  variant='outline'
                  className='border-zinc-700 hover:bg-zinc-800 text-white font-bold rounded-xl'
                >
                  <FileDown className='mr-2' size={18} /> Get Certificate
                </Button>
              </div>
            ) : (
              <Button
                size='lg'
                className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl'
              >
                Continue Learning
              </Button>
            )}
          </div>
        </div>
        <div className='absolute -right-10 -bottom-10 opacity-10'>
          <BookOpen size={300} />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* MAIN CONTENT: CURRICULUM */}
        <div className='lg:col-span-2 space-y-6'>
          <h3 className='text-xl font-black flex items-center gap-2'>
            Course Curriculum
            <span className='text-xs font-medium text-zinc-400'>
              {totalSessions} Sessions
            </span>
          </h3>

          <div className='space-y-3'>
            {course.sessions?.map((session: any, idx: number) => {
              // LOGIC: If not enrolled, lock everything except the first session
              // If enrolled, check the "isCompleted" field we merged in the service
              const isLocked = !isEnrolled && idx > 0
              const sessionFinished = session.isCompleted // from your getCourseForStudent service logic

              return (
                <div
                  key={session.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isLocked
                      ? 'bg-zinc-50 border-zinc-100 opacity-60'
                      : 'bg-white border-zinc-100 hover:border-indigo-200 shadow-sm'
                  }`}
                >
                  <div className='flex items-center gap-4'>
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm ${
                        isLocked
                          ? 'bg-zinc-200 text-zinc-400'
                          : sessionFinished
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      {isLocked ? (
                        <Lock size={16} />
                      ) : sessionFinished ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-zinc-900'>
                        {session.title}
                      </h4>
                      <p className='text-xs text-zinc-500 line-clamp-1'>
                        {session.description}
                      </p>
                    </div>
                    {!isLocked && (
                      <ChevronRight size={18} className='text-zinc-300' />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SIDEBAR: PROGRESS & ACTIONS */}
        <div className='space-y-6'>
          {isEnrolled && (
            <div className='p-6 bg-zinc-50 border border-zinc-100 rounded-3xl space-y-4'>
              <h4 className='font-black text-sm uppercase tracking-widest text-zinc-400'>
                Your Progress
              </h4>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm font-bold'>
                  <span>{progressPercent}% Complete</span>
                  <span>
                    {completedSessions}/{totalSessions} Units
                  </span>
                </div>
                <Progress value={progressPercent} className='h-2 bg-zinc-200' />
              </div>

              {isCompleted && (
                <Button
                  variant='outline'
                  className='w-full border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold py-6 rounded-2xl'
                >
                  <FileDown className='mr-2' size={18} /> Download Certificate
                </Button>
              )}
            </div>
          )}

          <div className='p-6 bg-white border border-zinc-100 rounded-3xl space-y-4 shadow-sm'>
            <h4 className='font-black text-sm uppercase tracking-widest text-zinc-400'>
              Track Info
            </h4>
            <div className='space-y-3'>
              <InfoRow
                icon={<Calendar size={14} />}
                label='Duration'
                value='Self-paced'
              />
              <InfoRow
                icon={<Trophy size={14} />}
                label='Certification'
                value={isCompleted ? 'Earned' : 'Available'}
              />
              <InfoRow
                icon={<CheckCircle2 size={14} />}
                label='Passing Grade'
                value='50% per session'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
  return (
    <div className='flex items-center justify-between text-sm'>
      <div className='flex items-center gap-2 text-zinc-500'>
        {icon} <span>{label}</span>
      </div>
      <span className='font-bold text-zinc-900'>{value}</span>
    </div>
  )
}

export default CourseDetailView
