import { fetcher } from '@/lib/fetcher'
import { Event } from '@repo/types'
import { useQuery } from '@tanstack/react-query'

// EVENTS
export function useGetEventsByDate(date: Date) {
  const dateKey = date.toISOString().split('T')[0]

  return useQuery<Event>({
    queryKey: ['events', 'date', dateKey],
    queryFn: () => fetcher(`/events/by-date?date=${date.toISOString()}`),
    enabled: !!date,
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetUpcomingEvents() {
  return useQuery<Event>({
    queryKey: ['events', 'upcoming'],
    queryFn: () => fetcher('/events/upcoming'),
    staleTime: 1000 * 60 * 10,
  })
}

// ANNOUNCEMENTS
export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements', 'feed'],
    queryFn: () => fetcher('/events/my-announcements'),
    staleTime: 1000 * 60 * 5,
  })
}
