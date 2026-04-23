import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
// import { getCachedSession } from '@/src/lib/auth'
// import './globals.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className=''>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
