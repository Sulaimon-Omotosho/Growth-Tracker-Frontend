import { ChevronRight } from 'lucide-react'

interface SummaryCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
}

const ProfileStatCard = ({ label, value }: SummaryCardProps) => {
  return (
    <div className='flex justify-between rounded-lg bg-gray-200 dark:bg-gray-900 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group'>
      <div className='text-sm flex flex-col p-3 gap-1'>
        <span className='text-gray-500 dark:text-gray-400 font-medium text-[11px] uppercase tracking-wider'>
          {label}
        </span>
        <span className='text-xl font-bold tracking-tight'>{value}</span>
      </div>
      <div className='border-l border-gray-300 dark:border-gray-700 px-2 flex items-center group-hover:bg-gray-300 dark:group-hover:bg-gray-800 rounded-r-lg transition-colors'>
        <ChevronRight className='w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors' />
      </div>
    </div>
  )
}

export default ProfileStatCard
