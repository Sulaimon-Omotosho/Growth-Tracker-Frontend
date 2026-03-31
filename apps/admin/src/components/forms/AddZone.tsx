'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Community, User, ZoneSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/use-utils'
import {
  useCreateZone,
  useSearchCommunities,
  useSearchUsers,
} from '@/hooks/use-church'

type ZoneFormValues = z.output<typeof ZoneSchema>

const AddZone = () => {
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

  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)
  const { data: communities, isFetching: isCommunityLoading } =
    useSearchCommunities(debouncedCommunitySearch)
  const createZone = useCreateZone()

  const onSubmit = (data: ZoneFormValues) => {
    console.log('Zone Form', data)

    createZone.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        setCommunitySearch('')
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
                <FieldLabel htmlFor='name'>Zone Name</FieldLabel>
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
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddZone
