// 'use client'

// import React from 'react'
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'
// import {
//   Globe,
//   TrendingUp,
//   ShieldAlert,
//   Zap,
//   Map,
//   ArrowRight,
//   UserCheck,
//   BarChart3,
//   Layers,
//   ChevronRight,
// } from 'lucide-react'
// import { Badge } from '../ui/badge'

// export default function CommunityHub() {
//   const communityStats = {
//     name: 'Lagos Island Community',
//     zonesCount: 4,
//     totalCells: 32,
//     totalSouls: 580,
//     retentionRate: '74%',
//   }

//   const zones = [
//     {
//       id: 'z1',
//       name: 'Zone East',
//       leader: 'Pastor Ade',
//       cells: 12,
//       performance: 94,
//       status: 'High Growth',
//     },
//     {
//       id: 'z2',
//       name: 'Zone West',
//       leader: 'Deaconess Mary',
//       cells: 6,
//       performance: 62,
//       status: 'Understaffed',
//     },
//     {
//       id: 'z3',
//       name: 'Zone North',
//       leader: 'Bro. Tunde',
//       cells: 8,
//       performance: 81,
//       status: 'Stable',
//     },
//     {
//       id: 'z4',
//       name: 'Zone South',
//       leader: 'Sis. Jane',
//       cells: 6,
//       performance: 78,
//       status: 'Stable',
//     },
//   ]

//   return (
//     <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
//       {/* --- SECTION 1: GLOBAL COMMUNITY VITAL SIGNS --- */}
//       <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
//         <Card className='bg-zinc-900 text-white p-6 md:col-span-2 relative overflow-hidden'>
//           <Globe className='absolute -right-4 -bottom-4 text-zinc-800 w-32 h-32' />
//           <div className='relative z-10'>
//             <p className='text-xs font-bold text-zinc-400 uppercase tracking-widest'>
//               Community Reach
//             </p>
//             <h2 className='text-4xl font-bold mt-2'>
//               {communityStats.totalSouls}
//             </h2>
//             <div className='flex items-center gap-2 mt-4 text-green-400 text-sm'>
//               <TrendingUp size={16} />
//               <span>+14% Growth this quarter</span>
//             </div>
//           </div>
//         </Card>

//         <Card className='p-6'>
//           <p className='text-xs font-bold text-muted-foreground uppercase'>
//             Zones / Cells
//           </p>
//           <h3 className='text-3xl font-bold mt-2'>
//             {communityStats.zonesCount} / {communityStats.totalCells}
//           </h3>
//           <p className='text-[10px] text-muted-foreground mt-2 font-medium'>
//             Target: 50 Cells by December
//           </p>
//         </Card>

//         <Card className='p-6'>
//           <p className='text-xs font-bold text-muted-foreground uppercase'>
//             Retention Rate
//           </p>
//           <h3 className='text-3xl font-bold mt-2'>
//             {communityStats.retentionRate}
//           </h3>
//           <Progress value={74} className='h-1.5 mt-4 bg-zinc-100' />
//         </Card>
//       </div>

//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
//         {/* --- SECTION 2: ZONAL LEADER PERFORMANCE --- */}
//         <Card className='lg:col-span-2 rounded-2xl'>
//           <CardHeader className='flex flex-row items-center justify-between'>
//             <div>
//               <CardTitle className='text-lg'>Zonal Performance</CardTitle>
//               <CardDescription>
//                 Managing the 4 leaders in your community
//               </CardDescription>
//             </div>
//             <Button
//               variant='ghost'
//               size='sm'
//               className='text-blue-600 gap-1 text-xs'
//             >
//               <BarChart3 size={14} /> Full Analytics
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className='space-y-3'>
//               {zones.map((zone) => (
//                 <div
//                   key={zone.id}
//                   className='flex items-center justify-between p-4 border rounded-2xl hover:border-zinc-300 transition-all'
//                 >
//                   <div className='flex items-center gap-4'>
//                     <div className='bg-zinc-100 p-2 rounded-lg'>
//                       <Layers className='text-zinc-500' size={18} />
//                     </div>
//                     <div>
//                       <p className='font-bold text-sm'>{zone.name}</p>
//                       <p className='text-[11px] text-muted-foreground'>
//                         HOD: {zone.leader} • {zone.cells} Cells
//                       </p>
//                     </div>
//                   </div>

//                   <div className='flex items-center gap-6'>
//                     <div className='text-right hidden sm:block'>
//                       <p className='text-[10px] font-bold text-muted-foreground uppercase'>
//                         KPI Score
//                       </p>
//                       <p
//                         className={`text-sm font-bold ${zone.performance < 70 ? 'text-orange-500' : 'text-zinc-900'}`}
//                       >
//                         {zone.performance}%
//                       </p>
//                     </div>
//                     <Badge
//                       variant={
//                         zone.performance < 70 ? 'destructive' : 'secondary'
//                       }
//                       className='text-[10px]'
//                     >
//                       {zone.status}
//                     </Badge>
//                     <ChevronRight size={18} className='text-zinc-300' />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* --- SECTION 3: COMMUNITY STRATEGY & "SMALL ATTENTION" TO CELLS --- */}
//         <div className='space-y-6'>
//           {/* Micro-Management (Small attention to cells) */}
//           <Card className='border-blue-100 bg-blue-50/20'>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-sm font-bold flex items-center gap-2'>
//                 <Zap size={16} className='text-blue-600' /> Critical Cell Alerts
//               </CardTitle>
//               <CardDescription className='text-[10px]'>
//                 Exceptional cases requiring community-level eyes
//               </CardDescription>
//             </CardHeader>
//             <CardContent className='space-y-3'>
//               <div className='text-xs p-3 bg-white border border-blue-100 rounded-xl shadow-sm'>
//                 <p className='font-bold'>Cell Olive Branch</p>
//                 <p className='text-muted-foreground text-[10px] mt-1'>
//                   Growth has stalled for 8 weeks despite Zonal intervention.
//                 </p>
//                 <Button
//                   variant='link'
//                   className='p-0 h-auto text-blue-600 text-[10px] mt-2'
//                 >
//                   Request Strategy Review
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Community Actions */}
//           <Card>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-sm font-bold flex items-center gap-2'>
//                 <ShieldAlert size={16} className='text-orange-600' /> Community
//                 Governance
//               </CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-2'>
//               <Button
//                 variant='outline'
//                 className='w-full justify-between text-xs h-10 px-4'
//               >
//                 <span>Zonal Leaders Monthly Sync</span>
//                 <ArrowRight size={14} className='text-zinc-400' />
//               </Button>
//               <Button
//                 variant='outline'
//                 className='w-full justify-between text-xs h-10 px-4'
//               >
//                 <span>Community Training Event</span>
//                 <ArrowRight size={14} className='text-zinc-400' />
//               </Button>
//               <Button
//                 variant='outline'
//                 className='w-full justify-between text-xs h-10 px-4'
//               >
//                 <span>Leader Re-assignment</span>
//                 <UserCheck size={14} className='text-zinc-400' />
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Territory Map Access */}
//           <Button className='w-full h-14 bg-zinc-900 gap-3 rounded-2xl'>
//             <Map size={20} />
//             <span>Community Territory Map</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

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
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Globe,
  TrendingUp,
  ShieldAlert,
  Zap,
  Map,
  ArrowRight,
  UserCheck,
  BarChart3,
  Layers,
  ChevronRight,
  Megaphone,
  FileText,
  Send,
  Target,
} from 'lucide-react'
import { Badge } from '../ui/badge'

export default function CommunityHub() {
  const communityStats = {
    name: 'Lagos Island Community',
    zonesCount: 4,
    totalCells: 32,
    totalSouls: 580,
    retentionRate: '74%',
  }

  const zones = [
    {
      id: 'z1',
      name: 'Zone East',
      leader: 'Pastor Ade',
      cells: 12,
      performance: 94,
      status: 'High Growth',
    },
    {
      id: 'z2',
      name: 'Zone West',
      leader: 'Deaconess Mary',
      cells: 6,
      performance: 62,
      status: 'Understaffed',
    },
    {
      id: 'z3',
      name: 'Zone North',
      leader: 'Bro. Tunde',
      cells: 8,
      performance: 81,
      status: 'Stable',
    },
    {
      id: 'z4',
      name: 'Zone South',
      leader: 'Sis. Jane',
      cells: 6,
      performance: 78,
      status: 'Stable',
    },
  ]

  return (
    <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- SECTION 1: GLOBAL COMMUNITY VITAL SIGNS --- */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='bg-zinc-900 text-white p-6 md:col-span-2 relative overflow-hidden'>
          <Globe className='absolute -right-4 -bottom-4 text-zinc-800 w-32 h-32 opacity-50' />
          <div className='relative z-10'>
            <p className='text-xs font-bold text-zinc-400 uppercase tracking-widest'>
              Community Reach
            </p>
            <h2 className='text-4xl font-bold mt-2'>
              {communityStats.totalSouls}
            </h2>
            <div className='flex items-center gap-2 mt-4 text-green-400 text-sm'>
              <TrendingUp size={16} />
              <span>+14% Growth this quarter</span>
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <p className='text-xs font-bold text-muted-foreground uppercase'>
            Zones / Cells
          </p>
          <h3 className='text-3xl font-bold mt-2'>
            {communityStats.zonesCount} / {communityStats.totalCells}
          </h3>
          <p className='text-[10px] text-muted-foreground mt-2 font-medium'>
            Target: 50 Cells by Dec
          </p>
        </Card>

        <Card className='p-6'>
          <p className='text-xs font-bold text-muted-foreground uppercase'>
            Retention Rate
          </p>
          <h3 className='text-3xl font-bold mt-2'>
            {communityStats.retentionRate}
          </h3>
          <Progress value={74} className='h-1.5 mt-4 bg-zinc-100' />
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- SECTION 2: LEFT COLUMN (Tabs & Zonal Monitoring) --- */}
        <div className='lg:col-span-2 space-y-6'>
          {/* COMMUNITY ACTION TABS */}
          <Tabs defaultValue='announcement' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-4'>
              <TabsTrigger value='announcement' className='gap-2'>
                <Megaphone size={16} /> Community Directives
              </TabsTrigger>
              <TabsTrigger value='report' className='gap-2'>
                <FileText size={16} /> Community Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value='announcement'>
              <Card className='border-blue-200'>
                <CardHeader>
                  <CardTitle className='text-md text-blue-700 flex items-center gap-2'>
                    <Send size={18} /> Broadcast to Zonal Leaders
                  </CardTitle>
                  <CardDescription>
                    Issue policy changes or directives to all 4 zones.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Input placeholder='Directive Title...' />
                  <textarea
                    className='flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none'
                    placeholder='Message for all Zonal leaders...'
                  />
                  <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                    Send Directive
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='report'>
              <Card className='border-zinc-200'>
                <CardHeader>
                  <CardTitle className='text-md flex items-center gap-2'>
                    <Target size={18} className='text-zinc-900' /> Community
                    Milestone Report
                  </CardTitle>
                  <CardDescription>
                    Consolidate your 4 zones for the District Pastor.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='space-y-1'>
                      <span className='text-[10px] font-bold text-muted-foreground uppercase'>
                        Total Attend.
                      </span>
                      <Input type='number' placeholder='0' />
                    </div>
                    <div className='space-y-1'>
                      <span className='text-[10px] font-bold text-muted-foreground uppercase'>
                        First Timers
                      </span>
                      <Input type='number' placeholder='0' />
                    </div>
                    <div className='space-y-1'>
                      <span className='text-[10px] font-bold text-muted-foreground uppercase'>
                        New Cells
                      </span>
                      <Input type='number' placeholder='0' />
                    </div>
                  </div>
                  <textarea
                    className='flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-zinc-900 outline-none'
                    placeholder='Describe territorial growth and challenges...'
                  />
                  <Button className='w-full bg-zinc-900'>
                    Submit to District
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* ZONAL PERFORMANCE */}
          <Card className='rounded-2xl'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-lg font-bold'>
                Zonal Health Monitor
              </CardTitle>
              <Button
                variant='ghost'
                size='sm'
                className='text-blue-600 text-xs gap-1'
              >
                <BarChart3 size={14} /> Full Analytics
              </Button>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className='flex items-center justify-between p-4 border rounded-2xl hover:bg-zinc-50 transition-all group'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='bg-zinc-100 p-2 rounded-lg'>
                        <Layers className='text-zinc-500' size={18} />
                      </div>
                      <div>
                        <p className='font-bold text-sm'>{zone.name}</p>
                        <p className='text-[11px] text-muted-foreground'>
                          {zone.leader} • {zone.cells} Cells
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-6'>
                      <Badge
                        variant={
                          zone.performance < 70 ? 'destructive' : 'secondary'
                        }
                        className='text-[10px]'
                      >
                        {zone.status}
                      </Badge>
                      <ChevronRight
                        size={18}
                        className='text-zinc-300 group-hover:text-zinc-900 transition-colors'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- SECTION 3: RIGHT COLUMN (Strategy & Map) --- */}
        <div className='space-y-6'>
          <Card className='border-blue-100 bg-blue-50/20'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-bold flex items-center gap-2'>
                <Zap size={16} className='text-blue-600' /> Critical Cell Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xs p-3 bg-white border border-blue-100 rounded-xl shadow-sm'>
                <p className='font-bold'>Cell Olive Branch</p>
                <p className='text-muted-foreground text-[10px] mt-1'>
                  8 weeks stagnant. Requires Community strategy.
                </p>
                <Button
                  variant='link'
                  className='p-0 h-auto text-blue-600 text-[10px] mt-2'
                >
                  Intervene Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-bold flex items-center gap-2'>
                <ShieldAlert size={16} className='text-orange-600' /> Governance
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Button
                variant='outline'
                className='w-full justify-between text-xs h-10 px-4'
              >
                <span>Zonal Leader Sync</span> <ArrowRight size={14} />
              </Button>
              <Button
                variant='outline'
                className='w-full justify-between text-xs h-10 px-4'
              >
                <span>Leader Re-assignment</span> <UserCheck size={14} />
              </Button>
            </CardContent>
          </Card>

          <Button className='w-full h-14 bg-zinc-900 gap-3 rounded-2xl group'>
            <Map
              size={20}
              className='group-hover:scale-110 transition-transform'
            />
            <span className='font-bold'>Territory Map</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
