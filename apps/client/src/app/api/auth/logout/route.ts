import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/api'

export async function POST() {
  // const store = await cookies()
  // // optional: notify backend
  // try {
  //   await apiFetch('/auth/logout', {
  //     method: 'POST',
  //   })
  // } catch {}
  // store.delete('accessToken')
  // store.delete('refreshToken')
  // return Response.json({ success: true })
}
