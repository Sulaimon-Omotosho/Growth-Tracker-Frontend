import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateAnnouncement } from '@/hooks/use-events'
import { AnnouncementFormSchema } from '@repo/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup } from '../ui/field'
import { Loader2 } from 'lucide-react'
import z from 'zod'
import { useEffect } from 'react'

type AnnouncementFormValues = z.infer<typeof AnnouncementFormSchema>

export interface announcementFormProps {
  scope: string
  targetId: string
  buttonName: string
  placeholder: string
  TA_Placeholder: string
}

export function CreateAnnouncementForm({
  scope,
  targetId,
  buttonName,
  placeholder,
  TA_Placeholder,
}: announcementFormProps) {
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(AnnouncementFormSchema),
    defaultValues: {
      title: '',
      content: '',
      scope: scope,
      targetId: targetId,
      priority: 'NORMAL',
    },
  })

  const {
    formState: { isValid },
  } = form

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      targetId: targetId,
      scope: scope,
    })
  }, [targetId, scope, form])

  const { mutate, isPending } = useCreateAnnouncement()

  const onSubmit = (data: AnnouncementFormValues) => {
    console.log('Announcement Form:', data)

    mutate(data, {
      onSuccess: () => {
        form.reset()
      },
    })
  }

  return (
    <form
      id='add-announcement'
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-4 p-0 h-full bg-white dark:bg-zinc-900'
    >
      <FieldGroup>
        <Controller
          name='title'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input {...field} placeholder={placeholder} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name='content'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Textarea
                {...field}
                placeholder={TA_Placeholder}
                className='flex min-h-25 max-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm overflow-y-scroll no-scrollbar'
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        className='w-full bg-zinc-900 cursor-pointer'
        type='submit'
        disabled={isPending}
      >
        {isPending ? (
          <div className='flex items-center gap-2'>
            <Loader2 className='h-5 w-5 animate-spin' />
            <span className='tracking-tight'>Processing...</span>
          </div>
        ) : (
          <span className='flex items-center gap-2'>{buttonName}</span>
        )}
      </Button>
    </form>
  )
}
