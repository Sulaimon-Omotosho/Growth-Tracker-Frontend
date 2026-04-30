import { fetcher } from '@/lib/fetcher'
import { Notification } from '@repo/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { io } from 'socket.io-client'

export function useNotifications() {
  return useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: () => fetcher('/notifications'),
    initialData: [],
  })
}

// Mark as Read
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      fetcher(`/notifications/${id}/read`, { method: 'PATCH' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update notification')
    },
  })
}

// Socket Manager
export function useNotificationSocket(userId?: string) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!userId) return

    const socket = io(
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      {
        transports: ['websocket'],
      },
    )
    socket.emit('join', userId)

    socket.on('new_notification', (notification: Notification) => {
      // We don't need to return the data here, we just tell
      // React Query that the 'notifications' list is now "old"
      queryClient.invalidateQueries({ queryKey: ['notifications'] })

      toast.info(notification.title, { description: notification.message })
    })

    return () => {
      socket.off('new_notification')
      socket.disconnect()
    }
  }, [userId, queryClient])
}
