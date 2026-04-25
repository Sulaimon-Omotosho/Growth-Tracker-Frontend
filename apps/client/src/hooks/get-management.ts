// hooks/use-leadership-profile.ts
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/lib/fetcher'
import { LeadershipProfile } from '@repo/types'

export function useLeadershipProfile() {
  return useQuery<LeadershipProfile>({
    queryKey: ['leadership-profile'],
    queryFn: () => fetcher('/management/leadership-profile'),
    staleTime: 1000 * 60 * 15,
  })
}
