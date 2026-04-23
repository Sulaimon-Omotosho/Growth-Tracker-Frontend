'use client'

import React from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMe, useUser } from '@/hooks/use-user'
import {
  Mail,
  MapPin,
  Phone,
  SquarePen,
  UserIcon,
  ChevronRight,
  Dot,
  ShieldCheck,
  Award,
  MessageSquare,
} from 'lucide-react'

import { GroupAvatar } from '@/components/dashboard/GroupAvatar'
import { RightDrawer } from '@/components/dashboard/RightDrawer'
import ChangeRole from '@/components/forms/ChangeRole'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const ProfilePage = () => {
  const params = useParams()
  const id = params?.id as string
  const { data: user, isLoading, error } = useUser(id)
  const { data: currentUser } = useMe()

  if (isLoading) return <ProfileSkeleton />
  if (error || !user) return <UserNotFound />

  // Dynamic Theme Selection based on role
  const isPastor = user.role?.toLowerCase().includes('pastor')
  const isLeader = user.role?.toLowerCase().includes('leader')
  const isWorker = user.role?.toLowerCase().includes('worker')

  return (
    <section className='flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-zinc-50 dark:bg-black'>
      {/* LEFT COLUMN */}
      <div className='flex-2 space-y-6'>
        {/* HERO SECTION */}
        <section
          className={cn(
            'relative overflow-hidden rounded-3xl p-8 border transition-all duration-500',
            isPastor
              ? 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/10'
              : isLeader
                ? 'bg-rose-50/50 border-rose-200 dark:bg-rose-950/10'
                : 'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
          )}
        >
          <div className='flex flex-col md:flex-row items-center gap-8 relative z-10'>
            {/* Avatar */}
            <div className='relative'>
              <div
                className={cn(
                  'h-40 w-40 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl',
                  isPastor && 'ring-4 ring-amber-400',
                  isLeader && 'ring-4 ring-rose-400',
                )}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.firstName}
                    width={160}
                    height={160}
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-zinc-100 flex items-center justify-center'>
                    <UserIcon size={60} className='text-zinc-300' />
                  </div>
                )}
              </div>
              {isPastor && (
                <div className='absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-full shadow-lg'>
                  <Award size={20} />
                </div>
              )}
            </div>

            {/* Identity Details */}
            <div className='flex-1 space-y-4 text-center md:text-left'>
              <div>
                <h1 className='text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 uppercase'>
                  {user.firstName} {user.lastName}
                </h1>
                <p className='text-zinc-500 font-mono text-sm'>
                  @{user.username || 'member'}
                </p>
              </div>

              <div className='flex flex-wrap justify-center md:justify-start gap-3'>
                <Badge
                  className={cn(
                    'px-4 py-1 font-black tracking-widest',
                    isPastor
                      ? 'bg-amber-600'
                      : isLeader
                        ? 'bg-rose-600'
                        : 'bg-zinc-900',
                  )}
                >
                  {user.role}
                </Badge>
                <Badge
                  variant='outline'
                  className='bg-white/50 dark:bg-transparent backdrop-blur-sm'
                >
                  {user.cell?.name || 'Unassigned Cell'}
                </Badge>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50'>
                <InfoItem icon={<Phone size={14} />} label={user.phone} />
                <InfoItem icon={<Mail size={14} />} label={user.email} />
                <InfoItem
                  icon={<MapPin size={14} />}
                  label={user.cell?.community?.name || 'Region unknown'}
                />
              </div>
            </div>

            {/* Edit Trigger */}
            <div className='absolute top-0 right-0'>
              <RightDrawer
                trigger={
                  <button className='p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors'>
                    <SquarePen size={18} />
                  </button>
                }
                title='Modify Position'
                description='Update the organizational role for this member.'
                submitLabel='Save Role'
                formId='change-role'
              >
                <ChangeRole user={user} currentUser={currentUser!} />
              </RightDrawer>
            </div>
          </div>
        </section>

        {/* STATS TILES */}
        <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {[
            { label: 'Courses', value: '03', sub: 'In Progress' },
            { label: 'Attendance', value: '92%', sub: 'Avg. Rate' },
            { label: 'Groups', value: '02', sub: 'Active' },
            { label: 'Impact', value: '14', sub: 'Certificates' },
          ].map((stat, i) => (
            <div
              key={i}
              className='p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex justify-between items-center group cursor-pointer hover:border-blue-500 transition-all'
            >
              <div>
                <p className='text-[10px] font-black uppercase text-zinc-400 tracking-widest'>
                  {stat.label}
                </p>
                <p className='text-xl font-black text-zinc-900 dark:text-zinc-100'>
                  {stat.value}
                </p>
              </div>
              <ChevronRight
                size={16}
                className='text-zinc-300 group-hover:translate-x-1 transition-transform'
              />
            </div>
          ))}
        </section>

        {/* AFFILIATIONS */}
        <section className='space-y-4'>
          <h2 className='text-xs font-black uppercase tracking-[0.2em] text-zinc-400'>
            Structural Affiliations
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <AffiliationCard
              title='A Place of Glory'
              type='Cell Group'
              members='12'
            />
            <AffiliationCard
              title='Media & Tech'
              type='Department'
              members='45'
            />
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN (Activity/Side Info) */}
      <div className='flex-1 space-y-6'>
        <section className='p-6 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-900 border border-zinc-800 shadow-xl'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='font-black uppercase tracking-tighter flex items-center gap-2'>
              <MessageSquare size={16} className='text-blue-400' />
              Admin Notes
            </h2>
            <div className='flex gap-1'>
              {[1, 2, 3].map((i) => (
                <Dot key={i} className='w-4 h-4 text-zinc-600' />
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            <MessageItem
              author='System'
              text='Member upgraded to Worker status following Growth Track completion.'
              date='2 days ago'
            />
            <MessageItem
              author='Pastor Dolapo'
              text='Needs follow-up regarding the upcoming leadership conference.'
              date='1 week ago'
            />
          </div>
        </section>

        {/* CERTIFICATE PREVIEW */}
        <div className='p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'>
          <h2 className='text-[10px] font-black uppercase text-zinc-400 mb-3 text-center'>
            Latest Credential
          </h2>
          <div className='relative aspect-[4/3] rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-zoom-in'>
            <Image
              src='/assets/cert.png'
              alt='Cert'
              fill
              className='object-cover'
            />
          </div>
          <p className='text-xs font-bold mt-3 text-center'>
            Growth Track Level 1
          </p>
        </div>
      </div>
    </section>
  )
}

// Helper Components
const InfoItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) => (
  <div className='flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400'>
    <span className='text-zinc-400'>{icon}</span>
    <span className='font-medium'>{label || 'N/A'}</span>
  </div>
)

const AffiliationCard = ({
  title,
  type,
  members,
}: {
  title: string
  type: string
  members: string
}) => (
  <div className='flex justify-between items-center p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all'>
    <div className='flex items-center gap-3'>
      <div className='h-10 w-10 bg-white dark:bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm'>
        <ShieldCheck className='text-blue-500' size={20} />
      </div>
      <div>
        <p className='text-xs font-bold leading-none'>{title}</p>
        <p className='text-[10px] uppercase font-black text-zinc-400 tracking-tighter'>
          {type}
        </p>
      </div>
    </div>
    <div className='text-right'>
      <p className='text-xs font-black'>{members}</p>
      <p className='text-[9px] text-zinc-400 uppercase'>Members</p>
    </div>
  </div>
)

const MessageItem = ({
  author,
  text,
  date,
}: {
  author: string
  text: string
  date: string
}) => (
  <div className='border-b border-zinc-800 pb-3 last:border-0'>
    <div className='flex justify-between items-center mb-1'>
      <h3 className='text-[10px] font-black uppercase text-blue-400 tracking-widest'>
        {author}
      </h3>
      <span className='text-[9px] text-zinc-500'>{date}</span>
    </div>
    <p className='text-xs leading-relaxed text-zinc-300'>{text}</p>
  </div>
)

const ProfileSkeleton = () => (
  <div className='p-10 animate-pulse space-y-4'>
    <div className='h-40 w-40 rounded-full bg-zinc-200 dark:bg-zinc-800' />
    <div className='h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded' />
    <div className='h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded' />
  </div>
)

const UserNotFound = () => (
  <div className='flex flex-col items-center justify-center min-h-[60vh]'>
    <div className='p-6 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-2xl border border-rose-100'>
      <h2 className='text-xl font-black'>MEMBER NOT FOUND</h2>
      <p className='text-sm opacity-80'>
        The requested record has been moved or deleted.
      </p>
    </div>
  </div>
)

export default ProfilePage
