'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sparkles,
  MessageSquare,
  Trophy,
  Video,
  Hash,
  Compass,
  PlusCircle,
  Zap,
  Bookmark,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { RightDrawer } from '@/components/dashboard/RightDrawer'
import JoinSmallGroup from '@/components/forms/JoinSmallGroup'
import { myGroups } from '@/lib/mock'
import { useJoinSmallGroup } from '@/hooks/use-church'
import { useUser } from '@/utils/userContext'

export default function InterestGroupHub() {
  const { user } = useUser()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [isOpen, setIsOpen] = useState<'smg' | null>(null)
  const joinSMG = useJoinSmallGroup()

  return (
    <div className='max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 pt-2'>
      {/* --- 1. THE HORIZONTAL GROUP SWITCHER --- */}
      <div className='flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar pt-3'>
        <RightDrawer
          trigger={
            <Button
              variant='outline'
              className='shrink-0 h-20 w-20 rounded-3xl border-dashed border-2 flex flex-col gap-1 border-zinc-300 cursor-pointer'
            >
              <PlusCircle size={20} className='text-zinc-400' />
              <span className='text-[10px] font-bold uppercase'>Join</span>
            </Button>
            // <SidebarMenuAction>
            //   <Plus />
            // </SidebarMenuAction>
          }
          title='Join Small Group'
          open={isOpen === 'smg'}
          onOpenChange={(open) => setIsOpen(open ? 'smg' : null)}
          submitLabel='Submit'
          formId='join-smg'
          isLoading={joinSMG.isPending}
          isSubmitDisabled={isSubmitDisabled}
        >
          <JoinSmallGroup
            user={user!}
            mutation={joinSMG}
            onSuccess={() => setIsOpen(null)}
            onValidationChange={setIsSubmitDisabled}
          />
        </RightDrawer>
        {/* <Button
          variant='outline'
          className='flex-shrink-0 h-20 w-20 rounded-3xl border-dashed border-2 flex flex-col gap-1 border-zinc-300'
        >
          <PlusCircle size={20} className='text-zinc-400' />
          <span className='text-[10px] font-bold uppercase'>Join</span>
        </Button> */}
        {myGroups.map((group) => (
          <div
            key={group.id}
            className='relative group cursor-pointer shrink-0'
          >
            <div
              className={`h-20 w-20 rounded-3xl bg-linear-to-br ${group.color} shadow-lg transition-transform group-hover:scale-105 flex items-center justify-center text-white font-black text-xl`}
            >
              {group.name.charAt(0)}
            </div>
            {group.updates > 0 && (
              <div className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black h-6 w-6 rounded-full border-4 border-white flex items-center justify-center'>
                {group.updates}
              </div>
            )}
            <p className='text-[10px] text-center mt-2 font-black uppercase tracking-tighter text-zinc-500 truncate w-20'>
              {group.name}
            </p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* --- 2. MAIN FEED (THE "CURIOSITY" STREAM) --- */}
        <div className='lg:col-span-3 space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-black tracking-tighter flex items-center gap-2'>
              <Compass className='text-blue-600' /> What's Happening in{' '}
              {myGroups[0].name}
            </h2>
            <div className='flex gap-2'>
              <Button
                variant='ghost'
                size='sm'
                className='text-xs font-bold text-zinc-400'
              >
                Recent
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='text-xs font-bold text-blue-600 bg-blue-50'
              >
                Trending
              </Button>
            </div>
          </div>

          {[
            {
              user: 'Ayo B.',
              content:
                'Has anyone looked into using AI for sermon transcriptions? Found this repo that looks promising.',
              tags: ['Tech', 'OpenSource'],
              time: '40m ago',
              reactions: 12,
            },
            {
              user: 'Mariam J.',
              content:
                "Meetup this Saturday at the Hub! We're doing a whiteboard session on Architecture.",
              tags: ['Event', 'Planning'],
              time: '2h ago',
              reactions: 8,
            },
          ].map((post, i) => (
            <Card
              key={i}
              className='rounded-3xl border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden'
            >
              <CardContent className='p-6'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10 border-2 border-white shadow-sm'>
                      <AvatarFallback className='bg-zinc-100 font-bold'>
                        {post.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-black'>{post.user}</p>
                      <p className='text-[10px] text-zinc-400 font-medium'>
                        {post.time}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <Bookmark size={18} className='text-zinc-400' />
                  </Button>
                </div>
                <p className='text-zinc-700 leading-relaxed mb-4 font-medium'>
                  {post.content}
                </p>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-2'>
                    {post.tags.map((t) => (
                      <Badge
                        key={t}
                        className='bg-zinc-50 text-zinc-500 hover:bg-zinc-100 border-none font-bold text-[9px] uppercase tracking-widest'
                      >
                        #{t}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1 text-zinc-400 cursor-pointer hover:text-blue-600 transition-colors'>
                      <MessageSquare size={16} />{' '}
                      <span className='text-xs font-bold'>
                        {post.reactions}
                      </span>
                    </div>
                    <div className='flex items-center gap-1 text-zinc-400 cursor-pointer hover:text-rose-500 transition-colors'>
                      <Zap size={16} />{' '}
                      <span className='text-xs font-bold'>3</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- 3. THE "SIDESHOW" (RESOURCES & COMMUNITY) --- */}
        <div className='space-y-6'>
          <Card className='rounded-3xl border-none bg-zinc-900 text-white overflow-hidden'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center justify-between'>
                Leaderboards <Trophy size={14} className='text-yellow-500' />
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between p-2 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <span className='text-xs font-black text-zinc-600'>01</span>
                  <p className='text-sm font-bold'>Sarah Jenkins</p>
                </div>
                <Badge className='bg-blue-500/20 text-blue-400 border-none text-[10px]'>
                  +450 XP
                </Badge>
              </div>
              <Button className='w-full bg-white text-zinc-900 font-black rounded-2xl h-12 hover:bg-zinc-100 transition-colors'>
                View Rankings
              </Button>
            </CardContent>
          </Card>

          <Card className='rounded-3xl border-none bg-blue-50'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xs font-black uppercase tracking-widest text-blue-400'>
                Group Links
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              {[
                { title: 'Project Repo', icon: <Hash size={14} /> },
                { title: 'Resources Folder', icon: <Bookmark size={14} /> },
                { title: 'Zoom Meetup', icon: <Video size={14} /> },
              ].map((link, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between p-3 rounded-xl hover:bg-white transition-all cursor-pointer group'
                >
                  <div className='flex items-center gap-3 text-blue-900'>
                    {link.icon}
                    <span className='text-xs font-black'>{link.title}</span>
                  </div>
                  <ExternalLink
                    size={14}
                    className='text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity'
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className='p-6 bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden group cursor-pointer'>
            <Sparkles className='absolute right-[-10%] bottom-[-10%] w-32 h-32 opacity-10 group-hover:scale-110 transition-transform' />
            <p className='text-[10px] font-black uppercase tracking-[0.2em] opacity-60'>
              Weekly Challenge
            </p>
            <h4 className='text-lg font-black mt-2 tracking-tight'>
              The "100 Lines of Code" Sprint
            </h4>
            <div className='mt-6 flex items-center gap-2 font-black text-xs group-hover:translate-x-2 transition-transform'>
              Join Challenge <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
