'use client'

import { useGetSmallGroups } from '@/hooks/get-user'
import { GroupCard } from './GroupCard'

const GroupSkeleton = () => (
  <div className='space-y-8 mt-6 animate-pulse'>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className='h-24 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'
      />
    ))}
  </div>
)

const DepartmentsNSmallGroups = () => {
  const { data, isLoading, isError } = useGetSmallGroups()
  // console.log('DNSGroups:', data)

  if (isLoading) return <GroupSkeleton />

  if (isError)
    return (
      <div className='p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 text-xs'>
        Failed to load groups. Please refresh.
      </div>
    )

  const renderGroupSection = (
    title: string,
    groups: any[] | undefined,
    type: 'Department' | 'Small Group',
  ) => {
    if (!groups || groups.length === 0) return null

    return (
      <div className='space-y-2'>
        <p className='text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest'>
          {title}
        </p>
        <div className='flex flex-row gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 w-full'>
          {groups.map((item) => (
            <GroupCard
              key={item.id}
              name={item.name}
              type={type}
              members={item.members || []}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!data?.cell && !data?.departments?.length && !data?.smallGroups?.length) {
    return (
      <div className='py-6 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl'>
        <p className='text-sm text-gray-500'>Not assigned to any groups yet.</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* 1. Cell Section */}
      {data.cell && (
        <div className='space-y-2'>
          <p className='text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest'>
            My Cell
          </p>
          <GroupCard
            name={data.cell.name}
            type='Cell'
            members={data.cell.users || []}
            isSingle
          />
        </div>
      )}

      {/* 2. Departments Slider */}
      {renderGroupSection('Departments', data.departments, 'Department')}

      {/* 3. Small Groups Slider */}
      {renderGroupSection('Small Groups', data.smallGroups, 'Small Group')}
    </div>
  )
}

export default DepartmentsNSmallGroups
