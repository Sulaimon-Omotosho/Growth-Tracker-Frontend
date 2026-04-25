import { fetcher } from '@/lib/fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// ANNOUNCEMENT
export function useCreateAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) =>
      fetcher('/events/leadership/announcement', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      toast.success('Announcement published!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to publish announcement')
    },
  })
}
