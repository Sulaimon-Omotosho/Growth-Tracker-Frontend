// 'use client'

import AppAreaChart from '@/components/AppAreaChart'
import AppBarChart from '@/components/AppBarChart'
import AppPieChart from '@/components/AppPieChart'
import CardList from '@/components/CardList'
import TodoList from '@/components/TodoList'
import { useMe } from '@/hooks/use-user'

const Admin = () => {
  // const { data, isLoading, isError } = useMe()

  // if (isLoading) {
  //   ;<div className='p-6 space-y-6 animate-pulse'>
  //     {/* Header */}
  //     <div className='flex items-center gap-4'>
  //       <div className='h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700' />
  //       <div className='space-y-2'>
  //         <div className='h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded' />
  //         <div className='h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded' />
  //       </div>
  //     </div>

  //     {/* Stats Cards */}
  //     <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
  //       {Array.from({ length: 3 }).map((_, i) => (
  //         <div
  //           key={i}
  //           className='h-24 rounded-xl bg-gray-300 dark:bg-gray-700'
  //         />
  //       ))}
  //     </div>

  //     {/* Table/List */}
  //     <div className='space-y-3'>
  //       {Array.from({ length: 5 }).map((_, i) => (
  //         <div
  //           key={i}
  //           className='h-12 rounded-md bg-gray-300 dark:bg-gray-700'
  //         />
  //       ))}
  //     </div>
  //   </div>
  // }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
        <AppBarChart />
        {/* <AppBarChart dataPromise={orderChartData} /> */}
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <CardList title='Latest Transactions' />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <AppPieChart />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <TodoList />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
        <AppAreaChart />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <CardList title='Popular Products' />
      </div>
    </div>
  )
}

export default Admin
