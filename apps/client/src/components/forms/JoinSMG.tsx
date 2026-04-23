'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { JoinDepartmentSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { useEffect } from 'react'
import { AddFormProps } from '@/lib/types'
import { useGetDepartments, useGetTeams } from '@/hooks/get-church'

type DeptFormValues = z.infer<typeof JoinDepartmentSchema>

const JoinSMG = ({
  user,
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const form = useForm<DeptFormValues>({
    resolver: zodResolver(JoinDepartmentSchema),
    defaultValues: {
      teamId: '',
      deptId: '',
    },
  })

  const deptCount = user?.departments?.length || 0
  const isAtLimit = deptCount >= 3

  const {
    formState: { isValid },
  } = form

  // Queries
  const { data: teams, isFetching: isTeamsLoading } = useGetTeams()
  const selectedTeamId = form.watch('teamId')
  const { data: depts, isFetching: isDeptsLoading } =
    useGetDepartments(selectedTeamId)

  useEffect(() => {
    onValidationChange?.(!isValid || mutation.isPending)
  }, [isValid, mutation.isPending, onValidationChange])

  const onSubmit = (data: DeptFormValues) => {
    // console.log('Join Department:', data)

    mutation.mutate(
      { deptId: data.deptId },
      {
        onSuccess: () => {
          form.reset()
          onSuccess?.()
        },
      },
    )
  }

  if (isAtLimit) {
    return (
      <div className='w-full sm:max-w-md p-6 border-2 border-yellow-500/20 bg-yellow-500/5 rounded-xl text-center'>
        <div className='text-3xl mb-2'>⚠️</div>
        <h3 className='font-bold text-lg text-yellow-700'>
          Department Limit Reached
        </h3>
        <p className='text-sm text-muted-foreground mt-2'>
          You are currently a member of <strong>{deptCount} departments</strong>
          . Church policy allows a maximum of 3 to ensure everyone stays
          effective.
        </p>
        <p className='text-xs text-muted-foreground mt-4 italic'>
          Please leave a department before joining a new one.
        </p>
      </div>
    )
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='join-dept' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='teamId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='teamId'>Step 1: Select a Team</FieldLabel>

                <div className='mt-1 rounded border bg-background max-h-48 overflow-auto w-full'>
                  {isTeamsLoading ? (
                    <p className='p-3 text-sm text-center text-muted-foreground italic'>
                      Loading teams...
                    </p>
                  ) : teams?.length === 0 ? (
                    <p className='p-3 text-sm text-center text-muted-foreground'>
                      No teams found.
                    </p>
                  ) : (
                    teams?.map((team: any) => (
                      <button
                        key={team.id}
                        type='button'
                        className={`block w-full text-left p-3 border-b last:border-0 transition-all ${
                          field.value === team.id
                            ? 'bg-primary/10 border-primary/50'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => {
                          field.onChange(team.id)
                          form.setValue('deptId', '')
                        }}
                      >
                        <p className='font-bold text-sm capitalize'>
                          {team.name}
                        </p>
                        {/* <p className='text-[10px] opacity-60 uppercase'>
                          {team.category || 'General'}
                        </p> */}
                      </button>
                    ))
                  )}
                </div>
                <input type='hidden' {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            name='deptId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative' data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='deptId'>
                  Step 2: Choose your Department
                </FieldLabel>

                {selectedTeamId ? (
                  <div className='mt-1 rounded border bg-background max-h-64 overflow-auto w-full'>
                    {isDeptsLoading ? (
                      <p className='p-4 text-sm text-center text-muted-foreground italic'>
                        Loading departments...
                      </p>
                    ) : depts?.length === 0 ? (
                      <p className='p-4 text-sm text-center text-muted-foreground'>
                        No departments available in this team.
                      </p>
                    ) : (
                      depts?.map((dept: any) => (
                        <button
                          key={dept.id}
                          type='button'
                          className={`block w-full text-left p-3 border-b last:border-0 transition-all ${
                            field.value === dept.id
                              ? 'bg-primary/10 border-primary/50'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => field.onChange(dept.id)}
                        >
                          <p className='font-bold text-sm'>{dept.name}</p>
                          <p className='text-xs text-muted-foreground mt-1'>
                            {dept.description || 'No description provided'}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                ) : (
                  <div className='p-8 border-2 border-dashed rounded-lg text-center opacity-50'>
                    <p className='text-sm italic'>
                      Select a team first to see departments
                    </p>
                  </div>
                )}
                <input type='hidden' {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default JoinSMG
