'use client'

import {
  Home,
  Inbox,
  Calendar,
  User2,
  ChevronUp,
  Plus,
  Shirt,
  User,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '../ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import AddTeam from '../forms/AddTeam'
import AddDepartment from '../forms/AddDepartment'
import AddDistrict from '../forms/AddDistrict'
import AddCommunity from '../forms/AddCommunity'
import AddCell from '../forms/AddCell'
import { RightDrawer } from './RightDrawer'
import AddZone from '../forms/AddZone'
import AddCourse from '../forms/AddCourse'
import { useMe } from '@/hooks/use-user'
import { redirect } from 'next/navigation'
import { useLogout } from '@/hooks/use-auth'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  // {
  //   title: 'Search',
  //   url: '#',
  //   icon: Search,
  // },
  // {
  //   title: 'Settings',
  //   url: '#',
  //   icon: Settings,
  // },
]

const AppSidebar = () => {
  const { data: user, isLoading, error } = useMe()
  if (user?.role === 'MEMBER') redirect('/unauthorized')
  const logout = useLogout()

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/'>
                <Image
                  src='/assets/logo.jpeg'
                  alt='logo'
                  width={20}
                  height={20}
                />
                <span>The Growth Tracker</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === 'Inbox' && (
                    <SidebarMenuBadge>24</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* TEST Collapseble*/}

        <SidebarGroup>
          <SidebarGroupLabel>Workforce</SidebarGroupLabel>
          {/* <SidebarGroupAction>
            <Link href='/workforce'>
              <Plus /> <span className='sr-only'>Add Team</span>
            </Link>
          </SidebarGroupAction> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/workforce'>
                    <Shirt />
                    See All Teams
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <RightDrawer
                  trigger={
                    <SidebarMenuButton>
                      <Plus />
                      <span>Add Team</span>
                    </SidebarMenuButton>
                  }
                  title='Add Team'
                  description='Add new church team.'
                  submitLabel='Save Team'
                  formId='add-team'
                >
                  <AddTeam />
                </RightDrawer>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <RightDrawer
                  trigger={
                    <SidebarMenuButton>
                      <Plus />
                      <span>Add Department</span>
                    </SidebarMenuButton>
                  }
                  title='Add Department'
                  description='Add new team department.'
                  submitLabel='Save Department'
                  formId='add-department'
                >
                  <AddDepartment />
                </RightDrawer>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>District</SidebarGroupLabel>
          {/* <SidebarGroupAction>
            <Link href='/workforce'>
              <Plus /> <span className='sr-only'>Add Team</span>
            </Link>
          </SidebarGroupAction> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/district'>
                    <Shirt />
                    See All Districts
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <RightDrawer
                  trigger={
                    <SidebarMenuButton>
                      <Plus />
                      <span>Add District</span>
                    </SidebarMenuButton>
                  }
                  title='Add District'
                  description='Add new church district.'
                  submitLabel='Save District'
                  formId='add-district'
                >
                  <AddDistrict />
                </RightDrawer>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <RightDrawer
                  trigger={
                    <SidebarMenuButton>
                      <Plus />
                      <span>Add Community</span>
                    </SidebarMenuButton>
                  }
                  title='Add Community'
                  description='Add new district community.'
                  submitLabel='Save Community'
                  formId='add-community'
                >
                  <AddCommunity />
                </RightDrawer>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <RightDrawer
                  trigger={
                    <SidebarMenuButton>
                      <Plus />
                      <span>Add Zone</span>
                    </SidebarMenuButton>
                  }
                  title='Add Zone'
                  description='Add new zone.'
                  submitLabel='Save Zone'
                  formId='add-zone'
                >
                  <AddZone />
                </RightDrawer>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <RightDrawer
                  trigger={
                    <SidebarMenuButton>
                      <Plus />
                      <span>Add Cell</span>
                    </SidebarMenuButton>
                  }
                  title='Add Cell'
                  description='Add new cell.'
                  submitLabel='Save Cell'
                  formId='add-cell'
                >
                  <AddCell />
                </RightDrawer>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Members</SidebarGroupLabel>
          {/* <SidebarGroupAction>
            <Plus /> <span className='sr-only'>Add Product</span>
          </SidebarGroupAction> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/users/leaders'>
                    <User />
                    Pastors / Leaders
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/users/workers'>
                    <User />
                    Workers
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/users/members'>
                    <User />
                    Members
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Sheet>
                    <SheetTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link href='#'>
                          <Plus />
                          Add User
                        </Link>
                      </SidebarMenuButton>
                    </SheetTrigger>
                    <AddUser />
                  </Sheet>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Courses</SidebarGroupLabel>
          {/* <SidebarGroupAction>
            <Plus /> <span className='sr-only'>Add Course</span>
          </SidebarGroupAction> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/payments'>
                    <User />
                    See All Courses
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <RightDrawer
                  trigger={
                    <SidebarMenuButton>
                      <Plus />
                      <span>Add Course</span>
                    </SidebarMenuButton>
                  }
                  title='Add Course'
                  description='Add new church course.'
                  submitLabel='Save Course'
                  formId='add-course'
                >
                  <AddCourse />
                </RightDrawer>
                {/* <SidebarMenuButton asChild>
                  <Sheet>
                    <SheetTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link href='#'>
                          <Plus />
                          Add Course
                        </Link>
                      </SidebarMenuButton>
                    </SheetTrigger>
                    <AddOrder />
                  </Sheet>
                </SidebarMenuButton> */}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* COLLAPSABLE */}
        {/* <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Collapsable Group
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/#'>
                        <Projector />
                        See All Projects
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/#'>
                        <Plus />
                        Add Project
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible> */}
        {/* NESTED */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/#'>
                    <Projector />
                    See All Projects
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href='/#'>
                        <Plus />
                        Add Project
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href='/#'>
                        <Plus />
                        Add Category
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isLoading ? (
                  <p className='animate-pulse'>Loading...</p>
                ) : error || !user ? (
                  <p>User not found</p>
                ) : (
                  <SidebarMenuButton>
                    <User2 /> {user.firstName} {user.lastName}{' '}
                    <ChevronUp className='ml-auto' />
                  </SidebarMenuButton>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout.mutate()}>
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
