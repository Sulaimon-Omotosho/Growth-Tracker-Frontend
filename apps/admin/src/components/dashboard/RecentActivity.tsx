'use client'

import { cn } from '@/lib/utils'
import { UserPlus, ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react'

// Mock data
const activities = [
  {
    id: 1,
    type: 'member_joined',
    user: 'Oluwaseun Ariyo',
    action: 'joined the Workforce',
    time: '2 mins ago',
    icon: UserPlus,
  },
  {
    id: 2,
    type: 'approval_required',
    user: 'Admin System',
    action: 'New Department Request: Media Team',
    time: '1 hour ago',
    icon: ShieldAlert,
    urgent: true,
  },
  {
    id: 3,
    type: 'task_completed',
    user: 'Pastoral Team',
    action: 'Cell Report Audit completed',
    time: '4 hours ago',
    icon: CheckCircle2,
  },
  {
    id: 4,
    type: 'promotion',
    user: 'Faith Adebayo',
    action: 'promoted to Cell Leader',
    time: 'Yesterday',
    icon: UserCheck,
  },
]

const RecentActivity = () => {
  return (
    <div className='space-y-6'>
      {activities.map((item, index) => (
        <div key={item.id} className='relative flex gap-4 group'>
          {/* Timeline Line */}
          {index !== activities.length - 1 && (
            <div className='absolute left-4 top-10 -bottom-6 w-[2px] bg-zinc-100 dark:bg-zinc-900' />
          )}

          {/* Icon Circle */}
          <div
            className={cn(
              'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white dark:bg-zinc-950 transition-all',
              item.urgent
                ? 'border-red-200 dark:border-red-900 text-red-500 shadow-sm shadow-red-100 dark:shadow-none'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 group-hover:border-zinc-400 dark:group-hover:border-zinc-600',
            )}
          >
            <item.icon size={16} />
          </div>

          {/* Content */}
          <div className='flex flex-col gap-1 pt-1'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
                {item.user}
              </span>
              <span className='text-[10px] font-black uppercase tracking-widest text-zinc-400'>
                • {item.time}
              </span>
            </div>
            <p className='text-xs text-zinc-500 leading-relaxed'>
              {item.action}
            </p>
          </div>
        </div>
      ))}

      <button className='w-full mt-4 py-2 border-t border-zinc-100 dark:border-zinc-900 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors'>
        View Full System Log
      </button>
    </div>
  )
}

export default RecentActivity
