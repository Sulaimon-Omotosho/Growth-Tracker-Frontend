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
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Heart,
  BookOpen,
  UserPlus,
  Phone,
  ChevronRight,
  Sparkles,
  Share2,
} from 'lucide-react'

export default function UserCellPage() {
  const cellData = {
    name: 'Living Streams Cell',
    host: 'The Adebayos',
    address: '12 Victoria Island, Lagos',
    nextMeeting: 'Friday, April 24th',
    time: '6:30 PM',
    currentStudy: 'The Book of Acts: Part 4',
    memberCount: 12,
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24'>
      {/* --- SECTION 1: THE WELCOME MAT --- */}
      <div className='relative h-48 rounded-3xl bg-zinc-900 overflow-hidden flex items-center p-8 text-white shadow-2xl'>
        <div className='absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20' />
        <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-6'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <Badge className='bg-blue-500/20 text-blue-300 border-none px-2 py-0 text-[10px] font-bold'>
                YOUR FAMILY
              </Badge>
              <span className='text-[10px] text-zinc-400 font-bold uppercase tracking-widest'>
                District 4 • Zone B
              </span>
            </div>
            <h1 className='text-4xl font-black tracking-tighter'>
              {cellData.name}
            </h1>
            <p className='text-zinc-400 text-sm font-medium'>
              Home to {cellData.memberCount} brothers and sisters
            </p>
          </div>
          <div className='flex -space-x-3'>
            {[1, 2, 3, 4, 5].map((i) => (
              <Avatar key={i} className='border-4 border-zinc-900 w-12 h-12'>
                <AvatarFallback className='bg-zinc-800 text-xs'>
                  U{i}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className='w-12 h-12 rounded-full bg-blue-600 border-4 border-zinc-900 flex items-center justify-center text-xs font-bold'>
              +7
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* --- SECTION 2: NEXT MEETING (LOGISTICS) --- */}
        <Card className='md:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden'>
          <CardHeader className='bg-zinc-50/50 border-b pb-4'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-black flex items-center gap-2'>
                <Calendar size={20} className='text-blue-600' /> Next Fellowship
              </CardTitle>
              <Badge
                variant='outline'
                className='text-blue-600 border-blue-100 bg-blue-50/50'
              >
                Coming Up
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='p-2 bg-zinc-100 rounded-xl'>
                    <MapPin size={18} className='text-zinc-600' />
                  </div>
                  <div>
                    <p className='text-[10px] font-bold text-zinc-400 uppercase'>
                      Location
                    </p>
                    <p className='text-sm font-bold'>{cellData.host}</p>
                    <p className='text-xs text-muted-foreground'>
                      {cellData.address}
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='p-2 bg-zinc-100 rounded-xl'>
                    <Clock size={18} className='text-zinc-600' />
                  </div>
                  <div>
                    <p className='text-[10px] font-bold text-zinc-400 uppercase'>
                      Schedule
                    </p>
                    <p className='text-sm font-bold'>{cellData.nextMeeting}</p>
                    <p className='text-xs text-muted-foreground'>
                      Starts at {cellData.time}
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-zinc-50 rounded-2xl p-4 flex flex-col justify-between border'>
                <p className='text-[11px] font-bold text-zinc-500 uppercase flex items-center gap-1'>
                  <BookOpen size={14} /> Tonight's Study
                </p>
                <p className='text-lg font-black mt-2 leading-tight'>
                  {cellData.currentStudy}
                </p>
                <Button className='w-full mt-4 bg-zinc-900 rounded-xl text-xs h-9'>
                  Get Study Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- SECTION 3: QUICK ACTIONS --- */}
        <div className='space-y-4'>
          <Button className='w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100 gap-2'>
            <MessageCircle size={20} /> Prayer Requests
          </Button>
          <Button
            variant='outline'
            className='w-full h-14 rounded-2xl font-bold border-2 gap-2'
          >
            <Share2 size={20} /> Invite a Friend
          </Button>

          <Card className='bg-zinc-50 border-none rounded-2xl'>
            <CardContent className='p-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white rounded-lg shadow-sm text-green-600'>
                  <Phone size={16} />
                </div>
                <p className='text-xs font-bold'>Contact Leader</p>
              </div>
              <ChevronRight size={16} className='text-zinc-400' />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- SECTION 4: THE CELL WALL --- */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-4'>
          <h3 className='font-black text-sm uppercase tracking-widest text-zinc-400 pl-1'>
            Cell Updates
          </h3>
          {[
            {
              user: 'Sarah',
              action: 'shared a testimony',
              time: '2 hours ago',
              text: 'Finally got the job! God is good.',
            },
            {
              user: 'Leader David',
              action: 'posted an announcement',
              time: 'Yesterday',
              text: "Don't forget to bring a snack for our movie night!",
            },
          ].map((post, i) => (
            <Card
              key={i}
              className='rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow'
            >
              <CardContent className='p-5 space-y-3'>
                <div className='flex justify-between items-start'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback>{post.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-xs font-bold'>
                        {post.user}{' '}
                        <span className='font-normal text-muted-foreground'>
                          {post.action}
                        </span>
                      </p>
                      <p className='text-[10px] text-zinc-400'>{post.time}</p>
                    </div>
                  </div>
                  <Heart
                    size={16}
                    className='text-zinc-300 hover:text-rose-500 cursor-pointer'
                  />
                </div>
                <p className='text-sm text-zinc-600 leading-relaxed'>
                  {post.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- SECTION 5: SPIRITUAL MILESTONES --- */}
        <Card className='rounded-3xl border-none bg-linear-to-br from-zinc-50 to-white shadow-sm h-fit'>
          <CardHeader>
            <CardTitle className='text-sm font-black flex items-center gap-2'>
              <Sparkles size={18} className='text-orange-400' /> My Growth
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <div className='flex justify-between text-[10px] font-bold uppercase tracking-tighter'>
                <span className='text-zinc-400'>Monthly Attendance</span>
                <span>3/4 Weeks</span>
              </div>
              <Progress value={75} className='h-1.5' />
            </div>
            <div className='p-4 bg-orange-50 border border-orange-100 rounded-2xl'>
              <p className='text-[10px] font-black text-orange-700 uppercase'>
                Current Badge
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <div className='w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center text-orange-700'>
                  🏆
                </div>
                <p className='text-sm font-bold text-orange-900'>
                  Faithful Steward
                </p>
              </div>
            </div>
            <Button
              variant='link'
              className='w-full text-xs font-bold text-zinc-400 p-0'
            >
              View All Milestones
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
