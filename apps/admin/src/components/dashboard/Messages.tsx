'use client'

import { Mail, Reply } from 'lucide-react'

const messages = [
  {
    id: 1,
    sender: 'Pastor Steve',
    preview: 'Can we review the attendance for last Sunday?',
    time: '10m ago',
    unread: true,
  },
  {
    id: 2,
    sender: 'Media Team',
    preview: 'New equipment list has been uploaded to the drive.',
    time: '2h ago',
    unread: false,
  },
  {
    id: 3,
    sender: 'Faith Adebayo',
    preview: 'The cell group report for Gbagada is ready.',
    time: '5h ago',
    unread: false,
  },
  {
    id: 4,
    sender: 'Media Team',
    preview: 'New equipment list has been uploaded to the drive.',
    time: '2h ago',
    unread: false,
  },
]

const Messages = () => {
  return (
    <div className='space-y-4'>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className='group relative p-3 rounded-xl border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer'
        >
          <div className='flex justify-between items-start mb-1'>
            <div className='flex items-center gap-2'>
              <span
                className={`text-xs font-black uppercase tracking-tight ${msg.unread ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'}`}
              >
                {msg.sender}
              </span>
              {msg.unread && (
                <span className='h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse' />
              )}
            </div>
            <span className='text-[10px] font-bold text-zinc-400'>
              {msg.time}
            </span>
          </div>
          <p className='text-xs text-zinc-500 line-clamp-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors'>
            {msg.preview}
          </p>

          <div className='absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity'>
            <Reply
              size={14}
              className='text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            />
          </div>
        </div>
      ))}
      <button className='w-full mt-2 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border-t border-zinc-100 dark:border-zinc-900'>
        Open Inbox
      </button>
    </div>
  )
}

export default Messages
