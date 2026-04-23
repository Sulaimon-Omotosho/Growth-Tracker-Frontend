'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserFormSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { AddFormProps } from '@/lib/types'
import {
  useCheckEmail,
  useCheckUsername,
  useUpdateAddress,
  useUpdateProfile,
} from '@/hooks/use-auth'
import { useEffect } from 'react'
import { CheckCircle2, Loader2, MapPin, UserIcon } from 'lucide-react'

const gender = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
] as const

const UserForm = ({ user, onSuccess, onValidationChange }: AddFormProps) => {
  const updateProfile = useUpdateProfile()
  const updateAddress = useUpdateAddress()

  // Availability Hooks
  const checkUsername = useCheckUsername()
  const checkEmail = useCheckEmail()

  const form = useForm<z.input<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      username: user?.username ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      gender: (user?.gender as any) ?? 'MALE',
      dob: user?.dob ? new Date(user.dob).toISOString().slice(0, 10) : '',
      about: user?.about ?? '',
      // Address defaults
      street: (user?.address?.street as string) ?? '',
      city: (user?.address?.city as string) ?? '',
      state: (user?.address?.state as string) ?? '',
      country: (user?.address?.country as string) ?? 'Nigeria',
      zipCode: (user?.address?.zipCode as string) ?? '',
    },
  })

  const { isValid } = form.formState

  // Availability Checks
  const handleUsernameBlur = async (username: string) => {
    if (!username || username === user?.username) return
    const result = await checkUsername.mutateAsync(username)
    if (!result.available) {
      form.setError('username', {
        type: 'manual',
        message: 'Username is already taken.',
      })
    } else {
      form.clearErrors('username')
    }
  }

  const handleEmailBlur = async (email: string) => {
    if (!email || email === user?.email) return
    const result = await checkEmail.mutateAsync(email)
    if (!result.available) {
      form.setError('email', {
        type: 'manual',
        message: 'Email is already in use.',
      })
    } else {
      form.clearErrors('email')
    }
  }

  // Use Effects
  useEffect(() => {
    const isPending =
      checkUsername.isPending ||
      checkEmail.isPending ||
      updateProfile.isPending ||
      updateAddress.isPending
    onValidationChange?.(!isValid || isPending)
  }, [
    isValid,
    checkUsername.isPending,
    checkEmail.isPending,
    updateProfile.isPending,
    updateAddress.isPending,
    onValidationChange,
  ])

  // Submit Action
  async function onSubmit(data: z.output<typeof UserFormSchema>) {
    try {
      const {
        street,
        city,
        state,
        country,
        zipCode,
        firstName,
        lastName,
        username,
        email,
        phone,
        gender,
        dob,
        about,
      } = data
      //Payloads
      const profilePayload = {
        firstName,
        lastName,
        username,
        email,
        phone,
        gender,
        dob,
        about,
      }
      const addressPayload = {
        street,
        city,
        state,
        country,
        zipCode,
      }

      await Promise.all([
        updateProfile.mutateAsync(profilePayload),
        updateAddress.mutateAsync(addressPayload),
      ])

      onSuccess?.()
    } catch (error) {
      console.error('Failed to update:', error)
    }
  }

  return (
    <div className='w-full no-scrollbar pb-10'>
      <form id='profile-edit' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup className='gap-6'>
          {/* PERSONAL INFO SECTION */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 mb-2'>
              <UserIcon size={16} className='text-blue-600' />
              <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground'>
                Personal Information
              </h3>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <Controller
                name='firstName'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className='text-xs'>First Name</FieldLabel>
                    <Input
                      {...field}
                      className='h-10 rounded-xl'
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
                    <FieldLabel className='text-xs'>Last Name</FieldLabel>
                    <Input
                      {...field}
                      className='h-10 rounded-xl'
                      placeholder='Doe'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='text-xs'>Username</FieldLabel>
                  <div className='relative'>
                    <Input
                      {...field}
                      className='h-10 rounded-xl pr-10'
                      onBlur={(e) => {
                        field.onBlur()
                        handleUsernameBlur(e.target.value)
                      }}
                    />
                    <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                      {checkUsername.isPending && (
                        <Loader2 className='w-4 h-4 animate-spin text-blue-600' />
                      )}
                      {!fieldState.invalid &&
                        field.value !== user?.username &&
                        field.value.length > 2 &&
                        !checkUsername.isPending && (
                          <CheckCircle2 className='w-4 h-4 text-green-500' />
                        )}
                    </div>
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className='text-xs'>Email Address</FieldLabel>
                  <div className='relative'>
                    <Input
                      {...field}
                      className='h-10 rounded-xl pr-10'
                      onBlur={(e) => {
                        field.onBlur()
                        handleEmailBlur(e.target.value)
                      }}
                    />
                    <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                      {checkEmail.isPending && (
                        <Loader2 className='w-4 h-4 animate-spin text-blue-600' />
                      )}
                      {!fieldState.invalid &&
                        field.value !== user?.email &&
                        !checkEmail.isPending && (
                          <CheckCircle2 className='w-4 h-4 text-green-500' />
                        )}
                    </div>
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <Controller
                name='gender'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className='text-xs'>Gender</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='h-10 rounded-xl'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {gender.map((g) => (
                          <SelectItem key={g.value} value={g.value}>
                            {g.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                name='dob'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className='text-xs'>D.O.B</FieldLabel>
                    <Input
                      type='date'
                      {...field}
                      value={(field.value as string) ?? ''}
                      className='h-10 rounded-xl'
                    />
                  </Field>
                )}
              />
            </div>

            <Controller
              name='phone'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel className='text-xs'>Phone Number</FieldLabel>
                  <PhoneInput
                    {...field}
                    international
                    defaultCountry='NG'
                    className='flex h-10 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm'
                  />
                </Field>
              )}
            />
          </div>

          {/* ADDRESS SECTION */}
          <div className='space-y-4 pt-4 border-t border-dashed dark:border-zinc-800'>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin size={16} className='text-blue-600' />
              <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground'>
                Address Details
              </h3>
            </div>

            <Controller
              name='street'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel className='text-xs'>Street Address</FieldLabel>
                  <Input
                    {...field}
                    className='h-10 rounded-xl'
                    placeholder='123 Growth Way'
                  />
                </Field>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <Controller
                name='city'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className='text-xs'>City</FieldLabel>
                    <Input
                      {...field}
                      className='h-10 rounded-xl'
                      placeholder='Lagos'
                    />
                  </Field>
                )}
              />
              <Controller
                name='state'
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className='text-xs'>State</FieldLabel>
                    <Input
                      {...field}
                      className='h-10 rounded-xl'
                      placeholder='Lagos State'
                    />
                  </Field>
                )}
              />
            </div>

            <Controller
              name='country'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel className='text-xs'>Country</FieldLabel>
                  <Input {...field} className='h-10 rounded-xl' />
                </Field>
              )}
            />
          </div>

          {/* ABOUT SECTION */}
          <div className='pt-4 border-t border-dashed dark:border-zinc-800'>
            <Controller
              name='about'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2'>
                    Bio / About
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder='Tell us a bit about yourself...'
                    className='min-h-25 rounded-xl resize-none'
                  />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

export default UserForm
