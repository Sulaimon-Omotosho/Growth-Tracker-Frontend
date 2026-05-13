'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { OnboardingParticipant, User } from '@repo/types'
import { getNextMeetingDate } from '@/lib/utils'

const CellCard = ({ user }: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const nextMeeting = getNextMeetingDate()

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  const onboardingCellName = user?.onboardingParticipations?.find(
    (p: OnboardingParticipant) => p.onboardingRoom.cell !== null,
  )?.onboardingRoom.cell?.name

  const onboardingCellLeader = user?.onboardingParticipations?.find(
    (p: OnboardingParticipant) => p.onboardingRoom.cell !== null,
  )?.onboardingRoom.cell?.name

  const displayCellName =
    user?.cell?.name || onboardingCellName || 'Join a Cell'

  if (!user?.cell && !onboardingCellName) {
    return (
      <div className='px-4 py-8 mt-4 border border-dashed rounded-md text-center text-muted-foreground'>
        <p className='text-sm'>You haven't joined a cell yet.</p>
      </div>
    )
  }

  // const leaderName = user.cell.leader
  //   ? `${user.cell.leader.firstName} ${user.cell.leader.lastName}`
  //   : 'No Leader Assigned'
  const leaderName =
    onboardingCellLeader ||
    `${user.cell.leader.firstName} ${user.cell.leader.lastName}` ||
    'No Cell leader'

  return (
    <div className='px-4 py-4 lg:py-2 mt-4 outline-1 rounded-md shadow-sm relative'>
      {onboardingCellName && (
        <div className='absolute top-0.5 w-full flex justify-center'>
          <p className=' text-xs bg-green-300 rounded-full p-0.5 text-center'>
            Onboarding
          </p>
        </div>
      )}
      {/* HEAD  */}
      <div className='flex items-center justify-between px-5'>
        <h2 className='font-bold text-lg'>{displayCellName}</h2>
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
