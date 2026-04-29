'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEnrollInCourse } from '@/hooks/use-church'

const EnrollButton = ({
  courseId,
  courseTitle,
}: {
  courseId: string
  courseTitle: string
}) => {
  const enrollMutation = useEnrollInCourse()

  const handleEnroll = () => {
    enrollMutation.mutate(courseId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='lg'
          className='bg-white text-zinc-900 font-bold rounded-xl hover:bg-zinc-200'
        >
          Enroll in Course
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className='rounded-3xl border-zinc-100'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl font-black'>
            Confirm Enrollment
          </AlertDialogTitle>
          <AlertDialogDescription className='text-zinc-500'>
            You are about to enroll in{' '}
            <span className='font-bold text-zinc-900'>"{courseTitle}"</span>.
            This will add the track to your dashboard and allow you to begin the
            first session.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='gap-2'>
          <AlertDialogCancel className='rounded-xl font-bold border-zinc-200'>
            Maybe Later
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleEnroll}
            disabled={enrollMutation.isPending}
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl'
          >
            {enrollMutation.isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Enrolling...
              </>
            ) : (
              'Yes, Start Learning'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EnrollButton
