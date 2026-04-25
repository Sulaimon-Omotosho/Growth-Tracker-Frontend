'use client'

import {
  BrickWallShield,
  BriefcaseBusiness,
  Calendar,
  CalendarCheck,
  ChartLine,
  ChevronUp,
  Earth,
  Home,
  Inbox,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Mail,
  Plus,
  School,
  User,
  Waves,
} from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import SignOutButton from '../SignOutButton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'
import { useUser } from '@/utils/userContext'
import { RightDrawer } from './RightDrawer'
import JoinCell from '../forms/JoinCell'
import { useState } from 'react'
import { useJoinCell, useJoinDept, useJoinSmallGroup } from '@/hooks/use-church'
import JoinDept from '../forms/joinDept'
import JoinSMG from '../forms/JoinSmallGroup'
import JoinSmallGroup from '../forms/JoinSmallGroup'

// Menu items.
const mainItems = [
  { title: 'Home', url: '/dashboard', icon: Home },
  { title: 'Inbox', url: '/dashboard/messages', icon: Inbox },
  { title: 'Calendar', url: '/dashboard/schedule', icon: Calendar },
]

export function AppSidebar() {
  const { user } = useUser()

  // Form States
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [isOpen, setIsOpen] = useState<'dept' | 'cell' | 'smg' | null>(null)
  const joinCell = useJoinCell()
  const joinDept = useJoinDept()
  const joinSMG = useJoinSmallGroup()

  return (
    <Sidebar
      collapsible='icon'
      className='border-r border-gray-100 dark:border-gray-800'
    >
      <SidebarHeader className='py-6 px-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground'>
                  <Image
                    src='/assets/logo.jpeg'
                    alt='logo'
                    width={24}
                    height={24}
                    className='rounded-sm'
                  />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-bold'>Growth Tracker</span>
                  <span className='truncate text-xs text-muted-foreground'>
                    Church Management
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='gap-4'>
        {/* Main Nav  */}
        <SidebarGroup>
          <SidebarMenu>
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon className='w-4 h-4' />
                    <span className='font-medium'>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {user?.role !== 'MEMBER' && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip='Management Hub'>
                  <Link href='/dashboard/management_hub'>
                    <LayoutDashboard className='w-4 h-4' />
                    <span className='font-medium'>Management Hub</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* Growth  */}
        <SidebarGroup>
          <SidebarGroupLabel className='px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400'>
            Growth Journey
          </SidebarGroupLabel>
          {/* <SidebarGroupContent> */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip='Growth Track'>
                <Link href='/growth_track'>
                  <ChartLine />
                  <span>Growth Track</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip='Foundation Class'>
                <Link href='/foundation'>
                  <BrickWallShield />
                  Foundation Class
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip='Baptism'>
                <Link href='/baptism'>
                  <Waves /> Baptism
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip='Courses'>
                <Link href='/allCourses'>
                  <LibraryBig /> Courses
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* </SidebarGroupContent> */}
        </SidebarGroup>

        {/* Small Groups  */}
        <SidebarGroup>
          <SidebarGroupLabel className='px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400'>
            Community
          </SidebarGroupLabel>
          {/* <SidebarGroupContent> */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip='Cell'>
                <Link href='/dashboard/cell'>
                  <School />
                  <span>{user?.cell?.name || 'Join a Cell'}</span>
                </Link>
              </SidebarMenuButton>
              {!user?.cell && (
                <RightDrawer
                  trigger={
                    <SidebarMenuAction>
                      <Plus />
                    </SidebarMenuAction>
                  }
                  title='Join Cell'
                  open={isOpen === 'cell'}
                  onOpenChange={(open) => setIsOpen(open ? 'cell' : null)}
                  submitLabel='Submit Application'
                  formId='join-cell'
                  isLoading={joinCell.isPending}
                  isSubmitDisabled={isSubmitDisabled}
                >
                  <JoinCell
                    mutation={joinCell}
                    onSuccess={() => setIsOpen(null)}
                    onValidationChange={setIsSubmitDisabled}
                  />
                </RightDrawer>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip='Department'>
                <Link href='/dashboard/departments'>
                  <BriefcaseBusiness />
                  <span>{user?.departments?.[0]?.name || 'Departments'}</span>
                  {user?.departments && user.departments.length > 1 && (
                    <span className='ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full'>
                      +{user.departments.length - 1}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
              <RightDrawer
                trigger={
                  <SidebarMenuAction>
                    <Plus />
                  </SidebarMenuAction>
                }
                title='Join Department'
                open={isOpen === 'dept'}
                onOpenChange={(open) => setIsOpen(open ? 'dept' : null)}
                submitLabel='Submit'
                formId='join-dept'
                isLoading={joinDept.isPending}
                isSubmitDisabled={isSubmitDisabled}
              >
                <JoinDept
                  user={user!}
                  mutation={joinDept}
                  onSuccess={() => setIsOpen(null)}
                  onValidationChange={setIsSubmitDisabled}
                />
              </RightDrawer>
            </SidebarMenuItem>

            {/* FIX THIS  */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip='Other Groups'>
                <Link href='/dashboard/interests'>
                  <Earth />
                  <span>Other Groups</span>
                  {user?.smallGroups && user?.smallGroups?.length > 1 && (
                    <span className='ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full'>
                      +{user.smallGroups?.length}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
              <RightDrawer
                trigger={
                  <SidebarMenuAction>
                    <Plus />
                  </SidebarMenuAction>
                }
                title='Join Small Group'
                open={isOpen === 'smg'}
                onOpenChange={(open) => setIsOpen(open ? 'smg' : null)}
                submitLabel='Submit'
                formId='join-smg'
                isLoading={joinSMG.isPending}
                isSubmitDisabled={isSubmitDisabled}
              >
                <JoinSmallGroup
                  user={user!}
                  mutation={joinSMG}
                  onSuccess={() => setIsOpen(null)}
                  onValidationChange={setIsSubmitDisabled}
                />
              </RightDrawer>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* </SidebarGroupContent> */}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className='font-bold text-black dark:text-white'>
            Contact
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip='Messages'>
                  <Link href='/dashboard/messages'>
                    <Mail /> Messages
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip='Events'>
                  <Link href='/dashboard/events'>
                    <CalendarCheck /> Events & Programs
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='p-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                >
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={user?.image!} />
                    <AvatarFallback className='rounded-lg bg-blue-600 text-white'>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight ml-2'>
                    <span className='truncate font-semibold'>
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className='truncate text-xs text-muted-foreground'>
                      {user?.email}
                    </span>
                  </div>
                  <ChevronUp className='ml-auto size-4 text-gray-400' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                side='top'
                className='w-56 rounded-xl'
              >
                <DropdownMenuItem className='gap-2'>
                  <Link href={`/dashboard/${user?.id}`}>
                    <User className='w-4 h-4' /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='gap-2'>
                  <Mail className='w-4 h-4' /> Prayer Request
                </DropdownMenuItem>
                <hr className='my-1 border-gray-100 dark:border-gray-800' />
                <DropdownMenuItem className='text-red-600 gap-2'>
                  {/* <LogOut className='w-4 h-4' /> */}
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
