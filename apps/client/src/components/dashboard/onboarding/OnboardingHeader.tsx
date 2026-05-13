import { Badge } from '@/components/ui/badge'
import { Users, Building2, Rocket } from 'lucide-react'

interface HeaderProps {
  title: string
  type: 'CELL' | 'DEPT'
  status: string
}

export const OnboardingHeader = ({ title, type, status }: HeaderProps) => {
  const isCell = type === 'CELL'

  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
      <div className='flex items-center gap-4'>
        <div
          className={`p-3 rounded-2xl ${isCell ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}
        >
          {isCell ? <Users size={32} /> : <Building2 size={32} />}
        </div>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
            {title}
          </h1>
          <p className='text-slate-500 flex items-center gap-2'>
            <Rocket size={14} /> Journey to Membership
          </p>
        </div>
      </div>
      <Badge
        className={`px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider animate-pulse
        ${status === 'APPROVED' ? 'bg-green-500' : 'bg-amber-500'}`}
      >
        {status}
      </Badge>
    </div>
  )
}
