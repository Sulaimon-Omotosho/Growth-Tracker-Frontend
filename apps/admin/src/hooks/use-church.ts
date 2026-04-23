import { fetcher } from '@/lib/fetcher'
import {
  CellSchema,
  ChurchTeamSchema,
  Community,
  CommunitySchema,
  DepartmentSchema,
  District,
  DistrictSchema,
  Teams,
  User,
  Zone,
  ZoneSchema,
} from '@repo/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import z from 'zod'

export function useChangeRole(user: User) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newRole: string) =>
      fetcher(`/auth/users/${user.id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
      }),
    onSuccess: () => {
      toast.success('Role updated successfully')
      queryClient.invalidateQueries({ queryKey: ['users', user.id] })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update role')
    },
  })
}

//COMMUNITIES
// SEARCH
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
export function useCreateSmallGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: any) =>
      fetcher(`/church/add/small-group`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    onSuccess: (newGroup) => {
      queryClient.invalidateQueries({ queryKey: ['small-groups'] })
      queryClient.invalidateQueries({ queryKey: ['interests'] })
      toast.success(`${newGroup.name} has been created successfully!`)
    },

    onError: (error: any) => {
      const message = error?.message || 'Failed to create small group'
      toast.error(message)
    },
  })
}

export function useCreateCell() {
  const queryClient = useQueryClient()

  return useMutation({
    // mutationFn: (data: z.infer<typeof CellSchema>) =>
    mutationFn: (payload: any) =>
      fetcher(`/church/add/cell`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: (newCell) => {
      toast.success(`${newCell.name} cell has been created`)
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
      toast.success(`${newZone.name} has been created in it's community`)
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
      toast.success(`${newCommunity.name} community has been created`)
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
      toast.success(`${newDistrict.name} district has been created`)
      queryClient.invalidateQueries({ queryKey: ['districts'] })
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create District'
      toast.error(message)
    },
  })
}

//DEPARTMENTS
//SEARCH
export function useSearchTeams(query: string) {
  return useQuery<Teams[]>({
    queryKey: ['teams', 'search', query],
    queryFn: () => fetcher(`/church/search/team?q=${query}`),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}

export function useCheckTeamName() {
  return useMutation({
    mutationFn: (name: string) =>
      fetcher(`/church/teams/check-team-name?name=${name}`),
  })
}

export function useCheckDeptName() {
  return useMutation({
    mutationFn: ({
      name,
      churchTeamId,
    }: {
      name: string
      churchTeamId: string
    }) =>
      fetcher(
        `/church/teams/check-dept-name?name=${name}&churchTeamId=${churchTeamId}`,
      ),
  })
}

export function useCheckDistName() {
  return useMutation({
    mutationFn: (name: string) =>
      fetcher(`/church/teams/check-dist-name?name=${name}`),
  })
}

export function useCheckCommName() {
  return useMutation({
    mutationFn: ({ name, districtId }: { name: string; districtId: string }) =>
      fetcher(
        `/church/teams/check-comm-name?name=${name}&districtId=${districtId}`,
      ),
  })
}

export function useCheckZoneName() {
  return useMutation({
    mutationFn: ({
      name,
      communityId,
    }: {
      name: string
      communityId: string
    }) =>
      fetcher(
        `/church/teams/check-zone-name?name=${name}&communityId=${communityId}`,
      ),
  })
}

export function useCheckCellName() {
  return useMutation({
    mutationFn: ({
      name,
      communityId,
    }: {
      name: string
      communityId: string
    }) =>
      fetcher(
        `/church/teams/check-cell-name?name=${name}&communityId=${communityId}`,
      ),
  })
}

//ACTIONS
export function useCreateDepartment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof DepartmentSchema>) =>
      fetcher('/church/add/department', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (newDepartment) => {
      toast.success(`${newDepartment.name} department has been created`)
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create Department'
      toast.error(message)
    },
  })
}

export function useCreateTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof ChurchTeamSchema>) =>
      fetcher('/church/add/team', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (newTeam) => {
      toast.success(`${newTeam.name} team has been created`)
      queryClient.invalidateQueries({ queryKey: ['ChurchTeams'] })
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create District'
      toast.error(message)
    },
  })
}

// Delete
export function useDeleteTeams() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) =>
      fetcher('/church/teams/bulk-delete', {
        method: 'DELETE',
        body: JSON.stringify(ids),
      }),
    onSuccess: (data, ids) => {
      queryClient.invalidateQueries({ queryKey: ['church', 'teams'] })
      toast.success(`${ids.length} items(s) deleted successfully.`)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete items. Please try again.')
    },
  })
}
