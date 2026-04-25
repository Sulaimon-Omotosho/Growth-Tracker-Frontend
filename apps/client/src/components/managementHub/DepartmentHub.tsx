'use client'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  CalendarCheck,
  Package,
  AlertCircle,
  Clock,
  CheckSquare,
  MessageSquare,
  UserPlus,
  ChevronRight,
  TrendingUp,
  Send,
  ClipboardList,
} from 'lucide-react'
import { useState } from 'react'
import { CreateAnnouncementForm } from '../forms/AnnouncementForm'

export default function DepartmentHub({ leadership }: { leadership: any[] }) {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(
    leadership?.[0]?.id || '',
  )
  const activeDepartment = leadership.find((c) => c.id === selectedDepartmentId)

  const deptStats = {
    name: 'Technical & Media',
    totalVolunteers: 45,
    staffingLevel: 85,
    activeTasks: 12,
  }

  const teams = [
    {
      name: 'Sound Engineering',
      lead: 'David O.',
      members: 8,
      status: 'Ready',
    },
    {
      name: 'Visuals & Projection',
      lead: 'Sarah K.',
      members: 12,
      status: 'Short-staffed',
    },
    {
      name: 'Livestream/Media',
      lead: 'James L.',
      members: 15,
      status: 'Ready',
    },
  ]

  const pendingTasks = [
    { id: 1, task: 'Projector Maintenance', priority: 'High', due: '2 days' },
    { id: 2, task: 'Mixer firmware update', priority: 'Medium', due: '4 days' },
  ]

  return (
    <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- SECTION 1: DEPARTMENTAL VITAL SIGNS --- */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='p-6 border-t-4 border-t-blue-600 shadow-sm'>
          <p className='text-xs font-bold text-muted-foreground uppercase'>
            Total Volunteers
          </p>
          <div className='flex items-center justify-between mt-2'>
            <h3 className='text-3xl font-bold'>{deptStats.totalVolunteers}</h3>
            <Users className='text-blue-600 opacity-20' size={24} />
          </div>
        </Card>

        <Card className='p-6 border-t-4 border-t-orange-500 shadow-sm'>
          <p className='text-xs font-bold text-muted-foreground uppercase'>
            Rota Coverage
          </p>
          <div className='flex items-center justify-between mt-2'>
            <h3 className='text-3xl font-bold'>{deptStats.staffingLevel}%</h3>
            <CalendarCheck className='text-orange-500 opacity-20' size={24} />
          </div>
          <Progress value={deptStats.staffingLevel} className='h-1.5 mt-3' />
        </Card>

        <Card className='p-6 border-t-4 border-t-green-500 shadow-sm'>
          <p className='text-xs font-bold text-muted-foreground uppercase'>
            Active Tasks
          </p>
          <h3 className='text-3xl font-bold mt-2'>{deptStats.activeTasks}</h3>
        </Card>

        <Card className='p-6 border-t-4 border-t-purple-600 shadow-sm'>
          <p className='text-xs font-bold text-muted-foreground uppercase'>
            Unit Health
          </p>
          <div className='flex items-center gap-2 mt-2'>
            <h3 className='text-3xl font-bold text-zinc-800'>Solid</h3>
            <TrendingUp size={20} className='text-green-500' />
          </div>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- SECTION 2: OPERATIONS & TEAMS --- */}
        <div className='lg:col-span-2 space-y-6'>
          <Tabs defaultValue='rota' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-4'>
              <TabsTrigger value='rota' className='gap-2'>
                <Clock size={16} /> Service Readiness
              </TabsTrigger>
              <TabsTrigger value='admin' className='gap-2'>
                <ClipboardList size={16} /> Dept. Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value='rota'>
              <Card className='border-orange-200 bg-orange-50/5'>
                <CardHeader>
                  <CardTitle className='text-md text-orange-700 flex items-center gap-2'>
                    <AlertCircle size={18} /> Critical Staffing Gaps
                  </CardTitle>
                  <CardDescription>
                    Upcoming: Mid-week Service (Wednesday)
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex justify-between items-center p-3 bg-white border border-orange-200 rounded-xl'>
                      <span className='text-sm font-medium'>
                        Camera 2 Operator
                      </span>
                      <Button size='sm' className='bg-orange-600 text-xs h-7'>
                        Assign Now
                      </Button>
                    </div>
                    <div className='flex justify-between items-center p-3 bg-white border border-orange-200 rounded-xl'>
                      <span className='text-sm font-medium'>
                        Audio Assistant
                      </span>
                      <Button size='sm' className='bg-orange-600 text-xs h-7'>
                        Assign Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='admin'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-md flex items-center justify-between'>
                    <div className='gap-2 flex'>
                      <MessageSquare size={18} className='text-blue-600' />
                      Departmental Broadcast
                    </div>
                    {leadership.length > 1 && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-muted-foreground'>
                          Select Department to Message:
                        </label>
                        <select
                          value={selectedDepartmentId}
                          onChange={(e) =>
                            setSelectedDepartmentId(e.target.value)
                          }
                          className='w-full md:w-64 p-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm'
                        >
                          {leadership.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <CreateAnnouncementForm
                    scope='DEPARTMENT'
                    targetId={selectedDepartmentId}
                    buttonName='Dispatch Message'
                    placeholder='Title ...'
                    TA_Placeholder='Message all volunteers...'
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className='rounded-2xl'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle className='text-lg'>Sub-Team Performance</CardTitle>
                <CardDescription>
                  Real-time status of technical units
                </CardDescription>
              </div>
              <Button size='sm' variant='outline' className='gap-2 text-xs'>
                <UserPlus size={14} /> Recruitment
              </Button>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {teams.map((team, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between p-4 border rounded-2xl hover:bg-zinc-50 transition-all'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center'>
                        <Users size={18} className='text-zinc-600' />
                      </div>
                      <div>
                        <p className='font-bold text-sm'>{team.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          Lead: {team.lead} • {team.members} members
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        team.status === 'Short-staffed'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {team.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- SECTION 3: MAINTENANCE & LOGS --- */}
        <div className='space-y-6'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-bold flex items-center gap-2 text-blue-600'>
                <CheckSquare size={16} /> Maintenance Log
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className='p-3 border rounded-xl bg-zinc-50/50 flex flex-col gap-1'
                >
                  <div className='flex justify-between items-start'>
                    <span className='text-xs font-bold'>{task.task}</span>
                    <Badge
                      className='text-[9px] h-4'
                      variant={
                        task.priority === 'High' ? 'destructive' : 'secondary'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <span className='text-[10px] text-muted-foreground'>
                    Target: {task.due}
                  </span>
                </div>
              ))}
              <Button
                variant='link'
                className='w-full text-xs h-auto p-0 text-zinc-500'
              >
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          <Card className='border-red-100'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-bold flex items-center gap-2 text-red-500'>
                <AlertCircle size={16} /> Fault Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='p-3 border rounded-xl bg-red-50/20 border-red-100'>
                <p className='text-xs font-bold'>Wireless Mic (Ch 4)</p>
                <p className='text-[10px] text-red-600 mt-1'>
                  Signal dropping intermittently.
                </p>
                <Button
                  variant='link'
                  className='p-0 h-auto text-[10px] text-red-700 mt-2 font-bold'
                >
                  Mark as Repaired
                </Button>
              </div>
              <Button
                variant='outline'
                className='w-full mt-4 text-xs h-9 border-red-200 text-red-600 hover:bg-red-50'
              >
                Log Incident
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-zinc-900 text-white'>
            <CardContent className='p-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Package size={18} className='text-zinc-400' />
                <span className='text-sm font-bold'>Inventory Access</span>
              </div>
              <ChevronRight size={18} className='text-zinc-600' />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
