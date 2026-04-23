'use client'

import { UnauthorizedCard } from '@/components/UnauthorizedCard'
import { useMe } from '@/hooks/use-user'
import { Loader2, ShieldAlert, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const Unauthorized = () => {
  const { data, isLoading, isError } = useMe()

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-[#09090b]'>
        <Loader2 className='w-6 h-6 animate-spin text-zinc-400 mb-4' />
        <p className='text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500'>
          Verifying Credentials
        </p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-[#09090b] px-6 text-center'>
        <div className='p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 mb-4'>
          <ShieldAlert className='text-red-600 dark:text-red-500' size={24} />
        </div>
        <h2 className='font-bold text-lg tracking-tight'>
          Authentication Error
        </h2>
        <p className='text-sm text-muted-foreground mt-1 max-w-[250px]'>
          We couldn't verify your administrative privileges.
        </p>
        <Link
          href='/login'
          className='mt-6 text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-2'
        >
          <ArrowLeft size={14} /> Return to Login
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full bg-zinc-50 dark:bg-[#08080a] px-6'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center space-y-2'>
          <h1 className='font-black text-2xl uppercase tracking-tighter'>
            Access <span className='text-zinc-400'>Restricted</span>
          </h1>
          <div className='flex items-center justify-center gap-2'>
            <span className='text-[10px] text-muted-foreground uppercase font-bold tracking-widest'>
              Current Identity:
            </span>
            <span className='px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400'>
              {data.role}
            </span>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white dark:via-transparent dark:to-[#08080a] z-10 pointer-events-none h-full w-full' />
          <UnauthorizedCard />
        </div>

        <div className='flex justify-center'>
          <Link
            href='/'
            className='text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors'
          >
            Request Elevation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
