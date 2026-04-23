'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CellSchema } from '@repo/types'
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
import {
  useCheckCellName,
  useSearchCommunities,
  useSearchZones,
} from '@/hooks/use-church'
import { useDebounce } from '@/hooks/use-utils'
import { useSearchUsers } from '@/hooks/use-user'
import { AddFormProps } from './AddTeam'
import { Checkbox } from '../ui/checkbox'

type CellFormValues = z.infer<typeof CellSchema>

const AddCell = ({ onSuccess, mutation, onValidationChange }: AddFormProps) => {
  const [userSearch, setUserSearch] = useState('')
  const [communitySearch, setCommunitySearch] = useState('')
  const [zoneSearch, setZoneSearch] = useState('')

  const debouncedUserSearch = useDebounce(userSearch, 400)
  const debouncedCommunitySearch = useDebounce(communitySearch, 400)
  const debouncedZoneSearch = useDebounce(zoneSearch, 400)

  const form = useForm({
    resolver: zodResolver(CellSchema),
    defaultValues: {
      name: '',
      // isOnline: false,
      leaderId: '',
      zoneId: '',
      communityId: '',
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
      zipCode: '',
    },
  })
  const {
    formState: { isValid },
  } = form

  //Availability
  const checkName = useCheckCellName()
  const selectedCommunity = form.watch('communityId')
  const currentName = form.watch('name')
  const handleNameBlur = async (name: string) => {
    const communityId = form.getValues('communityId')

    if (!name || !communityId || name.length < 3) return
    const result = await checkName.mutateAsync({ name, communityId })

    if (!result.available) {
      form.setError('name', {
        type: 'manual',
        message: 'This Cell name is already taken in this community.',
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

  const selectedCommunityId = form.watch('communityId')

  // Queries
  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)
  const { data: communities, isFetching: isCommunityLoading } =
    useSearchCommunities(debouncedCommunitySearch)
  const { data: zones, isFetching: isZoneLoading } = useSearchZones(
    debouncedZoneSearch,
    selectedCommunityId,
  )

  const onSubmit = (data: CellFormValues) => {
    const payload = {
      name: data.name,
      leaderId: data.leaderId,
      zoneId: data.zoneId,
      communityId: data.communityId,
      isOnline: data.isOnline,
      address: {
        street: data.street || null,
        city: data.city,
        state: data.state,
        country: data.country || 'Nigeria',
        zipCode: data.zipCode || null,
      },
    }
    console.log('Add Cell:', payload)

    mutation.mutate(payload, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        setCommunitySearch('')
        setZoneSearch('')
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-cell' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>
                  Cell Name {checkName.isPending && ' (Checking...)'}
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
            name='isOnline'
            control={form.control}
            render={({ field }) => (
              <div className='flex items-center gap-2 mb-4'>
                <Checkbox
                  id='isOnline'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor='isOnline'>
                  This is an Online Cell
                </FieldLabel>
              </div>
            )}
          />
          <Controller
            name='leaderId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='leaderId'>Cell Leader</FieldLabel>
                <Input
                  placeholder='Search Leader...'
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
                    form.setValue('zoneId', '')
                    setZoneSearch('')
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
          <Controller
            name='zoneId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='zoneId'>Zone</FieldLabel>
                <Input
                  disabled={!selectedCommunityId}
                  placeholder={
                    selectedCommunityId
                      ? 'Search Zone...'
                      : 'Select community first'
                  }
                  value={zoneSearch}
                  onChange={(e) => {
                    setZoneSearch(e.target.value)
                    if (field.value) field.onChange('')
                  }}
                />

                {!field.value && zoneSearch.length > 2 && (
                  <div className='mt-18 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-20 w-full'>
                    {isZoneLoading && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    )}

                    {!isZoneLoading && zones?.length === 0 && zoneSearch && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        None found
                      </p>
                    )}

                    {zones?.map(
                      (z) => (
                        <button
                          key={z.id}
                          type='button'
                          className='block w-full text-left p-2 hover:bg-muted'
                          onClick={() => {
                            field.onChange(z.id)
                            setZoneSearch(z.name)
                          }}
                        >
                          <p className='font-medium capitalize'>{z.name}</p>
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

          {/* Address  */}
          <h3 className='text-sm font-bold mt-4 uppercase opacity-50'>
            Address Details
          </h3>
          {!form.watch('isOnline') && (
            <Controller
              name='street'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Street Address</FieldLabel>
                  <Input {...field} placeholder='123 Growth Way' />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          <div className='grid grid-cols-2 gap-2'>
            <Controller
              name='city'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>City</FieldLabel>
                  <Input {...field} placeholder='Lagos' />
                </Field>
              )}
            />
            <Controller
              name='state'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>State</FieldLabel>
                  <Input {...field} placeholder='Lagos State' />
                </Field>
              )}
            />
          </div>

          <Controller
            name='country'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Country</FieldLabel>
                <Input {...field} placeholder='Nigeria' />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddCell
