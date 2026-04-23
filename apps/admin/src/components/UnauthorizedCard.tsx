'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useLogout } from '@/hooks/use-auth'
import { LogOut, ShieldX } from 'lucide-react'
import SubmitButton from './SubmitButton'
// import SubmitButton from '../SubmitButton'

export function UnauthorizedCard() {
  const logout = useLogout()

  return (
    <Card className='mx-auto w-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-none rounded-2xl overflow-hidden'>
      <CardHeader className='space-y-1 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-900 pb-4'>
        <div className='flex items-center gap-2 mb-1'>
          <ShieldX size={16} className='text-zinc-400' />
          <CardTitle className='text-sm font-black uppercase tracking-widest'>
            Access Protocol
          </CardTitle>
        </div>
        <CardDescription className='text-xs font-medium'>
          Insufficient Permission Level
        </CardDescription>
      </CardHeader>

      <CardContent className='pt-6 pb-2 space-y-4'>
        <div className='space-y-2'>
          <p className='text-[11px] font-bold uppercase tracking-wider text-zinc-400'>
            System Message:
          </p>
          <p className='text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium'>
            Only authorized{' '}
            <span className='text-zinc-900 dark:text-zinc-100 font-bold'>
              HICC Gbagada
            </span>{' '}
            leadership personnel are permitted to access the administrative
            console.
          </p>
        </div>

        <div className='p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800'>
          <p className='text-[10px] leading-snug text-muted-foreground italic'>
            If you believe this is an error, please contact the System
            Administrator to update your role assignment.
          </p>
        </div>
      </CardContent>

      <CardFooter className='pt-4'>
        <SubmitButton
          onClick={() => logout.mutate()}
          isLoading={logout.isPending}
          variant='outline'
          className='w-full h-10 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900'
        >
          <LogOut size={14} className='mr-2' />
          Terminate Session
        </SubmitButton>
      </CardFooter>
    </Card>
  )
}
