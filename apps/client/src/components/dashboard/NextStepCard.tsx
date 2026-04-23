import Link from 'next/link'
import { NextStepChart } from './NextStepChart'
import CellCard from './CellCard'
import { User } from '@repo/types'
import { ChevronRight } from 'lucide-react'
import StepItem from './StepItem'

const progressColor = (value: number) =>
  value === 100 ? '[&>div]:bg-green-500' : ''

const NextStepCard = ({ user }: { user: User }) => {
  // console.log('Next step Card:', user)

  return (
    <section className='bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden'>
      <div className='flex flex-col xl:flex-row'>
        {/* Left Side  */}
        <div className='p-6 flex-1 border-b xl:border-b-0 xl:border-r border-gray-100 dark:border-gray-800'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='font-bold text-gray-900 dark:text-white uppercase tracking-tight text-xs'>
              My Milestones
            </h3>
            <Link
              href='/milestones'
              className='text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5'
            >
              FULL ROADMAP <ChevronRight className='w-3 h-3' />
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6'>
            <StepItem label='New Believer' value={100} />
            <StepItem label='Growth Track' value={75} />
            <StepItem label='Foundation Class' value={25} />
            <StepItem label='Water Baptism' value={25} />
          </div>

          <div className='mt-8'>
            <CellCard user={user} />
          </div>
        </div>

        {/* Right Side  */}
        <div className='p-6 flex-1 bg-gray-50/50 dark:bg-gray-800/20 flex flex-col justify-center'>
          <div className='text-center mb-2'>
            <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
              Overall Completion
            </p>
          </div>
          <div className='h-full min-h-50'>
            <NextStepChart />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NextStepCard
