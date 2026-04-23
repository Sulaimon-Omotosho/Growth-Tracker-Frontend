'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { useSearchUsers } from '@/hooks/use-user'
import { AddFormProps } from './AddTeam'
import { X, Plus, Hash } from 'lucide-react'
import { Badge } from '../ui/badge'
import { SmallGroupSchema } from '@repo/types'

type SmallGroupFormValues = z.infer<typeof SmallGroupSchema>

const AddSmallGroup = ({
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const [userSearch, setUserSearch] = useState('')
  const [interestInput, setInterestInput] = useState('')
  const debouncedUserSearch = useDebounce(userSearch, 400)

  const form = useForm<SmallGroupFormValues>({
    resolver: zodResolver(SmallGroupSchema),
    defaultValues: {
      name: '',
      interests: [],
      description: '',
      leaderId: '',
    },
  })

  const {
    formState: { isValid },
    control,
    watch,
    setValue,
  } = form
  const currentInterests = watch('interests')

  useEffect(() => {
    onValidationChange?.(!isValid)
  }, [isValid, onValidationChange])

  // Queries
  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)

  // Interest Tag Logic
  const addInterest = () => {
    const val = interestInput.trim().toLowerCase()
    if (val && !currentInterests.includes(val)) {
      setValue('interests', [...currentInterests, val], {
        shouldValidate: true,
      })
      setInterestInput('')
    }
  }

  const removeInterest = (tag: string) => {
    setValue(
      'interests',
      currentInterests.filter((i) => i !== tag),
      { shouldValidate: true },
    )
  }

  const onSubmit = (data: SmallGroupFormValues) => {
    const payload = {
      ...data,
      interest: data.interests.join(','),
    }
    console.log('Inba:', payload)

    mutation.mutate(payload, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-small-group' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Group Name */}
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Group Name</FieldLabel>
                <Input {...field} placeholder='e.g. Kingdom Techies' />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Interests Multi-Tag Input */}
          <Field>
            <FieldLabel>Interests (Multi-select)</FieldLabel>
            <div className='flex gap-2 mb-2 flex-wrap'>
              {currentInterests.map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30'
                >
                  <Hash size={10} />
                  {tag}
                  <X
                    size={12}
                    className='cursor-pointer hover:text-red-500'
                    onClick={() => removeInterest(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className='flex gap-2'>
              <Input
                placeholder='Press enter to add interest...'
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addInterest()
                  }
                }}
              />
              <button
                type='button'
                onClick={addInterest}
                className='p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200'
              >
                <Plus size={20} />
              </button>
            </div>
            <p className='text-[10px] text-muted-foreground mt-1'>
              Add multiple topics (e.g. Coding, Music, Sports)
            </p>
          </Field>

          {/* Group Leader Search */}
          <Controller
            name='leaderId'
            control={control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel>Group Leader</FieldLabel>
                <Input
                  placeholder='Search Leader...'
                  value={userSearch}
                  onChange={(e) => {
                    setUserSearch(e.target.value)
                    if (field.value) field.onChange('')
                  }}
                />
                {!field.value && debouncedUserSearch.length > 2 && (
                  <div className='mt-1 rounded border bg-popover shadow-md max-h-40 overflow-auto absolute z-50 w-full top-full'>
                    {isUsersLoading ? (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    ) : users?.length === 0 ? (
                      <p className='p-2 text-sm text-muted-foreground'>
                        No users found
                      </p>
                    ) : (
                      users?.map((u) => (
                        <button
                          key={u.id}
                          type='button'
                          className='block w-full text-left p-3 hover:bg-muted border-b last:border-0'
                          onClick={() => {
                            field.onChange(u.id)
                            setUserSearch(`${u.firstName} ${u.lastName}`)
                          }}
                        >
                          <p className='font-bold text-sm'>
                            {u.firstName} {u.lastName}
                          </p>
                          <p className='text-[10px] text-zinc-400'>{u.email}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>About the Group</FieldLabel>
                <textarea
                  {...field}
                  className='w-full p-3 rounded-md bg-transparent border border-zinc-200 dark:border-zinc-800 text-sm min-h-25 focus:ring-1 focus:ring-blue-500 outline-none'
                  placeholder='Describe the purpose of this interest group...'
                />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddSmallGroup
