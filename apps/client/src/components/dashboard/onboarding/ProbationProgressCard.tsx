import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatDistanceToNow, differenceInDays, parseISO } from 'date-fns'
import { Rocket } from 'lucide-react'

export const ProbationProgressCard = ({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate: Date
}) => {
  const start =
    typeof startDate === 'string' ? parseISO(startDate) : new Date(startDate)
  const end =
    typeof endDate === 'string' ? parseISO(endDate) : new Date(endDate)
  const now = new Date()

  const totalDays = differenceInDays(end, start)
  const daysPassed = differenceInDays(now, start)
  const progress =
    totalDays > 0
      ? Math.min(Math.round((daysPassed / totalDays) * 100), 100)
      : 0

  return (
    <Card className='border-none bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-xl overflow-hidden relative'>
      <div className='absolute top-0 right-0 p-8 opacity-10'>
        <Rocket size={120} />
      </div>
      <CardContent className='p-8'>
        <h3 className='text-xl font-semibold mb-2'>Probation Timeline</h3>
        <p className='text-slate-400 mb-8'>
          Ends in {formatDistanceToNow(new Date(endDate))}
        </p>

        <div className='space-y-4'>
          <div className='flex justify-between text-sm font-medium'>
            <span>{progress}% Completed</span>
            <span>{totalDays - daysPassed} Days Left</span>
          </div>
          <Progress value={progress} className='h-3 bg-white/10' />
        </div>
      </CardContent>
    </Card>
  )
}
