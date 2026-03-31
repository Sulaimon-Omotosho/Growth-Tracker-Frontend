'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CommunitySchema, District, User } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/use-utils'
import {
  useCreateCommunity,
  useSearchDistrict,
  useSearchUsers,
} from '@/hooks/use-church'

type CommunityFormValues = z.output<typeof CommunitySchema>

const AddCommunity = () => {
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

  // Queries
  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)
  const { data: districts, isFetching: isDistrictsLoading } = useSearchDistrict(
    debouncedDistrictSearch,
  )
  const createCommunity = useCreateCommunity()

  const onSubmit = (data: CommunityFormValues) => {
    console.log('Community Form', data)

    createCommunity.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        setDistrictSearch('')
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
                <FieldLabel htmlFor='name'>Community Name</FieldLabel>
                <Input {...field} id='name' aria-invalid={fieldState.invalid} />
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
              <Field data-invalid={fieldState.invalid}>
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
                  <div className='mt-2 rounded border bg-background max-h-48 overflow-y-auto'>
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
                      // const fullName = `${user.firstName} ${user.lastName}`

                      return (
                        <button
                          key={u.id}
                          type='button'
                          className='block w-full text-left p-2 hover:bg-muted'
                          onClick={() => {
                            field.onChange(u.id)
                            setUserSearch(`${u.firstName} ${u.lastName}`)
                            // setSelectedUser(user)
                            // setUsers([])
                          }}
                        >
                          {u.firstName} {u.lastName}
                          {/* <p className='font-medium'>
                            </p> */}
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
              <Field data-invalid={fieldState.invalid}>
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
                  <div className='mt-2 rounded border bg-background max-h-48 overflow-y-auto'>
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
                            // setSelectedDistrict(district)
                            // setDistricts([])
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
