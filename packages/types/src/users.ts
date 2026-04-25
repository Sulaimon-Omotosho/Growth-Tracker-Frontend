import { Cell, Department, SmallGroup, Zone } from './church'

export enum Role {
  CAMPUS_PASTOR = 'CAMPUS_PASTOR',
  PASTOR = 'PASTOR',
  TEAM = 'TEAM',
  HOD = 'HOD',
  DISTRICT = 'DISTRICT',
  ZONE = 'ZONE',
  CELL = 'CELL',
  MEMBER = 'MEMBER',
}

export interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}

export interface User {
  id: string
  firstName: string
  lastName: string
  username?: string
  email?: string
  phone?: string
  gender?: 'MALE' | 'FEMALE'
  dob?: Date
  about?: string
  role: Role
  image?: string
  cell?: Cell
  zone?: Zone
  departments?: Department[]
  smallGroups?: SmallGroup[]
  address?: Address
  _count?: any
}

export interface Address {
  id?: String
  street?: String
  city: String
  state: String
  country: String
  zipCode?: String
}

export interface LeadershipProfile {
  firstName: string
  lastName: string
  leadsCell: { id: string; name: string }[]
  leadsSmallGroup: { id: string; name: string }[]
  leadsCommunity: { id: string; name: string }[]
  leadsZone: { id: string; name: string }[]
  districtsLed: { id: string; name: string }[]
  hod: { id: string; name: string }[]
  leadsSubTeam: { id: string; name: string }[]
  leadsChurchTeam: { id: string; name: string }[]
}
