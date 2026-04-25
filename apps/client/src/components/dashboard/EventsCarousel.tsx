'use client'

// import * as React from 'react'
// // import Autoplay from 'embla-carousel-autoplay'
// import Image from 'next/image'
// import { Button } from '../ui/button'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '../ui/carousel'
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardTitle,
// } from '../ui/card'
// import { CalendarIcon } from 'lucide-react'
// import { useGetUpcomingEvents } from '@/hooks/get-messages'

// export function EventsCarousel() {
//   const { data: events, isLoading } = useGetUpcomingEvents()
//   console.log('Events:', events)

//   if (isLoading)
//     return <div className='w-full h-64 animate-pulse bg-zinc-100 rounded-3xl' />
//   if (!events || events.length === 0) return null
//   //   // const plugin = React.useRef(
//   //   //   Autoplay({ delay: 3000, stopOnInteraction: true }),
//   //   // )

//   return (
//     <div className='w-full flex justify-center px-6 md:px-10'>
//       <Carousel
//         // plugins={[plugin.current]}
//         className='w-full group'
//         // onMouseEnter={plugin.current.stop}
//         // onMouseLeave={plugin.current.reset}
//       >
//         <CarouselContent>
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem key={index}>
//               <Card className='overflow-hidden border-none bg-transparent shadow-none'>
//                 {/* Image Container */}
//                 <div className='relative aspect-video w-full overflow-hidden rounded-xl'>
//                   <Image
//                     src='/assets/Winepress.jpg'
//                     alt='Event Image'
//                     fill
//                     className='object-cover transition-transform duration-500 group-hover:scale-105'
//                   />
//                   <div className='absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg'>
//                     <CalendarIcon className='w-3 h-3' />
//                     JAN 2026
//                   </div>
//                 </div>

//                 <CardContent className='flex flex-col gap-2 p-4 px-1'>
//                   <CardTitle className='text-lg font-bold'>
//                     Winepress 2026
//                   </CardTitle>
//                   <CardDescription className='text-xs line-clamp-2 leading-relaxed'>
//                     Join us for an immersive experience of worship and
//                     transformation. Encounter the power of the word in a whole
//                     new dimension.
//                   </CardDescription>

//                   <div className='flex items-center justify-between mt-2'>
//                     <Button
//                       size='sm'
//                       className='h-8 text-xs bg-blue-600 hover:bg-blue-700 px-6'
//                     >
//                       Register Now
//                     </Button>
//                     <span className='text-[10px] text-muted-foreground font-semibold'>
//                       Limited Seats
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <div className='hidden md:block'>
//           <CarouselPrevious className='-left-10 opacity-0 group-hover:opacity-100 transition-opacity' />
//           <CarouselNext className='-right-10 opacity-0 group-hover:opacity-100 transition-opacity' />
//         </div>
//       </Carousel>
//     </div>
//   )
// }

import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { useGetUpcomingEvents } from '@/hooks/get-events'

export function EventsCarousel() {
  const { data: events, isLoading } = useGetUpcomingEvents()

  if (isLoading) {
    return <div className='w-full h-64 animate-pulse bg-zinc-100 rounded-3xl' />
  }

  if (!events || events.length === 0) return null

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  return (
    <div className='w-full flex justify-center px-6 md:px-10'>
      <Carousel className='w-full group'>
        <CarouselContent>
          {events.map((event: any) => {
            const firstSession = event.sessions?.[0]

            return (
              <CarouselItem
                key={event.id}
                // className='md:basis-1/2 lg:basis-1/3 w-full'
                className=''
              >
                <Card className='overflow-hidden border-none shadow-md rounded-2xl pt-0'>
                  {/* Image */}
                  <div className='relative aspect-video w-full overflow-hidden rounded-t-2xl'>
                    <Image
                      // src={event.imageUrl || '/assets/Logo.jpeg'}
                      src={event.imageUrl || '/assets/Winepress.jpg'}
                      alt={event.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    {/* Date Badge */}
                    {firstSession && (
                      <div className='absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg'>
                        <CalendarIcon className='w-3 h-3' />
                        {formatDate(firstSession.start)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className='space-y-3 p-4'>
                    <CardTitle className='text-lg font-bold line-clamp-1'>
                      {event.title}
                    </CardTitle>

                    <CardDescription className='text-sm line-clamp-2'>
                      {event.description}
                    </CardDescription>

                    {/* Meta */}
                    <div className='space-y-2 text-xs text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <MapPinIcon className='w-4 h-4' />
                        {event.location}
                      </div>

                      {/* <div className='flex items-center gap-2'>
                        <UsersIcon className='w-4 h-4' />
                        Capacity: {event.capacity.toLocaleString()}
                      </div> */}

                      <div>• Type: {event.type}</div>
                      <div>• Status: {event.status}</div>
                    </div>

                    {/* CTA */}
                    <div className='flex items-center justify-between pt-2'>
                      <Button
                        size='sm'
                        className='h-8 text-xs bg-blue-600 hover:bg-blue-700 px-6'
                      >
                        Register Now
                      </Button>

                      <span className='text-[10px] text-muted-foreground font-semibold'>
                        {event.sessions?.length || 0} Sessions
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <div className='hidden md:block'>
          <CarouselPrevious className='-left-10 opacity-0 group-hover:opacity-100 transition-opacity' />
          <CarouselNext className='-right-10 opacity-0 group-hover:opacity-100 transition-opacity' />
        </div>
      </Carousel>
    </div>
  )
}
