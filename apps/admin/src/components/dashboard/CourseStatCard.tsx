import React from 'react'

const CourseStatCard = ({
  title,
  value,
  icon,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
}) => {
  return (
    <div className='bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-900 flex items-center justify-between shadow-sm'>
      <div>
        <p className='text-[10px] font-black uppercase tracking-wider text-zinc-400'>
          {title}
        </p>
        <p className='text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-1'>
          {value}
        </p>
      </div>
      <div className='p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl'>{icon}</div>
    </div>
  )
}

export default CourseStatCard
