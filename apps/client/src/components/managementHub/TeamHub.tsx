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
// import { Badge } from '@/components/ui/badge'
// import { Progress } from '@/components/ui/progress'
// import {
//   Layers,
//   GitMerge,
//   Cpu,
//   ShieldCheck,
//   Zap,
//   Activity,
//   BarChart3,
//   CalendarDays,
//   UserCog,
//   ArrowUpRight,
//   ChevronRight,
// } from 'lucide-react'

// export default function TeamLeaderHub() {
//   const teamStats = {
//     name: 'Technical & Operations Directorate',
//     departmentsCount: 5,
//     totalBudgetUsed: '62%',
//     projectCompletion: 78,
//     activeHODs: 5,
//   }

//   const departments = [
//     {
//       name: 'Media & Tech',
//       hod: 'David O.',
//       health: 95,
//       status: 'Operational',
//       color: 'bg-blue-500',
//     },
//     {
//       name: 'Music & Choir',
//       hod: 'Sarah K.',
//       health: 82,
//       status: 'Operational',
//       color: 'bg-purple-500',
//     },
//     {
//       name: 'Ushering & Protocol',
//       hod: 'James L.',
//       health: 64,
//       status: 'Needs Review',
//       color: 'bg-orange-500',
//     },
//     {
//       name: 'Security & Logistics',
//       hod: 'Samuel E.',
//       health: 88,
//       status: 'Operational',
//       color: 'bg-green-500',
//     },
//   ]

//   return (
//     <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
//       {/* --- SECTION 1: DIRECTORATE OVERVIEW --- */}
//       <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
//         <Card className='bg-zinc-900 text-white p-6 lg:col-span-2 relative overflow-hidden'>
//           <div className='relative z-10'>
//             <div className='flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest'>
//               <Cpu size={14} /> System Infrastructure
//             </div>
//             <h2 className='text-3xl font-bold mt-3'>Technical Directorate</h2>
//             <div className='flex gap-4 mt-6'>
//               <div>
//                 <p className='text-[10px] text-zinc-500 uppercase'>Depts</p>
//                 <p className='text-xl font-bold'>
//                   {teamStats.departmentsCount}
//                 </p>
//               </div>
//               <div className='border-l border-zinc-700 pl-4'>
//                 <p className='text-[10px] text-zinc-500 uppercase'>
//                   Project Velocity
//                 </p>
//                 <p className='text-xl font-bold text-green-400'>
//                   {teamStats.projectCompletion}%
//                 </p>
//               </div>
//             </div>
//           </div>
//           <Activity className='absolute -right-4 -bottom-4 text-zinc-800 w-40 h-40' />
//         </Card>

//         <Card className='p-6'>
//           <p className='text-xs font-bold text-muted-foreground uppercase tracking-tight'>
//             Budget Utilization
//           </p>
//           <div className='flex items-end justify-between mt-2'>
//             <h3 className='text-3xl font-bold'>{teamStats.totalBudgetUsed}</h3>
//             <span className='text-[10px] text-zinc-400 mb-1'>Q2 Period</span>
//           </div>
//           <Progress value={62} className='h-1.5 mt-4' />
//         </Card>

//         <Card className='p-6 bg-blue-50 border-blue-100'>
//           <p className='text-xs font-bold text-blue-600 uppercase tracking-tight'>
//             Compliance
//           </p>
//           <div className='flex items-center gap-2 mt-2'>
//             <ShieldCheck className='text-blue-600' size={24} />
//             <h3 className='text-3xl font-bold text-blue-900'>High</h3>
//           </div>
//           <p className='text-[10px] text-blue-400 mt-2 font-medium'>
//             All safety audits passed
//           </p>
//         </Card>
//       </div>

//       {/* --- SECTION 2: DEPARTMENTAL SYNC & HOD OVERSIGHT --- */}
//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
//         <Card className='lg:col-span-2'>
//           <CardHeader className='flex flex-row items-center justify-between'>
//             <div>
//               <CardTitle className='text-lg'>
//                 Departmental Performance
//               </CardTitle>
//               <CardDescription>
//                 Consolidated health of your sub-departments
//               </CardDescription>
//             </div>
//             <Button size='sm' className='bg-zinc-900 gap-2'>
//               <BarChart3 size={14} /> Full Audit
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className='space-y-4'>
//               {departments.map((dept, i) => (
//                 <div
//                   key={i}
//                   className='flex items-center justify-between p-4 border rounded-2xl hover:border-zinc-300 transition-all group'
//                 >
//                   <div className='flex items-center gap-4'>
//                     <div className={`w-3 h-3 rounded-full ${dept.color}`} />
//                     <div>
//                       <p className='font-bold text-sm'>{dept.name}</p>
//                       <p className='text-[11px] text-muted-foreground'>
//                         HOD: {dept.hod}
//                       </p>
//                     </div>
//                   </div>

//                   <div className='flex items-center gap-8'>
//                     <div className='hidden md:block w-32'>
//                       <div className='flex justify-between text-[10px] mb-1'>
//                         <span className='font-bold uppercase opacity-50'>
//                           Health
//                         </span>
//                         <span>{dept.health}%</span>
//                       </div>
//                       <Progress value={dept.health} className='h-1' />
//                     </div>
//                     <Badge
//                       variant={dept.health < 70 ? 'destructive' : 'secondary'}
//                       className='text-[10px]'
//                     >
//                       {dept.status}
//                     </Badge>
//                     <ChevronRight
//                       size={18}
//                       className='text-zinc-300 group-hover:text-zinc-900 transition-colors'
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* --- SECTION 3: STRATEGIC CONTROLS --- */}
//         <div className='space-y-6'>
//           {/* Inter-Departmental Projects */}
//           <Card className='border-blue-200 bg-blue-50/20'>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-sm font-bold flex items-center gap-2'>
//                 <GitMerge size={16} className='text-blue-600' /> Cross-Dept
//                 Projects
//               </CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-3'>
//               <div className='bg-white p-3 rounded-xl border border-blue-100 shadow-sm'>
//                 <p className='text-xs font-bold'>Easter Concert 2026</p>
//                 <div className='flex gap-2 mt-2'>
//                   <Badge variant='outline' className='text-[9px]'>
//                     Media
//                   </Badge>
//                   <Badge variant='outline' className='text-[9px]'>
//                     Music
//                   </Badge>
//                   <Badge variant='outline' className='text-[9px]'>
//                     Logistics
//                   </Badge>
//                 </div>
//                 <div className='mt-3 flex items-center justify-between'>
//                   <span className='text-[10px] text-muted-foreground'>
//                     8/12 milestones met
//                   </span>
//                   <ArrowUpRight size={14} className='text-blue-600' />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Leader Development */}
//           <Card>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-sm font-bold flex items-center gap-2 text-zinc-700'>
//                 <UserCog size={16} /> HOD Sync & Coaching
//               </CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-2'>
//               <Button
//                 variant='outline'
//                 className='w-full justify-start gap-3 text-xs h-11 border-dashed'
//               >
//                 <CalendarDays size={16} className='text-zinc-400' /> Quarterly
//                 Leadership Review
//               </Button>
//               <Button
//                 variant='outline'
//                 className='w-full justify-start gap-3 text-xs h-11 border-dashed'
//               >
//                 <Zap size={16} className='text-orange-500' /> Emergency HOD
//                 Briefing
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Resource Requests */}
//           <Card className='bg-zinc-50 border-zinc-200'>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-xs font-bold uppercase text-zinc-500'>
//                 Pending Requisitions
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className='flex justify-between items-center'>
//                 <span className='text-sm font-bold'>3 Capital Requests</span>
//                 <Button size='sm' className='h-7 text-[10px] bg-zinc-900'>
//                   Approve Items
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
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
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Layers,
  GitMerge,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  BarChart3,
  CalendarDays,
  UserCog,
  ArrowUpRight,
  ChevronRight,
  ClipboardCheck,
  Briefcase,
  TrendingUp,
} from 'lucide-react'

export default function TeamLeaderHub() {
  const teamStats = {
    name: 'Technical & Operations Directorate',
    departmentsCount: 5,
    totalBudgetUsed: '62%',
    projectCompletion: 78,
    activeHODs: 5,
  }

  const departments = [
    {
      name: 'Media & Tech',
      hod: 'David O.',
      health: 95,
      status: 'Operational',
      color: 'bg-blue-500',
    },
    {
      name: 'Music & Choir',
      hod: 'Sarah K.',
      health: 82,
      status: 'Operational',
      color: 'bg-purple-500',
    },
    {
      name: 'Ushering & Protocol',
      hod: 'James L.',
      health: 64,
      status: 'Needs Review',
      color: 'bg-orange-500',
    },
    {
      name: 'Security & Logistics',
      hod: 'Samuel E.',
      health: 88,
      status: 'Operational',
      color: 'bg-green-500',
    },
  ]

  return (
    <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- SECTION 1: DIRECTORATE COMMAND CENTER --- */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <Card className='bg-zinc-950 text-white p-6 lg:col-span-2 relative overflow-hidden border-none shadow-2xl'>
          <div className='relative z-10'>
            <div className='flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]'>
              <Cpu size={14} className='text-blue-500' /> System Infrastructure
            </div>
            <h2 className='text-3xl font-black mt-3 tracking-tight'>
              Technical Directorate
            </h2>
            <p className='text-zinc-500 text-xs mt-1'>
              Overseeing 5 Departments & 240+ Personnel
            </p>

            <div className='flex gap-8 mt-8'>
              <div>
                <p className='text-[10px] text-zinc-500 uppercase font-bold mb-1'>
                  Velocity
                </p>
                <div className='flex items-baseline gap-1'>
                  <p className='text-2xl font-black text-blue-400'>
                    {teamStats.projectCompletion}%
                  </p>
                  <TrendingUp size={12} className='text-blue-400' />
                </div>
              </div>
              <div className='border-l border-zinc-800 pl-8'>
                <p className='text-[10px] text-zinc-500 uppercase font-bold mb-1'>
                  HOD Sync
                </p>
                <p className='text-2xl font-black text-white'>
                  {teamStats.activeHODs}
                  <span className='text-zinc-600 text-sm'>/5</span>
                </p>
              </div>
            </div>
          </div>
          <Activity className='absolute -right-6 -bottom-6 text-zinc-900 w-48 h-48 opacity-50' />
        </Card>

        <Card className='p-6 flex flex-col justify-between border-2'>
          <div>
            <p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
              Resource Burn
            </p>
            <div className='flex items-baseline gap-2 mt-2'>
              <h3 className='text-3xl font-black'>
                {teamStats.totalBudgetUsed}
              </h3>
              <span className='text-[10px] text-zinc-400 font-bold'>
                UTILIZED
              </span>
            </div>
          </div>
          <div className='space-y-2'>
            <Progress value={62} className='h-2 bg-zinc-100' />
            <p className='text-[10px] text-zinc-400 text-right font-medium italic'>
              Next Budget Cycle: 14 Days
            </p>
          </div>
        </Card>

        <Card className='p-6 bg-blue-600 text-white border-none shadow-lg shadow-blue-200'>
          <p className='text-xs font-bold text-blue-100 uppercase tracking-widest'>
            Compliance
          </p>
          <div className='flex items-center gap-3 mt-4'>
            <div className='p-2 bg-blue-500 rounded-lg'>
              <ShieldCheck size={28} />
            </div>
            <h3 className='text-3xl font-black uppercase tracking-tighter'>
              Elite
            </h3>
          </div>
          <p className='text-[10px] text-blue-100 mt-4 font-medium opacity-80'>
            Directorate health is at optimal levels across all units.
          </p>
        </Card>
      </div>

      {/* --- SECTION 2: THE GRID (Departments & Strategy) --- */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-2 shadow-sm rounded-3xl'>
          <CardHeader className='flex flex-row items-center justify-between border-b pb-6'>
            <div>
              <CardTitle className='text-xl font-black'>
                Unit Health Matrix
              </CardTitle>
              <CardDescription>
                Aggregate performance of sub-departments
              </CardDescription>
            </div>
            <Button
              size='sm'
              variant='outline'
              className='rounded-full h-10 border-zinc-300'
            >
              <BarChart3 size={16} className='mr-2' /> Analytics
            </Button>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              {departments.map((dept, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between p-6 hover:bg-zinc-50/50 transition-all group cursor-pointer'
                >
                  <div className='flex items-center gap-4'>
                    <div className={`w-1.5 h-10 rounded-full ${dept.color}`} />
                    <div>
                      <p className='font-black text-sm uppercase tracking-tight'>
                        {dept.name}
                      </p>
                      <p className='text-xs text-muted-foreground font-medium italic'>
                        Lead: {dept.hod}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-10'>
                    <div className='hidden md:block w-40'>
                      <div className='flex justify-between text-[10px] mb-2 font-bold uppercase'>
                        <span className='text-zinc-400'>
                          Operational Capacity
                        </span>
                        <span>{dept.health}%</span>
                      </div>
                      <Progress value={dept.health} className='h-1.5' />
                    </div>
                    <Badge
                      variant={dept.health < 70 ? 'destructive' : 'secondary'}
                      className='rounded-md font-bold px-3 py-1'
                    >
                      {dept.status}
                    </Badge>
                    <ChevronRight
                      size={20}
                      className='text-zinc-300 group-hover:translate-x-1 transition-transform'
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* --- SECTION 3: THE DIRECTOR'S STACK --- */}
        <div className='space-y-6'>
          <Card className='border-blue-600 bg-blue-50/10 border-t-8'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-black flex items-center gap-2 uppercase tracking-tighter'>
                <GitMerge size={18} className='text-blue-600' /> Cross-Dept Sync
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='bg-white p-4 rounded-2xl border-2 border-blue-100 shadow-sm'>
                <p className='text-sm font-black mb-2'>Easter Concert 2026</p>
                <div className='flex flex-wrap gap-1'>
                  {['Media', 'Music', 'Logistics'].map((tag) => (
                    <Badge
                      key={tag}
                      variant='outline'
                      className='text-[9px] font-bold uppercase bg-zinc-50'
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-[10px] font-bold'>
                    <span className='text-muted-foreground'>Milestones</span>
                    <span>8 / 12</span>
                  </div>
                  <Progress value={66} className='h-1.5 bg-blue-100' />
                </div>
              </div>
              <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-100'>
                Project Management
              </Button>
            </CardContent>
          </Card>

          <Card className='rounded-2xl'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-black flex items-center gap-2 text-zinc-800 uppercase tracking-tighter'>
                <UserCog size={18} className='text-zinc-500' /> Governance
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Button
                variant='outline'
                className='w-full justify-between text-xs h-12 rounded-xl group border-zinc-200'
              >
                <div className='flex items-center gap-3'>
                  <CalendarDays size={16} className='text-zinc-400' />
                  <span className='font-bold'>Leadership Reviews</span>
                </div>
                <Badge className='bg-zinc-100 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors'>
                  Q2
                </Badge>
              </Button>

              <Button
                variant='outline'
                className='w-full justify-start gap-3 text-xs h-12 rounded-xl border-dashed border-orange-300 bg-orange-50/30 text-orange-700 hover:bg-orange-50 transition-colors'
              >
                <Zap size={16} className='text-orange-500' />
                <span className='font-bold'>Emergency HOD Briefing</span>
              </Button>
            </CardContent>
          </Card>

          <Card className='bg-zinc-50 border-zinc-200 border-2 border-dashed'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em]'>
                Financial Gatekeeper
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm'>
                <div>
                  <p className='text-xl font-black'>3</p>
                  <p className='text-[10px] text-muted-foreground font-bold uppercase'>
                    Pending Requisitions
                  </p>
                </div>
                <Button
                  size='sm'
                  className='h-10 px-4 bg-zinc-900 rounded-xl font-bold'
                >
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
