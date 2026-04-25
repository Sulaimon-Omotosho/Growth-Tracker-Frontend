import { Megaphone, Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface AnnouncementCardProps {
  title: string
  content: string
  authorName: string
  date: string | Date
  priority: 'NORMAL' | 'HIGH' | 'URGENT'
  scope: string
  // key?: string
}

export const AnnouncementCard = ({
  title,
  content,
  authorName,
  date,
  priority,
  scope,
}: AnnouncementCardProps) => {
  const priorityStyles = {
    NORMAL: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    HIGH: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    URGENT:
      'bg-red-100 text-red-700 animate-pulse dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <div className='relative overflow-hidden group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-lg transition-all duration-300'>
      {/* Side Accent Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          priority === 'URGENT'
            ? 'bg-red-500'
            : priority === 'HIGH'
              ? 'bg-orange-500'
              : 'bg-blue-500'
        }`}
      />

      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800'>
              <Megaphone className='w-4 h-4 text-zinc-600 dark:text-zinc-400' />
            </div>
            <span className='text-[10px] font-bold uppercase tracking-widest text-zinc-500'>
              {scope}
            </span>
          </div>
          <span
            className={`text-[10px] font-black px-2 py-1 rounded-md ${priorityStyles[priority]}`}
          >
            {priority}
          </span>
        </div>

        <div>
          <h3 className='text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-1'>
            {title}
          </h3>
          <p className='text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed'>
            {content}
          </p>
        </div>

        <div className='flex items-center justify-between pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold'>
              {authorName.charAt(0)}
            </div>
            <span className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
              {authorName}
            </span>
          </div>
          <div className='flex items-center gap-1.5 text-zinc-400'>
            <Clock className='w-3.5 h-3.5' />
            <span className='text-[11px] font-medium'>
              {typeof date === 'string' ? date : format(date, 'MMM do, yyyy')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
