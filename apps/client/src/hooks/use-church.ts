import { fetcher } from '@/lib/fetcher'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
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
export function useJoinCell() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ cellId }: { cellId: string }) => {
      const data = await fetcher(`/small-groups/join/${cellId}`, {
        method: 'POST',
        body: JSON.stringify({ cellId }),
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-onboardings'] })
      toast.success('Cell onboarding joined successfully')
    },
  })
}

// Join Department
// export const useJoinDept = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({ deptId }: { deptId: string }) => {
//       const data = await fetcher(`/church/members/join/dept`, {
//         method: 'POST',
//         body: JSON.stringify({ deptId }),
//       })
//       return data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['auth-user'] })
//       toast.success('Joined department successfully')
//     },
//   })
// }
export function useJoinDepartment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (deptId: string) =>
      fetcher(`/workforce/${deptId}/join`, { method: 'POST' }),
    onSuccess: () => {
      toast.success('Joined department onboarding successfully')
      queryClient.invalidateQueries({ queryKey: ['my-onboardings'] })
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

// Start A Course
export function useEnrollInCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await fetcher(`/course/${courseId}/enroll`, {
        method: 'POST',
      })
      return response
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['courses', 'available'] })
      queryClient.invalidateQueries({ queryKey: ['courses', 'my-enrollments'] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })

      toast.success(
        "Successfully enrolled! Head over to 'My Courses' to start.",
      )
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || 'Failed to enroll. Please try again.'
      toast.error(errorMessage)
    },
  })
}

// Onboarding Action
export function useApproveOnboarding() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (participantId: string) =>
      fetcher(`/small-groups/onboarding/approve/${participantId}`, {
        method: 'PATCH',
      }),
    onSuccess: (_, participantId) => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-room'] })
      queryClient.invalidateQueries({ queryKey: ['my-onboardings'] })
      toast.success('Member now approved successfully')
    },
  })
}

export function useExtendOnboarding() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, weeks }: { id: string; weeks: 2 | 4 }) =>
      fetcher(`/small-groups/onboarding/extend/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ weeks }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-room'] })
      toast.success('Member onboarding extended successfully')
    },
  })
}

export function useExitOnboarding() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (roomId: string) =>
      fetcher(`/small-groups/onboarding/exit/${roomId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-onboardings'] })
      toast.success('You have successfully exited the onboarding process.')
      router.push('/dashboard/onboarding')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to exit onboarding')
    },
  })
}

export function useCreateOnboardingRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (cellId: string) => {
      const newRoom = await fetcher(
        `/small-groups/cell/${cellId}/onboarding/init`,
        {
          method: 'POST',
        },
      )
      return newRoom
    },
    // onSuccess: (newRoom) => {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cells'] })
      queryClient.invalidateQueries({ queryKey: ['my-leads'] })
      toast.success('Onboarding room initialized successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to initialize room')
    },
  })
}
