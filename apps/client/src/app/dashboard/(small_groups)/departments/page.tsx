'use client'

import React, { useState } from 'react'
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
  Mail,
} from 'lucide-react'
import { useMyDepartments } from '@/hooks/get-church'
import { DepartmentSkeleton } from '@/components/skeletons/DepartmentSkeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ReportDialog,
  RosterDialog,
} from '@/components/dashboard/RoasterAndReport'

export default function DepartmentMemberHub() {
  const { data: myDepartments, isLoading, isError } = useMyDepartments()
  // console.log('Departments Data:', myDepartments)
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0)

  if (isLoading) return <DepartmentSkeleton />
  if (isError || !myDepartments || myDepartments.length === 0) {
    return (
      <div className='p-10 text-center font-bold'>
        No department data found.
      </div>
    )
  }

  const currentDept = myDepartments[selectedDeptIndex]

  // Mock state for multiple departments
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
    <div className='max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20 mt-2'>
      {/* ---  DEPARTMENT SWITCHER & ROLE --- */}
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
                {myDepartments?.length} Active Units
              </Badge>
            </div>
            <div className='flex items-center gap-2 mt-1'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='flex items-center gap-2 cursor-pointer group'>
                    <span className='text-sm font-bold text-blue-600'>
                      {currentDept?.name}
                    </span>
                    {myDepartments.length > 1 && (
                      <ChevronDown
                        size={14}
                        className='text-zinc-400 group-hover:text-blue-600 transition-colors'
                      />
                    )}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align='start'
                  className='rounded-xl border-none shadow-xl bg-white p-2'
                >
                  {myDepartments.map((dept, index) => (
                    <DropdownMenuItem
                      key={dept.id}
                      onClick={() => setSelectedDeptIndex(index)}
                      className={`rounded-lg cursor-pointer font-bold text-xs px-4 py-2 ${
                        index === selectedDeptIndex
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-zinc-600'
                      }`}
                    >
                      {dept.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <span className='text-zinc-300 mx-1'>•</span>
              <span className='text-xs text-muted-foreground font-medium'>
                Member
              </span>
            </div>
          </div>
        </div>

        <div className='flex gap-2'>
          <RosterDialog
            deptName={currentDept?.name || ''}
            members={currentDept?.users || []} // Assuming users are returned in the dept data
            trigger={
              <Button
                variant='outline'
                className='rounded-xl font-bold text-xs h-10'
              >
                View My Roster
              </Button>
            }
          />

          <ReportDialog
            deptName={currentDept?.name || ''}
            trigger={
              <Button className='bg-zinc-900 rounded-xl font-bold text-xs h-10'>
                Submit Report
              </Button>
            }
          />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- ASSIGNMENTS --- */}
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

        {/* --- DEPARTMENTAL INTEL --- */}
        <div className='space-y-6'>
          <Card className='rounded-3xl shadow-sm border-none bg-blue-600 text-white overflow-hidden relative'>
            <div className='absolute right-0 top-0 p-4 opacity-20'>
              <Briefcase size={64} />
            </div>
            <CardContent className='p-6'>
              <p className='text-[10px] font-black uppercase tracking-widest opacity-70'>
                Description
              </p>
              <h3 className='text-sm font-bold mt-2 leading-tight'>
                {currentDept?.description || 'Active department unit focus.'}
              </h3>
              <div className='mt-6 space-y-2'>
                <div className='flex justify-between text-[10px] font-bold uppercase'>
                  <span>Active Members</span>
                  <span>{currentDept?._count?.members || 0}</span>
                </div>
                <Progress value={100} className='h-1.5 bg-blue-400/30' />
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

          {/* --- LEADER CARD --- */}
          <Card className='rounded-3xl shadow-sm border-none bg-zinc-900 text-white'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-12 w-12 border-2 border-zinc-800 shadow-xl'>
                  <AvatarImage src={currentDept?.leader?.image} />
                  <AvatarFallback className='bg-zinc-800 text-xs'>
                    {currentDept?.leader?.firstName?.[0]}
                    {currentDept?.leader?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-xs font-black uppercase tracking-tighter text-zinc-500'>
                    Unit Leader
                  </p>
                  <p className='text-sm font-bold'>
                    {currentDept?.leader?.firstName}{' '}
                    {currentDept?.leader?.lastName}
                  </p>
                </div>
              </div>
              <a href={`mailto:${currentDept?.email}`}>
                <Button
                  variant='outline'
                  className='w-full mt-6 rounded-xl border-zinc-700 bg-transparent hover:bg-zinc-500 text-xs font-bold h-11 border-2 gap-2'
                >
                  <Mail size={14} /> Message Lead
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
