'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CalendarDays,
  MapPin,
  Clock,
  Ticket,
  CheckCircle2,
  Bell,
  Plus,
  Filter,
  Share2,
  CalendarCheck,
  Zap,
} from 'lucide-react'

export default function EventsPage() {
  const featuredEvent = {
    title: 'Easter Celebration: The Awakening',
    date: 'Sunday, April 20th',
    time: '9:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    category: 'Main Service',
    imageColor: 'bg-linear-to-r from-purple-900 to-indigo-900',
  }

  const mySchedule = [
    {
      id: 1,
      title: 'Media Dept. Pre-Service Setup',
      time: '07:30 AM',
      type: 'Duty',
      status: 'Confirmed',
    },
    {
      id: 2,
      title: 'Main Sunday Service',
      time: '09:00 AM',
      type: 'Attendance',
      status: 'Going',
    },
    {
      id: 3,
      title: 'Foundations Class: Session 3',
      time: '01:00 PM',
      type: 'Program',
      status: 'Pending',
    },
  ]

  return (
    <div className='max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20'>
      {/* --- HEADER & NOTIFICATION TOGGLE --- */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-black tracking-tighter'>
            Events & Programs
          </h1>
          <p className='text-muted-foreground text-sm'>
            Your personalized timeline for the week.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            className='rounded-xl font-bold text-xs h-10 gap-2 border-2'
          >
            <Bell size={16} className='text-orange-500' /> Reminders
          </Button>
          <Button className='bg-zinc-900 rounded-xl font-bold text-xs h-10 gap-2'>
            <Plus size={16} /> Sync to Google
          </Button>
        </div>
      </div>

      {/* --- FEATURED PROMO (THE "BIG" THING) --- */}
      <Card
        className={`relative overflow-hidden border-none text-white rounded-[2rem] shadow-2xl ${featuredEvent.imageColor}`}
      >
        <div className='absolute right-[-5%] top-[-10%] opacity-10'>
          <CalendarCheck size={300} />
        </div>
        <CardContent className='p-8 md:p-12 relative z-10'>
          <Badge className='bg-white/20 text-white backdrop-blur-md border-none mb-6 font-bold'>
            Featured Event
          </Badge>
          <div className='max-w-lg'>
            <h2 className='text-4xl md:text-5xl font-black tracking-tight leading-none'>
              {featuredEvent.title}
            </h2>
            <div className='flex flex-wrap gap-6 mt-8'>
              <div className='flex items-center gap-2'>
                <CalendarDays size={20} className='text-purple-300' />
                <span className='font-bold text-sm'>{featuredEvent.date}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin size={20} className='text-purple-300' />
                <span className='font-bold text-sm'>
                  {featuredEvent.location}
                </span>
              </div>
            </div>
            <div className='flex gap-3 mt-10'>
              <Button className='bg-white text-zinc-900 hover:bg-zinc-100 font-black rounded-2xl px-8 h-12'>
                Register Now
              </Button>
              <Button
                variant='ghost'
                className='text-white hover:bg-white/10 font-bold rounded-2xl h-12'
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* --- LEFT: MY PERSONAL TIMELINE --- */}
        <div className='lg:col-span-2 space-y-6'>
          <div className='flex items-center justify-between px-2'>
            <h3 className='font-black text-lg uppercase tracking-tighter'>
              My Personal Schedule
            </h3>
            <Button
              variant='ghost'
              size='sm'
              className='text-xs font-bold text-blue-600'
            >
              View Month
            </Button>
          </div>

          <div className='space-y-4'>
            {mySchedule.map((item) => (
              <div key={item.id} className='group relative pl-8 py-2'>
                {/* Timeline Line */}
                <div className='absolute left-3 top-0 bottom-0 w-[2px] bg-zinc-100 group-last:h-1/2' />
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${item.type === 'Duty' ? 'bg-orange-500' : 'bg-blue-500'}`}
                >
                  {item.type === 'Duty' ? (
                    <Zap size={10} className='text-white' />
                  ) : (
                    <CheckCircle2 size={10} className='text-white' />
                  )}
                </div>

                <Card className='rounded-2xl border-none shadow-sm group-hover:shadow-md transition-shadow'>
                  <CardContent className='p-5 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='text-center border-r pr-4'>
                        <p className='text-xs font-black text-zinc-900'>
                          {item.time.split(' ')[0]}
                        </p>
                        <p className='text-[8px] font-black text-zinc-400 uppercase'>
                          {item.time.split(' ')[1]}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-black text-zinc-800'>
                          {item.title}
                        </p>
                        <Badge
                          variant='secondary'
                          className='text-[9px] font-bold uppercase mt-1 bg-zinc-50'
                        >
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <span className='text-[10px] font-bold text-green-600 uppercase'>
                        {item.status}
                      </span>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 rounded-full'
                      >
                        <Share2 size={14} className='text-zinc-400' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: DISCOVERY & TICKETS --- */}
        <div className='space-y-6'>
          <Card className='rounded-3xl bg-zinc-50 border-2 border-dashed border-zinc-200'>
            <CardHeader>
              <CardTitle className='text-sm font-black flex items-center gap-2 uppercase tracking-tighter'>
                <Ticket size={18} className='text-zinc-500' /> My Passes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='bg-white p-4 rounded-2xl border shadow-sm relative overflow-hidden group cursor-pointer'>
                <div className='absolute right-0 top-0 h-full w-1 bg-orange-500' />
                <p className='text-[10px] font-black text-zinc-400 uppercase'>
                  QR TICKET
                </p>
                <p className='text-sm font-bold mt-1'>Leader's Summit 2026</p>
                <div className='mt-4 flex justify-between items-center'>
                  <div className='h-10 w-10 bg-zinc-100 rounded-lg' />{' '}
                  {/* QR Placeholder */}
                  <Button
                    size='sm'
                    variant='outline'
                    className='text-[10px] font-black h-7'
                  >
                    View Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='rounded-3xl border-none shadow-sm'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-black uppercase tracking-tighter'>
                Explore Programs
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {[
                { name: 'Membership Class', color: 'bg-blue-500' },
                { name: 'Baptism Prep', color: 'bg-cyan-500' },
                { name: 'Marriage Seminar', color: 'bg-rose-500' },
              ].map((prog, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer border group'
                >
                  <div className='flex items-center gap-3'>
                    <div className={`w-2 h-2 rounded-full ${prog.color}`} />
                    <span className='text-xs font-bold'>{prog.name}</span>
                  </div>
                  <Plus
                    size={14}
                    className='text-zinc-300 group-hover:text-zinc-900 transition-colors'
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className='p-6 bg-zinc-900 rounded-3xl text-white'>
            <p className='text-[10px] font-black uppercase tracking-widest text-zinc-500'>
              Quick Suggestion
            </p>
            <p className='text-sm font-medium mt-3 leading-relaxed'>
              Based on your interest in{' '}
              <span className='text-blue-400'>Technology</span>, you might enjoy
              the "Digital Ministry Workshop" next month.
            </p>
            <Button
              variant='link'
              className='p-0 text-blue-400 text-xs font-black mt-4 h-auto'
            >
              Remind Me Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
