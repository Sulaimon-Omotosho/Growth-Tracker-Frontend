'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  UserPlus,
  PhoneCall,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  MoreHorizontal,
  Megaphone,
  FileText,
  Mail,
  Check,
  X,
  Send,
  Users,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import { CreateAnnouncementForm } from '../forms/AnnouncementForm'
import { LeadershipProfile } from '@repo/types'

export default function CellHub({ leadership }: { leadership: any[] }) {
  const [selectedCellId, setSelectedCellId] = useState(
    leadership?.[0]?.id || '',
  )
  const activeCell = leadership.find((c) => c.id === selectedCellId)

  // 1. Mock Data (Ideally from useQuery)
  const [applications, setApplications] = useState([
    { id: '1', name: 'Michael Chen', date: '2h ago', source: 'Website' },
  ])
  const cellData = {
    name: 'Bethel Alpha',
    growthTarget: 75,
    members: 12,
    newConvertThisMonth: 2,
    lastMeetingAttendance: 10,
    missingMembers: [
      { id: '1', name: 'John Doe', lastSeen: '2 weeks ago', phone: '+234...' },
      {
        id: '2',
        name: 'Sarah Smith',
        lastSeen: '3 weeks ago',
        phone: '+234...',
      },
    ],
  }

  return (
    <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- SECTION 1: TOP METRICS --- */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='bg-blue-600 text-white border-none shadow-md'>
          <CardContent className='p-6'>
            <p className='text-blue-100 text-sm font-medium'>
              Monthly Growth Target
            </p>
            <div className='flex items-end justify-between mt-2'>
              <h3 className='text-3xl font-bold'>{cellData.growthTarget}%</h3>
              <ArrowUpRight className='mb-1 opacity-80' />
            </div>
            <Progress
              value={cellData.growthTarget}
              className='h-2 mt-4 bg-blue-400'
            />
          </CardContent>
        </Card>

        <Card className='flex items-center justify-between p-6'>
          <div>
            <p className='text-sm text-muted-foreground'>Active Members</p>
            <h3 className='text-3xl font-bold'>{cellData.members}</h3>
          </div>
          <div className='p-3 bg-green-100 rounded-full text-green-600'>
            <UserPlus size={24} />
          </div>
        </Card>

        <Card className='flex items-center justify-between p-6'>
          <div>
            <p className='text-sm text-muted-foreground'>Avg. Attendance</p>
            <h3 className='text-3xl font-bold'>
              {cellData.lastMeetingAttendance}
            </h3>
          </div>
          <div className='p-3 bg-purple-100 rounded-full text-purple-600'>
            <CheckCircle2 size={24} />
          </div>
        </Card>
      </div>

      {/* --- SECTION 2: CRITICAL ACTIONS & PIPELINE --- */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Urgent Follow-ups */}
        <Card className='lg:col-span-2 rounded-2xl'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-lg font-bold flex items-center gap-2'>
              <PhoneCall size={20} className='text-red-500' />
              Urgent Follow-ups
            </CardTitle>
            <Badge variant='destructive'>Action Required</Badge>
          </CardHeader>
          <CardContent className='space-y-4'>
            {cellData.missingMembers.map((member) => (
              <div
                key={member.id}
                className='flex items-center justify-between p-4 border rounded-xl hover:bg-zinc-50 transition-colors'
              >
                <div>
                  <p className='font-semibold text-sm'>{member.name}</p>
                  <p className='text-xs text-muted-foreground italic'>
                    Missing for {member.lastSeen}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <Button size='sm' variant='outline' className='h-8 w-8 p-0'>
                    <MoreHorizontal size={14} />
                  </Button>
                  <Button size='sm' className='h-8 gap-2 bg-zinc-900'>
                    <PhoneCall size={14} /> Call
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Next Meeting Card */}
        <Card className='rounded-2xl border-dashed border-2 flex flex-col justify-center'>
          <CardContent className='p-6 flex flex-col items-center text-center'>
            <div className='p-3 bg-zinc-100 rounded-xl mb-4'>
              <Calendar className='text-zinc-600' />
            </div>
            <h4 className='font-bold text-sm'>Next Cell Meeting</h4>
            <p className='text-xs text-muted-foreground mt-1'>
              Friday, Oct 24th • 6:00 PM
            </p>
            <Button className='w-full mt-4 bg-blue-600 hover:bg-blue-700'>
              Log Attendance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* --- SECTION 3: MANAGEMENT TOOLS (TABS) --- */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Col: Announcements & Reports */}
        <div className='lg:col-span-2'>
          <Tabs defaultValue='announcement' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-4'>
              <TabsTrigger value='announcement' className='gap-2'>
                <Megaphone size={16} /> Broadcast
              </TabsTrigger>
              <TabsTrigger value='report' className='gap-2'>
                <FileText size={16} /> Weekly Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value='announcement'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-md text-blue-600 flex items-center justify-between'>
                    <div className='gap-2 flex'>
                      <Send size={18} /> Send Announcement
                    </div>
                    {leadership.length > 1 && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-muted-foreground'>
                          Select Cell to Message:
                        </label>
                        <select
                          value={selectedCellId}
                          onChange={(e) => setSelectedCellId(e.target.value)}
                          className='w-full md:w-64 p-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm'
                        >
                          {leadership.map((cell) => (
                            <option key={cell.id} value={cell.id}>
                              {cell.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* <Input placeholder='Title...' />
                  <textarea
                    className='flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                    placeholder='Broadcast message to all members...'
                  /> */}
                  <CreateAnnouncementForm
                    scope='CELL'
                    targetId={selectedCellId}
                    buttonName='Post Announcement'
                    placeholder='Title ...'
                    TA_Placeholder='Announcement to members ...'
                  />
                  {/* <Button className='w-full bg-zinc-900'>
                    Post Announcement
                  </Button> */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='report'>
              <Card className='border-orange-200 bg-orange-50/20'>
                <CardHeader>
                  <CardTitle className='text-md flex items-center gap-2'>
                    <FileText size={18} className='text-orange-600' /> Submit
                    Report
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <Input type='number' placeholder='Attendance' />
                    <Input type='number' placeholder='First Timers' />
                  </div>
                  <textarea
                    className='flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                    placeholder='Highlights/Testimonies...'
                  />
                  <Button className='w-full bg-orange-600 hover:bg-orange-700'>
                    Submit to Zone
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Col: Applications & Invites */}
        <div className='space-y-6'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm uppercase text-muted-foreground'>
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applications.map((app) => (
                <div
                  key={app.id}
                  className='flex items-center justify-between gap-2 bg-zinc-50 p-2 rounded-lg border'
                >
                  <span className='text-xs font-medium truncate'>
                    {app.name}
                  </span>
                  <div className='flex gap-1'>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='h-6 w-6 text-red-500'
                    >
                      <X size={14} />
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='h-6 w-6 text-green-500'
                    >
                      <Check size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm uppercase text-muted-foreground'>
                Invite New Member
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Input placeholder='Email/Phone' className='h-8 text-xs' />
              <Button size='sm' className='w-full h-8 bg-blue-600 text-xs'>
                Send Invite
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- SECTION 4: RECENT ACTIVITY --- */}
      <Card>
        <CardHeader>
          <CardTitle className='text-md flex items-center gap-2'>
            <Users size={18} /> Recent History
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 text-xs'>
          <div className='flex justify-between border-b pb-2'>
            <span>Weekly Report - Oct Week 2</span>
            <Badge
              variant='outline'
              className='text-green-600 bg-green-50 border-green-200'
            >
              Submitted
            </Badge>
          </div>
          <div className='flex justify-between border-b pb-2 text-muted-foreground'>
            <span>Invitation sent to Michael Chen</span>
            <span>Yesterday</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
