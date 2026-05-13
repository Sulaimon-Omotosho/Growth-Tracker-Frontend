import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Users, Building2, ChevronRight, Calendar } from 'lucide-react'
import { differenceInDays, format } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const OnboardingCard = ({ participant }: any) => {
  const room = participant.onboardingRoom
  const isCell = !!room.cell
  const groupName = room.cell?.name || room.department?.name

  // Calculate Progress
  const totalDays = differenceInDays(
    new Date(participant.expectedEndDate),
    new Date(participant.joinedAt),
  )
  const daysPassed = differenceInDays(
    new Date(),
    new Date(participant.joinedAt),
  )
  const progress = Math.max(
    0,
    Math.min(Math.round((daysPassed / totalDays) * 100), 100),
  )

  return (
    <Card className='group hover:shadow-xl transition-all border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col'>
      <CardHeader className='p-6'>
        <div className='flex justify-between items-start mb-4'>
          <div
            className={`p-2 rounded-lg ${isCell ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}
          >
            {isCell ? <Users size={20} /> : <Building2 size={20} />}
          </div>
          <Badge
          // variant={
          //   participant.status === 'EXTENDED' || 'ONBOARDING'
          // }
          >
            {participant.status}
          </Badge>
        </div>

        <h3 className='text-xl font-bold line-clamp-1'>{groupName}</h3>
        <p className='text-sm text-slate-500'>
          {isCell ? 'Cell Group' : 'Department'}
        </p>
      </CardHeader>

      <div className='px-6 space-y-3 flex-1'>
        <div className='flex justify-between text-xs font-medium text-slate-400 uppercase tracking-wider'>
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className='h-2' />

        <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 pt-2'>
          <Calendar size={14} />
          <span>
            Ends {format(new Date(participant.expectedEndDate), 'MMM do')}
          </span>
        </div>
      </div>

      <CardFooter className='p-4 mt-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800'>
        <Link href={`/dashboard/onboarding/${room.id}`} className='w-full'>
          <Button
            variant='ghost'
            className='w-full justify-between group-hover:text-primary transition-colors'
          >
            Enter Room
            <ChevronRight
              size={18}
              className='group-hover:translate-x-1 transition-transform'
            />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
