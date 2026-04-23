'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChurchTeamSchema } from '@repo/types'
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
import { useCheckTeamName } from '@/hooks/use-church'

type TeamFormValues = z.output<typeof ChurchTeamSchema>
export interface AddFormProps {
  onSuccess?: () => void
  mutation: any
  onValidationChange?: (disabled: boolean) => void
}

const AddTeam = ({ onSuccess, mutation, onValidationChange }: AddFormProps) => {
  const [userSearch, setUserSearch] = useState('')
  const debouncedUserSearch = useDebounce(userSearch, 400)

  const form = useForm<z.input<typeof ChurchTeamSchema>>({
    resolver: zodResolver(ChurchTeamSchema),
    defaultValues: {
      name: '',
      leaderId: '',
      description: '',
    },
  })

  const {
    formState: { isValid },
  } = form

  // Availability
  const checkName = useCheckTeamName()
  const handleNameBlur = async (name: string) => {
    if (!name || name.length < 3) return
    const result = await checkName.mutateAsync(name)

    if (!result.available) {
      form.setError('name', {
        type: 'manual',
        message: 'This team name is already taken.',
      })
    } else {
      form.clearErrors('name')
    }
  }

  // Effects
  useEffect(() => {
    const isInvalid = !isValid || checkName.isPending
    onValidationChange?.(isInvalid)
  }, [isValid, checkName.isPending, onValidationChange])

  // Queries
  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)

  const onSubmit = (data: TeamFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-team' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>
                  Team Name {checkName.isPending && ' (Checking...)'}
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
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name='leaderId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='pastorId'>Pastor</FieldLabel>

                <Input
                  placeholder='Search Pastor...'
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
                        <p className='font-medium'>
                          {u.firstName} {u.lastName}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
                <input type='hidden' value={field.value ?? ''} />
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
                  placeholder='About the team ...'
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

export default AddTeam
