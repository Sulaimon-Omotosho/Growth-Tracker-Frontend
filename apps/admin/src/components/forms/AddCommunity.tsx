'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CommunitySchema } from '@repo/types'
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
import { useCheckCommName, useSearchDistrict } from '@/hooks/use-church'
import { useSearchUsers } from '@/hooks/use-user'
import { AddFormProps } from './AddTeam'

type CommunityFormValues = z.output<typeof CommunitySchema>

const AddCommunity = ({
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const [userSearch, setUserSearch] = useState('')
  const [districtSearch, setDistrictSearch] = useState('')

  const debouncedUserSearch = useDebounce(userSearch, 400)
  const debouncedDistrictSearch = useDebounce(districtSearch, 400)

  const form = useForm<z.input<typeof CommunitySchema>>({
    resolver: zodResolver(CommunitySchema),
    defaultValues: {
      name: '',
      leaderId: '',
      districtId: '',
    },
  })
  const {
    formState: { isValid },
  } = form

  //Availability
  const checkName = useCheckCommName()
  const selectedDistrict = form.watch('districtId')
  const currentName = form.watch('name')
  const handleNameBlur = async (name: string) => {
    const districtId = form.getValues('districtId')

    if (!name || !districtId || name.length < 3) return
    const result = await checkName.mutateAsync({ name, districtId })

    if (!result.available) {
      form.setError('name', {
        type: 'manual',
        message: 'This community name is already taken in this district.',
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
    if (currentName && selectedDistrict) {
      handleNameBlur(currentName)
    }
  }, [selectedDistrict])

  // Queries
  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)
  const { data: districts, isFetching: isDistrictsLoading } = useSearchDistrict(
    debouncedDistrictSearch,
  )

  const onSubmit = (data: CommunityFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        setDistrictSearch('')
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-community' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>
                  Community Name {checkName.isPending && ' (Checking...)'}
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
                    // setSelectedUser(null)
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

                    {users?.map((u) => {
                      return (
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
                      )
                    })}
                  </div>
                )}
                <input type='hidden' value={field.value ?? ''} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name='districtId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='districtId'>District</FieldLabel>
                <Input
                  placeholder='Search District...'
                  value={districtSearch}
                  onChange={(e) => {
                    setDistrictSearch(e.target.value)
                    if (field.value) field.onChange('')
                  }}
                />

                {!field.value && districtSearch.length > 2 && (
                  <div className='mt-18 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-10 w-full'>
                    {isDistrictsLoading && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    )}

                    {!isDistrictsLoading &&
                      districts?.length === 0 &&
                      districtSearch && (
                        <p className='p-2 text-sm text-muted-foreground'>
                          None found
                        </p>
                      )}

                    {districts?.map(
                      (d) => (
                        // {
                        //     return (
                        <button
                          key={d.id}
                          type='button'
                          className='block w-full text-left p-2 hover:bg-muted'
                          onClick={() => {
                            field.onChange(d.id)
                            setDistrictSearch(d.name)
                          }}
                        >
                          <p className='font-medium capitalize'>{d.name}</p>
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
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddCommunity
