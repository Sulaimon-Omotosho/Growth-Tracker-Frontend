'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { User } from '@repo/types'
import { getNextMeetingDate } from '@/lib/utils'

const CellCard = ({ user }: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const nextMeeting = getNextMeetingDate()
  console.log('Cell Card:', user)

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  if (!user?.cell) {
    return (
      <div className='px-4 py-8 mt-4 border border-dashed rounded-md text-center text-muted-foreground'>
        <p className='text-sm'>You haven't joined a cell yet.</p>
      </div>
    )
  }

  const leaderName = user.cell.leader
    ? `${user.cell.leader.firstName} ${user.cell.leader.lastName}`
    : 'No Leader Assigned'

  return (
    <div className='px-4 py-4 lg:py-2 mt-4 outline-1 rounded-md shadow-sm'>
      {/* HEAD  */}
      <div className='flex items-center justify-between px-5'>
        <h2 className='font-bold text-lg'>{user.cell.name}</h2>
        <Image
          src='/assets/logo.jpeg'
          alt='logo'
          width={100}
          height={100}
          className='w-10 h-10 rounded-lg'
        />
      </div>
      {/* DETAILS  */}
      <div className='flex flex-col gap-1'>
        <div className='flex justify-between'>
          <p className='font-semibold'>Cell Leader</p>
          <span className=''>{leaderName}</span>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Next Meeting</p>
          <span className=''>{nextMeeting}</span>
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between pb-2'>
            <p className='font-semibold text-sm pb-1'>Message Leader</p>
            <button className='px-10 py-1 rounded-full bg-blue-500 hover:bg-blue-700 hover:cursor-pointer transition-all duration-300'>
              Send
            </button>
          </div>
          <Textarea
            ref={textareaRef}
            placeholder='Message...'
            rows={1}
            onInput={autoResize}
            className='resize-none min-h-23.5 max-h-23.5 overflow-y-auto wrap-break-word whitespace-pre-wrap'
          />
        </div>
      </div>
    </div>
  )
}

export default CellCard
