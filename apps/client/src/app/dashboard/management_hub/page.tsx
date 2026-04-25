'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CellHub from '@/components/managementHub/CellHub'
import ZoneHub from '@/components/managementHub/ZoneHub'
import CommunityHub from '@/components/managementHub/CommunityHub'
import DistrictHub from '@/components/managementHub/DistrictHub'
import DepartmentHub from '@/components/managementHub/DepartmentHub'
import TeamLeaderHub from '@/components/managementHub/TeamHub'
import SmallGroupHub from '@/components/managementHub/SmallGroupHub'
import { useLeadershipProfile } from '@/hooks/get-management'

const ROLE_CONFIG = {
  CELL: { label: 'Cell', component: CellHub },
  ZONE: { label: 'Zone', component: ZoneHub },
  COMMUNITY: { label: 'Community', component: CommunityHub },
  DISTRICT: { label: 'District', component: DistrictHub },
  HOD: { label: 'Department', component: DepartmentHub },
  TEAM: { label: 'Team', component: TeamLeaderHub },
  INTEREST: { label: 'Small Group', component: SmallGroupHub },
} as const

type RoleType = keyof typeof ROLE_CONFIG

export default function ManagementHub() {
  // const { data: userDb, isLoading } = useMe()
  const { data: leadership, isLoading } = useLeadershipProfile()
  // console.log('Management Hub:', leadership)

  const availableRoles = useMemo(() => {
    if (!leadership) return []

    const roles: RoleType[] = []
    if (leadership.leadsCell?.length) roles.push('CELL')
    if (leadership.leadsZone?.length) roles.push('ZONE')
    if (leadership.leadsCommunity?.length) roles.push('COMMUNITY')
    if (leadership.districtsLed?.length) roles.push('DISTRICT')
    if (leadership.hod?.length) roles.push('HOD')
    if (leadership.leadsChurchTeam?.length) roles.push('TEAM')
    if (leadership.leadsSmallGroup?.length) roles.push('INTEREST')

    return roles
  }, [leadership])

  const [activeRole, setActiveRole] = useState<RoleType | null>(null)

  useEffect(() => {
    const firstRole = availableRoles[0]

    if (firstRole && !activeRole) {
      setActiveRole(firstRole)
    }
  }, [availableRoles, activeRole])

  // User has no management roles at all
  if (availableRoles.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-100'>
        <p className='text-muted-foreground'>
          You do not have any management roles assigned.
        </p>
      </div>
    )
  }

  // 2. Dynamically pick the component
  const ActiveComponent = activeRole ? ROLE_CONFIG[activeRole].component : null

  // 3. Map the data slice to the component
  const getComponentData = () => {
    if (!leadership || !activeRole) return null
    switch (activeRole) {
      case 'CELL':
        return leadership.leadsCell
      case 'ZONE':
        return leadership.leadsZone
      case 'COMMUNITY':
        return leadership.leadsCommunity
      case 'DISTRICT':
        return leadership.districtsLed
      case 'HOD':
        return leadership.hod
      case 'TEAM':
        return leadership.leadsChurchTeam
      case 'INTEREST':
        return leadership.leadsSmallGroup
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-zinc-50/50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <header className='flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Management Hub
            </h1>
            <p className='text-muted-foreground'>
              Welcome back, {leadership?.firstName} {leadership?.lastName}
            </p>
          </div>

          {availableRoles.length > 1 && (
            <div className='flex p-1 bg-zinc-100 rounded-lg gap-1 overflow-x-auto no-scrollbar'>
              {availableRoles.map((roleKey) => (
                <Button
                  key={roleKey}
                  variant={activeRole === roleKey ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setActiveRole(roleKey)}
                  className={
                    activeRole === roleKey ? 'shadow-sm' : 'text-zinc-500'
                  }
                >
                  {ROLE_CONFIG[roleKey].label}
                </Button>
              ))}
            </div>
          )}
        </header>

        <div className='transition-all duration-300'>
          {ActiveComponent && (
            <ActiveComponent leadership={getComponentData()} />
          )}
        </div>
      </div>
    </div>
  )
}
