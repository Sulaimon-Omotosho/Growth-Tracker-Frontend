import { cookies } from 'next/headers'
import { apiFetch } from '@/lib/api'

export async function POST(req: Request) {
  // const { token } = await req.json()
  // const data = await apiFetch('/auth/google', {
  //   method: 'POST',
  //   body: JSON.stringify({ token }),
  // })
  // const store = await cookies()
  // store.set('accessToken', data.accessToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'lax',
  //   path: '/',
  // })
  // store.set('refreshToken', data.refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'lax',
  //   path: '/',
  // })
  // return Response.json({ user: data.user })
}
