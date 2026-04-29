'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CourseSchema } from '@repo/types'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { Plus, Trash2, BookOpen } from 'lucide-react'
import { AddFormProps } from './AddTeam'

type CourseFormValues = z.infer<typeof CourseSchema>

const AddCourse = ({
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      category: '',
      sessions: [{ title: '', description: '', maxGrade: 100, passGrade: 50 }],
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  // Dynamic fields for sessions
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sessions',
  })

  useEffect(() => {
    onValidationChange?.(!isValid)
  }, [isValid, onValidationChange])

  const onSubmit = (data: CourseFormValues) => {
    console.log('Course Form:', data)

    mutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        onSuccess?.()
      },
    })
  }

  return (
    <div className='w-full no-scrollbar'>
      <form
        id='add-course'
        onSubmit={handleSubmit(onSubmit as any)}
        className='space-y-8'
      >
        <FieldGroup>
          {/* --- COURSE INFO --- */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Course Title</FieldLabel>
                  <Input {...field} placeholder='e.g. Foundation School' />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='category'
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Input {...field} placeholder='e.g. Discipleship' />
                </Field>
              )}
            />
          </div>

          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...field}
                  placeholder='What will students learn?'
                  className='min-h-20'
                />
              </Field>
            )}
          />

          <hr className='border-zinc-100' />

          {/* --- SESSIONS SECTION --- */}
          {/* <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2'>
                <BookOpen size={14} /> Curriculum Sessions
              </h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() =>
                  append({ title: '', maxGrade: 100, passGrade: 50 })
                }
                className='h-8 rounded-lg text-[10px] font-bold'
              >
                <Plus size={14} className='mr-1' /> Add Session
              </Button>
            </div>

            <div className='space-y-3'>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className='p-4 rounded-2xl bg-zinc-50 border border-zinc-100 relative group animate-in slide-in-from-top-2 duration-300'
                >
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-3 items-end'>
                    <div className='md:col-span-1'>
                      <span className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-black'>
                        {index + 1}
                      </span>
                    </div>

                    <div className='md:col-span-5'>
                      <Controller
                        name={`sessions.${index}.title`}
                        control={control}
                        render={({ field }) => (
                          <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-zinc-400'>
                              Session Title
                            </label>
                            <Input
                              {...field}
                              className='bg-white'
                              placeholder='Session Title'
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className='md:col-span-5'>
                      <Controller
                        name={`sessions.${index}.description`}
                        control={control}
                        render={({ field }) => (
                          <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-zinc-400'>
                              Session description
                            </label>
                            <Textarea
                              {...field}
                              placeholder='What will students learn?'
                              className='min-h-20'
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className='md:col-span-2'>
                      <Controller
                        name={`sessions.${index}.maxGrade`}
                        control={control}
                        render={({ field }) => (
                          <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-zinc-400'>
                              Max Score
                            </label>
                            <Input
                              {...field}
                              type='number'
                              className='bg-white'
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className='md:col-span-2'>
                      <Controller
                        name={`sessions.${index}.passGrade`}
                        control={control}
                        render={({ field }) => (
                          <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-zinc-400'>
                              Pass Mark
                            </label>
                            <Input
                              {...field}
                              type='number'
                              className='bg-white'
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className='md:col-span-2 flex justify-end'>
                      {fields.length > 1 && (
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => remove(index)}
                          className='text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl'
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          {/* --- SESSIONS SECTION --- */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2'>
                <BookOpen size={14} /> Curriculum Sessions
              </h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() =>
                  append({
                    title: '',
                    description: '',
                    maxGrade: 100,
                    passGrade: 50,
                  })
                }
                className='h-8 rounded-lg text-[10px] font-bold'
              >
                <Plus size={14} className='mr-1' /> Add Session
              </Button>
            </div>

            <div className='space-y-4'>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className='p-5 rounded-2xl bg-zinc-50 border border-zinc-100 relative group animate-in slide-in-from-top-2 duration-300'
                >
                  <div className='flex flex-col gap-4'>
                    {/* HEADER & TITLE */}
                    <div className='flex items-start gap-3'>
                      <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-black'>
                        {index + 1}
                      </span>
                      <div className='flex-1'>
                        <Controller
                          name={`sessions.${index}.title`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <div className='space-y-1'>
                              <label className='text-[10px] font-bold text-zinc-400 uppercase tracking-tight'>
                                Session Title
                              </label>
                              <Input
                                {...field}
                                className='bg-white font-bold'
                                placeholder='e.g. Introduction to Stewardship'
                              />
                              {fieldState.error && (
                                <p className='text-[10px] text-red-500'>
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => remove(index)}
                          className='text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl shrink-0'
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    <Controller
                      name={`sessions.${index}.description`}
                      control={control}
                      render={({ field }) => (
                        <div className='space-y-1'>
                          <label className='text-[10px] font-bold text-zinc-400 uppercase tracking-tight'>
                            Description
                          </label>
                          <Textarea
                            {...field}
                            placeholder='Briefly describe the session objectives...'
                            className='bg-white min-h-20 resize-none'
                          />
                        </div>
                      )}
                    />

                    {/* GRADING METRICS */}
                    <div className='grid grid-cols-2 gap-4 pt-2 border-t border-zinc-200/50'>
                      <Controller
                        name={`sessions.${index}.maxGrade`}
                        control={control}
                        render={({ field }) => (
                          <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-zinc-400 uppercase tracking-tight'>
                              Max Score
                            </label>
                            <Input
                              {...field}
                              type='number'
                              className='bg-white'
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </div>
                        )}
                      />
                      <Controller
                        name={`sessions.${index}.passGrade`}
                        control={control}
                        render={({ field }) => (
                          <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-zinc-400 uppercase tracking-tight'>
                              Pass Mark
                            </label>
                            <Input
                              {...field}
                              type='number'
                              className='bg-white'
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

export default AddCourse
