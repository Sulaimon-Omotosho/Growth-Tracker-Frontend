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

// export interface Team {
//   id: string
//   name: string
//   description?: string
//   leaderId?: string
//   leader?: User[]
//   departments?: Department[]
// }

// export interface Department {
//   id: string
//   name: string
//   churchTeamId?: string
//   email?: string
//   description?: string
//   leaderId?: string
//   leader?: User
//   churchTeam?: Team
// }

// export interface District {
//   id: string
//   name: string
//   leaderId?: string
//   leader?: User[]
//   communities?: Community[]
//   users?: User[]
// }

// export interface Community {
//   id: string
//   name: string
//   districtId?: string
//   leaderId?: string
//   leader?: User[]
//   district?: District[]
//   zones?: Zone[]
// }

// export interface Zone {
//   id: string
//   name: string
//   communityId?: string
//   leaderId?: string
//   leader?: User[]
//   community?: Community[]
//   cells?: Cell[]
// }

// export interface Cell {
//   id: string
//   name: string
//   communityId?: string
//   zoneId?: string
//   leaderId?: string
//   leader?: User[]
//   community?: Community[]
//   zone?: Zone[]
//   users?: User[]
// }
