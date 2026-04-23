'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { OnboardingFormSchema, User } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useRouter } from 'next/navigation'
import SubmitButton from '../SubmitButton'
import { FieldGroup, Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { useCheckUsername, useUpdateProfile } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { useDebounce } from '@/hooks/use-utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { AlertCircle, CheckCircle2, Loader2, LoaderIcon } from 'lucide-react'
import { Textarea } from '../ui/textarea'

const Onboarding = ({ user }: { user: User }) => {
  const { mutate, isPending } = useUpdateProfile()
  const router = useRouter()
  const checkUsername = useCheckUsername()

  const form = useForm<z.input<typeof OnboardingFormSchema>>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      username: user?.username ?? '',
      phone: user?.phone ?? '',
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : '',
      gender: user?.gender ?? 'MALE',
      about: user?.about ?? '',
    },
  })
  // console.log('Current Form Errors:', form.formState.errors)

  // Real-time Username Check
  const watchedUsername = form.watch('username')
  const debouncedUsername = useDebounce(watchedUsername, 500)

  useEffect(() => {
    const checkAvailability = async () => {
      if (!debouncedUsername || debouncedUsername === user?.username) {
        form.clearErrors('username')
        return
      }

      if (debouncedUsername.length < 3) return

      try {
        const result = await checkUsername.mutateAsync(debouncedUsername)
        if (!result.available) {
          form.setError('username', {
            type: 'manual',
            message: 'Username is already taken',
          })
        } else {
          form.clearErrors('username')
        }
      } catch (err) {
        console.error('Username check failed', err)
      }
    }

    checkAvailability()
  }, [debouncedUsername, user?.username])

  function onSubmit(data: z.output<typeof OnboardingFormSchema>) {
    // console.log('User Form', data)
    mutate(data, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  const usernameError = form.formState.errors.username

  return (
    <div className='w-full max-h-[60vh] overflow-y-auto px-1 pr-2 no-scrollbar'>
      <form id='profile-edit' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup className='gap-6'>
          {/* Username Section - Visual Feedback is Key here */}
          <Controller
            name='username'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                  Username
                </FieldLabel>
                <div className='relative'>
                  <Input
                    {...field}
                    placeholder='unique_handle'
                    className={`h-11 rounded-xl transition-all ${
                      !fieldState.invalid &&
                      watchedUsername.length > 2 &&
                      !checkUsername.isPending
                        ? 'border-green-500/50 bg-green-50/5 dark:bg-green-500/5'
                        : ''
                    }`}
                  />
                  <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                    {checkUsername.isPending && (
                      <Loader2 className='h-4 w-4 animate-spin text-blue-600' />
                    )}
                    {!fieldState.invalid &&
                      watchedUsername.length > 2 &&
                      !checkUsername.isPending && (
                        <CheckCircle2 className='h-4 w-4 text-green-500' />
                      )}
                    {fieldState.invalid && (
                      <AlertCircle className='h-4 w-4 text-destructive' />
                    )}
                  </div>
                </div>
                {fieldState.error && (
                  <p className='text-[11px] font-medium text-destructive mt-1.5 ml-1'>
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Controller
              name='firstName'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                    First Name
                  </FieldLabel>
                  <Input
                    {...field}
                    className='h-11 rounded-xl'
                    placeholder='John'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='lastName'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                    Last Name
                  </FieldLabel>
                  <Input
                    {...field}
                    className='h-11 rounded-xl'
                    placeholder='Doe'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Controller
              name='phone'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                    Phone Number
                  </FieldLabel>
                  <PhoneInput
                    international
                    defaultCountry='NG'
                    {...field}
                    className='flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='dob'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                    Date of Birth
                  </FieldLabel>
                  <Input
                    type='date'
                    {...field}
                    value={(field.value as string) ?? ''}
                    className='h-11 rounded-xl'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name='gender'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                  Gender
                </FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='h-11 rounded-xl'>
                    <SelectValue placeholder='Select Gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='MALE'>Male</SelectItem>
                    <SelectItem value='FEMALE'>Female</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='about'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                  About Me
                </FieldLabel>
                <Textarea
                  {...field}
                  placeholder='Tell us about your spiritual journey...'
                  className='min-h-30 rounded-2xl resize-none bg-gray-50/50 dark:bg-zinc-900/50'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className='pt-4'>
            <SubmitButton
              className='w-full h-12 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/20'
              isLoading={isPending}
              disabled={!!usernameError || checkUsername.isPending}
            >
              Complete Profile
            </SubmitButton>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

export default Onboarding
