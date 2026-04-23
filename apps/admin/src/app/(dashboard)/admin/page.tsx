// import AppAreaChart from '@/components/AppAreaChart'
// import AppBarChart from '@/components/AppBarChart'
// import AppPieChart from '@/components/AppPieChart'
// import CardList from '@/components/CardList'
// import TodoList from '@/components/TodoList'
// import { cookies } from 'next/headers'

// const Admin = async () => {
//   // const cookieStore = await cookies()
//   // const accessToken = cookieStore.get('accessToken')?.value
//   // const refreshToken = cookieStore.get('refreshToken')?.value
//   // console.log('Admin Refresh Token:', refreshToken)
//   // console.log('Admin Access Token:', accessToken)

//   return (
//     <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
//       <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
//         <AppBarChart />
//         {/* <AppBarChart dataPromise={orderChartData} /> */}
//       </div>
//       <div className='bg-primary-foreground p-4 rounded-lg'>
//         <CardList title='Latest Notifications' />
//       </div>
//       <div className='bg-primary-foreground p-4 rounded-lg'>
//         <AppPieChart />
//       </div>
//       <div className='bg-primary-foreground p-4 rounded-lg'>
//         <TodoList />
//       </div>
//       <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
//         <AppAreaChart />
//       </div>
//       <div className='bg-primary-foreground p-4 rounded-lg'>
//         <CardList title='Latest Messages' />
//       </div>
//     </div>
//   )
// }

// export default Admin

import {
  Users,
  TrendingUp,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Plus,
} from 'lucide-react'
import AppBarChart from '@/components/AppBarChart'
import AppAreaChart from '@/components/AppAreaChart'
import AppPieChart from '@/components/AppPieChart'
import StatCard from '@/components/dashboard/StatCard'
import RecentActivity from '@/components/dashboard/RecentActivity'
import Messages from '@/components/dashboard/Messages'

const Admin = async () => {
  return (
    <div className='space-y-6 p-1'>
      {/* HEADER SECTION */}
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-black uppercase tracking-tight'>
            Executive Overview
          </h1>
          <p className='text-xs font-bold text-zinc-500 uppercase tracking-widest'>
            HICC Gbagada Growth Analytics
          </p>
        </div>
        <div className='flex gap-2'>
          <button className='flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:opacity-90 transition-all'>
            <Plus size={14} /> Generate Report
          </button>
        </div>
      </div>

      {/* KPI STATS GRID */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard
          title='Total Members'
          value='2,840'
          change='+12%'
          iconName='users'
        />
        <StatCard
          title='Weekly Growth'
          value='48'
          change='+5.4%'
          iconName='growth'
          trend='up'
        />
        <StatCard title='Active Teams' value='32' iconName='shield' />
        <StatCard
          title='Pending Tasks'
          value='14'
          change='High Priority'
          iconName='clock'
          trend='neutral'
        />
      </div>

      {/* MAIN ANALYTICS GRID */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {/* Growth Trend - Priority 1 */}
        <div className='lg:col-span-2 border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-6 rounded-2xl'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-sm font-black uppercase tracking-widest text-zinc-400'>
              Growth Velocity
            </h3>
            <ArrowUpRight size={16} className='text-zinc-400' />
          </div>
          <div className='h-75'>
            <AppAreaChart />
          </div>
        </div>

        {/* Breakdown */}
        <div className='border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-6 rounded-2xl'>
          <h3 className='text-sm font-black uppercase tracking-widest text-zinc-400 mb-6'>
            Workforce Mix
          </h3>
          <div className='h-75 flex items-center justify-center'>
            <AppPieChart />
          </div>
        </div>

        {/* Activity & Messages Section */}
        <div className='border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-6 rounded-2xl lg:col-span-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {/* Activity */}
            <div>
              <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6'>
                Recent System Activity
              </h3>
              <RecentActivity />
            </div>

            {/* Messages */}
            <div className='border-l border-zinc-100 dark:border-zinc-900 md:pl-12'>
              <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6'>
                Direct Messages
              </h3>
              <Messages />
            </div>
          </div>
        </div>

        {/* Secondary Metric */}
        <div className='border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-6 rounded-2xl'>
          <h3 className='text-sm font-black uppercase tracking-widest text-zinc-400 mb-6'>
            Team Engagement
          </h3>
          <div className='h-62'>
            <AppBarChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
