import { fetcher } from '@/lib/fetcher'
import { User, UserGroupsData } from '@repo/types'
import { useQuery } from '@tanstack/react-query'

// Get Me
export function useMe() {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: () => fetcher('/users/me'),

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  })
}

export function useGetSmallGroups() {
  return useQuery<UserGroupsData>({
    queryKey: ['user-groups', 'me'],
    queryFn: async () => {
      const data = await fetcher('/users/me/groups')
      return data
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  })
}
