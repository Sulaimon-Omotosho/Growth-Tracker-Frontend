'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useLogout } from '@/hooks/use-auth'

export function UnauthorizedCard() {
  const logout = useLogout()
  return (
    <Card
      // size='sm'
      className='mx-auto w-full max-w-sm shadow-xl shadow-gray-600'
    >
      <CardHeader>
        <CardTitle>Unauthorized</CardTitle>
        <CardDescription>
          You're not authorized to use this app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hello, </p>
        <p>
          Only high HICC Gbagada leaders are authorized to use this admin web
          app
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          variant='outline'
          size='sm'
          className='w-full'
        >
          {logout.isPending ? 'Signing out ...' : 'Sign Out'}
        </Button>
      </CardFooter>
    </Card>
  )
}
