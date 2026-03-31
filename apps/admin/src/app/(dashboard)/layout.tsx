import { redirect } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import Navbar from '@/components/dashboard/Navbar'
import AppSidebar from '@/components/dashboard/AppSidebar'
import { Toaster } from 'sonner'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) redirect('/sign-in')

  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    // <QueryProvider>
    <div className='flex'>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className='w-full'>
          <Navbar />
          <div className='px-4'>{children}</div>
        </main>
      </SidebarProvider>
      <Toaster />
    </div>
    // </QueryProvider>
  )
}
