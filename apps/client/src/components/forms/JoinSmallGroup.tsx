// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { JoinSmallGroupSchema } from '@repo/types'
// import { Controller, useForm } from 'react-hook-form'
// import z from 'zod'
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from '@/components/ui/field'
// import { useEffect } from 'react'
// import { AddFormProps } from '@/lib/types'
// import { useGetSmallGroups } from '@/hooks/get-church'

// type SMGFormValues = z.infer<typeof JoinSmallGroupSchema>

// const JoinSmallGroup = ({
//   user,
//   onSuccess,
//   mutation,
//   onValidationChange,
// }: AddFormProps) => {
//   const form = useForm<SMGFormValues>({
//     resolver: zodResolver(JoinSmallGroupSchema),
//     defaultValues: {
//       smallGroupId: '',
//     },
//   })

//   // const smgCount = user?.smallGroups?.length || 0
//   // const isAtLimit = smgCount >= 2

//   const {
//     formState: { isValid },
//   } = form

//   // Queries
//   const { data: smallGroups, isFetching: isLoading } = useGetSmallGroups()

//   useEffect(() => {
//     onValidationChange?.(!isValid || mutation.isPending)
//   }, [isValid, mutation.isPending, onValidationChange])

//   const onSubmit = (data: SMGFormValues) => {
//     mutation.mutate(
//       { smallGroupId: data.smallGroupId },
//       {
//         onSuccess: () => {
//           form.reset()
//           onSuccess?.()
//         },
//       },
//     )
//   }

//   // if (isAtLimit) {
//   //   return (
//   //     <div className='w-full sm:max-w-md p-6 border-2 border-blue-500/20 bg-blue-500/5 rounded-xl text-center'>
//   //       <div className='text-3xl mb-2'>🌱</div>
//   //       <h3 className='font-bold text-lg text-blue-700'>
//   //         Small Group Limit Reached
//   //       </h3>
//   //       <p className='text-sm text-muted-foreground mt-2'>
//   //         You are currently a member of <strong>{smgCount} small groups</strong>
//   //         . We recommend a maximum of 2 to ensure you can build deep
//   //         relationships.
//   //       </p>
//   //       <p className='text-xs text-muted-foreground mt-4 italic'>
//   //         Please leave a group before joining a new one.
//   //       </p>
//   //     </div>
//   //   )
//   // }

//   return (
//     <div className='w-full sm:max-w-md no-scrollbar'>
//       <form id='join-smg' onSubmit={form.handleSubmit(onSubmit)}>
//         <FieldGroup>
//           <Controller
//             name='smallGroupId'
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <Field className='relative' data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor='smallGroupId'>
//                   Available Small Groups
//                 </FieldLabel>

//                 <div className='mt-1 rounded border bg-background max-h-80 overflow-auto w-full'>
//                   {isLoading ? (
//                     <p className='p-4 text-sm text-center text-muted-foreground italic'>
//                       Loading life groups...
//                     </p>
//                   ) : smallGroups?.length === 0 ? (
//                     <p className='p-4 text-sm text-center text-muted-foreground'>
//                       No small groups found in your area.
//                     </p>
//                   ) : (
//                     smallGroups?.map((group: any) => (
//                       <button
//                         key={group.id}
//                         type='button'
//                         className={`block w-full text-left p-4 border-b last:border-0 transition-all ${
//                           field.value === group.id
//                             ? 'bg-primary/10 border-primary/50'
//                             : 'hover:bg-muted'
//                         }`}
//                         onClick={() => field.onChange(group.id)}
//                       >
//                         <div className='flex justify-between items-start'>
//                           <p className='font-bold text-sm'>{group.name}</p>
//                           <span className='text-[10px] bg-zinc-100 px-1.5 py-0.5 rounded uppercase font-bold text-zinc-500'>
//                             {group.category || 'Interest'}
//                           </span>
//                         </div>
//                         <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>
//                           {group.description ||
//                             'Join us for weekly fellowship and growth.'}
//                         </p>
//                         <div className='flex gap-3 mt-2'>
//                           <p className='text-[10px] text-zinc-400 font-medium'>
//                             📍 {group.location || 'Online'}
//                           </p>
//                           <p className='text-[10px] text-zinc-400 font-medium'>
//                             ⏰ {group.meetingDay || 'TBD'}
//                           </p>
//                         </div>
//                       </button>
//                     ))
//                   )}
//                 </div>
//                 <input type='hidden' {...field} />
//                 <FieldError errors={[fieldState.error]} />
//               </Field>
//             )}
//           />
//         </FieldGroup>
//       </form>
//     </div>
//   )
// }

// export default JoinSmallGroup

'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { JoinSmallGroupSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-utils'
import { useSearchSmallGroups } from '@/hooks/use-church'
import { AddFormProps } from '@/lib/types'

type SMGFormValues = z.infer<typeof JoinSmallGroupSchema>

const JoinSmallGroup = ({
  user,
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const [smgSearch, setSmgSearch] = useState('')
  const debouncedSearch = useDebounce(smgSearch, 400)

  const form = useForm<SMGFormValues>({
    resolver: zodResolver(JoinSmallGroupSchema),
    defaultValues: {
      smallGroupId: '',
    },
  })

  const { data: smallGroups, isFetching: isLoading } =
    useSearchSmallGroups(debouncedSearch)

  const smgCount = user?.smallGroups?.length || 0
  const isAtLimit = smgCount >= 2

  useEffect(() => {
    onValidationChange?.(!form.formState.isValid || mutation.isPending)
  }, [form.formState.isValid, mutation.isPending, onValidationChange])

  const onSubmit = (data: SMGFormValues) => {
    mutation.mutate(
      { smallGroupId: data.smallGroupId },
      {
        onSuccess: () => {
          form.reset()
          setSmgSearch('')
          onSuccess?.()
        },
      },
    )
  }

  if (isAtLimit) {
    return (
      <div className='p-4 border rounded-lg bg-muted/50 text-center text-sm text-muted-foreground'>
        Small Group Limit Reached ({smgCount}/2)
      </div>
    )
  }

  return (
    <div className='w-full sm:max-w-md'>
      <form id='join-smg' onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name='smallGroupId'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className='relative' data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='smallGroupId'>Life Group</FieldLabel>
              <Input
                placeholder='Search by name or interest...'
                value={smgSearch}
                autoComplete='off'
                onChange={(e) => {
                  setSmgSearch(e.target.value)
                  if (field.value) field.onChange('')
                }}
              />

              {/* Search Results Dropdown */}
              {!field.value && debouncedSearch.length > 2 && (
                <div className='mt-16 rounded border bg-popover shadow-md max-h-52 overflow-auto absolute z-20 w-full divide-y divide-border'>
                  {isLoading && (
                    <p className='p-3 text-sm text-muted-foreground italic animate-pulse'>
                      Searching...
                    </p>
                  )}

                  {!isLoading && smallGroups?.length === 0 && (
                    <p className='p-3 text-sm text-muted-foreground'>
                      No groups found matching "{debouncedSearch}"
                    </p>
                  )}

                  {smallGroups?.map((group: any) => (
                    <button
                      key={group.id}
                      type='button'
                      className='block w-full text-left p-3 hover:bg-muted transition-colors'
                      onClick={() => {
                        field.onChange(group.id)
                        setSmgSearch(group.name)
                      }}
                    >
                      <div className='flex flex-col'>
                        <span className='font-bold text-sm'>{group.name}</span>
                        <div className='flex items-center gap-2 mt-1'>
                          <span className='text-[10px] font-black text-primary uppercase'>
                            {group.category}
                          </span>
                          <span className='text-[10px] text-zinc-400'>
                            {group.location}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <input type='hidden' value={field.value ?? ''} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>
    </div>
  )
}

export default JoinSmallGroup
