'use client'

import { ReactNode } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

interface RightDrawerProps {
  trigger: ReactNode
  title: string
  description?: string
  submitLabel?: string
  formId?: string
  children: ReactNode
  isLoading?: boolean
  isSubmitDisabled?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function RightDrawer({
  trigger,
  title,
  description,
  submitLabel,
  formId,
  children,
  isLoading,
  open,
  onOpenChange,
  isSubmitDisabled,
}: RightDrawerProps) {
  return (
    <Drawer direction='right' open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className='no-scrollbar overflow-y-auto px-4 h-full'>
          {children}
        </div>
        <DrawerFooter>
          {formId && (
            <Button
              className='cursor-pointer'
              type='submit'
              form={formId}
              disabled={isLoading || isSubmitDisabled}
            >
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isLoading ? 'Submitting...' : submitLabel}
            </Button>
          )}
          <DrawerClose asChild>
            <Button
              className='cursor-pointer'
              variant='outline'
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
