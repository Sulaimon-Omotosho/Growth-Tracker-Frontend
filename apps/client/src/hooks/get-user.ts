import { fetcher } from '@/lib/fetcher'
import { User } from '@repo/types'
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

// Get Small Groups
// export function useGetSmallGroups() {
//   return useQuery({
//     queryKey: ['user-groups'],
//     queryFn: async () => {
//       const data = await fetcher('users/me/groups')
//       return data
//     },
//   })
// }
export function useGetSmallGroups() {
  return useQuery({
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
