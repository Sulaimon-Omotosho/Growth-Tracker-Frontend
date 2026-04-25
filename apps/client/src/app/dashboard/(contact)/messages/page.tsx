'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Plus,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Circle,
  CheckCheck,
  ShieldCheck,
  Users,
  MessageSquare,
  User,
  Heart,
} from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function MessagesPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const contacts = [
    {
      id: 1,
      name: 'David Oladapo',
      lastMsg: 'The tech rider for Sunday is ready.',
      time: '10:24 AM',
      type: 'dept',
      online: true,
      unread: 2,
    },
    {
      id: 2,
      name: 'Living Streams Cell',
      lastMsg: 'Sarah: Amen! See you guys by 6.',
      time: '09:15 AM',
      type: 'cell',
      online: false,
      unread: 0,
    },
    {
      id: 3,
      name: 'Mariam J. (Design)',
      lastMsg: 'Can we review the logo?',
      time: 'Yesterday',
      type: 'dm',
      online: true,
      unread: 0,
    },
    {
      id: 4,
      name: 'Tech & Kingdom',
      lastMsg: 'New Repo Alert: ChurchApp-v2',
      time: 'Yesterday',
      type: 'interest',
      online: false,
      unread: 5,
    },
  ]

  return (
    <div className='flex h-[calc(100vh-120px)] overflow-hidden rounded-3xl border bg-white shadow-sm mt-6'>
      {/* --- 1. CATEGORY RAIL (SLIM) --- */}
      <div className='w-16 flex flex-col items-center py-6 border-r gap-6 bg-zinc-50/50'>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 h-10 w-10'
        >
          <Plus size={20} />
        </Button>
        <div className='flex flex-col gap-4'>
          {['all', 'dm', 'dept', 'cell', 'interest'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-400 hover:bg-zinc-200'}`}
            >
              {cat === 'all' && <MessageSquare size={18} />}
              {cat === 'dm' && <User size={18} />}
              {cat === 'dept' && <ShieldCheck size={18} />}
              {cat === 'cell' && <Heart size={18} />}
              {cat === 'interest' && <Users size={18} />}
            </button>
          ))}
        </div>
      </div>

      {/* --- 2. CONVERSATION LIST --- */}
      <div className='w-80 border-r flex flex-col bg-white'>
        <div className='p-6 space-y-4'>
          <h2 className='text-xl font-black tracking-tighter'>Messages</h2>
          <div className='relative'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400'
              size={16}
            />
            <Input
              placeholder='Search chats...'
              className='pl-10 bg-zinc-100 border-none rounded-xl h-10 text-xs font-medium'
            />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto'>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 mx-2 rounded-2xl flex gap-3 cursor-pointer transition-colors group mb-1 ${contact.id === 1 ? 'bg-blue-50' : 'hover:bg-zinc-50'}`}
            >
              <div className='relative'>
                <Avatar className='h-12 w-12'>
                  <AvatarFallback className='font-bold bg-zinc-100'>
                    {contact.name[0]}
                  </AvatarFallback>
                </Avatar>
                {contact.online && (
                  <div className='absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full' />
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-start mb-1'>
                  <p
                    className={`text-sm font-black truncate ${contact.id === 1 ? 'text-blue-900' : 'text-zinc-900'}`}
                  >
                    {contact.name}
                  </p>
                  <span className='text-[10px] text-zinc-400 font-bold'>
                    {contact.time}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-xs text-zinc-500 truncate font-medium'>
                    {contact.lastMsg}
                  </p>
                  {contact.unread > 0 && (
                    <Badge className='bg-blue-600 text-white border-none h-5 min-w-5 flex items-center justify-center text-[10px] font-black'>
                      {contact.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. CHAT INTERFACE --- */}
      <div className='flex-1 flex flex-col bg-white relative'>
        {/* Chat Header */}
        <div className='h-20 border-b flex items-center justify-between px-6 bg-white/80 backdrop-blur-md z-10'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarFallback className='font-bold bg-blue-100 text-blue-700'>
                DO
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-black'>David Oladapo</p>
              <div className='flex items-center gap-1'>
                <Circle size={8} className='fill-green-500 text-green-500' />
                <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-tighter'>
                  Active in Media Dept
                </span>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {/* <Button variant='ghost' size='icon' className='rounded-full'>
              <Phone size={18} className='text-zinc-500' />
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Video size={18} className='text-zinc-500' />
            </Button> */}
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Info size={18} className='text-zinc-500' />
            </Button>
          </div>
        </div>

        {/* Message Area */}
        <div className='flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/30'>
          <div className='flex justify-center'>
            <Badge
              variant='outline'
              className='bg-white text-zinc-400 border-zinc-100 text-[10px] font-bold'
            >
              TODAY
            </Badge>
          </div>

          {/* Received Message */}
          <div className='flex items-end gap-2 max-w-[80%]'>
            <Avatar className='h-6 w-6'>
              <AvatarFallback className='text-[8px] font-bold'>
                DO
              </AvatarFallback>
            </Avatar>
            <div className='bg-white border p-3 rounded-2xl rounded-bl-none shadow-sm'>
              <p className='text-sm font-medium text-zinc-800'>
                The tech rider for Sunday is ready. We need to check the SDI
                cables for the new monitor.
              </p>
              <p className='text-[9px] text-zinc-400 mt-1 font-bold'>
                10:24 AM
              </p>
            </div>
          </div>

          {/* Sent Message */}
          <div className='flex items-end gap-2 max-w-[80%] ml-auto flex-row-reverse'>
            <div className='bg-blue-600 p-3 rounded-2xl rounded-br-none shadow-md shadow-blue-100'>
              <p className='text-sm font-medium text-white'>
                On it. I'll be at the sanctuary by 4pm today to run those tests.
              </p>
              <div className='flex items-center justify-end gap-1 mt-1'>
                <p className='text-[9px] text-blue-200 font-bold'>10:26 AM</p>
                <CheckCheck size={12} className='text-blue-200' />
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className='p-6 bg-white'>
          <div className='flex items-center gap-3 bg-zinc-100 p-2 rounded-2xl border-2 border-transparent focus-within:border-blue-600 focus-within:bg-white transition-all'>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-xl text-zinc-400'
            >
              <Paperclip size={20} />
            </Button>
            <input
              placeholder='Type a message...'
              className='flex-1 bg-transparent border-none outline-none text-sm font-medium px-2'
            />
            <Button
              variant='ghost'
              size='icon'
              className='rounded-xl text-zinc-400'
            >
              <Smile size={20} />
            </Button>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 rounded-xl p-0'>
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
