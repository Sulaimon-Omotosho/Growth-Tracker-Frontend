'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RoleChangeSchema, User } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
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
import { useChangeRole } from '@/hooks/use-church'

export const roleHierarchy = [
  'MEMBER',
  'CELL',
  'ZONE',
  'DISTRICT',
  'HOD',
  'TEAM',
  'PASTOR',
  'CAMPUS_PASTOR',
] as const

type Role = (typeof roleHierarchy)[number]

const canAssign = (requesterRole?: string, targetRole?: string) => {
  if (!requesterRole || !targetRole) return false
  return (
    roleHierarchy.indexOf(requesterRole as any) >
    roleHierarchy.indexOf(targetRole as any)
  )
}

const ChangeRole = ({
  user,
  currentUser,
}: {
  user: User
  currentUser: User
}) => {
  const { mutate, isPending } = useChangeRole(user)

  const form = useForm<z.input<typeof RoleChangeSchema>>({
    resolver: zodResolver(RoleChangeSchema),
    defaultValues: {
      role: (user?.role as any) ?? '',
    },
  })

  async function onSubmit(data: z.output<typeof RoleChangeSchema>) {
    console.log('Role Form', data)
    mutate(data.role!)
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <div className='flex flex-col gap-3 justify-beginning'>
        <p className='font-bold capitalize'>
          {user?.firstName} {user?.lastName}
        </p>
        <p className='font-semibold capitalize text-sm'>
          Current: <span className='text-primary'>{user?.role}</span>
        </p>
      </div>
      <form id='change-role' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className='mt-4 gap-2'>
          <Controller
            name='role'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation='responsive' data-invalid={fieldState.invalid}>
                <FieldContent className='flex-row justify-between'>
                  <FieldLabel htmlFor='role'>Role</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    disabled={isPending}
                    onValueChange={(val) => {
                      field.onChange(val)
                      // form.handleSubmit(onSubmit)()
                    }}
                  >
                    <SelectTrigger
                      id='role'
                      aria-invalid={fieldState.invalid}
                      className=''
                    >
                      <SelectValue placeholder='Select Role' />
                    </SelectTrigger>
                    <SelectContent position='item-aligned'>
                      {roleHierarchy
                        .filter((role) => canAssign(currentUser.role, role))
                        .map((role) => (
                          <SelectItem key={role} value={role}>
                            {role.replace('_', ' ')}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default ChangeRole
