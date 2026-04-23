import { Loader2 } from 'lucide-react'
import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility to merge classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const SubmitButton = ({
  isLoading,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type='submit'
      disabled={isLoading || disabled}
      className={cn(
        'relative cursor-pointer flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all duration-200 active:scale-[0.98]',
        'bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20',
        'hover:bg-blue-700 hover:shadow-blue-500/30',
        'disabled:opacity-70 disabled:cursor-not-allowed disabled:grayscale-[0.5] disabled:hover:scale-100',
        'dark:bg-white dark:text-black dark:hover:bg-zinc-200',
        className,
      )}
    >
      {isLoading ? (
        <div className='flex items-center gap-2'>
          <Loader2 className='h-5 w-5 animate-spin' />
          <span className='tracking-tight'>Processing...</span>
        </div>
      ) : (
        <span className='flex items-center gap-2'>{children}</span>
      )}
    </button>
  )
}

export default SubmitButton

// import { LoaderIcon } from 'lucide-react'
// import React from 'react'

// interface ButtonProps {
//   isLoading?: boolean
//   disabled?: boolean
//   className?: string
//   children?: React.ReactNode
// }

// const SubmitButton = ({
//   isLoading,
//   disabled,
//   className,
//   children,
// }: ButtonProps) => {
//   return (
//     <button
//       type='submit'
//       disabled={isLoading || disabled}
//       className={
//         className ??
//         'bg-amber-800 hover:bg-amber-700 text-white w-full h-8 rounded-md cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
//       }
//     >
//       {isLoading ? (
//         <div className='flex items-center justify-center gap-4'>
//           <LoaderIcon className='animate-spin' /> <span>Loading...</span>{' '}
//         </div>
//       ) : (
//         children
//       )}
//     </button>
//   )
// }

// export default SubmitButton
