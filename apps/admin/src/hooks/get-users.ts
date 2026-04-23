'use client'

import { fetcher } from '@/lib/fetcher'
import { User } from '@repo/types'
import { useQuery } from '@tanstack/react-query'

//Get Pastors
export function useGetPastors() {
  return useQuery<User[]>({
    queryKey: ['users', 'pastors'],
    queryFn: () => fetcher('/users/role/pastors'),
    staleTime: 1000 * 60 * 10,
  })
}

//Get Leaders
export function useGetLeaders() {
  return useQuery<User[]>({
    queryKey: ['users', 'leaders'],
    queryFn: () => fetcher('/users/role/leaders'),
    staleTime: 1000 * 60 * 10,
  })
}

//Get Workers
export function useGetWorkers() {
  return useQuery<User[]>({
    queryKey: ['users', 'workers'],
    queryFn: () => fetcher('/users/role/workers'),
    staleTime: 1000 * 60 * 10,
  })
}

//Get Members
export function useGetMembers() {
  return useQuery<User[]>({
    queryKey: ['users', 'members'],
    queryFn: () => fetcher('/users/role/members'),
    staleTime: 1000 * 60 * 10,
  })
}

// inside workers-columns.tsx
// {
//   accessorKey: 'departments',
//   header: 'Department(s)',
//   cell: ({ row }) => {
//     const user = row.original;
//     const names = user.departments?.map((d: any) => d.name).join(', ');
//     return <span className="font-medium text-blue-600">{names || 'No Dept'}</span>;
//   }
// }
