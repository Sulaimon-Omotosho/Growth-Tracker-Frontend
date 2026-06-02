import { User } from './users'

export interface Event {
  id: string
  title: string
  description?: string
  imageUrl?: string
  location?: string
  type: EventType
  status: Status

  sessions: EventSession[]
  capacity?: Number
  remindersSent: Boolean
  volunteers: User[]
}

export interface Announcement {
  id: string
  title: string
  content: string
  imageUrl?: string
  scope: AnnouncementScope
  targetId?: string
  priority: Priority
  authorId: string
  author: User
  length: number
  createdAt: Date
}

export interface EventSession {
  id: string
  eventId: string
  event: Event
  start: Date
  end: Date
}

export enum EventType {
  GENERAL,
  SERVICE,
  OUTREACH,
  MEETING,
  SMALL_GROUP,
}

export enum Status {
  SCHEDULED,
  ONGOING,
  COMPLETED,
  CANCELLED,
}

export enum AnnouncementScope {
  GENERAL,
  DISTRICT,
  COMMUNITY,
  ZONE,
  CELL,
  SMALL_GROUP,
  TEAM,
  DEPARTMENT,
}

export enum Priority {
  LOW,
  NORMAL,
  HIGH,
  URGENT,
}

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  link?: string
  isRead: boolean
  createdAt: string
}
