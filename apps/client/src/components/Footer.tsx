import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Footer = () => {
  return (
    <footer className='bg-black text-gray-400 border-t border-gray-900'>
      <div className='max-w-7xl mx-auto px-6 pt-16 pb-8 md:px-10'>
        {/* TOP SECTION: NEWSLETTER */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 pb-16 border-b border-gray-900'>
          <div className='max-w-md text-center lg:text-left'>
            <h2 className='text-xl font-bold text-white mb-2 uppercase tracking-tight'>
              Stay in the loop
            </h2>
            <p className='text-sm text-gray-500'>
              Get the latest updates on Growth Track sessions and community
              events. No spam, just grace.
            </p>
          </div>

          <div className='w-full max-w-md'>
            <div className='flex gap-2 p-1 bg-gray-950 border border-gray-800 rounded-full focus-within:border-blue-500/50 transition-all'>
              <Input
                placeholder='Enter your email'
                className='bg-transparent border-0 focus-visible:ring-0 text-gray-200 placeholder:text-gray-600 rounded-full'
              />
              <Button className='rounded-full bg-white text-black hover:bg-gray-200 px-6 font-bold'>
                Join
              </Button>
            </div>
            <p className='mt-3 text-[10px] text-gray-600 text-center lg:text-left px-4'>
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 py-16'>
          {/* BRAND/ABOUT */}
          <div className='col-span-2 lg:col-span-2 flex flex-col gap-6'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src='/assets/Logo.jpeg'
                alt='HICC'
                width={32}
                height={32}
                className='rounded-md grayscale hover:grayscale-0 transition-all'
              />
              <span className='font-black text-white tracking-tighter'>
                THE GROWTH TRACKER
              </span>
            </Link>
            <p className='text-sm leading-relaxed max-w-xs'>
              Empowering you to discover your purpose and walk in the fullness
              of Christ through Harvesters International Christian Center.
            </p>
            <div className='flex items-center gap-4 text-gray-500'>
              <Link href='#' className='hover:text-white transition-colors'>
                <Facebook size={18} />
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                <Twitter size={18} />
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                <Instagram size={18} />
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className='flex flex-col gap-4'>
            <h3 className='font-bold text-white text-sm uppercase tracking-widest'>
              Navigation
            </h3>
            <nav className='flex flex-col gap-2 text-sm'>
              <Link href='/' className='hover:text-white transition-colors'>
                HICC Homepage
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Online Church
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Giving
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Watch Live
              </Link>
            </nav>
          </div>

          {/* NEXT STEPS */}
          <div className='flex flex-col gap-4'>
            <h3 className='font-bold text-white text-sm uppercase tracking-widest'>
              Next Steps
            </h3>
            <nav className='flex flex-col gap-2 text-sm'>
              <Link href='/' className='hover:text-white transition-colors'>
                Small Groups
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Workforce
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Water Baptism
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Foundation Class
              </Link>
            </nav>
          </div>

          {/* LEGAL */}
          <div className='flex flex-col gap-4'>
            <h3 className='font-bold text-white text-sm uppercase tracking-widest'>
              Legal
            </h3>
            <nav className='flex flex-col gap-2 text-sm'>
              <Link href='/' className='hover:text-white transition-colors'>
                Privacy Policy
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Terms of Use
              </Link>
              <Link href='/' className='hover:text-white transition-colors'>
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className='pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-[12px] text-gray-600 text-center md:text-left leading-none'>
            &copy; {new Date().getFullYear()} Harvesters International Christian
            Center. Designed with heart by the Dev Team.
          </p>
          <div className='flex gap-6'>
            <Image
              src='/assets/HICC-Logo2.jpg'
              alt='HICC Logo'
              width={120}
              height={40}
              className='opacity-30 grayscale hover:opacity-100 transition-all cursor-pointer'
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
