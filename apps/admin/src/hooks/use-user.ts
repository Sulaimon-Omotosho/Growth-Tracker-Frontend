import { fetcher } from '@/lib/fetcher'
import { User } from '@repo/types'
import { useQuery } from '@tanstack/react-query'

// Search
export function useSearchUsers(query: string) {
  return useQuery<User[]>({
    queryKey: ['users', 'search', query],
    queryFn: () => fetcher(`/users/search?q=${query}`),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

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

// Get By Id
export function useUser(id?: string) {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => fetcher(`/users/${id}`),
    enabled: !!id,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  })
}
