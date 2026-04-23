'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { JoinCellSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-utils'
import { AddFormProps } from '@/lib/types'
import { useGetCellsByZone, useSearchZones } from '@/hooks/use-church'
import {
  CheckCircle2,
  Globe,
  Home,
  Loader2,
  MapPin,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type CellFormValues = z.infer<typeof JoinCellSchema>

const JoinCell = ({
  onSuccess,
  mutation,
  onValidationChange,
}: AddFormProps) => {
  const form = useForm<CellFormValues>({
    resolver: zodResolver(JoinCellSchema),
    defaultValues: {
      zoneId: '',
      cellId: '',
    },
  })
  const {
    formState: { isValid },
  } = form
  const [zoneSearch, setZoneSearch] = useState('')
  const debouncedZoneSearch = useDebounce(zoneSearch, 500)

  // Queries
  const { data: zones, isFetching: isZonesLoading } =
    useSearchZones(debouncedZoneSearch)

  const selectedZoneId = form.watch('zoneId')
  const { data: cells, isFetching: isCellsLoading } =
    useGetCellsByZone(selectedZoneId)

  // Effects
  useEffect(() => {
    onValidationChange?.(!isValid || mutation.isPending)
  }, [isValid, mutation.isPending, onValidationChange])

  const onSubmit = (data: CellFormValues) => {
    mutation.mutate(
      { cellId: data.cellId },
      {
        onSuccess: () => {
          form.reset()
          setZoneSearch('')
          onSuccess?.()
        },
      },
    )
  }

  return (
    <div className='w-full'>
      <form
        id='join-cell'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FieldGroup className='gap-8'>
          {/* STEP 1: ZONE SEARCH */}
          <Controller
            name='zoneId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='relative'>
                <FieldLabel className='text-[10px] uppercase tracking-[0.2em] font-black text-blue-600 dark:text-blue-400 mb-3'>
                  Step 01: Find your Zone
                </FieldLabel>

                <div className='relative'>
                  <Input
                    placeholder='Search for a zone or community...'
                    className='pl-10 h-12 rounded-xl'
                    value={zoneSearch}
                    onChange={(e) => {
                      setZoneSearch(e.target.value)
                      if (field.value) {
                        field.onChange('')
                        form.setValue('cellId', '')
                      }
                    }}
                  />
                  <Search
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                    size={18}
                  />
                  {isZonesLoading && (
                    <Loader2
                      className='absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-600'
                      size={18}
                    />
                  )}
                </div>

                {!field.value && zoneSearch.length > 1 && (
                  <div className='mt-22 rounded-xl border bg-popover shadow-xl max-h-56 overflow-auto absolute z-30 w-full no-scrollbar animate-in fade-in slide-in-from-top-2'>
                    {zones?.length === 0 && !isZonesLoading ? (
                      <p className='p-4 text-sm text-muted-foreground text-center italic'>
                        No zones found matching "{zoneSearch}"
                      </p>
                    ) : (
                      zones?.map((z: any) => (
                        <button
                          key={z.id}
                          type='button'
                          className='flex flex-col w-full text-left p-3 hover:bg-muted border-b last:border-0 transition-colors'
                          onClick={() => {
                            field.onChange(z.id)
                            setZoneSearch(z.name)
                          }}
                        >
                          <span className='font-bold text-sm tracking-tight'>
                            {z.name}
                          </span>
                          <span className='text-[10px] uppercase text-muted-foreground font-medium'>
                            {z.community?.name || 'General Community'}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* STEP 2: CELL SELECTION */}
          <Controller
            name='cellId'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className='space-y-3'>
                <FieldLabel
                  className={cn(
                    'text-[10px] uppercase tracking-[0.2em] font-black transition-colors',
                    selectedZoneId
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-muted-foreground opacity-50',
                  )}
                >
                  Step 02: Join a Cell
                </FieldLabel>

                {selectedZoneId ? (
                  <div className='grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-2 no-scrollbar'>
                    {isCellsLoading ? (
                      <div className='flex flex-col items-center justify-center p-8 text-muted-foreground'>
                        <Loader2 className='animate-spin mb-2' />
                        <span className='text-xs italic'>
                          Finding local cells...
                        </span>
                      </div>
                    ) : cells?.length === 0 ? (
                      <div className='p-8 border-2 border-dashed rounded-2xl text-center opacity-60'>
                        <p className='text-xs font-medium'>
                          No active cells found in this zone.
                        </p>
                      </div>
                    ) : (
                      cells?.map((cell: any) => (
                        <button
                          key={cell.id}
                          type='button'
                          onClick={() => field.onChange(cell.id)}
                          className={cn(
                            'group flex flex-col p-4 rounded-xl border-2 transition-all text-left',
                            field.value === cell.id
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-600/10 shadow-md'
                              : 'border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700',
                          )}
                        >
                          <div className='flex justify-between items-center mb-2'>
                            <div className='flex items-center gap-2'>
                              {cell.isOnline ? (
                                <Globe size={14} className='text-blue-500' />
                              ) : (
                                <Home size={14} className='text-amber-600' />
                              )}
                              <p className='font-bold text-sm tracking-tight'>
                                {cell.name}
                              </p>
                            </div>
                            {field.value === cell.id && (
                              <CheckCircle2
                                size={16}
                                className='text-blue-600'
                              />
                            )}
                          </div>

                          <div className='space-y-1'>
                            <p className='text-[11px] font-medium flex items-center gap-1 text-muted-foreground'>
                              <MapPin size={10} />
                              {cell.isOnline
                                ? 'Virtual / Online Meeting'
                                : cell.address?.street ||
                                  'Location provided on join'}
                            </p>
                            {cell.address?.city && (
                              <p className='text-[10px] text-muted-foreground opacity-70 ml-3'>
                                {cell.address.city}, {cell.address.state}
                              </p>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                ) : (
                  <div className='p-12 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center opacity-40'>
                    <MapPin size={32} className='mb-2 text-muted-foreground' />
                    <p className='text-xs font-medium'>
                      Search and select a zone above to find cells in your area
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
    // <div className='w-full sm:max-w-md no-scrollbar'>
    //   <form id='join-cell' onSubmit={form.handleSubmit(onSubmit)}>
    //     <FieldGroup>
    //       {/* Community  */}
    //       <Controller
    //         name='zoneId'
    //         control={form.control}
    //         render={({ field, fieldState }) => (
    //           <Field className='relative' data-invalid={fieldState.invalid}>
    //             <FieldLabel htmlFor='zoneId'>Step 1: Find your Zone</FieldLabel>
    //             <Input
    //               placeholder='Type to search zones...'
    //               value={zoneSearch}
    //               onChange={(e) => {
    //                 setZoneSearch(e.target.value)
    //                 if (field.value) {
    //                   field.onChange('')
    //                   form.setValue('cellId', '')
    //                 }
    //               }}
    //             />

    //             {!field.value && zoneSearch.length > 0 && (
    //               <div className='mt-16 rounded border bg-popover shadow-md max-h-56 overflow-auto absolute z-30 w-full'>
    //                 {isZonesLoading ? (
    //                   <p className='p-2 text-sm text-muted-foreground italic'>
    //                     Searching...
    //                   </p>
    //                 ) : zones?.length === 0 ? (
    //                   <p className='p-2 text-sm text-muted-foreground'>
    //                     No zones match your search
    //                   </p>
    //                 ) : (
    //                   zones?.slice(0, 20).map((z: any) => (
    //                     <button
    //                       key={z.id}
    //                       type='button'
    //                       className='block w-full text-left p-2 hover:bg-muted border-b last:border-0'
    //                       onClick={() => {
    //                         field.onChange(z.id)
    //                         setZoneSearch(z.name)
    //                       }}
    //                     >
    //                       <p className='font-medium capitalize text-sm'>
    //                         {z.name}
    //                       </p>
    //                       <p className='text-[10px] uppercase opacity-60'>
    //                         {z.community?.name}
    //                       </p>
    //                     </button>
    //                   ))
    //                 )}
    //               </div>
    //             )}
    //             <FieldError errors={[fieldState.error]} />
    //           </Field>
    //         )}
    //       />

    //       {/* Cell  */}
    //       <Controller
    //         name='cellId'
    //         control={form.control}
    //         render={({ field, fieldState }) => (
    //           <Field className='relative' data-invalid={fieldState.invalid}>
    //             <FieldLabel htmlFor='cellId'>Step 2: Join a Cell</FieldLabel>

    //             {selectedZoneId ? (
    //               <div className='mt-1 rounded border bg-background max-h-64 overflow-auto w-full'>
    //                 {isCellsLoading ? (
    //                   <p className='p-4 text-sm text-center text-muted-foreground italic'>
    //                     Loading cells in this zone...
    //                   </p>
    //                 ) : cells?.length === 0 ? (
    //                   <p className='p-4 text-sm text-center text-muted-foreground'>
    //                     No cells available in this zone yet.
    //                   </p>
    //                 ) : (
    //                   cells?.map((cell: any) => (
    //                     <button
    //                       key={cell.id}
    //                       type='button'
    //                       className={`block w-full text-left p-3 border-b last:border-0 transition-all ${
    //                         field.value === cell.id
    //                           ? 'bg-primary/10 border-primary/50'
    //                           : 'hover:bg-muted'
    //                       }`}
    //                       onClick={() => field.onChange(cell.id)}
    //                     >
    //                       <div className='flex justify-between items-start'>
    //                         <p className='font-bold text-sm'>{cell.name}</p>
    //                         {cell.isOnline && (
    //                           <span className='text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase'>
    //                             Online
    //                           </span>
    //                         )}
    //                       </div>

    //                       <p className='text-xs text-muted-foreground mt-1'>
    //                         {cell.isOnline
    //                           ? 'Virtual Meeting'
    //                           : cell.address?.street || 'Location TBD'}
    //                       </p>

    //                       {cell.address?.city && (
    //                         <p className='text-[10px] opacity-70'>
    //                           {cell.address.city}, {cell.address.state}
    //                         </p>
    //                       )}
    //                     </button>
    //                   ))
    //                 )}
    //               </div>
    //             ) : (
    //               <div className='p-8 border-2 border-dashed rounded-lg text-center opacity-50'>
    //                 <p className='text-sm'>
    //                   Select a zone first to see available cells
    //                 </p>
    //               </div>
    //             )}
    //             <input type='hidden' {...field} />
    //             <FieldError errors={[fieldState.error]} />
    //           </Field>
    //         )}
    //       />
    //     </FieldGroup>
    //   </form>
    // </div>
  )
}

export default JoinCell
