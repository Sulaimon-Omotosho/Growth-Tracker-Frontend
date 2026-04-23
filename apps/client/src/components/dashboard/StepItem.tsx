import React from 'react'
import { Progress } from '../ui/progress'
import { CheckCircle2 } from 'lucide-react'

const StepItem = ({ label, value }: { label: string; value: number }) => {
  const isComplete = value === 100

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex justify-between items-center px-1'>
        <div className='flex items-center gap-2'>
          {isComplete ? (
            <CheckCircle2 className='w-4 h-4 text-green-500' />
          ) : (
            <div className='w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse' />
          )}
          <p
            className={`text-sm font-medium ${isComplete ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
          >
            {label}
          </p>
        </div>
        <span className='text-[11px] font-bold text-gray-400'>{value}%</span>
      </div>
      <Progress
        value={value}
        className={`h-2 transition-all ${isComplete ? '[&>div]:bg-green-500' : '[&>div]:bg-blue-600'}`}
      />
    </div>
  )
}

export default StepItem
