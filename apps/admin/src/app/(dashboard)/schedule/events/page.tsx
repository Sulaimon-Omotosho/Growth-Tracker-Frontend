'use client'

import ResourceItem from '@/components/dashboard/ResourceItem'
import { RightDrawer } from '@/components/dashboard/RightDrawer'
import AddEvent from '@/components/forms/AddEvent'
import AddSmallGroup from '@/components/forms/AddSmallGroup'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useCreateEvent } from '@/hooks/use-message'
import {
  AlertCircle,
  Users,
  Video,
  BellRing,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  Calendar,
  Search,
} from 'lucide-react'
import { useState } from 'react'

type FilterType = 'ALL' | 'GAP' | 'SERVICE' | 'INTEREST'

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL')
  const [isOpen, setIsOpen] = useState<string | null>(null)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  const mutations = {
    event: useCreateEvent(),
  }

  {
    ;(event as any)?.length === 0 && (
      <div className='flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-zinc-200'>
        <Calendar className='h-10 w-10 text-zinc-300 mb-4' />
        <h3 className='font-semibold'>No events scheduled</h3>
        <p className='text-sm text-zinc-500'>
          There are no events on the timeline for this day.
        </p>
      </div>
    )
  }

  return (
    <div className='p-6 space-y-8'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Event Management
          </h1>
          <p className='text-muted-foreground text-sm'>
            Manage your church's schedule and resources.
          </p>
        </div>

        <RightDrawer
          trigger={
            <Button className='gap-2 text-white dark:text-black cursor-pointer bg-zinc-900 dark:bg-zinc-100 hover:opacity-90'>
              <Calendar size={18} />
              Add New Event
            </Button>
          }
          title='Add An Event'
          description='Register a new church event for the year.'
          submitLabel='Add Event'
          formId='add-event'
          open={isOpen === 'event'}
          onOpenChange={(open) => setIsOpen(open ? 'event' : null)}
          isLoading={mutations.event.isPending}
          isSubmitDisabled={isSubmitDisabled}
        >
          <AddEvent
            mutation={mutations.event}
            onSuccess={() => setIsOpen(null)}
            onValidationChange={setIsSubmitDisabled}
          />
        </RightDrawer>
      </div>
      {/* ADMIN OVERVIEW */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card
          className={`cursor-pointer transition-all ${activeFilter === 'ALL' ? 'ring-2 ring-zinc-900' : ''}`}
          onClick={() => setActiveFilter('ALL')}
        >
          <CardContent className='pt-4'>
            <p className='text-xs text-zinc-400 uppercase font-bold'>
              Total Events (Month)
            </p>
            <h3 className='text-2xl font-bold'>42</h3>
            <p className='text-[10px] text-emerald-400 flex items-center mt-1'>
              <ArrowUpRight size={12} /> +12% from last month
            </p>
          </CardContent>
        </Card>

        {/* VOLUNTEER GAP - CRITICAL */}
        <Card
          className={`cursor-pointer transition-all border-red-100 bg-white dark:bg-zinc-950 ${activeFilter === 'GAP' ? 'ring-2 ring-red-500' : ''}`}
          onClick={() => setActiveFilter('GAP')}
        >
          <CardContent className='pt-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-[10px] text-zinc-500 uppercase font-black tracking-widest'>
                  Volunteer Gap
                </p>
                <h3 className='text-3xl font-bold mt-1 text-red-600'>18</h3>
              </div>
              <div className='p-2 bg-red-50 text-red-600 rounded-lg'>
                <Users size={16} />
              </div>
            </div>
            <p className='text-[10px] text-zinc-500 mt-4'>
              <span className='font-bold text-red-600'>5 events</span> still
              need ushers/tech
            </p>
          </CardContent>
        </Card>

        {/* ROOM OCCUPANCY */}
        <Card className='bg-white dark:bg-zinc-950'>
          <CardContent className='pt-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-[10px] text-zinc-500 uppercase font-black tracking-widest'>
                  Room Usage
                </p>
                <h3 className='text-3xl font-bold mt-1'>82%</h3>
              </div>
              <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                <MapPin size={16} />
              </div>
            </div>
            <div className='mt-4'>
              <Progress value={82} className='h-1 bg-blue-100' />
              <p className='text-[10px] text-zinc-500 mt-2'>
                Peak: Hall A & Sanctuary
              </p>
            </div>
          </CardContent>
        </Card>

        {/* UPCOMING REMINDERS */}
        <Card className='bg-white dark:bg-zinc-950'>
          <CardContent className='pt-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-[10px] text-zinc-500 uppercase font-black tracking-widest'>
                  Auto-Reminders
                </p>
                <h3 className='text-3xl font-bold mt-1'>256</h3>
              </div>
              <div className='p-2 bg-amber-50 text-amber-600 rounded-lg'>
                <BellRing size={16} />
              </div>
            </div>
            <p className='text-[10px] text-zinc-500 mt-4 flex items-center gap-1'>
              <CheckCircle2 size={12} className='text-emerald-500' /> 98%
              delivery rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. CRITICAL ALERTS: CLASH DETECTION */}
      <Alert
        variant='destructive'
        className='bg-red-50 border-red-200 text-red-800'
      >
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Resource Conflict</AlertTitle>
        <AlertDescription>
          "Tech Sync" and "Youth Choir" are both booked for <b>Hall B</b> at
          2:00 PM.
        </AlertDescription>
      </Alert>

      {/* <div className='flex justify-between'>
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {[-2, -1, 0, 1, 2, 3, 4].map((offset) => {
            const day = new Date()
            day.setDate(day.getDate() + offset)
            const isSelected =
              day.toDateString() === selectedDate.toDateString()

            return (
              <button
                key={offset}
                onClick={() => setSelectedDate(day)}
                className={`flex flex-col items-center min-w-15 p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-md'
                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                <span className='text-[10px] uppercase font-bold'>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className='text-lg font-black'>{day.getDate()}</span>
              </button>
            )
          })}
        </div>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-4'>
          <div className='relative w-full md:w-72'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
              size={16}
            />
            <input
              type='text'
              placeholder='Search events, rooms...'
              className='w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-xs text-zinc-400 font-medium'>
              Filtering by:
            </span>
            <Badge variant='secondary' className='capitalize'>
              {activeFilter.toLowerCase().replace('_', ' ')}
            </Badge>
            {activeFilter !== 'ALL' && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setActiveFilter('ALL')}
                className='text-[10px] h-6 px-2 text-red-500'
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div> */}
      {/* DATE & SEARCH BAR */}
      <div className='flex flex-col xl:flex-row justify-between gap-6'>
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {[-2, -1, 0, 1, 2, 3, 4].map((offset) => {
            const day = new Date()
            day.setDate(day.getDate() + offset)
            const isSelected =
              day.toDateString() === selectedDate.toDateString()

            return (
              <button
                key={offset}
                onClick={() => setSelectedDate(day)}
                className={`flex flex-col items-center min-w-16 p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-md scale-105'
                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                <span className='text-[10px] uppercase font-bold'>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className='text-lg font-black'>{day.getDate()}</span>
              </button>
            )
          })}
        </div>

        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <div className='relative w-full md:w-72'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
              size={16}
            />
            <input
              type='text'
              placeholder='Search events, rooms...'
              className='w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-950'
            />
          </div>

          <div className='flex items-center gap-2 whitespace-nowrap'>
            <span className='text-xs text-zinc-400 font-medium'>Filters:</span>
            <Badge variant='secondary' className='capitalize'>
              {activeFilter.toLowerCase().replace('_', ' ')}
            </Badge>
            {activeFilter !== 'ALL' && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setActiveFilter('ALL')}
                className='text-[10px] h-6 px-2 text-red-500 hover:bg-red-50'
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* 3. MAIN TIMELINE (Left) */}
        <div className='lg:col-span-8 space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold'>
              Timeline for{' '}
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </h2>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm'>
                Day
              </Button>
              <Button variant='outline' size='sm' className='bg-white'>
                Week
              </Button>
            </div>
          </div>

          <div className='space-y-4'>
            {/* Advanced Event Card */}
            <div className='relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 pb-8'>
              <div className='absolute -left-2.25 top-0 h-4 w-4 rounded-full bg-blue-600 border-4 border-white dark:border-zinc-950 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]' />
              <Card className='hover:border-zinc-300 transition-all'>
                <CardContent className='p-5'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <div className='flex items-center gap-2 mb-2'>
                        <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-100 border-none'>
                          Church Service
                        </Badge>
                        <span className='text-xs text-zinc-400 font-medium'>
                          10:30 AM - 12:15 PM
                        </span>
                      </div>
                      <h3 className='text-lg font-bold'>
                        Main Celebration Service
                      </h3>
                      <p className='text-sm text-zinc-500 flex items-center gap-1 mt-1'>
                        <MapPin size={14} /> Main Sanctuary • Lead: Pastor John
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-[10px] font-black text-zinc-400 uppercase tracking-tighter'>
                        Attendance
                      </p>
                      <p className='text-lg font-mono font-bold'>142/200</p>
                      <Progress
                        value={71}
                        className='h-1 w-20 ml-auto bg-zinc-100'
                      />
                    </div>
                  </div>

                  <div className='mt-6 pt-4 border-t flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='flex -space-x-2'>
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className='h-7 w-7 rounded-full border-2 border-white bg-zinc-200 overflow-hidden'
                          >
                            <img
                              src={`https://i.pravatar.cc/150?u=${i}`}
                              alt='user'
                            />
                          </div>
                        ))}
                      </div>
                      <span className='text-xs text-zinc-500 font-medium'>
                        +5 Volunteers Ready
                      </span>
                    </div>
                    <Button variant='outline' size='sm' className='text-xs h-8'>
                      Manage Roster
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 4. LOGISTICS & AUTOMATION (Right) */}
        <div className='lg:col-span-4 space-y-6'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-bold flex items-center gap-2'>
                <Video size={16} className='text-purple-500' /> Automation
                Center
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800'>
                <div className='flex items-center gap-3'>
                  <BellRing size={16} className='text-blue-500' />
                  <div>
                    <p className='text-xs font-bold'>Reminders</p>
                    <p className='text-[10px] text-zinc-500'>Sent 24h before</p>
                  </div>
                </div>
                <input
                  type='checkbox'
                  className='accent-zinc-900'
                  checked
                  readOnly
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-sm'>Resource Availability</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <ResourceItem label='Projector' status='Available' />
              <ResourceItem label='PA System' status='In Use' isOccupied />
              <ResourceItem label='Baptism Pool' status='Available' />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
