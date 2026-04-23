import { redirect } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import Navbar from '@/components/dashboard/Navbar'
import AppSidebar from '@/components/dashboard/AppSidebar'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) redirect('/')

  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    // <QueryProvider>
    <TooltipProvider>
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
    </TooltipProvider>
    // </QueryProvider>
  )
}
