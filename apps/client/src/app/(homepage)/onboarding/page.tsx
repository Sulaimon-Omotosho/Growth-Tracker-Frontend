'use client'

import Onboarding from '@/components/forms/Onboarding'
import { useMe } from '@/hooks/get-user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2, UserCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function OnboardingPage() {
  const { data: user, isLoading, error } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (user?.username) {
      router.replace('/dashboard')
    }
  }, [user, router])

  if (isLoading) {
    return (
      <div className='h-screen w-full flex flex-col items-center justify-center gap-4'>
        <Loader2 className='h-10 w-10 animate-spin text-blue-600' />
        <p className='text-sm font-bold tracking-widest text-muted-foreground uppercase'>
          Preparing your profile...
        </p>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <p className='text-destructive font-semibold'>
          User session not found. Please log in again.
        </p>
      </div>
    )
  }

  return (
    <main className='min-h-screen w-full flex items-center justify-center bg-gray-50/50 dark:bg-transparent p-4'>
      <Card className='w-full max-w-2xl border-gray-100 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden'>
        <div className='bg-blue-600 h-2 w-full' /> {/* Progress/Branding Bar */}
        <CardHeader className='pt-10 pb-2 text-center flex flex-col items-center gap-4'>
          <div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl'>
            <UserCheck className='w-8 h-8 text-blue-600' />
          </div>
          <div>
            <h1 className='text-3xl font-black tracking-tighter uppercase italic'>
              Setup Your Profile
            </h1>
            <p className='text-muted-foreground text-sm mt-1'>
              Welcome,{' '}
              <span className='text-foreground font-bold'>
                {user.firstName}
              </span>
              ! Just a few more details to get started.
            </p>
          </div>
        </CardHeader>
        <CardContent className='p-8 md:px-12 pb-12'>
          <Onboarding user={user} />
        </CardContent>
      </Card>
    </main>
  )
}

// 'use client'

// import Onboarding from '@/components/forms/Onboarding'
// import { useMe } from '@/hooks/get-user'
// import { redirect } from 'next/navigation'

// export default function OnboardingPage() {
//   const { data: user, isLoading, error } = useMe()

//   if (isLoading) return <p className='pt-40'>Loading...</p>
//   if (error || !user) return <p className='pt-40'>User not found</p>

//   if (user!.username) {
//     redirect('/dashboard')
//   }

//   return (
//     <section className='p-4 w-full h-full md:h-[calc(100vh-9rem)] flex items-center justify-center rounded-md'>
//       <section className='mt-15 w-[95%] md:w-[70%] lg:w-[50%] shadow-2xl dark:shadow-slate-900 rounded-md flex flex-col md:h-[85%] gap-4 px-4 md:px-8 py-6'>
//         <h1 className=' mt-2 text-center text-2xl font-bold mb-4'>
//           Complete your profile
//         </h1>
//         <Onboarding user={user!} />
//       </section>
//     </section>
//   )
// }
