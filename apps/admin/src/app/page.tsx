import { ModeToggle } from '@/components/ThemeToggle'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export default async function AdminLanding() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (accessToken) {
    redirect('/admin')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#09090b] relative overflow-hidden'>
      {/* Decorative background element for that "Admin" feel */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size:[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />

      <div className='absolute top-6 right-6 z-10'>
        <ModeToggle />
      </div>

      <main className='relative z-10 flex w-full max-w-lg flex-col items-center justify-center py-20 px-8 text-center'>
        {/* Branding Icon */}
        <div className='mb-8 p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 text-blue-600'>
          <ShieldCheck size={48} strokeWidth={1.5} />
        </div>

        <div className='space-y-2 mb-10'>
          <h1 className='font-black text-5xl tracking-tighter italic uppercase'>
            The Growth <span className='text-blue-600'>Tracker</span>
          </h1>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] font-black uppercase tracking-widest'>
            Administrative Access Only
          </div>
        </div>

        <Link
          href='/login'
          className='group flex items-center gap-3 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-8 py-4 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]'
        >
          Authenticate to Continue
          <ArrowRight
            size={18}
            className='group-hover:translate-x-1 transition-transform'
          />
        </Link>

        <p className='mt-8 text-xs text-muted-foreground max-w-70 leading-relaxed'>
          Access is restricted to authorized church administrators. Unauthorized
          access attempts are logged.
        </p>
      </main>
    </div>
  )
}
