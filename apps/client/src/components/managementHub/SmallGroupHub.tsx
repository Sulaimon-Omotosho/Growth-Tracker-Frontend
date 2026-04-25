// 'use client'

// import React from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import {
//   Heart,
//   Share2,
//   MessageCircle,
//   Sparkles,
//   Calendar,
//   Users,
//   Link as LinkIcon,
//   ChevronRight,
//   TrendingUp,
// } from 'lucide-react'

// export default function SmallGroupHub() {
//   const groupData = {
//     name: 'Tech & Kingdom Creators',
//     interest: 'Technology/Software',
//     members: 18,
//     activeThreads: 5,
//     nextHangout: 'Saturday, 10:00 AM',
//   }

//   const resources = [
//     { title: 'Theology of Tech PDF', author: 'Dr. Mike', type: 'Reading' },
//     { title: 'Project Alpha Repo', author: 'Dev Team', type: 'Code' },
//   ]

//   return (
//     <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
//       {/* --- 1. COMMUNITY VIBE HEADER --- */}
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//         <Card className='md:col-span-2 bg-linear-to-br from-purple-600 to-indigo-700 text-white border-none shadow-lg overflow-hidden relative'>
//           <Sparkles className='absolute -right-4 -top-4 w-24 h-24 opacity-20' />
//           <CardContent className='p-6 relative z-10'>
//             <Badge className='bg-white/20 text-white border-none mb-3'>
//               Interest: {groupData.interest}
//             </Badge>
//             <h2 className='text-3xl font-bold'>{groupData.name}</h2>
//             <div className='flex gap-4 mt-6'>
//               <div className='flex flex-col'>
//                 <span className='text-[10px] uppercase opacity-70'>
//                   Vibe Score
//                 </span>
//                 <span className='text-xl font-bold flex items-center gap-1'>
//                   94% <Heart size={16} className='fill-current' />
//                 </span>
//               </div>
//               <div className='flex flex-col border-l border-white/20 pl-4'>
//                 <span className='text-[10px] uppercase opacity-70'>
//                   Member Growth
//                 </span>
//                 <span className='text-xl font-bold'>+3 New</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className='p-6 flex flex-col justify-center text-center border-dashed border-2'>
//           <div className='p-3 bg-zinc-100 rounded-full w-fit mx-auto mb-3'>
//             <Calendar className='text-zinc-600' />
//           </div>
//           <h4 className='font-bold text-sm'>Next Meetup</h4>
//           <p className='text-xs text-muted-foreground mt-1'>
//             {groupData.nextHangout}
//           </p>
//           <Button className='w-full mt-4 bg-zinc-900 rounded-xl h-9'>
//             I'm Joining
//           </Button>
//         </Card>
//       </div>

//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
//         {/* --- 2. ENGAGEMENT & THREADS --- */}
//         <Card className='lg:col-span-2 rounded-2xl'>
//           <CardHeader className='flex flex-row items-center justify-between'>
//             <CardTitle className='text-lg flex items-center gap-2'>
//               <MessageCircle size={20} className='text-indigo-500' />
//               Active Discussions
//             </CardTitle>
//             <Button variant='ghost' size='sm' className='text-xs'>
//               View Forum
//             </Button>
//           </CardHeader>
//           <CardContent className='space-y-3'>
//             {[
//               'AI and Ethics in Ministry',
//               'Frontend Frameworks for Church Apps',
//               'Prayer Request Thread',
//             ].map((thread, i) => (
//               <div
//                 key={i}
//                 className='flex items-center justify-between p-3 border rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors'
//               >
//                 <p className='text-sm font-medium'>{thread}</p>
//                 <div className='flex items-center gap-3 text-muted-foreground'>
//                   <span className='text-[10px] flex items-center gap-1'>
//                     <Users size={12} /> 12
//                   </span>
//                   <ChevronRight size={14} />
//                 </div>
//               </div>
//             ))}
//             <Button className='w-full mt-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none h-10'>
//               Start a New Topic
//             </Button>
//           </CardContent>
//         </Card>

//         {/* --- 3. KNOWLEDGE & RESOURCE SHARING --- */}
//         <div className='space-y-6'>
//           <Card className='rounded-2xl'>
//             <CardHeader className='pb-2'>
//               <CardTitle className='text-sm font-bold flex items-center gap-2'>
//                 <Share2 size={16} className='text-green-600' /> Group Library
//               </CardTitle>
//             </CardHeader>
//             <CardContent className='space-y-3'>
//               {resources.map((res, i) => (
//                 <div
//                   key={i}
//                   className='p-3 bg-zinc-50 rounded-xl flex items-center justify-between border'
//                 >
//                   <div>
//                     <p className='text-xs font-bold'>{res.title}</p>
//                     <p className='text-[10px] text-muted-foreground'>
//                       {res.type} • {res.author}
//                     </p>
//                   </div>
//                   <LinkIcon size={14} className='text-zinc-400' />
//                 </div>
//               ))}
//               <Button
//                 variant='outline'
//                 className='w-full text-xs h-8 border-dashed'
//               >
//                 Upload Resource
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Social Proof / Activity */}
//           <Card className='bg-zinc-50 border-none'>
//             <CardContent className='p-4'>
//               <div className='flex items-center justify-between mb-4'>
//                 <h5 className='text-xs font-bold uppercase text-zinc-500'>
//                   Engagement
//                 </h5>
//                 <TrendingUp size={14} className='text-green-500' />
//               </div>
//               <div className='flex -space-x-2'>
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div
//                     key={i}
//                     className='w-8 h-8 rounded-full border-2 border-white bg-zinc-300'
//                   />
//                 ))}
//                 <div className='w-8 h-8 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold'>
//                   +13
//                 </div>
//               </div>
//               <p className='text-[10px] mt-3 text-muted-foreground'>
//                 18 people active in the last 24 hours
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Share2,
  MessageCircle,
  Sparkles,
  Calendar,
  Users,
  Link as LinkIcon,
  ChevronRight,
  TrendingUp,
  MessageSquarePlus,
  BookOpen,
  ArrowRight,
  Activity,
} from 'lucide-react'

export default function SmallGroupHub() {
  const groupData = {
    name: 'Tech & Kingdom Creators',
    interest: 'Technology/Software',
    members: 18,
    activeThreads: 5,
    nextHangout: 'Saturday, 10:00 AM',
  }

  const resources = [
    { title: 'Theology of Tech PDF', author: 'Dr. Mike', type: 'Reading' },
    { title: 'Project Alpha Repo', author: 'Dev Team', type: 'Code' },
  ]

  return (
    <div className='space-y-6 animate-in fade-in duration-500 pb-20'>
      {/* --- 1. COMMUNITY VIBE HEADER --- */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='md:col-span-2 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white border-none shadow-xl overflow-hidden relative group'>
          <Sparkles className='absolute -right-4 -top-4 w-32 h-32 opacity-20 group-hover:rotate-12 transition-transform duration-700' />
          <CardContent className='p-8 relative z-10'>
            <div className='flex items-center gap-2 mb-4'>
              <Badge className='bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md'>
                {groupData.interest}
              </Badge>
              <div className='flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-80'>
                <Activity size={12} /> Active Now
              </div>
            </div>
            <h2 className='text-4xl font-black tracking-tight'>
              {groupData.name}
            </h2>

            <div className='flex gap-6 mt-8'>
              <div className='flex flex-col'>
                <span className='text-[10px] uppercase font-black opacity-70 tracking-tighter'>
                  Vibe Score
                </span>
                <span className='text-2xl font-black flex items-center gap-2'>
                  94%{' '}
                  <Heart size={18} className='fill-rose-400 text-rose-400' />
                </span>
              </div>
              <div className='w-px h-10 bg-white/20' />
              <div className='flex flex-col'>
                <span className='text-[10px] uppercase font-black opacity-70 tracking-tighter'>
                  Community Size
                </span>
                <span className='text-2xl font-black'>
                  {groupData.members}{' '}
                  <span className='text-sm opacity-60'>Creators</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-200 bg-zinc-50/50 relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-1 bg-indigo-500' />
          <div className='p-4 bg-white shadow-sm rounded-2xl mb-4'>
            <Calendar className='text-indigo-600' size={28} />
          </div>
          <h4 className='font-black text-sm uppercase tracking-tight'>
            Next Hangout
          </h4>
          <p className='text-xs text-muted-foreground mt-1 font-medium italic'>
            {groupData.nextHangout}
          </p>
          <Button className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold h-11 shadow-lg shadow-indigo-100'>
            Count Me In
          </Button>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- 2. THE FEED / DISCUSSIONS --- */}
        <Card className='lg:col-span-2 rounded-3xl border-none shadow-sm bg-white overflow-hidden'>
          <CardHeader className='flex flex-row items-center justify-between border-b px-6 py-5'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-indigo-50 rounded-lg'>
                <MessageCircle size={20} className='text-indigo-600' />
              </div>
              <CardTitle className='text-lg font-black tracking-tight'>
                Active Threads
              </CardTitle>
            </div>
            <Button
              variant='ghost'
              size='sm'
              className='text-xs font-bold text-indigo-600 hover:bg-indigo-50'
            >
              Forum View <ArrowRight size={14} className='ml-1' />
            </Button>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              {[
                {
                  title: 'AI and Ethics in Ministry',
                  tags: ['Ethics', 'Future'],
                  replies: 24,
                },
                {
                  title: 'Frontend Frameworks for Church Apps',
                  tags: ['React', 'NextJS'],
                  replies: 12,
                },
                {
                  title: 'Prayer Request Thread',
                  tags: ['Spiritual'],
                  replies: 45,
                },
              ].map((thread, i) => (
                <div
                  key={i}
                  className='p-5 hover:bg-zinc-50 transition-all group cursor-pointer flex items-center justify-between'
                >
                  <div className='space-y-1'>
                    <p className='text-sm font-bold group-hover:text-indigo-600 transition-colors'>
                      {thread.title}
                    </p>
                    <div className='flex gap-2'>
                      {thread.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-[9px] font-bold text-zinc-400 uppercase'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center gap-4 text-zinc-400'>
                    <div className='text-right'>
                      <p className='text-xs font-black text-zinc-900'>
                        {thread.replies}
                      </p>
                      <p className='text-[10px] font-medium uppercase'>
                        Replies
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      className='group-hover:translate-x-1 transition-transform'
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className='p-4 bg-zinc-50/50'>
              <Button className='w-full bg-white border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-100 font-black h-12 rounded-2xl gap-2'>
                <MessageSquarePlus size={18} /> New Topic
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* --- 3. KNOWLEDGE & SYNERGY --- */}
        <div className='space-y-6'>
          <Card className='rounded-3xl shadow-sm border-none bg-emerald-50/30 overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-black flex items-center gap-2 uppercase tracking-tighter text-emerald-800'>
                <BookOpen size={18} /> Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {resources.map((res, i) => (
                <div
                  key={i}
                  className='p-4 bg-white rounded-2xl flex items-center justify-between border border-emerald-100 shadow-sm group cursor-pointer hover:border-emerald-300 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-emerald-50 rounded-lg text-emerald-600'>
                      <LinkIcon size={14} />
                    </div>
                    <div>
                      <p className='text-xs font-black text-emerald-900'>
                        {res.title}
                      </p>
                      <p className='text-[10px] text-emerald-600/70 font-medium'>
                        {res.type} • {res.author}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant='outline'
                className='w-full text-xs font-bold h-10 border-dashed border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50 rounded-xl'
              >
                Contribute Resource
              </Button>
            </CardContent>
          </Card>

          <Card className='rounded-3xl shadow-sm border-none bg-zinc-900 text-white'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h5 className='text-[10px] font-black uppercase tracking-widest text-zinc-500'>
                  Pulse
                </h5>
                <Badge className='bg-green-500/20 text-green-400 border-none text-[9px]'>
                  LIVE
                </Badge>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex -space-x-3'>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className='w-10 h-10 rounded-full border-4 border-zinc-900 bg-zinc-800'
                    />
                  ))}
                  <div className='w-10 h-10 rounded-full border-4 border-zinc-900 bg-indigo-600 flex items-center justify-center text-xs font-bold'>
                    +14
                  </div>
                </div>
                <div>
                  <p className='text-sm font-black'>18 Active</p>
                  <p className='text-[10px] text-zinc-500 font-medium'>
                    In the last 24h
                  </p>
                </div>
              </div>

              <div className='mt-8 flex items-center gap-2 text-xs font-bold text-indigo-400 group cursor-pointer'>
                Meet the community{' '}
                <ArrowRight
                  size={14}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
