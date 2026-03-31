import { fetcher } from '@/lib/fetcher'
import { User } from '@repo/types'
import { useQuery } from '@tanstack/react-query'

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
