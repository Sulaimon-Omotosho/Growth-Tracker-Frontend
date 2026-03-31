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
import { useState } from 'react'
import {
  useCreateCell,
  useSearchCommunities,
  useSearchUsers,
  useSearchZones,
} from '@/hooks/use-church'
import { useDebounce } from '@/hooks/use-utils'

type CellFormValues = z.infer<typeof CellSchema>

const AddCell = () => {
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
      leaderId: '',
      zoneId: '',
      communityId: '',
    },
  })

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
  const createCell = useCreateCell()

  const onSubmit = (data: CellFormValues) => {
    console.log('Cell Form', data)

    createCell.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        setCommunitySearch('')
        setZoneSearch('')
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
                <FieldLabel htmlFor='name'>Cell Name</FieldLabel>
                <Input {...field} id='name' aria-invalid={fieldState.invalid} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
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
                  <div className='mt-2 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-10 w-full'>
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
                  <div className='mt-2 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-20 w-full'>
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
              <Field data-invalid={fieldState.invalid}>
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
                  <div className='mt-2 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-20 w-full'>
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
                        // {
                        //   return (
                        <button
                          key={z.id}
                          type='button'
                          className='block w-full text-left p-2 hover:bg-muted'
                          onClick={() => {
                            field.onChange(z.id)
                            setZoneSearch(z.name)
                            // setSelectedZone(z)
                            // setZone([])
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
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddCell
