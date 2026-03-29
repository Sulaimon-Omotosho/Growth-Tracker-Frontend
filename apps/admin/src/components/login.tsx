'use client'

import { login } from '@/lib/auth'
import { setTokens } from '@/lib/token'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  async function handleLogin() {
    const data = await login('test@gmail.com', '123456')

    setTokens(data)

    router.push('/dashboard')
  }

  return <button onClick={handleLogin}>Login</button>
}

// const data = await register(email, password)
// setTokens(data)

// import { GoogleLogin } from '@react-oauth/google'
// import { googleLogin } from '@/lib/auth'
// import { setTokens } from '@/lib/token'

// ;<GoogleLogin
//   onSuccess={async (credentialResponse) => {
//     const token = credentialResponse.access_token

//     const data = await googleLogin(token!)
//     setTokens(data)
//   }}
// />
