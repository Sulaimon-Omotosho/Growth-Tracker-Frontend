'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RoleChangeSchema, User } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { useRouter } from 'next/navigation'
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useUpdateRole } from '@/hooks/useUpdateRole'
import { toast } from 'sonner'
// import { roleHierarchy } from '@/app/(dashboard)/users/[id]/page'

const now = new Date()
const date = now.toLocaleDateString()
const time = now.toLocaleTimeString()

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
  const currentUserRole = currentUser.role
  const router = useRouter()

  const { mutate: updateRole, isPending } = useUpdateRole()

  const form = useForm<z.input<typeof RoleChangeSchema>>({
    resolver: zodResolver(RoleChangeSchema),
    defaultValues: {
      role: (user?.role as any) ?? '',
    },
  })

  async function onSubmit(data: z.output<typeof RoleChangeSchema>) {
    console.log('Role Form', data)

    updateRole({ userId: user.id, role: data.role as any })
    toast(`Role Changed`, {
      description: `On ${date} at ${time}`,
    })

    // setTimeout(() => {
    //   window.location.reload()
    // }, 3000)
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <div className='flex flex-col gap-3 justify-beginning'>
        <p className='font-bold capitalize'>
          {user?.firstName} {user?.lastName}
        </p>
        <p className='font-semibold capitalize text-sm'>{user?.role} </p>
      </div>
      <form id='change-role' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup className='gap-2'>
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
                    onValueChange={field.onChange}
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
                        .filter((role) => canAssign(currentUserRole, role))
                        .map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
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
