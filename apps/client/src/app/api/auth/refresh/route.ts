import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/api'

export async function POST() {
  // const store = await cookies()
  // const refreshToken = store.get('refreshToken')?.value
  // if (!refreshToken) {
  //   return Response.json({ message: 'No refresh token' }, { status: 401 })
  // }
  // const data = await apiFetch('/auth/refresh', {
  //   method: 'POST',
  //   body: JSON.stringify({ refreshToken }),
  // })
  // store.set('accessToken', data.accessToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'lax',
  //   path: '/',
  // })
  // return Response.json({ success: true })
}
