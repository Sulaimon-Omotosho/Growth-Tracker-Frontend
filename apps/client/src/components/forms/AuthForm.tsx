'use client'

import { Eye, EyeClosed, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { AuthFormSchema } from '@repo/types'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import SubmitButton from '../SubmitButton'
import { useCheckEmail, useLogin, useSignup } from '@/hooks/use-auth'
import { Input } from '../ui/input'

type AuthFormData = z.infer<typeof AuthFormSchema>

const AuthForm = () => {
  const [authError, setAuthError] = useState<string | null>(null)
  const [view, setView] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const login = useLogin()
  const signup = useSignup()
  const checkEmail = useCheckEmail()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      mode: 'login',
      email: '',
      password: '',
    },
  })

  const mode = useWatch({ control, name: 'mode' })
  const isSignup = mode === 'signup'

  //  Email Availability
  const handleEmailBlur = async (email: string) => {
    // if (!isSignup || !email) return
    // if (errors.email && errors.email.type !== 'manual') return
    if (!isSignup || !email || errors.email) return

    try {
      const result = await checkEmail.mutateAsync(email)
      if (!result.available) {
        setError('email', {
          type: 'manual',
          message: 'Email already registered. Try logging in.',
        })
      }
      // else {
      //   clearErrors('email')
      // }
    } catch (err) {
      console.error('Email check failed', err)
    }
  }

  const onSubmit = async (data: AuthFormData) => {
    const payload = { email: data.email, password: data.password }

    if (data.mode === 'signup') {
      await signup.mutateAsync(payload)
      await login.mutateAsync(payload)
      router.push('/onboarding')
    } else {
      await login.mutateAsync(payload)
      router.push('/dashboard')
    }
  }
  const isLoading = login.isPending || signup.isPending

  return (
    <div className='w-full max-w-sm mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* EMAIL FIELD */}
        <div className='space-y-1'>
          <div className='relative group'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-600 transition-colors'>
              <Mail size={18} />
            </div>
            <Input
              type='email'
              placeholder='Email Address'
              {...register('email', {
                onBlur: (e) => handleEmailBlur(e.target.value),
                onChange: () => {
                  if (errors.email?.type === 'manual') clearErrors('email')
                },
              })}
              className={`pl-10 h-12 rounded-xl bg-gray-50/50 dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800 focus:ring-blue-500/20 ${
                errors.email ? 'border-destructive' : ''
              }`}
            />
            {checkEmail.isPending && (
              <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                <Loader2 className='w-4 h-4 animate-spin text-blue-600' />
              </div>
            )}
          </div>
          {errors.email && (
            <p className='text-[11px] font-medium text-destructive ml-1'>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD FIELD */}
        <div className='space-y-1'>
          <div className='relative group'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-600 transition-colors'>
              <Lock size={18} />
            </div>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              {...register('password')}
              className={`pl-10 pr-10 h-12 rounded-xl bg-gray-50/50 dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800 focus:ring-blue-500/20 ${
                errors.password ? 'border-destructive' : ''
              }`}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className='text-[11px] font-medium text-destructive ml-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ACTION AREA */}
        <div className='pt-2 space-y-4'>
          <SubmitButton
            isLoading={isLoading}
            className='w-full h-12 rounded-xl'
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </SubmitButton>

          <p className='text-center text-sm text-muted-foreground'>
            {isSignup ? 'Already have an account?' : 'New to Growth Track?'}
            <button
              type='button'
              onClick={() => {
                setValue('mode', isSignup ? 'login' : 'signup')
                clearErrors()
              }}
              className='ml-2 cursor-pointer font-bold text-blue-600 hover:text-blue-700 transition-colors'
            >
              {isSignup ? 'Sign In' : 'Create One'}
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
