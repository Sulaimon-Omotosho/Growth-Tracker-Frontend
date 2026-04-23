'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ZoneSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-utils'
import { useCheckZoneName, useSearchCommunities } from '@/hooks/use-church'
import { useSearchUsers } from '@/hooks/use-user'
import { AddFormProps } from './AddTeam'

type ZoneFormValues = z.output<typeof ZoneSchema>

const AddZone = ({ onSuccess, mutation, onValidationChange }: AddFormProps) => {
  const [userSearch, setUserSearch] = useState('')
  const [communitySearch, setCommunitySearch] = useState('')

  const debouncedUserSearch = useDebounce(userSearch, 400)
  const debouncedCommunitySearch = useDebounce(communitySearch, 400)

  const form = useForm<z.input<typeof ZoneSchema>>({
    resolver: zodResolver(ZoneSchema),
    defaultValues: {
      name: '',
      leaderId: '',
      communityId: '',
    },
  })
  const {
    formState: { isValid },
  } = form

  //Availability
  const checkName = useCheckZoneName()
  const selectedCommunity = form.watch('communityId')
  const currentName = form.watch('name')
  const handleNameBlur = async (name: string) => {
    const communityId = form.getValues('communityId')

    if (!name || !communityId || name.length < 3) return
    const result = await checkName.mutateAsync({ name, communityId })

    if (!result.available) {
      form.setError('name', {
        type: 'manual',
        message: 'This Zone name is already taken in this community.',
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

  useEffect(() => {
    if (currentName && selectedCommunity) {
      handleNameBlur(currentName)
    }
  }, [selectedCommunity])

  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)
  const { data: communities, isFetching: isCommunityLoading } =
    useSearchCommunities(debouncedCommunitySearch)

  const onSubmit = (data: ZoneFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        setCommunitySearch('')
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-zone' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>
                  Zone Name {checkName.isPending && ' (Checking...)'}
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
                <FieldLabel htmlFor='leaderId'>Pastor</FieldLabel>
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

                    {users?.map(
                      (u) => (
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
                      ),
                      // }
                    )}
                  </div>
                )}
                <input type='hidden' value={field.value ?? ''} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name='communityId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='communityId'>Community</FieldLabel>
                <Input
                  placeholder='Search Community...'
                  value={communitySearch}
                  onChange={(e) => {
                    setCommunitySearch(e.target.value)
                    if (field.value) field.onChange('')
                  }}
                />

                {!field.value && communitySearch.length > 2 && (
                  <div className='mt-18 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-20 w-full'>
                    {isCommunityLoading && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    )}

                    {!isCommunityLoading &&
                      communities?.length === 0 &&
                      communitySearch && (
                        <p className='p-2 text-sm text-muted-foreground'>
                          None found
                        </p>
                      )}

                    {communities?.map((c) => (
                      <button
                        key={c.id}
                        type='button'
                        className='block w-full text-left p-2 hover:bg-muted'
                        onClick={() => {
                          field.onChange(c.id)
                          setCommunitySearch(c.name)
                        }}
                      >
                        <p className='font-medium capitalize'>{c.name}</p>
                      </button>
                    ))}
                  </div>
                )}
                <input type='hidden' value={field.value ?? ''} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddZone
