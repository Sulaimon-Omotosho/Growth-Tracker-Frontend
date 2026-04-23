'use client'

import Image from 'next/image'
import { GroupAvatar } from './GroupAvatar'
import { User } from '@repo/types'
import { ChevronRight } from 'lucide-react'

interface GroupCardProps {
  name: string
  type: 'Cell' | 'Department' | 'Small Group'
  members: User[]
  logo?: string
  isSingle?: boolean
}

export const GroupCard = ({
  name,
  type,
  members,
  logo,
  isSingle,
}: GroupCardProps) => {
  const accentColors = {
    Cell: 'border-l-blue-500',
    Department: 'border-l-purple-500',
    'Small Group': 'border-l-emerald-500',
  }

  return (
    <section
      className={`
        group relative flex snap-start justify-between items-center rounded-xl 
        bg-white dark:bg-gray-900/50 p-4 mb-2 shadow-sm border border-gray-200 
        dark:border-gray-800 hover:border-blue-500/50 hover:shadow-md 
        transition-all duration-300 cursor-pointer border-l-4 ${accentColors[type]}
        ${isSingle ? 'w-full' : 'w-[85%] sm:w-72 shrink-0'}
      `}
    >
      <div className='min-w-0 flex-1 pr-2'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[9px] font-bold uppercase tracking-wider text-gray-500'>
            {type}
          </span>
        </div>

        <h3 className='text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-500 transition-colors'>
          {name}
        </h3>
        <div className='flex flex-row items-center mt-3'>
          <GroupAvatar members={members} />
          <p className='text-[11px] pl-3 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap'>
            {members?.length || 0} Members
          </p>
        </div>
      </div>

      <div className='flex flex-col items-end gap-3'>
        <div className='h-11 w-11 overflow-hidden rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow-inner shrink-0 transition-transform group-hover:scale-105'>
          <Image
            src={logo || '/assets/logo.jpeg'}
            alt='logo'
            width={44}
            height={44}
            className='object-cover h-full w-full'
          />
        </div>
        <ChevronRight className='w-4 h-4 text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all' />
      </div>

      <div className='absolute inset-0 bg-linear-to-r from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none' />
    </section>
  )
}
