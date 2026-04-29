'use client'

import { fetcher } from '@/lib/fetcher'
import { Cell, Course, Department, SmallGroup, Teams } from '@repo/types'
import { useQuery } from '@tanstack/react-query'

// Departments
export function useGetTeams() {
  return useQuery<Teams[]>({
    queryKey: ['teams'],
    queryFn: () => fetcher('/church/get/teams'),
    staleTime: 1000 * 60 * 30,
  })
}

export function useGetDepartments(teamId?: string) {
  return useQuery<Department[]>({
    queryKey: ['departments', teamId],
    queryFn: () => {
      const url = teamId
        ? `/church/get/departments?teamId=${teamId}`
        : '/church/get/departments'
      return fetcher(url)
    },
    staleTime: 1000 * 60 * 30,
    enabled: !!teamId,
  })
}

export function useMyDepartments() {
  return useQuery<Department[]>({
    queryKey: ['my-departments'],
    queryFn: () => fetcher('/church/get/my-departments'),
    staleTime: 1000 * 60 * 30,
  })
}

// Cells
export function useMyCell() {
  return useQuery<Cell>({
    queryKey: ['my-cell'],
    queryFn: () => fetcher('/church/get/my-cell'),
    staleTime: 1000 * 60 * 30,
  })
}

// Small Groups
export function useMySmallGroups() {
  return useQuery<SmallGroup[]>({
    queryKey: ['my-small-groups'],
    queryFn: () => fetcher('/church/get/my-groups'),
    staleTime: 1000 * 60 * 30,
  })
}

// Courses
export function useGetCourses() {
  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => fetcher('/course/get/all'),
    staleTime: 5 * 60 * 1000,
  })
}
export function useAvailableCourses() {
  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => fetcher('/course/available'),
    staleTime: 5 * 60 * 1000,
  })
}

export function useMyEnrollments() {
  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => fetcher('/course/my-enrollments'),
    staleTime: 5 * 60 * 1000,
  })
}

export function useGetCourseById(id: string) {
  return useQuery<Course>({
    queryKey: ['course', id],
    queryFn: () => fetcher(`/course/get/${id}`),
    enabled: !!id,
  })
}

export function useGetCourseProgress(courseId: string) {
  return useQuery<Course>({
    queryKey: ['course-progress', courseId],

    queryFn: async () => {
      const data = await fetcher(`/course/${courseId}`)
      return data
    },
    enabled: !!courseId,
    staleTime: 1000 * 60 * 30,
  })
}
