'use client'

import { Bell, Check, Info, MessageSquare, Zap } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'

const alerts = [
  {
    id: 1,
    title: 'New Message',
    description: 'Uncle Sula sent a message to the group.',
    time: '2m ago',
    icon: MessageSquare,
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 2,
    title: 'Growth Track Update',
    description: "You've completed Foundation Class 1.",
    time: '1h ago',
    icon: Zap,
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  },
  {
    id: 3,
    title: 'Event Reminder',
    description: 'Winepress 2026 starts in 3 days!',
    time: '5h ago',
    icon: Info,
    color: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  },
]

const Notification = () => {
  const hasNotifications = alerts.length > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full h-9 w-9'
        >
          <Bell className='h-5 w-5 text-muted-foreground' />
          {hasNotifications && (
            <span className='absolute top-1.5 right-1.5 flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-600'></span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-80 rounded-xl p-0 shadow-2xl border-gray-100 dark:border-gray-800'
      >
        <div className='flex items-center justify-between p-4 pb-2'>
          <DropdownMenuLabel className='font-bold text-base'>
            Notifications
          </DropdownMenuLabel>
          <Button
            variant='ghost'
            className='text-[10px] h-7 font-bold text-blue-600 hover:text-blue-700 p-0 px-2'
          >
            Mark all as read
          </Button>
        </div>

        <DropdownMenuSeparator />

        <ScrollArea className='h-75'>
          <div className='flex flex-col'>
            {alerts.map((alert) => (
              <DropdownMenuItem
                key={alert.id}
                className='flex items-start gap-3 p-4 cursor-pointer focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0'
              >
                <div className={`p-2 rounded-lg ${alert.color}`}>
                  <alert.icon className='w-4 h-4' />
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-bold'>{alert.title}</span>
                    <span className='text-[10px] text-muted-foreground'>
                      {alert.time}
                    </span>
                  </div>
                  <p className='text-[11px] text-muted-foreground leading-relaxed'>
                    {alert.description}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>

        <DropdownMenuSeparator />

        <div className='p-2'>
          <Button
            variant='ghost'
            className='w-full text-xs font-semibold text-muted-foreground hover:text-foreground h-8'
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notification
