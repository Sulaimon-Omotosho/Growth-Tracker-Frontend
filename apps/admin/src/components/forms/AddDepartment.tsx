'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DepartmentSchema, Team, User, UserFormSchema } from '@repo/types'
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AddDepartment = () => {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [teamQuery, setTeamQuery] = useState('')
  const [teams, setTeams] = useState<Team[]>([])
  const [teamLoading, setTeamLoading] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const router = useRouter()

  const now = new Date()
  const date = now.toLocaleDateString()
  const time = now.toLocaleTimeString()

  useEffect(() => {
    if (!query || selectedUser) {
      setUsers([])
      return
    }
    const timeout = setTimeout(() => {
      const controller = new AbortController()

      async function fetchUsers() {
        setLoading(true)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/searchUser?q=${query}`,
          {
            credentials: 'include',
            signal: controller.signal,
          },
        )

        const data = await res.json()
        setUsers(Array.isArray(data) ? data : [])
        setLoading(false)
      }

      fetchUsers()
      return () => controller.abort()
    }, 300)

    return () => clearTimeout(timeout)
  }, [query, selectedUser])

  useEffect(() => {
    if (!teamQuery || selectedTeam) {
      setTeams([])
      return
    }
    const timeout = setTimeout(() => {
      const controller = new AbortController()

      async function fetchTeams() {
        setTeamLoading(true)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/church/searchTeam?q=${teamQuery}`,
          {
            credentials: 'include',
            signal: controller.signal,
          },
        )

        const data = await res.json()
        setTeams(Array.isArray(data) ? data : [])
        setTeamLoading(false)
      }

      fetchTeams()
      return () => controller.abort()
    }, 300)

    return () => clearTimeout(timeout)
  }, [teamQuery, selectedTeam])

  const form = useForm<z.input<typeof DepartmentSchema>>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      name: '',
      leaderId: '',
      churchTeamId: '',
      email: '',
      description: '',
    },
  })

  async function onSubmit(data: z.output<typeof DepartmentSchema>) {
    // console.log('Church Department', data)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/church/addDepartment`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      if (!res.ok) {
        throw new Error('Failed to create department')
      }

      const newDep = await res.json()
      toast(`${newDep.name} has been created`, {
        description: `On ${date} at ${time}`,
      })

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (err) {
      toast.error('Team has not been created')
    }
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='add-department' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='firstName'>Department Name</FieldLabel>
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
                <FieldLabel htmlFor='leaderId'>H.O.D</FieldLabel>
                <Input
                  placeholder='Search H.O.D...'
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
          />
          <Controller
            name='churchTeamId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='churchTeamId'>Team</FieldLabel>
                <Input
                  placeholder='Search Team...'
                  value={teamQuery}
                  onChange={(e) => {
                    setTeamQuery(e.target.value)
                    // setTeamQuery(e.target.value.toLocaleUpperCase())
                    setSelectedTeam(null)
                  }}
                />

                {teamQuery && !selectedTeam && (
                  <div className='mt-2 rounded border bg-background max-h-48 overflow-y-auto'>
                    {teamLoading && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        Searching...
                      </p>
                    )}

                    {!teamLoading && teams.length === 0 && teamQuery && (
                      <p className='p-2 text-sm text-muted-foreground'>
                        None found
                      </p>
                    )}

                    {Array.isArray(teams) &&
                      teams.map((team) => {
                        return (
                          <button
                            key={team.id}
                            type='button'
                            className='block w-full text-left p-2 hover:bg-muted'
                            onClick={() => {
                              field.onChange(team.id)
                              setTeamQuery(team.name)
                              setSelectedTeam(team)
                              setTeams([])
                            }}
                          >
                            <p className='font-medium capitalize'>
                              {team.name}
                            </p>
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
          />
          {/* <Controller
            name='churchTeamId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='churchTeamId'>Team</FieldLabel>
                <Input
                  {...field}
                  id='churchTeamId'
                  aria-invalid={fieldState.invalid}
                  placeholder='Search For Team...'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          /> */}
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  {...field}
                  id='email'
                  aria-invalid={fieldState.invalid}
                  // placeholder='JohnDoe@email.com'
                />
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
                  placeholder='About the department ...'
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

export default AddDepartment
