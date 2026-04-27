import { Address, User } from './users'

export type Teams = {
  id: string
  name: string
  pastor: string
  leader?: User
  departments: Department[]
  departmentCount: number
  description: string
  createdAt: string
  status: string
  membersCount: number
  _count: number
  location: string
}

export type Department = {
  id: string
  name: string
  head: string
  leader?: User
  team: string
  email: string
  description: string
  createdAt: string
  status: string
  churchTeam?: Teams
  members?: User[]
  users?: User[]
  membersCount?: number
  _count?: {
    members: number
  }
}

export type District = {
  id: string
  name: string
  pastor: string
  leader?: User
  communities?: Community[]
  communitiesCount: number
  description: string
  createdAt: string
  status: string
  membersCount: number
  location: string
}

export type Community = {
  id: string
  name: string
  pastor: string
  leader?: User
  cells?: Cell[]
  cellsCount: number
  description: string
  createdAt: string
  status: string
  membersCount: number
  location: string
  district: District
}

export interface Zone {
  id: string
  name: string
  communityId?: string
  leaderId?: string
  leader?: User[]
  community?: Community[]
  cells?: Cell[]
}

export interface Cell {
  id: string
  name: string
  communityId?: string
  zoneId?: string
  leaderId?: string
  leader?: User
  community?: Community
  zone?: Zone
  users?: User[]
  _count?: any
  isOnline?: boolean
  address?: Address
}

export interface SmallGroup {
  id: string
  name: string
  interest?: string
  description?: string
  leaderId?: string
  leader?: User
  community?: Community[]
  zone?: Zone
  members?: User[]
  color?: string
  updates?: number
}

export interface UserGroupsData {
  cell?: Cell
  departments: Department[]
  smallGroups: SmallGroup[]
}
