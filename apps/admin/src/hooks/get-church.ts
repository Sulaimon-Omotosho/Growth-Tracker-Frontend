'use client'

import { fetcher } from '@/lib/fetcher'
import {
  Cell,
  Community,
  Course,
  Department,
  District,
  Teams,
  User,
} from '@repo/types'
import { useQuery } from '@tanstack/react-query'

// Departments
export function useGetTeams() {
  return useQuery<Teams>({
    queryKey: ['teams'],
    queryFn: () => fetcher('/church/get/teams'),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetDepartments(teamId?: string) {
  return useQuery<Department>({
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

// Members of Departments
export function useGetDepartmentMembers(deptId?: string) {
  return useQuery<User[]>({
    queryKey: ['deptMembers', deptId],
    queryFn: () => {
      if (!deptId) return []
      return fetcher(`/church/get/departments/${deptId}/members`)
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!deptId,
  })
}

//Districts
export function useGetDistricts() {
  return useQuery<District[]>({
    queryKey: ['districts'],
    queryFn: () => fetcher('/church/get/districts'),
  })
}

// Communities
export function useGetCommunities(districtId?: string) {
  return useQuery<Community[]>({
    queryKey: ['communities', districtId],
    queryFn: () => {
      const url = districtId
        ? `/church/get/communities?districtId=${districtId}`
        : '/church/get/communities'
      return fetcher(url)
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!districtId,
  })
}

// Cells
export function useGetCells(communityId?: string) {
  return useQuery<Cell[]>({
    queryKey: ['cells', communityId],
    queryFn: () => {
      const url = communityId
        ? `/church/get/cells?communityId=${communityId}`
        : '/church/get/cells'
      return fetcher(url)
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!communityId,
  })
}

// Members of Cell
export function useGetCellMembers(cellId?: string) {
  return useQuery<User[]>({
    queryKey: ['cellMembers', cellId],
    queryFn: () => {
      if (!cellId) return []
      return fetcher(`/church/get/cells/${cellId}/members`)
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!cellId,
  })
}

// Courses
export function useGetCourses() {
  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => fetcher('/church/courses/all'),
    staleTime: 5 * 60 * 1000,
  })
}

export function useGetCourseById(id: string) {
  return useQuery<Course>({
    queryKey: ['course', id],
    queryFn: () => fetcher(`/church/courses/${id}`),
    enabled: !!id,
  })
}
