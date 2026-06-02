'use client'
import { Loader2, MessageCircle, Send } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useCreateAnnouncement } from '@/hooks/use-events'
import { AnnouncementFormSchema } from '@repo/types'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Field, FieldError, FieldGroup } from '../ui/field'

type TestimonyFormValues = z.infer<typeof AnnouncementFormSchema>

export interface testimonyFormProps {
  scope: string
  targetId: string
}

const ShareTestimony = ({ scope, targetId }: testimonyFormProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<TestimonyFormValues>({
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

  const onSubmit = (data: TestimonyFormValues) => {
    // console.log('Testimony Form:', data)

    mutate(data, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100 gap-2 hover:cursor-pointer'>
          <MessageCircle size={20} /> Share A Testimony
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-132'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
            Share Your Testimony
          </DialogTitle>
          <DialogDescription className='text-zinc-500 dark:text-zinc-400'>
            Let the community hear what great things God has done in your life.
          </DialogDescription>
        </DialogHeader>

        <form
          id='add-announcement'
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 mt-2'
        >
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className='space-y-2'>
                  <label className='text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'>
                    Title of Testimony
                  </label>
                  <Input
                    {...field}
                    placeholder='e.g., Miraculous Healing, Provision for School Fees...'
                    disabled={isPending}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name='content'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className='space-y-2'>
                  <label className='text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'>
                    Your Story
                  </label>
                  <Textarea
                    {...field}
                    placeholder='Write the full details of your testimony here...'
                    className='flex min-h-25 max-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm overflow-y-scroll no-scrollbar'
                    disabled={isPending}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className='flex justify-end gap-3 pt-2'>
            {/* <div className='flex justify-end gap-3 pt-2'> */}
            <DialogClose asChild>
              <Button
                type='button'
                variant='ghost'
                className='rounded-xl px-5'
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 gap-2'
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <>
                  <Send size={16} /> Post Testimony
                </>
              )}
            </Button>
            {/* </div> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ShareTestimony
