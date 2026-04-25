import { fetcher } from '@/lib/fetcher'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Search for Communities
export const useSearchCommunities = () => {
  return useMutation({
    mutationFn: async (search: string) => {
      const data = await fetcher(`/church/search/community?q=${search}`)
      return data as Array<{ id: string; name: string }>
    },
  })
}

// Search For Zones
export const useSearchZones = (search: string) => {
  return useQuery({
    queryKey: ['zones', 'search', search],
    queryFn: async () => {
      const data = await fetcher(`/church/search/all/zones?q=${search}`)
      return data as Array<{
        id: string
        name: string
        community?: { name: string }
      }>
    },
    enabled: search.length > 0,
    placeholderData: (previousData) => previousData,
  })
}

// Search Cells by Zones
export const useGetCellsByZone = (zoneId: string) => {
  return useQuery({
    queryKey: ['zones', zoneId, 'cells'],
    queryFn: async () => {
      const data = await fetcher(`/church/zones/${zoneId}/cells`)
      return data as Array<{
        id: string
        name: string
        isOnline: boolean
        address?: {
          street: string
          city: string
          state: string
          country: string
        }
        leader?: { firstName: string; lastName: string }
      }>
    },
    enabled: !!zoneId,
  })
}

// Search for Cells by Community
export const useSearchCellsByCommunity = () => {
  return useMutation({
    mutationFn: async ({
      communityId,
      search,
    }: {
      communityId: string
      search: string
    }) => {
      const data = await fetcher(
        `/church/search/cell?communityId=${communityId}&q=${search}`,
      )
      return data as Array<{
        id: string
        name: string
        leader?: { firstName: string; lastName: string }
      }>
    },
  })
}

// Join A Cell
export const useJoinCell = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ cellId }: { cellId: string }) => {
      const data = await fetcher(`/church/members/join/cell`, {
        method: 'POST',
        body: JSON.stringify({ cellId }),
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] })
      toast.success('Cell joined successfully')
    },
  })
}

// Join Department
export const useJoinDept = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ deptId }: { deptId: string }) => {
      const data = await fetcher(`/church/members/join/dept`, {
        method: 'POST',
        body: JSON.stringify({ deptId }),
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] })
      toast.success('Joined department successfully')
    },
  })
}

// Search Small Group
export function useSearchSmallGroups(query: string) {
  return useQuery({
    queryKey: ['small-groups', 'search', query],
    queryFn: () => fetcher(`/church/search/small-groups?q=${query}`),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
  })
}

// Join Small Group
export const useJoinSmallGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ smallGroupId }: { smallGroupId: string }) => {
      const data = await fetcher(`/church/members/join/small-group`, {
        method: 'POST',
        body: JSON.stringify({ smallGroupId }),
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] })
      toast.success('Small group joined successfully')
    },
  })
}
