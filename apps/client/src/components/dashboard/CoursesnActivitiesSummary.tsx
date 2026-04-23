import { ChevronRight } from 'lucide-react'
import ProfileStatCard from './ProfileStatCard'

const CoursesnActivitiesSummary = ({ totalRoles }: { totalRoles: number }) => {
  return (
    <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
      <ProfileStatCard label='Active Courses' value={3} />
      <ProfileStatCard label='Course Progress' value='35%' />
      <ProfileStatCard label='Completed' value={2} />
      <ProfileStatCard label='Leadership Roles' value={totalRoles} />
    </section>
  )
}

export default CoursesnActivitiesSummary
