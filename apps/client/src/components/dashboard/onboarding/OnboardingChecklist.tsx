import { CheckCircle2, Circle } from 'lucide-react'

const steps = [
  { id: 1, label: 'Submit Application', completed: true },
  { id: 2, label: 'Interview with Leader', completed: true },
  { id: 3, label: 'Attend 3 Consecutive Meetings', completed: false },
  { id: 4, label: 'Final Pastoral Review', completed: false },
]

export const OnboardingChecklist = ({ items }: { items: any }) => (
  <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm'>
    <h3 className='text-lg font-semibold mb-6'>Your Roadmap</h3>
    <div className='space-y-8 relative'>
      <div className='absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800' />
      {steps.map((step) => (
        <div key={step.id} className='flex gap-4 relative z-10'>
          {step.completed ? (
            <CheckCircle2
              className='text-emerald-500 bg-white dark:bg-slate-900 rounded-full'
              size={24}
            />
          ) : (
            <Circle
              className='text-slate-300 dark:text-slate-700 bg-white dark:bg-slate-900 rounded-full'
              size={24}
            />
          )}
          <span
            className={`font-medium ${step.completed ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  </div>
)
