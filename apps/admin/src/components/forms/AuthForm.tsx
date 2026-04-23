'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

import { AuthFormSchema } from '@repo/types'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import SubmitButton from '../SubmitButton'
import { useLogin } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

type AuthFormData = z.infer<typeof AuthFormSchema>

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AuthFormData) => {
    console.log(data)

    login.mutate(data, {
      onSuccess: () => {
        router.push('/admin')
        router.refresh()
      },
    })
  }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className='w-full border-none p-0 m-0'>
          <FieldGroup className='gap-5'>
            {/* Email Field */}
            <Field>
              <FieldLabel
                htmlFor='email'
                className='text-[11px] font-bold uppercase tracking-wider text-zinc-500'
              >
                Work Email
              </FieldLabel>
              <Input
                id='email'
                type='email'
                placeholder='admin@growthtracker.com'
                autoComplete='email'
                {...register('email')}
                className={cn(
                  'h-11 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-400',
                  errors.email && 'border-red-500/50 focus:ring-red-500/50',
                )}
              />
              {errors.email && (
                <p className='text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1'>
                  <AlertCircle size={10} /> {errors.email.message}
                </p>
              )}
            </Field>

            {/* Password Field */}
            <Field>
              <div className='flex items-center justify-between'>
                <FieldLabel
                  htmlFor='password'
                  className='text-[11px] font-bold uppercase tracking-wider text-zinc-500'
                >
                  Access Key
                </FieldLabel>
              </div>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder='••••••••'
                  autoComplete='current-password'
                  className={cn(
                    'h-11 rounded-xl pr-10 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-400',
                    errors.password &&
                      'border-red-500/50 focus:ring-red-500/50',
                  )}
                />
                <button
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors'
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className='text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1'>
                  <AlertCircle size={10} /> {errors.password.message}
                </p>
              )}
            </Field>

            {/* Action Area */}
            <div className='pt-2'>
              <SubmitButton
                className='bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 w-full h-11 rounded-xl font-bold transition-all hover:opacity-90 active:scale-[0.98]'
                isLoading={login.isPending}
              >
                Access Dashboard
              </SubmitButton>

              {login.isError && (
                <div className='bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-3 rounded-lg mt-4'>
                  <p className='text-red-600 dark:text-red-400 text-[11px] text-center font-medium'>
                    {(login.error as any)?.message ||
                      'Authentication failed. Please check credentials.'}
                  </p>
                </div>
              )}
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
