import { User } from './users'

export interface Event {
  id: String
  title: String
  description?: String
  imageUrl?: String
  location?: String
  type: EventType
  status: Status

  sessions: EventSession[]
  capacity?: Number
  remindersSent: Boolean
  volunteers: User[]
}

export interface EventSession {
  id: String
  eventId: String
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
