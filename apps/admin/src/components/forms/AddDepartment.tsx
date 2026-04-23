'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DepartmentSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-utils'
import { useSearchUsers } from '@/hooks/use-user'
import { useCheckDeptName, useSearchTeams } from '@/hooks/use-church'
import { AddFormProps } from './AddTeam'

type DepartmentFormValues = z.output<typeof DepartmentSchema>

const AddDepartment = ({
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const [userSearch, setUserSearch] = useState('')
  const [teamSearch, setTeamSearch] = useState('')

  const debouncedUserSearch = useDebounce(userSearch, 400)
  const debouncedTeamSearch = useDebounce(teamSearch, 400)

  const form = useForm<z.input<typeof DepartmentSchema>>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      name: '',
      leaderId: '',
      churchTeamId: '',
      email: '',
      description: '',
    },
  })

  const {
    formState: { isValid },
  } = form

  //Name Availability
  const checkDeptName = useCheckDeptName()
  const selectedTeam = form.watch('churchTeamId')
  const currentName = form.watch('name')
  const handleNameBlur = async (name: string) => {
    const churchTeamId = form.getValues('churchTeamId')

    if (!name || !churchTeamId || name.length < 2) return

    const result = await checkDeptName.mutateAsync({ name, churchTeamId })

    if (!result.available) {
      form.setError('name', {
        type: 'manual',
        message: 'This department already exists in the selected team.',
      })
    } else {
      form.clearErrors('name')
    }
  }

  // Effects
  useEffect(() => {
    const isInvalid = !isValid || checkDeptName.isPending
    onValidationChange?.(isInvalid)
  }, [isValid, checkDeptName.isPending, onValidationChange])

  useEffect(() => {
    if (currentName && selectedTeam) {
      handleNameBlur(currentName)
    }
  }, [selectedTeam])

  //Queries
  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)
  const { data: teams, isFetching: isTeamLoading } =
    useSearchTeams(debouncedTeamSearch)

  async function onSubmit(data: DepartmentFormValues) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        setTeamSearch('')
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-department' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='firstName'>
                  Department Name {checkDeptName.isPending && 'Checking...'}
                </FieldLabel>
                <Input
                  {...field}
                  id='name'
                  aria-invalid={fieldState.invalid}
                  onBlur={(e) => {
                    field.onBlur()
                    handleNameBlur(e.target.value)
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='leaderId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='leaderId'>H.O.D</FieldLabel>
                <Input
                  placeholder='Search H.O.D...'
                  value={userSearch}
                  onChange={(e) => {
                    setUserSearch(e.target.value)
                    if (field.value) field.onChange('')
                  }}
                />

                {!field.value && userSearch.length > 2 && (
                  <div className='mt-18 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-10 w-full'>
                    {isUsersLoading && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    )}

                    {!isUsersLoading && users?.length === 0 && userSearch && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        None found
                      </p>
                    )}

                    {users?.map((u) => (
                      <button
                        key={u.id}
                        type='button'
                        className='block w-full text-left p-2 hover:bg-muted'
                        onClick={() => {
                          field.onChange(u.id)
                          setUserSearch(`${u.firstName} ${u.lastName}`)
                        }}
                      >
                        {u.firstName} {u.lastName}
                      </button>
                    ))}
                  </div>
                )}
                <input type='hidden' value={field.value ?? ''} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name='churchTeamId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='churchTeamId'>Team</FieldLabel>
                <Input
                  placeholder='Search Team...'
                  value={teamSearch}
                  onChange={(e) => {
                    setTeamSearch(e.target.value)
                    if (field.value) field.onChange('')
                  }}
                />

                {!field.value && teamSearch.length > 2 && (
                  <div className='mt-18 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-10 w-full'>
                    {isTeamLoading && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    )}

                    {!isTeamLoading && teams?.length === 0 && teamSearch && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        None found
                      </p>
                    )}

                    {teams?.map((t) => (
                      <button
                        key={t.id}
                        type='button'
                        className='block w-full text-left p-2 hover:bg-muted'
                        onClick={() => {
                          field.onChange(t.id)
                          setTeamSearch(t.name)
                        }}
                      >
                        <p className='font-medium capitalize'>{t.name}</p>
                      </button>
                    ))}
                  </div>
                )}
                <input type='hidden' value={field.value ?? ''} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  {...field}
                  id='email'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='description'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='description'>Description</FieldLabel>
                <Textarea
                  {...field}
                  id='description'
                  aria-invalid={fieldState.invalid}
                  placeholder='About the department ...'
                  className='min-h-30'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddDepartment
