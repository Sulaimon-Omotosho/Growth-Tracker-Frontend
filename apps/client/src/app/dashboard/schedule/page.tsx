// 'use client'

// import React from 'react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import {
//   Clock,
//   MapPin,
//   Calendar as CalendarIcon,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react'

// export default function UserPersonalCalendar() {
//   const schedule = [
//     {
//       time: '08:00 AM',
//       event: 'Pre-Service Briefing',
//       category: 'Media Dept',
//       type: 'Duty',
//       color: 'bg-blue-500',
//     },
//     {
//       time: '09:00 AM',
//       event: 'Sunday Service',
//       category: 'General',
//       type: 'Attendance',
//       color: 'bg-zinc-900',
//     },
//     {
//       time: '06:00 PM',
//       event: 'Cell Meeting',
//       category: 'Living Streams',
//       type: 'Fellowship',
//       color: 'bg-rose-500',
//     },
//   ]

//   return (
//     <div className='max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 mt-2'>
//       <div className='flex items-center justify-between'>
//         <h1 className='text-2xl font-black tracking-tight'>My Schedule</h1>
//         <div className='flex items-center gap-2'>
//           <Button variant='outline' size='icon' className='rounded-xl'>
//             <ChevronLeft size={18} />
//           </Button>
//           <span className='font-bold text-sm px-4'>April 26, 2026</span>
//           <Button variant='outline' size='icon' className='rounded-xl'>
//             <ChevronRight size={18} />
//           </Button>
//         </div>
//       </div>

//       <div className='space-y-3'>
//         {schedule.map((item, i) => (
//           <Card
//             key={i}
//             className='rounded-2xl border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow'
//           >
//             <CardContent className='p-0 flex items-stretch h-20'>
//               <div className={`w-2 ${item.color}`} />
//               <div className='flex-1 p-4 flex items-center justify-between'>
//                 <div className='flex items-center gap-6'>
//                   <div className='text-center min-w-[70px]'>
//                     <p className='text-xs font-black'>
//                       {item.time.split(' ')[0]}
//                     </p>
//                     <p className='text-[10px] font-bold text-zinc-400'>
//                       {item.time.split(' ')[1]}
//                     </p>
//                   </div>
//                   <div>
//                     <p className='text-sm font-black'>{item.event}</p>
//                     <div className='flex items-center gap-2 mt-1'>
//                       <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-tighter'>
//                         {item.category}
//                       </span>
//                       <Badge className='text-[8px] font-bold uppercase py-0 h-4'>
//                         {item.type}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   variant='ghost'
//                   size='sm'
//                   className='text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity'
//                 >
//                   Details
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Button className='w-full h-12 rounded-2xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-none font-black text-xs'>
//         Add Private Event/Note
//       </Button>
//     </div>
//   )
// }

'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
} from 'lucide-react'

export default function UserPersonalCalendar() {
  // State for the active selected date (default to today)
  const [selectedDate, setSelectedDate] = useState(26) // Using day numbers for simplicity

  const weekDays = [
    { day: 'Mon', date: 20 },
    { day: 'Tue', date: 21 },
    { day: 'Wed', date: 22 },
    { day: 'Thu', date: 23 },
    { day: 'Fri', date: 24 },
    { day: 'Sat', date: 25 },
    { day: 'Sun', date: 26 },
  ]

  const schedule = [
    {
      time: '08:00 AM',
      event: 'Pre-Service Briefing',
      category: 'Media Dept',
      type: 'Duty',
      color: 'bg-blue-500',
    },
    {
      time: '09:00 AM',
      event: 'Sunday Service',
      category: 'General',
      type: 'Attendance',
      color: 'bg-zinc-900',
    },
    {
      time: '06:00 PM',
      event: 'Cell Meeting',
      category: 'Living Streams',
      type: 'Fellowship',
      color: 'bg-rose-500',
    },
  ]

  return (
    <div className='max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20'>
      {/* --- HEADER --- */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-zinc-100 rounded-xl'>
            <CalendarIcon size={20} className='text-zinc-600' />
          </div>
          <h1 className='text-2xl font-black tracking-tight'>My Schedule</h1>
        </div>
        <Badge
          variant='outline'
          className='rounded-full border-2 font-bold px-4 py-1'
        >
          April 2026
        </Badge>
      </div>

      {/* --- HORIZONTAL WEEK STRIP --- */}
      <div className='bg-zinc-50/50 p-2 rounded-[2rem] border flex items-center gap-2'>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full hover:bg-white'
        >
          <ChevronLeft size={18} />
        </Button>

        <div className='flex-1 flex justify-between px-2'>
          {weekDays.map((item) => {
            const isActive = selectedDate === item.date
            return (
              <button
                key={item.date}
                onClick={() => setSelectedDate(item.date)}
                className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-lg scale-110'
                    : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600'
                }`}
              >
                <span
                  className={`text-[10px] font-black uppercase tracking-tighter ${isActive ? 'text-zinc-400' : ''}`}
                >
                  {item.day}
                </span>
                <span className='text-sm font-black mt-1'>{item.date}</span>
                {/* Dot indicator for events */}
                {!isActive && [24, 26].includes(item.date) && (
                  <div className='w-1 h-1 bg-blue-500 rounded-full mt-1' />
                )}
              </button>
            )
          })}
        </div>

        <Button
          variant='ghost'
          size='icon'
          className='rounded-full hover:bg-white'
        >
          <ChevronRight size={18} />
        </Button>
      </div>

      {/* --- TIMELINE VIEW --- */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between px-2'>
          <p className='text-[10px] font-black uppercase tracking-widest text-zinc-400'>
            Showing {schedule.length} Events
          </p>
        </div>

        {schedule.map((item, i) => (
          <Card
            key={i}
            className='rounded-3xl border-none shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300'
          >
            <CardContent className='p-0 flex items-stretch h-24'>
              <div className={`w-1.5 ${item.color}`} />
              <div className='flex-1 p-5 flex items-center justify-between'>
                <div className='flex items-center gap-8'>
                  <div className='text-center min-w-[60px]'>
                    <p className='text-sm font-black text-zinc-900'>
                      {item.time.split(' ')[0]}
                    </p>
                    <p className='text-[10px] font-black text-zinc-400 uppercase tracking-widest'>
                      {item.time.split(' ')[1]}
                    </p>
                  </div>

                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <p className='text-base font-black text-zinc-800'>
                        {item.event}
                      </p>
                      <Badge
                        variant='secondary'
                        className='text-[8px] font-black uppercase bg-zinc-100 py-0'
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-4'>
                      <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-tighter flex items-center gap-1'>
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${item.color} opacity-40`}
                        />
                        {item.category}
                      </span>
                      <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-tighter flex items-center gap-1'>
                        <MapPin size={10} /> Sanctuary
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='rounded-xl text-xs font-bold h-9 px-4'
                  >
                    Remind Me
                  </Button>
                  <Button className='bg-zinc-900 rounded-xl text-xs font-bold h-9 px-4'>
                    Check In
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State placeholder for dates without events */}
        {selectedDate === 21 && (
          <div className='py-20 text-center space-y-4 bg-zinc-50/50 rounded-[3rem] border border-dashed'>
            <div className='bg-white w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center mx-auto'>
              <Clock className='text-zinc-300' />
            </div>
            <div>
              <p className='text-sm font-black text-zinc-900'>
                No Commitments Today
              </p>
              <p className='text-xs text-zinc-400 font-medium'>
                Enjoy your rest or explore new programs!
              </p>
            </div>
            <Button
              variant='outline'
              className='rounded-xl font-bold text-xs border-2'
            >
              Browse Events
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
