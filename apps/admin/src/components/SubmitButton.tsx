import { Loader2 } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
}

const SubmitButton = ({
  isLoading,
  className,
  children,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      'bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:opacity-90',
    secondary:
      'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700',
    outline:
      'border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900',
  }

  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        'relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer',
        variants[variant],
        className,
      )}
    >
      <span className={cn('flex items-center gap-2', isLoading && 'invisible')}>
        {children}
      </span>

      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center gap-2 animate-in fade-in zoom-in-95 duration-200'>
          <Loader2 className='w-4 h-4 animate-spin' />
          <span className='text-[10px] uppercase tracking-widest font-black'>
            Processing
          </span>
        </div>
      )}
    </button>
  )
}

export default SubmitButton
