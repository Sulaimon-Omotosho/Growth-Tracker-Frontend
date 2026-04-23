'use client'

import {
  Users,
  TrendingUp,
  ShieldCheck,
  Clock,
  LucideIcon,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap = {
  users: Users,
  growth: TrendingUp,
  shield: ShieldCheck,
  clock: Clock,
}

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  iconName: keyof typeof iconMap
  trend?: 'up' | 'down' | 'neutral'
}

const StatCard = ({ title, value, change, iconName, trend }: StatCardProps) => {
  const Icon = iconMap[iconName]

  return (
    <div className='group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:border-zinc-300 dark:hover:border-zinc-700'>
      <div className='flex items-center justify-between mb-4'>
        <div className='p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors'>
          <Icon size={18} />
        </div>
        {change && (
          <div
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border',
              trend === 'up' &&
                'text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800',
              trend === 'down' &&
                'text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30',
              !trend ||
                (trend === 'neutral' &&
                  'text-zinc-500 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'),
            )}
          >
            {trend === 'up' && <ArrowUpRight size={10} />}
            {trend === 'down' && <ArrowDownRight size={10} />}
            {trend === 'neutral' && <Minus size={10} />}
            {change}
          </div>
        )}
      </div>

      <div className='space-y-1'>
        <p className='text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400'>
          {title}
        </p>
        <h3 className='text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100'>
          {value}
        </h3>
      </div>
    </div>
  )
}

export default StatCard
