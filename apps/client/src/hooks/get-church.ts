'use client'

import { fetcher } from '@/lib/fetcher'
import { useQuery } from '@tanstack/react-query'

// Departments
export function useGetTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: () => fetcher('/church/get/teams'),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetDepartments(teamId?: string) {
  return useQuery({
    queryKey: ['departments', teamId],
    queryFn: () => {
      const url = teamId
        ? `/church/get/departments?teamId=${teamId}`
        : '/church/get/departments'
      return fetcher(url)
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!teamId,
  })
}
