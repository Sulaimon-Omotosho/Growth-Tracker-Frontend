'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Trophy,
  ShieldAlert,
  MapPinned,
  Building2,
  TrendingUp,
  PieChart,
  MoreVertical,
  Users2,
  History,
  Megaphone,
  FileText,
  Send,
  Globe2,
  Crown,
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { CreateAnnouncementForm } from '../forms/AnnouncementForm'
import { useState } from 'react'

export default function DistrictHub({ leadership }: { leadership: any[] }) {
  const [selectedDistrictId, setSelectedDistrictId] = useState(
    leadership?.[0]?.id || '',
  )
  const activeDistrict = leadership.find((d) => d.id === selectedDistrictId)

  const districtStats = {
    name: 'Greater Lagos District',
    communities: 6,
    totalCells: 184,
    totalSouls: 2450,
    conversionRate: '12%',
  }

  const communities = [
    {
      name: 'Island Community',
      lead: 'Pastor A.',
      cells: 42,
      health: 92,
      trend: 'up',
    },
    {
      name: 'Mainland North',
      lead: 'Pastor B.',
      cells: 55,
      health: 88,
      trend: 'up',
    },
    {
      name: 'Suburban West',
      lead: 'Pastor C.',
      cells: 30,
      health: 64,
      trend: 'down',
    },
  ]

  return (
    <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- SECTION 1: DISTRICT POWER METRICS --- */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='bg-indigo-700 text-white p-6 relative overflow-hidden shadow-xl'>
          <div className='relative z-10'>
            <p className='text-xs font-bold text-indigo-200 uppercase tracking-widest'>
              District Population
            </p>
            <h2 className='text-4xl font-bold mt-2'>
              {districtStats.totalSouls}
            </h2>
            <p className='text-xs mt-2 text-indigo-100 flex items-center gap-1'>
              <TrendingUp size={14} /> +210 this month
            </p>
          </div>
          <Building2 className='absolute -right-4 -bottom-4 text-indigo-600 w-32 h-32 opacity-50' />
        </Card>

        <Card className='p-6 flex flex-col justify-center border-t-4 border-t-indigo-500'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-xs font-bold text-muted-foreground uppercase'>
                Total Cell Count
              </p>
              <h3 className='text-3xl font-bold mt-1'>
                {districtStats.totalCells}
              </h3>
            </div>
            <Badge className='bg-indigo-100 text-indigo-700'>
              Scale: Global
            </Badge>
          </div>
          <div className='mt-4 flex gap-1'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= 5 ? 'bg-indigo-500' : 'bg-zinc-200'}`}
              />
            ))}
          </div>
          <p className='text-[10px] text-muted-foreground mt-2 font-medium'>
            92% of District Jubilee Target (200)
          </p>
        </Card>

        <Card className='p-6 flex flex-col justify-center bg-zinc-50 border-dashed border-2'>
          <p className='text-xs font-bold text-muted-foreground uppercase'>
            Evangelism Effectiveness
          </p>
          <h3 className='text-3xl font-bold mt-1'>
            {districtStats.conversionRate}
          </h3>
          <p className='text-[10px] text-green-600 font-bold mt-2 flex items-center gap-1'>
            <Crown size={12} /> Outperforming Regional Average
          </p>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- SECTION 2: LEFT COLUMN (Vision Casting & Performance) --- */}
        <div className='lg:col-span-2 space-y-6'>
          <Tabs defaultValue='announcement' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-4 bg-indigo-50'>
              <TabsTrigger
                value='announcement'
                className='gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white'
              >
                <Megaphone size={16} /> District Decree
              </TabsTrigger>
              <TabsTrigger
                value='report'
                className='gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white'
              >
                <Globe2 size={16} /> District Data View
              </TabsTrigger>
            </TabsList>

            <TabsContent value='announcement'>
              <Card className='border-indigo-200'>
                <CardHeader>
                  <CardTitle className='text-md text-indigo-700 flex items-center justify-between font-black uppercase tracking-tight'>
                    <div className='gap-2 flex'>
                      <Send size={18} /> Global Communication
                    </div>
                    {leadership.length > 1 && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-muted-foreground'>
                          Select Cell to Message:
                        </label>
                        <select
                          value={selectedDistrictId}
                          onChange={(e) =>
                            setSelectedDistrictId(e.target.value)
                          }
                          className='w-full md:w-64 p-2 rounded-lg border bg-white dark:bg-zinc-800 text-sm'
                        >
                          {leadership.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Send a message to all 6 Communities and 184 Cells.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* <Input
                    placeholder='Decree/Policy Title...'
                    className='border-indigo-100 focus:ring-indigo-600'
                  />
                  <textarea
                    className='flex min-h-32 w-full rounded-md border border-indigo-100 bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600 outline-none'
                    placeholder='Describe the new vision or administrative change...'
                  />
                  <Button className='w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold h-12'>
                    Execute District-Wide Broadcast
                  </Button> */}
                  <CreateAnnouncementForm
                    scope='DISTRICT'
                    targetId={selectedDistrictId}
                    buttonName='Execute District-Wide Broadcast'
                    placeholder='Policy Title ...'
                    TA_Placeholder='Announcement ...'
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='report'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-md flex items-center gap-2'>
                    <FileText size={18} /> Master District Log
                  </CardTitle>
                  <CardDescription>
                    Final aggregated metrics for the current spiritual year.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='p-4 bg-zinc-50 rounded-2xl border text-center'>
                      <p className='text-[10px] font-bold text-muted-foreground uppercase mb-1'>
                        Total Members
                      </p>
                      <p className='text-2xl font-black'>2,450</p>
                    </div>
                    <div className='p-4 bg-zinc-50 rounded-2xl border text-center'>
                      <p className='text-[10px] font-bold text-muted-foreground uppercase mb-1'>
                        Leader Capacity
                      </p>
                      <p className='text-2xl font-black text-indigo-600'>84%</p>
                    </div>
                  </div>
                  <Button variant='outline' className='w-full gap-2'>
                    <History size={16} /> Download Annual Report PDF
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className='rounded-3xl shadow-sm overflow-hidden'>
            <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
              <CardTitle className='text-lg font-bold'>
                Community Management
              </CardTitle>
              <Button
                variant='outline'
                size='sm'
                className='gap-2 text-xs border-indigo-200 text-indigo-700'
              >
                <PieChart size={14} /> Resource Allocation
              </Button>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='divide-y'>
                {communities.map((comm, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between p-6 hover:bg-zinc-50/80 transition-colors'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md'>
                        {comm.name[0]}
                      </div>
                      <div>
                        <p className='font-black text-sm uppercase tracking-tight'>
                          {comm.name}
                        </p>
                        <p className='text-[11px] text-muted-foreground font-medium'>
                          Lead: {comm.lead} • {comm.cells} Cells
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-8'>
                      <div className='text-right'>
                        <p className='text-[10px] uppercase text-muted-foreground font-bold'>
                          Health Index
                        </p>
                        <p
                          className={`text-lg font-black ${comm.health < 70 ? 'text-red-500' : 'text-zinc-900'}`}
                        >
                          {comm.health}%
                        </p>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                      >
                        <MoreVertical size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- SECTION 3: RIGHT COLUMN (Elite Performance & Risk) --- */}
        <div className='space-y-6'>
          <Card className='bg-amber-50/50 border-amber-200 border-2'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-bold flex items-center gap-2 text-amber-700 uppercase'>
                <Trophy size={16} /> District All-Stars
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex justify-between items-center group cursor-pointer hover:border-amber-400 transition-colors'>
                <div>
                  <p className='text-xs font-bold'>Cell Sinai</p>
                  <p className='text-[10px] text-muted-foreground'>
                    Mainland North • Elite Growth
                  </p>
                </div>
                <Badge className='bg-amber-500 text-white border-none'>
                  98% Att.
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className='border-red-100 bg-white'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-bold flex items-center gap-2 text-red-600'>
                <ShieldAlert size={16} /> System Weak Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='p-4 border border-red-50 rounded-2xl bg-red-50/30'>
                <p className='text-xs font-bold text-red-900'>
                  Suburban West Territory
                </p>
                <p className='text-[11px] text-red-700/70 mt-1 italic'>
                  3 Communities reporting leader burnout.
                </p>
                <Button
                  variant='destructive'
                  className='w-full mt-4 h-8 text-[10px] font-bold uppercase tracking-wider'
                >
                  Review Pipeline
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className='grid grid-cols-2 gap-4'>
            <Button
              variant='outline'
              className='h-24 flex-col gap-2 rounded-3xl border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all'
            >
              <MapPinned size={24} className='text-indigo-600' />
              <span className='text-[10px] font-bold uppercase tracking-tighter text-zinc-600'>
                Territory Review
              </span>
            </Button>
            <Button
              variant='outline'
              className='h-24 flex-col gap-2 rounded-3xl border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all'
            >
              <Users2 size={24} className='text-indigo-600' />
              <span className='text-[10px] font-bold uppercase tracking-tighter text-zinc-600'>
                Leader Training
              </span>
            </Button>
          </div>

          <Button className='w-full h-16 bg-zinc-900 hover:bg-black text-white gap-3 rounded-2xl group transition-all'>
            <History
              size={20}
              className='group-hover:rotate-[-45deg] transition-transform'
            />
            <span className='font-bold uppercase text-xs tracking-widest'>
              Reports Archive
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
