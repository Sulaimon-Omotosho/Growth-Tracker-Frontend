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

const AddCourse = () => {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const router = useRouter()

  const now = new Date()
  const date = now.toLocaleDateString()
  const time = now.toLocaleTimeString()

  // useEffect(() => {
  //   if (!query || selectedUser) {
  //     setUsers([])
  //     return
  //   }

  //   const timeout = setTimeout(() => {
  //     const controller = new AbortController()

  //     async function fetchUsers() {
  //       setLoading(true)
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/searchUser?q=${query}`,
  //         {
  //           credentials: 'include',
  //           signal: controller.signal,
  //         },
  //       )

  //       const data = await res.json()
  //       // console.log('Search Response:', data)
  //       setUsers(Array.isArray(data) ? data : [])
  //       setLoading(false)
  //     }

  //     fetchUsers()
  //     return () => controller.abort()
  //   }, 300)

  //   return () => clearTimeout(timeout)
  // }, [query, selectedUser])

  const form = useForm<z.input<typeof DistrictSchema>>({
    resolver: zodResolver(DistrictSchema),
    defaultValues: {
      name: '',
      leaderId: '',
    },
  })

  async function onSubmit(data: z.output<typeof DistrictSchema>) {
    console.log('District Form', data)

    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/church/addDistrict`,
    //     {
    //       method: 'POST',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     },
    //   )

    //   if (!res.ok) {
    //     throw new Error('Failed to create district')
    //   }

    //   const newDistrict = await res.json()
    //   toast(`${newDistrict.name} has been created`, {
    //     description: `On ${date} at ${time}`,
    //   })

    //   setTimeout(() => {
    //     window.location.reload()
    //   }, 3000)
    // } catch (err) {
    //   toast.error('District has not been created')
    // }
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-district' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup>
          {/* <Controller
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
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedUser(null)
                  }}
                />

                {query && !selectedUser && (
                  <div className='mt-2 rounded border bg-background max-h-48 overflow-y-auto'>
                    {loading && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    )}

                    {!loading && users.length === 0 && query && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        None found
                      </p>
                    )}

                    {Array.isArray(users) &&
                      users.map((user) => {
                        const fullName = `${user.firstName} ${user.lastName}`

                        return (
                          <button
                            key={user.id}
                            type='button'
                            className='block w-full text-left p-2 hover:bg-muted'
                            onClick={() => {
                              field.onChange(user.id)
                              setQuery(fullName)
                              setSelectedUser(user)
                              setUsers([])
                            }}
                          >
                            <p className='font-medium'>{fullName}</p>
                          </button>
                        )
                      })}
                  </div>
                )}
                <input type='hidden' value={field.value ?? ''} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          /> */}
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddCourse
