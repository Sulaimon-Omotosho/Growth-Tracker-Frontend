import { CalendarDays, Sparkles } from 'lucide-react'
import { Calendar18 } from './Calender18'
import { EventsCarousel } from './EventsCarousel'

const Events = () => {
  return (
    <section className='w-full space-y-4'>
      {/* <div className='flex items-center justify-between px-1'>
        <div className='flex items-center gap-2'>
          <div className='p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
            <CalendarDays className='w-4 h-4 text-blue-600 dark:text-blue-400' />
          </div>
          <h2 className='font-bold text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300'>
            Schedule & Highlights
          </h2>
        </div>
        <div className='hidden sm:flex items-center gap-1 text-[10px] font-medium text-gray-400'>
          <Sparkles className='w-3 h-3' />
          <span>LIVE UPDATES</span>
        </div>
      </div> */}

      {/* Main Container */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white dark:bg-gray-900/50 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm'>
        {/* Calendar Section */}
        <div className='w-full flex flex-col justify-center border-b xl:border-b-0 xl:border-r border-gray-100 dark:border-gray-800 pb-6 xl:pb-0 xl:pr-6'>
          <div className='mb-4'>
            <h3 className='text-xs font-bold text-gray-400 uppercase'>
              Attendance Calendar
            </h3>
          </div>
          <Calendar18 />
        </div>

        {/* Carousel Section */}
        <div className='w-full flex flex-col justify-center pt-6 xl:pt-0 xl:pl-6'>
          <div className='mb-4'>
            <h3 className='text-xs font-bold text-gray-400 uppercase'>
              Upcoming Highlights
            </h3>
          </div>
          <div className='flex justify-center items-center h-full'>
            <EventsCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
