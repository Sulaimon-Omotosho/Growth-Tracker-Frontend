'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Theme = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500' />
          <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='rounded-xl border-gray-100 dark:border-gray-800 shadow-2xl'
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className='gap-2 cursor-pointer py-2'
        >
          <Sun className='w-4 h-4 text-amber-500' />
          <span className='font-medium text-sm'>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='gap-2 cursor-pointer py-2'
        >
          <Moon className='w-4 h-4 text-blue-400' />
          <span className='font-medium text-sm'>Dark</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className='gap-2 cursor-pointer py-2'
        >
          <Monitor className='w-4 h-4 text-gray-500' />
          <span className='font-medium text-sm'>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Theme
