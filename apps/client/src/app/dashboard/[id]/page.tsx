'use client'

import CoursesnActivitiesSummary from '@/components/dashboard/CoursesnActivitiesSummary'
import DepartmentsNSmallGroups from '@/components/dashboard/DepartmentsNSmallGroups'
import { GroupAvatar } from '@/components/dashboard/GroupAvatar'
import { NextStepChart } from '@/components/dashboard/NextStepChart'
import { RightDrawer } from '@/components/dashboard/RightDrawer'
import UserForm from '@/components/forms/UserForm'
import { useUpdateAddress, useUpdateProfile } from '@/hooks/use-auth'
import { useUser } from '@/utils/userContext'
import {
  ArrowRight,
  ChevronRight,
  Dot,
  Download,
  Info,
  Mail,
  MapPin,
  Phone,
  Pin,
  SquarePen,
  UserIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const ProfilePage = () => {
  const { user, isLoading } = useUser()
  console.log('Profile:', user)

  // Calculate total lead roles
  const counts = user?._count
  const totalRoles = counts
    ? counts.leadsCell +
      counts.leadsChurchTeam +
      counts.leadsCommunity +
      counts.hod +
      counts.leadsSubTeam +
      counts.districtsLed +
      counts.leadsZone
    : 0

  // Form States
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [isOpen, setIsOpen] = useState<'edit' | null>(null)
  const updateProfile = useUpdateProfile()
  const updateAddress = useUpdateAddress()

  return (
    <section className='flex flex-col lg:flex-row min-h-screen'>
      {/* LEFT  */}
      <section className='w-full lg:w-2/3 p-4 lg:p-6'>
        {/* PROFILE  */}
        <section className='flex flex-col md:flex-row justify-center md:justify-between gap-6 p-4 rounded-xl bg-gray-200 dark:bg-gray-900 mb-5'>
          {/* Profile Image  */}
          <div className='shrink-0 flex items-center justify-center'>
            <div className='h-40 w-40 overflow-hidden flex items-center justify-center rounded-full ring-2 ring-black bg-gray-300 dark:bg-gray-800'>
              {user?.image ? (
                <Image
                  src={user?.image!}
                  alt={user?.username! || 'Profile'}
                  width={160}
                  height={160}
                  className='object-cover h-full w-full'
                />
              ) : (
                <UserIcon className='w-30 h-30 text-gray-500' />
              )}
            </div>
          </div>
          {/* Details  */}
          <div className='flex-1 flex flex-col gap-1 relative min-w-0'>
            <p className='font-bold capitalize text-xl'>
              {user?.firstName} {user?.lastName}
              <span className='text-xs font-light pl-4 lowercase'>
                @{user?.username}
              </span>
            </p>
            <p className='font-semibold capitalize text-sm text-blue-600'>
              {user?.role}
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2'>
              <p className='flex text-sm gap-2 items-center'>
                <Phone className='h-3.5 w-3.5' /> {user?.phone}
              </p>
              <p className='flex text-sm gap-2 items-center'>
                <Mail className='h-3.5 w-3.5' /> {user?.email}
              </p>
              <p className='flex text-sm gap-2 items-center'>
                <MapPin className='h-3.5 w-3.5' />{' '}
                {user?.zone?.name || 'No Community'}
              </p>
            </div>
            <p className='flex text-sm gap-2 items-center mt-2'>
              <Info className='h-4 w-4 shrink-0' />
              <span className='line-clamp-2'>
                {user?.about || 'No bio added yet.'}
              </span>
            </p>
            <div className='flex items-center justify-end p-3'>
              <RightDrawer
                trigger={
                  <SquarePen className='h-5 w-5 hover:text-blue-500 cursor-pointer transition-all duration-300 absolute top-0 right-0' />
                }
                title='Edit Profile'
                description='Edit your profile details'
                submitLabel='Save Changes'
                formId='profile-edit'
                open={isOpen === 'edit'}
                onOpenChange={(open) => setIsOpen(open ? 'edit' : null)}
                isLoading={updateProfile.isPending || updateAddress.isPending}
                isSubmitDisabled={isSubmitDisabled}
              >
                <UserForm
                  user={user!}
                  onSuccess={() => setIsOpen(null)}
                  onValidationChange={(disabled) =>
                    setIsSubmitDisabled(disabled)
                  }
                />
              </RightDrawer>
            </div>
          </div>

          {/* Certificates  */}
          <div className='shrink-0 flex items-center justify-center'>
            <div className='flex flex-col rounded-md bg-gray-300 dark:bg-gray-700 max-w-40 overflow-hidden shadow-md'>
              {/* <div className=''> */}
              <Image
                src='/assets/cert.png'
                alt='certificate'
                width={200}
                height={200}
                className='w-full'
                loading='eager'
              />
              {/* </div> */}
              <div className='flex p-2 justify-between items-center bg-white dark:bg-gray-800'>
                <h2 className='font-bold text-sm uppercase'>Growth Track</h2>
                <Download className='w-3 h-3 text-blue-600' />
              </div>
            </div>
          </div>
        </section>

        {/* COURSES & ACTIVITIES  */}
        <CoursesnActivitiesSummary totalRoles={totalRoles} />

        {/* DEPARTMENTS & SMALL GROUPS  */}
        <section className=''>
          <h2 className='text-sm font-bold uppercase text-gray-500 mb-4'>
            Departments and Small Groups
          </h2>
          <section className=''>
            <DepartmentsNSmallGroups />
          </section>
        </section>
      </section>

      {/* RIGHT  */}
      {/* <section className='flex-1/3 p-4 lg:p-6 rounded-xl bg-gray-200 dark:bg-gray-900 lg:mt-6 mx-4 mb-5'> */}
      <section className='w-full lg:w-1/3 p-4 lg:p-6'>
        <div className='sticky top-6 flex flex-col gap-4'>
          <div className='p-6 rounded-xl bg-gray-200 dark:bg-gray-900 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors'>
            <NextStepChart />
            <section className='mt-8'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='font-bold text-lg'>Messages</h2>
                <span className='text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full'>
                  New
                </span>
              </div>

              <div className='flex flex-col gap-4'>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className='group cursor-pointer'>
                    <div className='flex justify-between items-center mb-1'>
                      <h3 className='text-sm font-bold group-hover:text-blue-500 transition-colors'>
                        @PDolapo
                      </h3>
                      <span className='text-[10px] opacity-50'>2h ago</span>
                    </div>
                    <p className='text-xs font-light text-gray-600 dark:text-gray-400 line-clamp-2'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ea sint voluptatem...
                    </p>
                    {i !== 2 && (
                      <hr className='mt-4 border-gray-300 dark:border-gray-800' />
                    )}
                  </div>
                ))}
              </div>
              <div className='w-full flex items-center justify-center mt-6 gap-1'>
                <Dot className='w-6 h-6 text-blue-600' />
                <Dot className='w-6 h-6 text-gray-400' />
                <Dot className='w-6 h-6 text-gray-400' />
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ProfilePage
