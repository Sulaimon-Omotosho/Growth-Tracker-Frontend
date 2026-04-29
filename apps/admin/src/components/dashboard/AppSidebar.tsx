'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import {
  Home,
  Inbox,
  Calendar,
  User2,
  ChevronUp,
  Plus,
  Shirt,
  Users,
  BookOpen,
  LayoutGrid,
  LogOut,
  Loader2,
  Settings2,
  ChevronRight,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '../ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { useMe } from '@/hooks/use-user'
import { useLogout } from '@/hooks/use-auth'
import { RightDrawer } from './RightDrawer'
import {
  useCreateCell,
  useCreateCommunity,
  useCreateCourse,
  useCreateDepartment,
  useCreateDistrict,
  useCreateSmallGroup,
  useCreateTeam,
  useCreateZone,
} from '@/hooks/use-church'

// Form Components
import AddTeam from '../forms/AddTeam'
import AddDepartment from '../forms/AddDepartment'
import AddDistrict from '../forms/AddDistrict'
import AddCommunity from '../forms/AddCommunity'
import AddCell from '../forms/AddCell'
import AddZone from '../forms/AddZone'
import AddCourse from '../forms/AddCourse'
import AddSmallGroup from '../forms/AddSmallGroup'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'

const mainItems = [
  { title: 'Overview', url: '/admin', icon: LayoutGrid },
  { title: 'Inbox', url: '#', icon: Inbox, badge: 24 },
  { title: 'Schedule', url: '/schedule', icon: Calendar },
]

const AppSidebar = () => {
  const { data: user, isLoading, error } = useMe()
  const logout = useLogout()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [isOpen, setIsOpen] = useState<
    | 'team'
    | 'dept'
    | 'dist'
    | 'comm'
    | 'zone'
    | 'cell'
    | 'course'
    | 'inba'
    | null
  >(null)

  // Mutations
  const mutations = {
    team: useCreateTeam(),
    dept: useCreateDepartment(),
    dist: useCreateDistrict(),
    comm: useCreateCommunity(),
    zone: useCreateZone(),
    cell: useCreateCell(),
    inba: useCreateSmallGroup(),
    course: useCreateCourse(),
  }

  if (user?.role === 'MEMBER') redirect('/unauthorized')

  const NavItem = ({ item }: { item: any }) => (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className='hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors'
      >
        <Link href={item.url} className='flex items-center gap-3'>
          <item.icon size={18} className='text-zinc-500' />
          <span className='font-medium text-sm'>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.badge && (
        <SidebarMenuBadge className='bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-bold text-[10px]'>
          {item.badge}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  )

  return (
    <Sidebar
      collapsible='icon'
      className='border-r border-zinc-200 dark:border-zinc-800'
    >
      <SidebarHeader className='h-16 flex items-center px-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild
              className='hover:bg-transparent'
            >
              <Link href='/' className='flex items-center gap-3'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100'>
                  <Image
                    src='/assets/logo.jpeg'
                    alt='logo'
                    width={20}
                    height={20}
                    className='invert dark:invert-0'
                  />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-black uppercase tracking-tight text-sm'>
                    Growth Tracker
                  </span>
                  <span className='text-[10px] text-zinc-500 uppercase tracking-widest font-bold'>
                    Admin Console
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className='opacity-50' />

      <SidebarContent className='px-2'>
        {/* SECTION: SYSTEM */}
        <SidebarGroup>
          <SidebarGroupLabel className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 py-4'>
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SECTION: HICC COURSES */}
        <SidebarGroup>
          <SidebarGroupLabel className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 py-4'>
            Spiritual Growth
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/courses' className='flex items-center gap-3'>
                    <Shirt size={18} className='text-zinc-500' />
                    <span className='text-sm font-medium'>All Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible asChild className='group/collapsible'>
                <SidebarMenuItem>
                  {/* <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip='Create'>
                      <Settings2 size={18} className='text-zinc-500' />
                      <span>Create</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger> */}

                  {/* <CollapsibleContent> */}
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <RightDrawer
                        trigger={
                          <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                            <Plus size={18} />
                            <span className='text-sm'>Create A Course</span>
                          </SidebarMenuButton>
                        }
                        title='Create A Course'
                        description='Register a new course.'
                        submitLabel='Save Course'
                        formId='add-course'
                        open={isOpen === 'course'}
                        onOpenChange={(open) =>
                          setIsOpen(open ? 'course' : null)
                        }
                        isLoading={mutations.course.isPending}
                        isSubmitDisabled={isSubmitDisabled}
                      >
                        <AddCourse
                          mutation={mutations.course}
                          onSuccess={() => setIsOpen(null)}
                          onValidationChange={setIsSubmitDisabled}
                        />
                      </RightDrawer>
                    </SidebarMenuSubItem>
                    {/* <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>Create Department</span>
                            </SidebarMenuButton>
                          }
                          title='Create Department'
                          description='Register a new church team department.'
                          submitLabel='Save Department'
                          formId='add-department'
                          open={isOpen === 'dept'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'dept' : null)
                          }
                          isLoading={mutations.dept.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddDepartment
                            mutation={mutations.dept}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem> */}
                  </SidebarMenuSub>
                  {/* </CollapsibleContent> */}
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SECTION: WORKFORCE */}
        <SidebarGroup>
          <SidebarGroupLabel className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 py-4'>
            Workforce
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/workforce' className='flex items-center gap-3'>
                    <Shirt size={18} className='text-zinc-500' />
                    <span className='text-sm font-medium'>All Teams</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible asChild className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip='Create'>
                      <Settings2 size={18} className='text-zinc-500' />
                      <span>Create</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>Create Team</span>
                            </SidebarMenuButton>
                          }
                          title='Create Team'
                          description='Register a new church workforce team.'
                          submitLabel='Save Team'
                          formId='add-team'
                          open={isOpen === 'team'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'team' : null)
                          }
                          isLoading={mutations.team.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddTeam
                            mutation={mutations.team}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>Create Department</span>
                            </SidebarMenuButton>
                          }
                          title='Create Department'
                          description='Register a new church team department.'
                          submitLabel='Save Department'
                          formId='add-department'
                          open={isOpen === 'dept'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'dept' : null)
                          }
                          isLoading={mutations.dept.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddDepartment
                            mutation={mutations.dept}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SECTION: SMALL GROUPS */}
        <SidebarGroup>
          <SidebarGroupLabel className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 py-4'>
            Small Groups
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/district' className='flex items-center gap-3'>
                    <Shirt size={18} className='text-zinc-500' />
                    <span className='text-sm font-medium'>All Districts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible asChild className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip='Create'>
                      <Settings2 size={18} className='text-zinc-500' />
                      <span>Create</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>Create District</span>
                            </SidebarMenuButton>
                          }
                          title='Create District'
                          description='Register a new church district.'
                          submitLabel='Save District'
                          formId='add-district'
                          open={isOpen === 'dist'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'dist' : null)
                          }
                          isLoading={mutations.dist.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddDistrict
                            mutation={mutations.dist}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>Create Community</span>
                            </SidebarMenuButton>
                          }
                          title='Create Community'
                          description='Register a new church community.'
                          submitLabel='Save Community'
                          formId='add-community'
                          open={isOpen === 'comm'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'comm' : null)
                          }
                          isLoading={mutations.comm.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddCommunity
                            mutation={mutations.comm}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>Create Zone</span>
                            </SidebarMenuButton>
                          }
                          title='Create Community'
                          description='Register a new church zone.'
                          submitLabel='Save Zone'
                          formId='add-zone'
                          open={isOpen === 'zone'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'zone' : null)
                          }
                          isLoading={mutations.zone.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddZone
                            mutation={mutations.zone}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>Create Cell</span>
                            </SidebarMenuButton>
                          }
                          title='Create Cell'
                          description='Register a new church cell.'
                          submitLabel='Save Cell'
                          formId='add-cell'
                          open={isOpen === 'cell'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'cell' : null)
                          }
                          isLoading={mutations.cell.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddCell
                            mutation={mutations.cell}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/district' className='flex items-center gap-3'>
                    <Shirt size={18} className='text-zinc-500' />
                    <span className='text-sm font-medium'>Interest Based</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible asChild className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip='Create'>
                      <Settings2 size={18} className='text-zinc-500' />
                      <span>Create</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <RightDrawer
                          trigger={
                            <SidebarMenuButton className='text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
                              <Plus size={18} />
                              <span className='text-sm'>
                                Create Interest Based
                              </span>
                            </SidebarMenuButton>
                          }
                          title='Create Interest Based Group'
                          description='Register a new church interest based Group.'
                          submitLabel='Save Small Group'
                          formId='add-small-group'
                          open={isOpen === 'inba'}
                          onOpenChange={(open) =>
                            setIsOpen(open ? 'inba' : null)
                          }
                          isLoading={mutations.inba.isPending}
                          isSubmitDisabled={isSubmitDisabled}
                        >
                          <AddSmallGroup
                            mutation={mutations.inba}
                            onSuccess={() => setIsOpen(null)}
                            onValidationChange={setIsSubmitDisabled}
                          />
                        </RightDrawer>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SECTION: MEMBERSHIP */}
        <SidebarGroup>
          <SidebarGroupLabel className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 py-4'>
            Members
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { label: 'Pastors', href: '/users/pastors' },
                { label: 'Leaders', href: '/users/leaders' },
                { label: 'Workers', href: '/users/workers' },
                { label: 'Members', href: '/users/members' },
              ].map((link) => (
                <SidebarMenuItem key={link.label}>
                  <SidebarMenuButton asChild>
                    <Link href={link.href} className='flex items-center gap-3'>
                      <Users size={18} className='text-zinc-500' />
                      <span className='text-sm font-medium'>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4 border-t border-zinc-100 dark:border-zinc-900'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-900'
                >
                  {isLoading ? (
                    <Loader2 className='animate-spin size-4' />
                  ) : (
                    <>
                      <div className='flex aspect-square size-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'>
                        <User2 size={16} />
                      </div>
                      <div className='flex flex-col gap-0.5 text-left ml-2'>
                        <span className='text-xs font-bold leading-none'>
                          {user?.firstName}
                        </span>
                        <span className='text-[10px] text-zinc-500 font-medium uppercase tracking-tighter'>
                          {user?.role}
                        </span>
                      </div>
                      <ChevronUp className='ml-auto size-4 text-zinc-400' />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                align='start'
                className='w-56 mb-2 rounded-xl'
              >
                <DropdownMenuItem className='py-2 cursor-pointer'>
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className='py-2 cursor-pointer'>
                  Settings
                </DropdownMenuItem>
                <SidebarSeparator />
                <DropdownMenuItem
                  className='py-2 cursor-pointer text-red-600 dark:text-red-400 font-bold'
                  onClick={() => logout.mutate()}
                >
                  <LogOut size={16} className='mr-2' />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
