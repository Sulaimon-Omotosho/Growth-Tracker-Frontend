'use client'

import { RightDrawer } from '@/components/dashboard/RightDrawer'
import ChangeRole from '@/components/forms/ChangeRole'
import { useMe, useUser } from '@/hooks/use-user'
// import { GroupAvatar } from '@/src/components/dashboard/GroupAvatar'
// import { NextStepChart } from '@/src/components/dashboard/NextStepChart'
// import { RightDrawer } from '@/src/components/dashboard/RightDrawer'
// import UserForm from '@/src/components/forms/UserForm'
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
import { useParams } from 'next/navigation'

const ProfilePage = () => {
  const params = useParams()
  const id = '998dcd79-40d4-4196-9584-169597f95f56'
  // const id = params?.id as string
  const { data: user, isLoading, error } = useUser(id)
  const { data: currentUser } = useMe()

  // LOADING UI
  if (isLoading) {
    return (
      <div className='p-6 animate-pulse'>
        <div className='h-40 w-40 rounded-full bg-gray-300 mb-6' />
        <div className='h-4 w-48 bg-gray-300 mb-2' />
        <div className='h-4 w-32 bg-gray-300 mb-2' />
        <div className='h-4 w-64 bg-gray-300 mb-2' />
      </div>
    )
  }

  // USER NOT FOUND
  if (error || !user) {
    return (
      <div className='p-6'>
        <h2 className='text-lg font-semibold'>User not found</h2>
        <p className='text-sm text-muted-foreground'>
          The user you are looking for does not exist.
        </p>
      </div>
    )
  }

  return (
    <section className='flex flex-col lg:flex-row gap-4 lg:gap-1'>
      {/* LEFT  */}
      <section className='flex-2/3 p-4 lg:p-6'>
        {/* PROFILE  */}
        <section className='flex flex-col md:flex-row justify-center md:justify-between gap-6 p-4  rounded-xl bg-gray-200 dark:bg-gray-900  mb-5'>
          {/* Profile Image  */}
          <div className='flex-1/3 w-full md:w-auto flex items-center justify-center'>
            <div className='h-40 w-40 overflow-hidden flex items-center justify-center rounded-full ring-2 ring-black'>
              {user.image ? (
                <Image
                  src={user?.image!}
                  alt={user?.username! || 'Profile'}
                  width={1000}
                  height={1000}
                />
              ) : (
                <UserIcon className='w-30 h-30' />
              )}
            </div>
          </div>
          {/* Details  */}
          <div className='flex-1/3 flex flex-col gap-1 relative'>
            <p className='font-bold capitalize'>
              {user?.firstName} {user?.lastName}
              <span className='text-xs font-light pl-4'>@{user.username} </span>
            </p>
            <p className='font-semibold capitalize text-sm'>{user?.role} </p>
            <p className='flex text-sm gap-2 items-center'>
              <Phone className='h-4 w-4' /> {user?.phone}
            </p>
            <p className='flex text-sm gap-2 items-center'>
              <Mail className='h-4 w-4' /> {user?.email}
            </p>
            <p className='flex text-sm gap-2 items-center'>
              <MapPin className='h-4 w-4' /> {user?.cell?.community.name}
            </p>
            <p className='flex text-sm gap-2 items-center'>
              <Info className='h-4 w-4' /> {user?.about}
            </p>
            <div className='flex items-center justify-end p-3'>
              <RightDrawer
                trigger={
                  <SquarePen className='h-4 w-4 hover:opacity-45 cursor-pointer transition-all duration-300 absolute top-2 right-2' />
                }
                title='Change Role'
                description='Edit the role of position of the member'
                submitLabel='Save Role'
                formId='change-role'
              >
                <ChangeRole user={user!} currentUser={currentUser!} />
              </RightDrawer>
            </div>
          </div>
          {/* Certificates  */}
          <div className='flex-1/3 w-full md:w-auto flex items-center justify-center'>
            <div className='flex flex-col rounded-md bg-gray-300 dark:bg-gray-700 max-w-40 overflow-hidden'>
              <div className=''>
                <Image
                  src='/assets/cert.png'
                  alt='certificate'
                  width={500}
                  height={500}
                  loading='eager'
                  className='w-auto'
                />
              </div>
              <div className=' flex p-2 justify-between items-center'>
                <h2 className='font-semibold text-sm'>Growth Track</h2>
                {/* <div className='bg-blue-600 hover:bg-blue-400 hover:cursor-pointer rounded-full p-2'>
                  <Download className='w-3 h-3 text-white' />
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* COURSES & ACTIVITIES  */}
        {/* <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 justify-between mb-5'>
          <div className='flex-1/4 flex justify-between rounded-lg bg-gray-200 dark:bg-gray-900'>
            <p className='text-sm flex flex-col p-3 gap-3'>
              Active Courses <span className=''>3</span>
            </p>
            <div className='border-l border-black dark:border-gray-600 p-2 flex items-center'>
              <ChevronRight />
            </div>
          </div>
          <div className='flex-1/4 flex justify-between rounded-lg bg-gray-200 dark:bg-gray-900'>
            <p className='text-sm flex flex-col p-3 gap-3'>
              Course Progress <span className=''>35%</span>
            </p>
            <div className='border-l border-black dark:border-gray-600 p-2 flex items-center'>
              <ChevronRight />
            </div>
          </div>
          <div className='flex-1/4 flex justify-between rounded-lg bg-gray-200 dark:bg-gray-900'>
            <p className='text-sm flex flex-col p-3 gap-3'>
              Completed Courses <span className=''>2</span>
            </p>
            <div className='border-l border-black dark:border-gray-600 p-2 flex items-center'>
              <ChevronRight />
            </div>
          </div>
          <div className='flex-1/4 flex justify-between rounded-lg bg-gray-200 dark:bg-gray-900'>
            <p className='text-sm flex flex-col p-3 gap-3'>
              Leadership Roles <span className=''>1</span>
            </p>
            <div className='border-l border-black dark:border-gray-600 p-2 flex items-center'>
              <ChevronRight />
            </div>
          </div>
        </section> */}
        <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5'>
          {[
            { label: 'Active Courses', value: '3' },
            { label: 'Course Progress', value: '35%' },
            { label: 'Completed Courses', value: '2' },
            { label: 'Leadership Roles', value: '1' },
          ].map((item, i) => (
            <div
              key={i}
              className='flex justify-between rounded-lg bg-gray-200 dark:bg-gray-900'
            >
              <p className='text-sm flex flex-col p-3 gap-3'>
                {item.label}
                <span>{item.value}</span>
              </p>
              <div className='border-l p-2 flex items-center'>
                <ChevronRight />
              </div>
            </div>
          ))}
        </section>

        {/* SMALL GROUPS  */}
        <section className=''>
          <h2 className='text-sm font-semibold py-3'>
            Departments and Small Groups
          </h2>
          <section className=''>
            <section className='flex justify-between items-center rounded-lg bg-gray-200 dark:bg-gray-900 p-4 mb-2'>
              <div className=''>
                <p className='text-sm pb-3'>
                  A Place Of Glory{' '}
                  <span className='pl-5 font-semibold'>Cell</span>
                </p>
                <div className='flex flex-row items-center'>
                  {/* <GroupAvatar /> */}
                  <p className='text-xs pl-3'>members</p>
                </div>
              </div>
              <div className='h-10 w-10 overflow-hidden rounded-full ring-3 ring-black dark:ring-gray-500'>
                <Image
                  src='/assets/logo.jpeg'
                  alt='logo'
                  width={1000}
                  height={1000}
                />
              </div>
            </section>
            <section className='flex justify-between items-center rounded-lg bg-gray-200 dark:bg-gray-900 p-4 mb-2'>
              <div className=''>
                <p className='text-sm pb-3'>
                  Growth Track{' '}
                  <span className='pl-5 font-semibold'>Department</span>
                </p>
                <div className='flex flex-row items-center'>
                  {/* <GroupAvatar /> */}
                  <p className='text-xs pl-3'>members</p>
                </div>
              </div>
              <div className='h-10 w-10 overflow-hidden rounded-full ring-3 ring-black dark:ring-gray-500'>
                <Image
                  src='/assets/logo.jpeg'
                  alt='logo'
                  width={1000}
                  height={1000}
                />
              </div>
            </section>
            <section className='flex justify-between items-center rounded-lg bg-gray-200 dark:bg-gray-900 p-4 mb-2'>
              <div className=''>
                <p className='text-sm pb-3'>
                  Tech Com{' '}
                  <span className='pl-5 font-semibold'>Small Group</span>
                </p>
                <div className='flex flex-row items-center'>
                  {/* <GroupAvatar /> */}
                  <p className='text-xs pl-3'>members</p>
                </div>
              </div>
              <div className='h-10 w-10 overflow-hidden rounded-full ring-3 ring-black dark:ring-gray-500'>
                <Image
                  src='/assets/logo.jpeg'
                  alt='logo'
                  width={1000}
                  height={1000}
                />
              </div>
            </section>
          </section>
        </section>
      </section>
      {/* RIGHT  */}
      <section className='flex-1/3 p-4 lg:p-6 rounded-xl bg-gray-200 dark:bg-gray-900 lg:mt-6 mx-4 mb-5'>
        {/* <NextStepChart /> */}
        <section className='mt-4'>
          <h2 className='font-bold mb-2'>Messages</h2>
          <div className='flex flex-col gap-2'>
            <div className=''>
              <hr className='pb-1' />
              <h3 className='text-sm font-semibold '>@PDolapo</h3>
              <p className='text-xs font-light'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sint
                voluptatem amet quae vero ad <span>...</span>
              </p>
            </div>
            <div className=''>
              <hr className='pb-1' />
              <h3 className='text-sm font-semibold '>@PDolapo</h3>
              <p className='text-xs font-light'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sint
                voluptatem amet quae vero ad <span>...</span>
              </p>
            </div>
            <div className=''>
              <hr className='pb-1' />
              <h3 className='text-sm font-semibold '>@PDolapo</h3>
              <p className='text-xs font-light'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sint
                voluptatem amet quae vero ad <span>...</span>
              </p>
            </div>
          </div>
          {/* <div className='w-full flex items-center justify-end'>
            <div className='flex gap-0.5 hover:cursor-pointer pr-3'>
              <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
              <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
              <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
            </div>
          </div> */}
          <div className='w-full flex items-center justify-end pr-3'>
            {[1, 2, 3].map((_, i) => (
              <Dot key={i} className='w-3 h-3 bg-gray-600 rounded-full' />
            ))}
          </div>
        </section>
      </section>
    </section>
  )
}

export default ProfilePage
