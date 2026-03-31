'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DistrictSchema, User, UserFormSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/use-utils'
import { UserSearch } from 'lucide-react'
import { useCreateDistrict, useSearchUsers } from '@/hooks/use-church'

type DistrictFormValues = z.output<typeof DistrictSchema>

const AddDistrict = () => {
  const [userSearch, setUserSearch] = useState('')

  const debouncedUserSearch = useDebounce(userSearch, 400)

  const form = useForm<z.input<typeof DistrictSchema>>({
    resolver: zodResolver(DistrictSchema),
    defaultValues: {
      name: '',
      leaderId: '',
    },
  })

  const { data: users, isFetching: isUsersLoading } =
    useSearchUsers(debouncedUserSearch)
  const createDistrict = useCreateDistrict()

  async function onSubmit(data: DistrictFormValues) {
    console.log('District Form', data)

    createDistrict.mutate(data, {
      onSuccess: () => {
        form.reset()
        setUserSearch('')
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-district' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>District Name</FieldLabel>
                <Input
                  {...field}
                  id='name'
                  aria-invalid={fieldState.invalid}
                  // placeholder='John'
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

                    {users?.map(
                      (u) => (
                        // {
                        // return (
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
                          <p className='font-medium'>
                            {u.firstName} {u.lastName}
                          </p>
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

export default AddDistrict
