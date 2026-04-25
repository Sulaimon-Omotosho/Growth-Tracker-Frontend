'use client'

import { useEffect } from 'react'
import { fetcher } from '@/lib/fetcher'

export function RefreshHeartbeat() {
  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 70

    const performRefresh = async () => {
      try {
        console.log('Initiating proactive session refresh...')
        await fetcher('/auth/refresh', { method: 'POST' })
        console.log('Session successfully extended for another 75m')
      } catch (error) {
        console.error('Proactive refresh failed:', error)
      }
    }

    const interval = setInterval(performRefresh, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return null
}
