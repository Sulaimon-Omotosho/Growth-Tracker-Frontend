import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      if (error.status === 401 || error.statusCode === 401) {
        window.location.href = '/login'
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      if (error.status === 401) {
        window.location.href = '/login'
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
