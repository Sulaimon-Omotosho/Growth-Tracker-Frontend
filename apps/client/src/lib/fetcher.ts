import { useAuthStore } from '@/store/use-auth-store'

export async function fetcher(url: string, options: RequestInit = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (res.status === 401 && !url.includes('auth/refresh')) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      // `/api/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
      },
    )
    if (refreshRes.ok) {
      return fetcher(url, options)
    } else {
      useAuthStore.getState().logout()

      throw new Error('Session expired')
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Request failed')
  }

  return res.json()
}
