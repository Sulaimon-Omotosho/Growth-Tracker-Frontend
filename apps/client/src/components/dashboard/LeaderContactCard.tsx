'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, ChevronRight, X, Mail, MessageCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function LeaderContactCard({ leader }: { leader: any }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className='bg-zinc-50 border-none rounded-2xl overflow-hidden min-h-30 relative'>
      <div
        className={`transition-all duration-300 ease-in-out ${showDetails ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
      >
        {!showDetails && (
          <CardContent
            className='p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-100/50'
            onClick={() => setShowDetails(true)}
          >
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-white rounded-lg shadow-sm text-green-600'>
                <Phone size={16} />
              </div>
              <p className='text-xs font-bold text-zinc-800'>Contact Leader</p>
            </div>
            <ChevronRight size={16} className='text-zinc-400' />
          </CardContent>
        )}
      </div>

      <div
        className={`absolute inset-0 transition-all duration-300 ease-in-out ${showDetails ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
      >
        {showDetails && (
          <CardContent className='p-3 h-full flex items-center justify-between'>
            <div className='flex flex-col items-center gap-3 justify-start'>
              <Avatar className='h-10 w-10 border-2 border-white shadow-sm'>
                <AvatarImage src={leader?.image} />
                <AvatarFallback className='bg-zinc-200 text-[10px]'>
                  {leader?.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='space-y-0.5'>
                <p className='text-xs font-black text-zinc-900'>
                  {leader?.username}
                </p>
                <div className='flex flex-col gap-1 pl-2'>
                  <a
                    href={`tel:${leader?.phone}`}
                    className='flex items-center gap-1 text-[10px] text-green-600 font-bold'
                  >
                    <Phone size={10} /> Call {leader?.phone}
                  </a>
                  <a
                    href={`mailto:${leader?.email}`}
                    className='flex items-center gap-1 text-[10px] text-blue-600 font-bold'
                  >
                    <Mail size={10} /> Email {leader?.email}
                  </a>
                  <Link
                    // href={`mailto:${leader?.email}`}
                    href={'/dashboard/messages'}
                    className='flex items-center gap-1 text-[10px] text-blue-600 font-bold'
                  >
                    <MessageCircle size={10} /> G-Message
                  </Link>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className='p-2 hover:bg-zinc-200 rounded-full'
            >
              <X size={14} className='text-zinc-400' />
            </button>
          </CardContent>
        )}
      </div>
    </Card>
  )
}
