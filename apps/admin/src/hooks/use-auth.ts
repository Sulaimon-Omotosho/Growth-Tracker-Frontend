import { fetcher } from '@/lib/fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

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
      router.push('/admin')
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
      router.push('/login')
      router.refresh()
    },
  })
}
