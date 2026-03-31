export type Teams = {
  id: string
  name: string
  pastor: string
  departments: Department
  departmentCount: number
  description: string
  createdAt: string
  status: string
  membersCount: number
  location: string
}

export type Department = {
  id: string
  name: string
  head: string
  team: string
  email: string
  description: string
  createdAt: string
  status: string
  membersCount: number
}

export type District = {
  id: string
  name: string
  pastor: string
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
  cellCount: number
  description: string
  createdAt: string
  status: string
  membersCount: number
  location: string
}
