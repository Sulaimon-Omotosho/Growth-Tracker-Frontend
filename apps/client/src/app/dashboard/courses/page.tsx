'use client'

import React from 'react'
import {
  BookOpen,
  Star,
  ArrowRight,
  Lock,
  CheckCircle,
  Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useAvailableCourses } from '@/hooks/get-church'
import { CoursesSkeleton } from '@/components/skeletons/CoursesSkeleton'
import CourseCard from '@/components/dashboard/CourseCard'

const Courses = () => {
  const { data: courses, isLoading } = useAvailableCourses()

  if (isLoading)
    return (
      <div className='p-8'>
        <CoursesSkeleton />
      </div>
    )

  // Mock "My Progress" logic - you'll later replace this with real enrollment data
  const getStatus = (courseId: string) => {
    // Logic to determine if user is 'ENROLLED', 'COMPLETED', or 'LOCKED'
    return 'AVAILABLE'
  }

  return (
    <div className='p-6 max-w-7xl mx-auto space-y-10'>
      {/* HERO SECTION */}
      <section className='relative overflow-hidden rounded-3xl bg-zinc-900 p-8 md:p-12 text-white'>
        <div className='relative z-10 max-w-2xl space-y-4'>
          <Badge className='bg-indigo-500 hover:bg-indigo-500 text-white border-none'>
            New Curriculum
          </Badge>
          <h1 className='text-4xl md:text-5xl font-black tracking-tight'>
            Expand Your <br /> Spiritual Horizon
          </h1>
          <p className='text-zinc-400 text-lg'>
            Dive into our structured spiritual growth courses designed to equip
            you for every stage of your journey.
          </p>
          <Button className='bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-200'>
            Start Learning Now
          </Button>
        </div>
        {/* Decorative background element */}
        <div className='absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-indigo-500/20 to-transparent pointer-events-none' />
      </section>

      {/* COURSE GRID */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-black tracking-tight flex items-center gap-2'>
            <BookOpen className='text-indigo-600' /> Available Courses
          </h2>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
            {/* <div>
              <h2 className='text-3xl font-black tracking-tight'>
                Course Catalog
              </h2>
              <p className='text-zinc-500'>
                Discover new tracks to fuel your growth.
              </p>
            </div> */}

            <Link href='/dashboard/courses/enrolled'>
              <Button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-6 rounded-2xl shadow-lg shadow-indigo-500/20 group'>
                <Trophy
                  className='mr-2 group-hover:rotate-12 transition-transform'
                  size={20}
                />
                View My Courses
                <ArrowRight
                  className='ml-2 group-hover:translate-x-1 transition-transform'
                  size={18}
                />
              </Button>
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {courses?.map((course) => (
            <CourseCard
              key={course.id as string}
              course={course}
              status={getStatus(course.id as string)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses
