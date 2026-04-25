// 'use client'

// import React, { useState } from 'react'
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import {
//   LayoutGrid,
//   TrendingUp,
//   AlertTriangle,
//   ChevronRight,
//   ClipboardCheck,
//   MessageSquare,
//   Users,
//   Split,
// } from 'lucide-react'
// import { Badge } from '../ui/badge'

// export default function ZoneHub() {
//   const zoneData = {
//     name: 'Mainland Zone A',
//     totalCells: 8,
//     totalMembers: 142,
//     avgAttendance: '88%',
//     activeReports: '7/8',
//   }

//   const cells = [
//     {
//       id: '1',
//       name: 'Bethel Alpha',
//       leader: 'John Doe',
//       status: 'Healthy',
//       attendance: 92,
//       healthColor: 'text-green-500',
//     },
//     {
//       id: '2',
//       name: 'Grace Center',
//       leader: 'Sarah Smith',
//       status: 'Declining',
//       attendance: 65,
//       healthColor: 'text-red-500',
//     },
//     {
//       id: '3',
//       name: 'Zion Life',
//       leader: 'Michael Kay',
//       status: 'Ready to Split',
//       attendance: 115,
//       healthColor: 'text-blue-500',
//     },
//   ]

//   return (
//     <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
//       {/* --- SECTION 1: ZONE VITAL SIGNS --- */}
//       <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
//         <Card className='p-4 flex flex-col justify-between border-l-4 border-l-blue-600'>
//           <p className='text-xs font-bold text-muted-foreground uppercase'>
//             Total Cells
//           </p>
//           <div className='flex items-center justify-between mt-2'>
//             <h3 className='text-2xl font-bold'>{zoneData.totalCells}</h3>
//             <LayoutGrid className='text-blue-600' size={20} />
//           </div>
//         </Card>

//         <Card className='p-4 flex flex-col justify-between border-l-4 border-l-green-600'>
//           <p className='text-xs font-bold text-muted-foreground uppercase'>
//             Total Souls
//           </p>
//           <div className='flex items-center justify-between mt-2'>
//             <h3 className='text-2xl font-bold'>{zoneData.totalMembers}</h3>
//             <Users className='text-green-600' size={20} />
//           </div>
//         </Card>

//         <Card className='p-4 flex flex-col justify-between border-l-4 border-l-purple-600'>
//           <p className='text-xs font-bold text-muted-foreground uppercase'>
//             Avg Attendance
//           </p>
//           <div className='flex items-center justify-between mt-2'>
//             <h3 className='text-2xl font-bold'>{zoneData.avgAttendance}</h3>
//             <TrendingUp className='text-purple-600' size={20} />
//           </div>
//         </Card>

//         <Card className='p-4 flex flex-col justify-between border-l-4 border-l-orange-600'>
//           <p className='text-xs font-bold text-muted-foreground uppercase'>
//             Reports In
//           </p>
//           <div className='flex items-center justify-between mt-2'>
//             <h3 className='text-2xl font-bold'>{zoneData.activeReports}</h3>
//             <ClipboardCheck className='text-orange-600' size={20} />
//           </div>
//         </Card>
//       </div>

//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
//         {/* --- SECTION 2: CELL PERFORMANCE TABLE --- */}
//         <Card className='lg:col-span-2'>
//           <CardHeader>
//             <CardTitle className='text-lg'>Cell Health Monitor</CardTitle>
//             <CardDescription>
//               Real-time performance across your 8 cells
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className='space-y-4'>
//               {cells.map((cell) => (
//                 <div
//                   key={cell.id}
//                   className='flex items-center justify-between p-4 border rounded-2xl hover:bg-zinc-50 transition-all group'
//                 >
//                   <div className='flex items-center gap-4'>
//                     <div
//                       className={`w-2 h-10 rounded-full ${cell.status === 'Declining' ? 'bg-red-500' : 'bg-green-500'}`}
//                     />
//                     <div>
//                       <p className='font-bold text-sm'>{cell.name}</p>
//                       <p className='text-xs text-muted-foreground'>
//                         Leader: {cell.leader}
//                       </p>
//                     </div>
//                   </div>

//                   <div className='hidden md:block text-center'>
//                     <p className='text-xs font-bold opacity-50 uppercase'>
//                       Attendance
//                     </p>
//                     <p className={`text-sm font-bold ${cell.healthColor}`}>
//                       {cell.attendance}%
//                     </p>
//                   </div>

//                   <div className='flex items-center gap-3'>
//                     {cell.status === 'Ready to Split' && (
//                       <Badge className='bg-blue-100 text-blue-700 border-none animate-pulse'>
//                         <Split size={12} className='mr-1' /> Multiply
//                       </Badge>
//                     )}
//                     <Button
//                       variant='ghost'
//                       size='icon'
//                       className='group-hover:translate-x-1 transition-transform'
//                     >
//                       <ChevronRight size={18} />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Button variant='outline' className='w-full mt-4 text-xs'>
//               View All Cells
//             </Button>
//           </CardContent>
//         </Card>

//         {/* --- SECTION 3: ZONAL INTERVENTIONS --- */}
//         <div className='space-y-6'>
//           <Card className='border-red-100 bg-red-50/30'>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-sm font-bold flex items-center gap-2 text-red-600'>
//                 <AlertTriangle size={16} /> Urgent Attention
//               </CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-3'>
//               <p className='text-xs text-muted-foreground'>
//                 The following cells have missed reports or shown 3 weeks of
//                 decline:
//               </p>
//               <div className='p-3 bg-white border border-red-100 rounded-xl flex justify-between items-center shadow-sm'>
//                 <span className='text-xs font-bold'>Grace Center</span>
//                 <Button
//                   size='sm'
//                   variant='destructive'
//                   className='h-7 text-[10px]'
//                 >
//                   Schedule Visit
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-sm font-bold flex items-center gap-2'>
//                 <MessageSquare size={16} className='text-blue-600' /> Leader
//                 Communication
//               </CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-2'>
//               <Button
//                 variant='outline'
//                 className='w-full justify-start gap-3 text-xs h-10'
//               >
//                 <div className='w-2 h-2 rounded-full bg-green-500' /> Broadcast
//                 to All Leaders
//               </Button>
//               <Button
//                 variant='outline'
//                 className='w-full justify-start gap-3 text-xs h-10'
//               >
//                 <div className='w-2 h-2 rounded-full bg-orange-500' /> Message
//                 Pending Reports
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className='bg-zinc-900 text-white'>
//             <CardContent className='p-6'>
//               <p className='text-zinc-400 text-xs'>Zone Expansion</p>
//               <h4 className='text-xl font-bold mt-1'>2 Cells Pending</h4>
//               <p className='text-[10px] text-zinc-500 mt-2 italic'>
//                 Zion Life & Olive Branch have reached capacity (15+ members).
//               </p>
//               <Button className='w-full mt-4 bg-white text-black hover:bg-zinc-200'>
//                 Start Multiplication Process
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState } from 'react'
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
  LayoutGrid,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  ClipboardCheck,
  MessageSquare,
  Users,
  Split,
  Megaphone,
  FileText,
  Send,
} from 'lucide-react'
import { Badge } from '../ui/badge'

export default function ZoneHub() {
  const zoneData = {
    name: 'Mainland Zone A',
    totalCells: 8,
    totalMembers: 142,
    avgAttendance: '88%',
    activeReports: '7/8',
  }

  const cells = [
    {
      id: '1',
      name: 'Bethel Alpha',
      leader: 'John Doe',
      status: 'Healthy',
      attendance: 92,
      healthColor: 'text-green-500',
    },
    {
      id: '2',
      name: 'Grace Center',
      leader: 'Sarah Smith',
      status: 'Declining',
      attendance: 65,
      healthColor: 'text-red-500',
    },
    {
      id: '3',
      name: 'Zion Life',
      leader: 'Michael Kay',
      status: 'Ready to Split',
      attendance: 115,
      healthColor: 'text-blue-500',
    },
  ]

  return (
    <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- SECTION 1: ZONE VITAL SIGNS --- */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='p-4 flex flex-col justify-between border-l-4 border-l-blue-600'>
          <p className='text-xs font-bold text-muted-foreground uppercase text-[10px]'>
            Total Cells
          </p>
          <div className='flex items-center justify-between mt-2'>
            <h3 className='text-2xl font-bold'>{zoneData.totalCells}</h3>
            <LayoutGrid className='text-blue-600' size={20} />
          </div>
        </Card>

        <Card className='p-4 flex flex-col justify-between border-l-4 border-l-green-600'>
          <p className='text-xs font-bold text-muted-foreground uppercase text-[10px]'>
            Total Souls
          </p>
          <div className='flex items-center justify-between mt-2'>
            <h3 className='text-2xl font-bold'>{zoneData.totalMembers}</h3>
            <Users className='text-green-600' size={20} />
          </div>
        </Card>

        <Card className='p-4 flex flex-col justify-between border-l-4 border-l-purple-600'>
          <p className='text-xs font-bold text-muted-foreground uppercase text-[10px]'>
            Avg Attendance
          </p>
          <div className='flex items-center justify-between mt-2'>
            <h3 className='text-2xl font-bold'>{zoneData.avgAttendance}</h3>
            <TrendingUp className='text-purple-600' size={20} />
          </div>
        </Card>

        <Card className='p-4 flex flex-col justify-between border-l-4 border-l-orange-600'>
          <p className='text-xs font-bold text-muted-foreground uppercase text-[10px]'>
            Reports In
          </p>
          <div className='flex items-center justify-between mt-2'>
            <h3 className='text-2xl font-bold'>{zoneData.activeReports}</h3>
            <ClipboardCheck className='text-orange-600' size={20} />
          </div>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- SECTION 2: LEFT COLUMN (Tabs + Performance) --- */}
        <div className='lg:col-span-2 space-y-6'>
          {/* ACTION TABS */}
          <Tabs defaultValue='announcement' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-4'>
              <TabsTrigger value='announcement' className='gap-2'>
                <Megaphone size={16} /> Broadcast
              </TabsTrigger>
              <TabsTrigger value='report' className='gap-2'>
                <FileText size={16} /> Zonal Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value='announcement'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-md text-blue-600 flex items-center gap-2'>
                    <Send size={18} /> Send Zonal Broadcast
                  </CardTitle>
                  <CardDescription>
                    This message will be sent to all Cell Leaders in{' '}
                    {zoneData.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Input placeholder='Subject / Title...' />
                  <textarea
                    className='flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Write your message here...'
                  />
                  <Button className='w-full bg-zinc-900'>Post to Zone</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='report'>
              <Card className='border-orange-200 bg-orange-50/20'>
                <CardHeader>
                  <CardTitle className='text-md flex items-center gap-2'>
                    <FileText size={18} className='text-orange-600' /> Weekly
                    Zonal Summary
                  </CardTitle>
                  <CardDescription>
                    Submit aggregated data to the Community Leader.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <span className='text-[10px] font-bold uppercase text-muted-foreground'>
                        Total Present
                      </span>
                      <Input type='number' placeholder='0' />
                    </div>
                    <div className='space-y-1'>
                      <span className='text-[10px] font-bold uppercase text-muted-foreground'>
                        New Conversions
                      </span>
                      <Input type='number' placeholder='0' />
                    </div>
                  </div>
                  <textarea
                    className='flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
                    placeholder='Summary of Zonal activities and testimonies...'
                  />
                  <Button className='w-full bg-orange-600 hover:bg-orange-700'>
                    Submit to Community
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* PERFORMANCE MONITOR */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Cell Health Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {cells.map((cell) => (
                  <div
                    key={cell.id}
                    className='flex items-center justify-between p-4 border rounded-2xl hover:bg-zinc-50 transition-all group'
                  >
                    <div className='flex items-center gap-4'>
                      <div
                        className={`w-2 h-10 rounded-full ${cell.status === 'Declining' ? 'bg-red-500' : 'bg-green-500'}`}
                      />
                      <div>
                        <p className='font-bold text-sm'>{cell.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          Leader: {cell.leader}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      {cell.status === 'Ready to Split' && (
                        <Badge className='bg-blue-100 text-blue-700 border-none animate-pulse'>
                          <Split size={12} className='mr-1' /> Multiply
                        </Badge>
                      )}
                      <Button variant='ghost' size='icon'>
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- SECTION 3: RIGHT COLUMN (Interventions) --- */}
        <div className='space-y-6'>
          <Card className='border-red-100 bg-red-50/30'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-bold flex items-center gap-2 text-red-600'>
                <AlertTriangle size={16} /> Urgent Attention
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <p className='text-[11px] text-muted-foreground'>
                Cells requiring immediate intervention:
              </p>
              <div className='p-3 bg-white border border-red-100 rounded-xl flex justify-between items-center shadow-sm'>
                <span className='text-xs font-bold'>Grace Center</span>
                <Button
                  size='sm'
                  variant='destructive'
                  className='h-7 text-[10px]'
                >
                  Schedule Visit
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-zinc-900 text-white'>
            <CardContent className='p-6 text-center'>
              <div className='w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                <TrendingUp className='text-blue-400' size={24} />
              </div>
              <h4 className='text-lg font-bold'>Expansion Strategy</h4>
              <p className='text-[11px] text-zinc-500 mt-2'>
                Zion Life has exceeded capacity. Ready to birth a new Cell?
              </p>
              <Button className='w-full mt-4 bg-white text-black hover:bg-zinc-200 text-xs font-bold'>
                Launch New Cell
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
