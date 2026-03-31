'use client'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { AuthFormSchema } from '@repo/types'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SubmitButton from '../SubmitButton'
import { useLogin } from '@/hooks/use-auth'

type AuthFormData = z.infer<typeof AuthFormSchema>

export function AuthForm() {
  const [view, setView] = useState(false)
  const router = useRouter()
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AuthFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push('/admin')
        router.refresh()
      },
    })
  }

  return (
    <div className='w-full max-w-xs'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-center text-xl lg:text-3xl pb-1'>
          The Growth Tracker
        </h1>
        <p className='text-muted-foreground'>(Admin)</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className='w-full max-w-xs'>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                id='email'
                type='email'
                placeholder='example@email.com'
                // required
                {...register('email')}
              />
              {/* <FieldDescription>
                Put in the email of your account.
              </FieldDescription> */}
              {errors.email && (
                <p className='text-xs text-red-500'>{errors.email.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <div className='relative'>
                <button
                  className='absolute right-2 top-1.5'
                  type='button'
                  onClick={() => setView(!view)}
                >
                  {view ? (
                    <EyeClosed className='w-6 h-6 text-gray-200 ml-2 cursor-pointer' />
                  ) : (
                    <Eye className='w-6 h-6 text-gray-200 ml-2 cursor-pointer' />
                  )}
                </button>
                <Input
                  id='password'
                  type={view ? 'text' : 'password'}
                  {...register('password')}
                  placeholder='••••••••'
                />
              </div>
              {/* <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription> */}
              {errors.password && (
                <p className='text-xs text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </Field>
            <Field>
              <SubmitButton
                className='bg-blue-700 hover:bg-blue-500 text-white w-full h-8 rounded-md cursor-pointer transition-all duration-300'
                isLoading={isSubmitting}
              >
                Log In
              </SubmitButton>
              {login.isError && (
                <p className='text-red-500 text-sm text-center mt-2'>
                  {(login.error as any)?.message ||
                    'Login failed. Please check your credentials.'}
                </p>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
