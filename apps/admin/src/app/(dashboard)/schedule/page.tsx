'use client'

import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Clock, MapPin, MoreVertical, Filter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'SERVICE':
      return 'bg-blue-100 text-blue-700'
    case 'SMALL_GROUP':
      return 'bg-emerald-100 text-emerald-700'
    default:
      return 'bg-zinc-100 text-zinc-700'
  }
}

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className='p-6 space-y-6'>
      {/* HEADER SECTION */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Schedule Management
          </h1>
          <p className='text-muted-foreground'>
            Organize church services, meetings, and group events.
          </p>
        </div>
        <Button className='gap-2'>
          <Link href='/schedule/events'>All Event</Link>
        </Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* LEFT COLUMN: CALENDAR & FILTERS */}
        <div className='lg:col-span-4 space-y-6'>
          <Card>
            <CardContent className='p-4'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                className='rounded-md border shadow-sm w-full'
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-sm font-medium flex items-center gap-2'>
                <Filter size={16} /> Filter by Type
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex items-center gap-2 text-sm'>
                <div className='h-3 w-3 rounded-full bg-blue-500' /> Services
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <div className='h-3 w-3 rounded-full bg-emerald-500' /> Small
                Groups
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <div className='h-3 w-3 rounded-full bg-amber-500' /> Outreach
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: EVENT TIMELINE */}
        <div className='lg:col-span-8 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-lg'>
              Events for{' '}
              {date?.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </h2>
            <Badge variant='outline'>{events.length} Events</Badge>
          </div>
          <div className=''>
            {events.length > 0 ? (
              events.map((event) => (
                <Card
                  key={event.id}
                  className='group hover:border-zinc-400 transition-all'
                >
                  <CardContent className='p-4 flex items-center justify-between'>
                    <div className='flex gap-4 items-start'>
                      <div className='bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-center min-w-15'>
                        <span className='block text-xs font-bold uppercase text-zinc-500'>
                          {event.timeStart}
                        </span>
                        <div className='h-px bg-zinc-300 my-1' />
                        <span className='block text-xs text-zinc-400'>
                          {event.timeEnd}
                        </span>
                      </div>

                      <div>
                        <h3 className='font-bold text-zinc-900 dark:text-zinc-100'>
                          {event.title}
                        </h3>
                        <div className='flex flex-wrap gap-3 mt-1'>
                          <span className='flex items-center gap-1 text-xs text-zinc-500'>
                            <Clock size={12} /> {event.duration}
                          </span>
                          <span className='flex items-center gap-1 text-xs text-zinc-500'>
                            <MapPin size={12} /> {event.location}
                          </span>
                          <Badge
                            className={getTypeStyles(event.type)}
                            variant='secondary'
                          >
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Edit Event</DropdownMenuItem>
                        <DropdownMenuItem>Assign Volunteers</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-500'>
                          Cancel Event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className='h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-xl opacity-50'>
                <Calendar size={32} className='mb-2' />
                <p>No events scheduled for this day</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// MOCK DATA & HELPERS
const events = [
  {
    id: '1',
    title: 'Sunday First Service',
    timeStart: '07:15',
    timeEnd: '08:45',
    duration: '1h:30m',
    location: 'Main Auditorium',
    type: 'SERVICE',
  },
  {
    id: '2',
    title: 'Sunday Second Service',
    timeStart: '08:45',
    timeEnd: '10:30',
    duration: '1h:45m',
    location: 'Main Auditorium',
    type: 'SERVICE',
  },
  {
    id: '3',
    title: 'Sunday Third Service',
    timeStart: '10:30',
    timeEnd: '12:15',
    duration: '1h:45m',
    location: 'Main Auditorium',
    type: 'SERVICE',
  },
  {
    id: '4',
    title: 'Sunday Singles Service',
    timeStart: '12:15',
    timeEnd: '2:15',
    duration: '2h',
    location: 'Main Auditorium',
    type: 'SERVICE',
  },
  {
    id: '5',
    title: 'Tech Interest Group Sync',
    timeStart: '14:00',
    timeEnd: '15:30',
    duration: '1.5h',
    location: 'Online / Zoom',
    type: 'SMALL_GROUP',
  },
]
