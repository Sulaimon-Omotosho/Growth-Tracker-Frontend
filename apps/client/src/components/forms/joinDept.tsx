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
import { AlertCircle, ChevronRight, Layers, Loader2, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

type DeptFormValues = z.infer<typeof JoinDepartmentSchema>

const JoinDept = ({
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
      <div className='flex flex-col items-center justify-center p-8 text-center space-y-4 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl'>
        <div className='p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600'>
          <AlertCircle size={32} />
        </div>
        <div className='space-y-2'>
          <h3 className='font-black text-xl tracking-tighter uppercase italic'>
            Limit Reached
          </h3>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            You are currently in{' '}
            <span className='font-bold text-foreground'>
              {deptCount} departments
            </span>
            . To maintain focus, we limit membership to 3 departments per
            person.
          </p>
        </div>
        <button
          type='button'
          className='text-xs font-bold uppercase tracking-widest text-amber-600 hover:underline pt-2'
        >
          View My Departments
        </button>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <form
        id='join-dept'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FieldGroup className='gap-8'>
          {/* STEP 1: TEAMS */}
          <Controller
            name='teamId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='space-y-3'>
                <FieldLabel className='text-[10px] uppercase tracking-[0.2em] font-black text-blue-600 dark:text-blue-400'>
                  Step 01: Select Team
                </FieldLabel>

                <div className='grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-2 no-scrollbar'>
                  {isTeamsLoading
                    ? [1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className='h-14 w-full bg-muted animate-pulse rounded-xl'
                        />
                      ))
                    : teams?.map((team: any) => (
                        <button
                          key={team.id}
                          type='button'
                          onClick={() => {
                            field.onChange(team.id)
                            form.setValue('deptId', '')
                          }}
                          className={cn(
                            'group flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200',
                            field.value === team.id
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-600/10 shadow-md'
                              : 'border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700',
                          )}
                        >
                          <div className='flex items-center gap-3'>
                            <div
                              className={cn(
                                'p-2 rounded-lg transition-colors',
                                field.value === team.id
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-muted text-muted-foreground',
                              )}
                            >
                              <Users size={16} />
                            </div>
                            <span className='font-bold text-sm tracking-tight'>
                              {team.name}
                            </span>
                          </div>
                          {field.value === team.id && (
                            <ChevronRight size={16} className='text-blue-600' />
                          )}
                        </button>
                      ))}
                </div>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* STEP 2: DEPARTMENTS */}
          <Controller
            name='deptId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='space-y-3'>
                <FieldLabel
                  className={cn(
                    'text-[10px] uppercase tracking-[0.2em] font-black transition-colors',
                    selectedTeamId
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-muted-foreground opacity-50',
                  )}
                >
                  Step 02: Choose Department
                </FieldLabel>

                {selectedTeamId ? (
                  <div className='grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-2 no-scrollbar'>
                    {isDeptsLoading ? (
                      <div className='flex flex-col items-center justify-center p-8 text-muted-foreground'>
                        <Loader2 className='animate-spin mb-2' />
                        <span className='text-xs italic'>
                          Fetching departments...
                        </span>
                      </div>
                    ) : (
                      depts?.map((dept: any) => (
                        <button
                          key={dept.id}
                          type='button'
                          onClick={() => field.onChange(dept.id)}
                          className={cn(
                            'flex flex-col p-4 rounded-xl border-2 transition-all text-left',
                            field.value === dept.id
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-600/10 shadow-md'
                              : 'border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700',
                          )}
                        >
                          <div className='flex items-center gap-2 mb-1'>
                            <Layers
                              size={14}
                              className={
                                field.value === dept.id
                                  ? 'text-blue-600'
                                  : 'text-muted-foreground'
                              }
                            />
                            <span className='font-bold text-sm'>
                              {dept.name}
                            </span>
                          </div>
                          {dept.description && (
                            <p className='text-[11px] text-muted-foreground leading-relaxed line-clamp-2'>
                              {dept.description}
                            </p>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                ) : (
                  <div className='p-10 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center opacity-40'>
                    <Users size={32} className='mb-2 text-muted-foreground' />
                    <p className='text-xs font-medium'>
                      Please select a team to view available departments
                    </p>
                  </div>
                )}
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default JoinDept
