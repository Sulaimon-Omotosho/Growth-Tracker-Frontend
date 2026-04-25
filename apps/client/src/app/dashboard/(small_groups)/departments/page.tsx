'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users2,
  CalendarCheck,
  ChevronDown,
  Layers,
  ArrowRight,
} from 'lucide-react'

export default function DepartmentMemberHub() {
  // Mock state for multiple departments
  const departments = [
    {
      id: 1,
      name: 'Media & Tech',
      role: 'Camera Operator',
      color: 'bg-blue-600',
    },
    {
      id: 2,
      name: 'Music & Choir',
      role: 'Tenor Vocalist',
      color: 'bg-purple-600',
    },
  ]

  const activeTasks = [
    {
      id: 1,
      task: 'Finalize Easter Video Edit',
      deadline: 'Today, 5PM',
      priority: 'High',
    },
    {
      id: 2,
      task: 'Review New Worship Setlist',
      deadline: 'Thursday',
      priority: 'Medium',
    },
  ]

  return (
    <div className='max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- 1. DEPARTMENT SWITCHER & ROLE --- */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='p-3 bg-zinc-900 rounded-2xl text-white shadow-xl'>
            <Layers size={24} />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-2xl font-black tracking-tight'>
                Department Workspace
              </h1>
              <Badge
                variant='secondary'
                className='rounded-full text-[10px] bg-zinc-100 uppercase font-bold'
              >
                {departments.length} Active Units
              </Badge>
            </div>
            <div className='flex items-center gap-2 mt-1 cursor-pointer group'>
              <span className='text-sm font-bold text-blue-600'>
                {departments[0].name}
              </span>
              <ChevronDown
                size={14}
                className='text-zinc-400 group-hover:text-blue-600 transition-colors'
              />
              <span className='text-zinc-300 mx-1'>•</span>
              <span className='text-xs text-muted-foreground font-medium'>
                {departments[0].role}
              </span>
            </div>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button
            variant='outline'
            className='rounded-xl font-bold text-xs h-10'
          >
            View My Roster
          </Button>
          <Button className='bg-zinc-900 rounded-xl font-bold text-xs h-10'>
            Submit Report
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- 2. MY ASSIGNMENTS (THE "DO" LIST) --- */}
        <Card className='lg:col-span-2 rounded-3xl border-none shadow-sm'>
          <CardHeader className='border-b pb-4'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-black flex items-center gap-2 uppercase tracking-tighter'>
                <CalendarCheck size={20} className='text-blue-600' /> My
                Assignments
              </CardTitle>
              <span className='text-[10px] font-bold text-zinc-400 uppercase'>
                This Week
              </span>
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              {activeTasks.map((item) => (
                <div
                  key={item.id}
                  className='p-5 flex items-center justify-between group hover:bg-zinc-50/50 transition-colors'
                >
                  <div className='flex items-start gap-4'>
                    <div
                      className={`mt-1 h-5 w-5 rounded-md border-2 flex items-center justify-center ${item.priority === 'High' ? 'border-orange-200 bg-orange-50' : 'border-zinc-200'}`}
                    >
                      {item.priority === 'High' && (
                        <AlertCircle size={12} className='text-orange-500' />
                      )}
                    </div>
                    <div>
                      <p className='text-sm font-black'>{item.task}</p>
                      <div className='flex items-center gap-3 mt-1'>
                        <span className='text-[10px] flex items-center gap-1 font-bold text-zinc-400 uppercase'>
                          <Clock size={10} /> {item.deadline}
                        </span>
                        <Badge
                          variant='outline'
                          className='text-[9px] uppercase font-black py-0'
                        >
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='opacity-0 group-hover:opacity-100 transition-opacity rounded-lg h-8 px-3 font-bold text-xs text-blue-600'
                  >
                    Complete
                  </Button>
                </div>
              ))}
            </div>
            <div className='p-4 bg-zinc-50/50 rounded-b-3xl text-center'>
              <p className='text-[10px] font-bold text-zinc-400 uppercase cursor-pointer hover:text-zinc-600 transition-colors'>
                View Past Assignments
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- 3. DEPARTMENTAL INTEL --- */}
        <div className='space-y-6'>
          <Card className='rounded-3xl shadow-sm border-none bg-blue-600 text-white overflow-hidden relative'>
            <div className='absolute right-0 top-0 p-4 opacity-20'>
              <Briefcase size={64} />
            </div>
            <CardContent className='p-6'>
              <p className='text-[10px] font-black uppercase tracking-widest opacity-70'>
                Current Unit Focus
              </p>
              <h3 className='text-xl font-black mt-2 leading-tight'>
                Easter Stream Reliability Audit
              </h3>
              <div className='mt-6 space-y-2'>
                <div className='flex justify-between text-[10px] font-bold uppercase'>
                  <span>Unit Progress</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className='h-1.5 bg-blue-400/30' />
              </div>
            </CardContent>
          </Card>

          <Card className='rounded-3xl shadow-sm border-none'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-black uppercase tracking-widest text-zinc-400'>
                Handbooks & SOPs
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              {[
                { title: 'Media Setup Guide', type: 'PDF' },
                { title: 'Emergency Protocol', type: 'DOC' },
              ].map((doc, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group'
                >
                  <div className='flex items-center gap-3'>
                    <FileText size={16} className='text-zinc-400' />
                    <span className='text-xs font-bold text-zinc-700'>
                      {doc.title}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className='text-zinc-300 group-hover:translate-x-1 transition-transform'
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='rounded-3xl shadow-sm border-none bg-zinc-900 text-white'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center'>
                  <Users2 size={18} className='text-zinc-400' />
                </div>
                <div>
                  <p className='text-xs font-black uppercase tracking-tighter'>
                    Unit Leader
                  </p>
                  <p className='text-sm font-bold'>David Oladapo</p>
                </div>
              </div>
              <Button
                variant='outline'
                className='w-full mt-6 rounded-xl border-zinc-700 bg-transparent hover:bg-zinc-800 text-xs font-bold h-11 border-2'
              >
                Message Lead
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
