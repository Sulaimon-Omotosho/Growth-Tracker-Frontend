import { cookies } from 'next/headers'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/dashboard/AppSidebar'
import Navbar from '@/components/dashboard/Navbar'
import { UserProvider } from '@/utils/userContext'
import { TooltipProvider } from '@/components/ui/tooltip'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <TooltipProvider>
      <div className='h-full'>
        <SidebarProvider defaultOpen={defaultOpen}>
          <UserProvider>
            <AppSidebar />
            <main className='w-full'>
              <Navbar />
              {children}
            </main>
          </UserProvider>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  )
}
