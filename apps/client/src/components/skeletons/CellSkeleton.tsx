'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CellSkeleton() {
  return (
    <div className='max-w-4xl mx-auto space-y-6 animate-pulse pb-24'>
      {/* Welcome Mat Skeleton */}
      <div className='h-48 rounded-3xl bg-zinc-100 flex items-center p-8'>
        <div className='flex flex-col md:flex-row md:items-center justify-between w-full gap-6'>
          <div className='space-y-3'>
            <div className='flex gap-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-24' />
            </div>
            <Skeleton className='h-10 w-64' />
            <Skeleton className='h-4 w-48' />
          </div>
          <div className='flex -space-x-3'>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className='w-12 h-12 rounded-full border-4 border-white bg-zinc-200'
              />
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Logistics Skeleton */}
        <Card className='md:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden'>
          <CardHeader className='bg-zinc-50/50 border-b pb-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-5 w-20 rounded-full' />
            </div>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='space-y-6'>
                <div className='flex items-start gap-3'>
                  <Skeleton className='h-9 w-9 rounded-xl' />
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-12' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Skeleton className='h-9 w-9 rounded-xl' />
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-12' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              </div>
              <Skeleton className='h-32 rounded-2xl' />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Skeleton */}
        <div className='space-y-4'>
          <Skeleton className='w-full h-14 rounded-2xl' />
          <Skeleton className='w-full h-14 rounded-2xl' />
          <Skeleton className='w-full h-14 rounded-2xl' />
        </div>
      </div>

      {/* Updates Section Skeleton */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-4'>
          <Skeleton className='h-4 w-32 ml-1' />
          <Card className='rounded-2xl border-none shadow-sm'>
            <CardContent className='p-5 space-y-4'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-8 w-8 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-3 w-32' />
                  <Skeleton className='h-2 w-16' />
                </div>
              </div>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
            </CardContent>
          </Card>
        </div>

        {/* Growth Card Skeleton */}
        <Card className='rounded-3xl border-none bg-zinc-50 shadow-sm'>
          <CardContent className='p-6 space-y-6'>
            <Skeleton className='h-5 w-24' />
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Skeleton className='h-2 w-20' />
                <Skeleton className='h-2 w-12' />
              </div>
              <Skeleton className='h-2 w-full' />
            </div>
            <Skeleton className='h-20 w-full rounded-2xl' />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
