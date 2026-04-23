import { Calendar, User } from 'lucide-react'
import React from 'react'

interface MessageCardProps {
  sender?: string
  content?: string
  date?: string
  isAnnouncement?: boolean
}

const MessageCard = ({
  sender = '@UncleSula',
  content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ab error repellendus!',
  date = 'Sunday, 17 Nov 2026',
  isAnnouncement = false,
}: MessageCardProps) => {
  return (
    <div
      className={`
      group flex flex-col gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer
      ${
        isAnnouncement
          ? 'bg-orange-50/50 border-orange-100 hover:border-orange-300 dark:bg-orange-900/10 dark:border-orange-900/30'
          : 'bg-white border-gray-100 hover:border-blue-300 shadow-sm hover:shadow-md dark:bg-gray-900 dark:border-gray-800 dark:hover:border-blue-900'
      }
    `}
    >
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='p-1.5 rounded-full bg-gray-100 dark:bg-gray-800'>
            <User className='w-3 h-3 text-gray-500' />
          </div>
          <h4 className='font-bold text-sm tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
            {sender}
          </h4>
        </div>
        {isAnnouncement && (
          <span className='text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full'>
            URGENT
          </span>
        )}
      </div>

      {/* Content */}
      <p className='text-xs leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2'>
        {content}
      </p>

      {/* Footer */}
      <div className='flex items-center justify-end gap-1.5 pt-1 mt-auto border-t border-gray-50 dark:border-gray-800'>
        <Calendar className='w-3 h-3 text-gray-400' />
        <span className='text-[10px] font-medium text-gray-400 uppercase tracking-tighter'>
          {date}
        </span>
      </div>
    </div>
  )
}

export default MessageCard
