import { ArrowRight, BookOpen, Lock, Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'

function CourseCard({
  course,
  status,
  progress,
  isCompleted,
}: {
  course: any
  status: string
  progress?: number
  isCompleted?: boolean
}) {
  const isLocked = status === 'LOCKED'

  return (
    <Link
      href={isLocked ? '#' : `/dashboard/courses/${course.id}`}
      className={`group relative flex flex-col bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-3xl p-6 transition-all duration-300 ${isLocked ? 'opacity-70 grayscale cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1'}`}
    >
      <div className='flex justify-between items-start mb-4'>
        <div className='h-12 w-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors'>
          {isLocked ? <Lock size={20} /> : <BookOpen size={20} />}
        </div>
        <Badge
          variant='secondary'
          className='text-[10px] font-black uppercase tracking-widest'
        >
          {course.category || 'General'}
        </Badge>
      </div>

      <div className='flex-1 space-y-2'>
        <h3 className='font-black text-xl text-zinc-900 dark:text-zinc-100 leading-tight'>
          {course.title}
        </h3>
        <p className='text-sm text-zinc-500 line-clamp-2'>
          {course.description}
        </p>
      </div>

      <div className='mt-6 pt-4 border-t border-zinc-50 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-xs font-bold text-zinc-400'>
          <Star size={14} className='text-amber-400 fill-amber-400' />
          <span>{course._count?.sessions || 0} Sessions</span>
        </div>

        {!isLocked && (
          <div className='text-indigo-600 font-black text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
            VIEW COURSE <ArrowRight size={14} />
          </div>
        )}
      </div>

      {/* Progress Overlay (If Enrolled) */}
      {status === 'IN_PROGRESS' && (
        <div className='absolute top-3 right-6'>
          <div className='h-2 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden'>
            <div
              className='h-full bg-indigo-500 transition-all duration-500 ease-out'
              style={{ width: `${progress}%` }}
            />
            <p className='text-[10px] font-bold text-zinc-400 mt-1 text-right'>
              {progress}%
            </p>
          </div>
        </div>
      )}
    </Link>
  )
}

export default CourseCard
