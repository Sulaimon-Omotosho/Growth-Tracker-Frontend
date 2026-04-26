'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { AddFormProps } from './AddTeam' // Ensure this type matches
import { EventSchema } from '@repo/types'

type EventFormValues = z.infer<typeof EventSchema>

const AddEvent = ({
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: 'SERVICE',
      capacity: 0,
      sessions: [{ start: '', end: '' }],
    },
  })

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sessions',
  })

  useEffect(() => {
    onValidationChange?.(!isValid)
  }, [isValid, onValidationChange])

  const onSubmit = (data: EventFormValues) => {
    const payload = {
      ...data,
      sessions: data.sessions.map((s) => ({
        start: new Date(s.start),
        end: new Date(s.end),
      })),
    }
    console.log('Add Event:', payload)

    mutation.mutate(payload, {
      onSuccess: () => {
        reset()
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar pb-10'>
      <form id='add-event' onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Title */}
          <Controller
            name='title'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Event Title</FieldLabel>
                <Input {...field} placeholder='e.g., Sunday Celebration' />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Location */}
          <Controller
            name='location'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Location / Room</FieldLabel>
                <Input {...field} placeholder='Main Sanctuary' />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Type & Capacity Grid */}
          <div className='grid grid-cols-2 gap-4'>
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <select
                    {...field}
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring'
                  >
                    <option value='SERVICE'>Service</option>
                    <option value='OUTREACH'>Outreach</option>
                    <option value='MEETING'>Meeting</option>
                    <option value='SMALL_GROUP'>Small Group</option>
                  </select>
                </Field>
              )}
            />
            <Controller
              name='capacity'
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Capacity</FieldLabel>
                  <Input
                    {...field}
                    value={(field.value as any) ?? ''}
                    type='number'
                    placeholder='200'
                  />
                </Field>
              )}
            />
          </div>

          {/* Sessions Section */}
          <div className='space-y-4 mt-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-bold uppercase opacity-50'>
                Sessions
              </h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => append({ start: '', end: '' })}
                className='h-7 text-[10px]'
              >
                <Plus size={14} className='mr-1' /> Add Session
              </Button>
            </div>

            {fields.map((item, index) => (
              <div
                key={item.id}
                className='p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-900 space-y-3 relative'
              >
                {index > 0 && (
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='absolute top-2 right-2 text-zinc-400 hover:text-red-500'
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                <div className='grid grid-cols-1 gap-2'>
                  <Controller
                    name={`sessions.${index}.start`}
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel className='text-[10px]'>
                          Start Date & Time
                        </FieldLabel>
                        <Input
                          {...field}
                          type='datetime-local'
                          className='text-xs'
                        />
                      </Field>
                    )}
                  />
                  <Controller
                    name={`sessions.${index}.end`}
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel className='text-[10px]'>
                          End Date & Time
                        </FieldLabel>
                        <Input
                          {...field}
                          type='datetime-local'
                          className='text-xs'
                        />
                      </Field>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Description (Optional)</FieldLabel>
                <textarea
                  {...field}
                  className='flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  placeholder='Briefly describe the event...'
                />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddEvent
