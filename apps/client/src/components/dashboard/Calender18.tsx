'use client'

import * as React from 'react'
import { Calendar } from '../ui/calendar'

export function Calendar18() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className='flex justify-center items-center w-full'>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='p-0 w-full'
        classNames={{
          months: 'w-full',
          month: 'space-y-4 w-full',
          // Position relative so we can absolute position the buttons
          caption: 'flex justify-center pt-1 relative items-center mb-4',
          caption_label: 'text-sm font-bold text-gray-900 dark:text-gray-100',
          nav: 'flex items-center',
          // Pin Prev to left and Next to right
          nav_button_previous:
            'absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity',
          nav_button_next:
            'absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity',
          table: 'w-full border-collapse',
          head_row: 'flex justify-between w-full',
          head_cell:
            'text-gray-400 rounded-md w-9 font-medium text-[10px] uppercase tracking-tighter text-center',
          row: 'flex w-full mt-2 justify-between',
          cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
          day: 'h-9 w-9 p-0 font-normal hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-all flex items-center justify-center',
          day_selected:
            'bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-md shadow-md shadow-blue-500/30 scale-105',
          day_today:
            'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold border border-gray-200 dark:border-gray-700',
          day_outside: 'text-gray-300 dark:text-gray-600 opacity-30',
          day_disabled: 'text-gray-300 opacity-50',
          day_hidden: 'invisible',
        }}
      />
    </div>
  )
}

// 'use client'

// import * as React from 'react'
// import { Calendar } from '../ui/calendar'

// export function Calendar18() {
//   const [date, setDate] = React.useState<Date | undefined>(
//     new Date(2025, 5, 12),
//   )

//   return (
//     <Calendar
//       mode='single'
//       selected={date}
//       onSelect={setDate}
//       className='rounded-lg border w-full [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]'
//       buttonVariant='ghost'
//     />
//   )
// }
