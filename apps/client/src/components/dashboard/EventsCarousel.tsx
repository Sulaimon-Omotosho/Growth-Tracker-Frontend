'use client'

import * as React from 'react'
// import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from '../ui/card'
import { CalendarIcon } from 'lucide-react'

export function EventsCarousel() {
  // const plugin = React.useRef(
  //   Autoplay({ delay: 3000, stopOnInteraction: true }),
  // )

  return (
    <div className='w-full flex justify-center px-6 md:px-10'>
      <Carousel
        // plugins={[plugin.current]}
        className='w-full group'
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className='overflow-hidden border-none bg-transparent shadow-none'>
                {/* Image Container */}
                <div className='relative aspect-video w-full overflow-hidden rounded-xl'>
                  <Image
                    src='/assets/Winepress.jpg'
                    alt='Event Image'
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <div className='absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg'>
                    <CalendarIcon className='w-3 h-3' />
                    JAN 2026
                  </div>
                </div>

                <CardContent className='flex flex-col gap-2 p-4 px-1'>
                  <CardTitle className='text-lg font-bold'>
                    Winepress 2026
                  </CardTitle>
                  <CardDescription className='text-xs line-clamp-2 leading-relaxed'>
                    Join us for an immersive experience of worship and
                    transformation. Encounter the power of the word in a whole
                    new dimension.
                  </CardDescription>

                  <div className='flex items-center justify-between mt-2'>
                    <Button
                      size='sm'
                      className='h-8 text-xs bg-blue-600 hover:bg-blue-700 px-6'
                    >
                      Register Now
                    </Button>
                    <span className='text-[10px] text-muted-foreground font-semibold'>
                      Limited Seats
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden md:block'>
          <CarouselPrevious className='-left-10 opacity-0 group-hover:opacity-100 transition-opacity' />
          <CarouselNext className='-right-10 opacity-0 group-hover:opacity-100 transition-opacity' />
        </div>
      </Carousel>
    </div>
  )
}
