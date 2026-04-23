import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fetcher } from '@/lib/fetcher'

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: any) =>
      fetcher(`/church/events`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    onSuccess: (newEvent) => {
      toast.success(`${newEvent.title} has been scheduled successfully`)
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['event-stats'] })
    },

    onError: (error: any) => {
      const message =
        error?.info?.message || error?.message || 'Failed to create event'
      toast.error(message)
    },
  })
}
