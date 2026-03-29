import { fetcher } from '@/lib/fetcher'
import { useQuery } from '@tanstack/react-query'

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => fetcher('/auth/me'),
  })
}
