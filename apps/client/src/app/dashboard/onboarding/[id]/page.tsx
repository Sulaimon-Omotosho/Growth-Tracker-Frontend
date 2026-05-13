'use client'

import { LeaderContactCard } from '@/components/dashboard/onboarding/LeaderContactCard'
import { OnboardingChecklist } from '@/components/dashboard/onboarding/OnboardingChecklist'
import { OnboardingHeader } from '@/components/dashboard/onboarding/OnboardingHeader'
import { ProbationProgressCard } from '@/components/dashboard/onboarding/ProbationProgressCard'
import { QuickLinks } from '@/components/dashboard/onboarding/QuickLinks'
import { OnboardingSkeleton } from '@/components/skeletons/OnboardingSkeleton'
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
import { useGetMyOnboardings, useGetOnboardingRoom } from '@/hooks/get-church'
import { useExitOnboarding } from '@/hooks/use-church'
import { Loader2, LogOut } from 'lucide-react'
import { use } from 'react'

export default function OnboardingRoom({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const { mutate: exit, isPending } = useExitOnboarding()
  const roomId = resolvedParams.id
  const { data: room, isLoading } = useGetOnboardingRoom(roomId)
  const { data: myOnboardings } = useGetMyOnboardings()
  if (isLoading) return <OnboardingSkeleton />

  const participant = myOnboardings?.find((o: any) => o.roomId === roomId)
  // const user = participant?.user

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 p-6'>
      <OnboardingHeader
        title={room?.cell?.name || room?.department?.name || ''}
        type={room?.cell ? 'CELL' : 'DEPT'}
        status={participant?.status}
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
        <div className='lg:col-span-2 space-y-6'>
          <ProbationProgressCard
            startDate={participant?.joinedAt}
            endDate={participant?.expectedEndDate}
          />
          <OnboardingChecklist items={room?.requirements} />
        </div>

        <div className='space-y-6'>
          <LeaderContactCard leader={room?.cell?.leader} />
          <QuickLinks links={room?.cell?.resources} />

          {/* EXIT ACTION */}
          <div className='pt-10 border-t border-slate-200 dark:border-slate-800'>
            <div className='bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/30'>
              <h3 className='text-red-800 dark:text-red-400 font-bold text-lg'>
                Exit Onboarding
              </h3>
              <p className='text-red-600/70 dark:text-red-400/60 text-sm mb-4'>
                Exiting will delete your current progress and notify the
                leadership.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive' className='gap-2'>
                    <LogOut size={16} /> Exit Onboarding
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='backdrop-blur-md bg-white/90 dark:bg-slate-950/90'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. You will be removed from
                      this probation room and your progress will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Onboarding</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => exit(roomId)}
                      className='bg-red-600 hover:bg-red-700 text-white'
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className='animate-spin' />
                      ) : (
                        'Yes, Exit Room'
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
