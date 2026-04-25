import { cookies } from 'next/headers'

export async function POST(req: Request) {
  // const body = await req.json()
  // const res = await fetch(`${process.env.API_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(body),
  // })
  // // console.log('Login:', res)
  // const data = await res.json()
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
