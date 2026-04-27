'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserPlus, Send } from 'lucide-react'

export function ReportDialog({
  trigger,
  deptName,
}: {
  trigger: React.ReactNode
  deptName: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-106 rounded-3xl border-none backdrop-blur-xl bg-white/90 shadow-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-black tracking-tight'>
            Submit Report
          </DialogTitle>
          <DialogDescription className='text-xs font-medium text-zinc-500'>
            For the {deptName} unit.
          </DialogDescription>
        </DialogHeader>
        <form className='space-y-4 pt-2' onSubmit={(e) => e.preventDefault()}>
          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase text-zinc-400'>
              Headcount / Attendance
            </label>
            <input
              type='number'
              className='w-full p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-sm focus:outline-blue-600'
              placeholder='0'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase text-zinc-400'>
              Summary of Activities
            </label>
            <textarea
              className='w-full h-32 p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-sm focus:outline-blue-600 resize-none'
              placeholder='What happened today?'
            />
          </div>
          <Button className='w-full bg-zinc-900 h-12 rounded-xl font-bold gap-2'>
            <Send size={16} /> Send Report
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// --- 2. ROSTER DIALOG ---
export function RosterDialog({
  trigger,
  members,
  deptName,
}: {
  trigger: React.ReactNode
  members: any[]
  deptName: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-106 rounded-3xl border-none backdrop-blur-xl bg-white/90 shadow-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-black tracking-tight'>
            Unit Roster
          </DialogTitle>
          <DialogDescription className='text-xs font-medium text-zinc-500'>
            {members?.length || 0} Members in {deptName}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-75 pr-4'>
          <div className='space-y-3'>
            {members?.map((member) => (
              <div
                key={member.id}
                className='flex items-center justify-between p-2 rounded-xl hover:bg-zinc-100/50 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <Avatar className='h-10 w-10 border-2 border-white'>
                    <AvatarImage src={member.image} />
                    <AvatarFallback className='bg-zinc-200 text-[10px] font-bold'>
                      {member.firstName?.[0]}
                      {member.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-xs font-black text-zinc-900'>
                      {member.firstName} {member.lastName}
                    </p>
                    <p className='text-[10px] text-zinc-500 font-bold uppercase'>
                      {member.username || 'Member'}
                    </p>
                  </div>
                </div>
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-8 w-8 rounded-full text-zinc-400'
                >
                  <UserPlus size={14} />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
