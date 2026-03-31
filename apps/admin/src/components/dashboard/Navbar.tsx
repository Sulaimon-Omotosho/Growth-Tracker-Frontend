import Link from 'next/link'
import { SidebarTrigger } from '../ui/sidebar'
import Theme from './Theme'
import Profile from './Profile'
import Notification from './Notification'
import { cookies } from 'next/headers'

const Navbar = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  return (
    <nav className='p-4 flex items-center justify-between sticky top-0 bg-background z-10'>
      {/* LEFT */}
      <SidebarTrigger />
      {/* RIGHT */}
      <div className='flex items-center gap-4'>
        <Link href='/'>Dashboard</Link>
        <Notification />
        {/* USER MENU */}
        <Profile />
        {/* <Profile image={image} /> */}
        {/* THEME MENU */}
        <Theme />
      </div>
    </nav>
  )
}

export default Navbar
