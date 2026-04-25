import { fetcher } from '@/lib/fetcher'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Authorizations

export function useSignup() {
  return useMutation({
    mutationFn: (data: any) =>
      fetcher('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  })
}
// export function useSignup() {
//   return useMutation({
//     mutationFn: async (data: any) => {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })

//       if (!res.ok) throw new Error('Signup failed')
//       return res.json()
//     },
//   })
// }
// export function useLogin() {
//   const queryClient = useQueryClient()
//   const router = useRouter()

//   return useMutation({
//     mutationFn: async (data: { email: string; password: string }) => {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })

//       if (!res.ok) throw new Error('Login failed')
//       return res.json()
//     },

//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ['me'] })
//       router.push('/home')
//       router.refresh()
//     },
//   })
// }

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.clear()
      // queryClient.invalidateQueries({ queryKey: ['me'] })
      router.push('/home')
      router.refresh()
    },
  })
}

// export function useGoogleLogin() {
//   const queryClient = useQueryClient()
//   const router = useRouter()

//   return useMutation({
//     mutationFn: async (token: string) => {
//       const res = await fetch('/api/auth/google', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token }),
//       })

//       if (!res.ok) throw new Error('Google login failed')
//       return res.json()
//     },

//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ['me'] })
//       router.push('/home')
//       router.refresh()
//     },
//   })
// }

export function useGoogleLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (token: string) =>
      fetcher('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ token }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      router.push('/home')
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: () =>
      fetcher('/auth/logout', {
        method: 'POST',
      }),

    onSuccess: () => {
      queryClient.clear()
      localStorage.removeItem('user')
      router.push('/')
      router.refresh()
    },
  })
}

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const data = await fetcher(`/users/check/email?email=${email}`)
      return data as { available: boolean }
    },
  })
}

// Onboarding
export const useCheckUsername = () => {
  return useMutation({
    mutationFn: async (username: string) => {
      const data = await fetcher(`/users/check/username?username=${username}`)
      return data as { available: boolean }
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) =>
      fetcher('/users/updateMe', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      toast.success('Profile updated successfully')
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

export function useUpdateAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) =>
      fetcher('/users/address', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      toast.success('Address updated successfully')
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}
