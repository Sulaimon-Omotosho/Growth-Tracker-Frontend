import { fetcher } from '@/lib/fetcher'
import {
  CellSchema,
  Community,
  CommunitySchema,
  District,
  DistrictSchema,
  User,
  Zone,
  ZoneSchema,
} from '@repo/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import z from 'zod'

// SEARCH
export function useSearchUsers(query: string) {
  return useQuery<User[]>({
    queryKey: ['users', 'search', query],
    queryFn: () => fetcher(`/users/searchUser?q=${query}`),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

export function useSearchDistrict(query: string) {
  return useQuery<District[]>({
    queryKey: ['districts', 'search', query],
    queryFn: () => fetcher(`/church/search/district?q=${query}`),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

export function useSearchCommunities(query: string) {
  return useQuery<Community[]>({
    queryKey: ['communities', 'search', query],
    queryFn: () => fetcher(`/church/search/community?q=${query}`),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

export function useSearchZones(query: string, communityId: string) {
  return useQuery<Zone[]>({
    queryKey: ['zones', 'search', query, communityId],
    queryFn: () =>
      fetcher(`/church/search/zone?q=${query}&communityId=${communityId}`),
    enabled: !!communityId && query.length > 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

// ACTIONS
export function useCreateCell() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof CellSchema>) =>
      fetcher(`/church/add/cell`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (newCell) => {
      toast.success(`${newCell.name} has been created`)
      queryClient.invalidateQueries({ queryKey: ['cells'] })
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create cell'
      toast.error(message)
    },
  })
}

export function useCreateZone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof ZoneSchema>) =>
      fetcher('/church/add/zone', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (newZone) => {
      toast.success(`${newZone.name} has been created`)
      queryClient.invalidateQueries({ queryKey: ['zones'] })
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create zone'
      toast.error(message)
    },
  })
}

export function useCreateCommunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof CommunitySchema>) =>
      fetcher('/church/add/community', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (newCommunity) => {
      toast.success(`${newCommunity.name} has been created`)
      queryClient.invalidateQueries({ queryKey: ['communities'] })
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create community'
      toast.error(message)
    },
  })
}

export function useCreateDistrict() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof DistrictSchema>) =>
      fetcher('/church/add/district', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (newDistrict) => {
      toast.success(`${newDistrict.name} has been created`)
      queryClient.invalidateQueries({ queryKey: ['districts'] })
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create District'
      toast.error(message)
    },
  })
}
