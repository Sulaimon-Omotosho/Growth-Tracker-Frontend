import { User } from '@repo/types'
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '../ui/avatar'
import { UserIcon } from 'lucide-react'

interface GroupAvatarProps {
  members: User[]
  limit?: number
}

export function GroupAvatar({ members = [], limit = 3 }: GroupAvatarProps) {
  const visibleMembers = members.slice(0, limit)
  const remainingCount = members.length - limit

  return (
    // <AvatarGroup className='grayscale'>
    <AvatarGroup>
      {visibleMembers.map((member) => (
        <Avatar
          key={member.id}
          className='border-2 border-white dark:border-gray-900 shadow-sm'
        >
          <AvatarImage
            src={member.image || ''}
            alt={member.firstName || 'Member'}
            className='object-cover'
          />
          <AvatarFallback className='text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'>
            {member.firstName ? (
              <span className='text-[10px] font-bold uppercase'>
                {member.firstName.substring(0, 2)}
              </span>
            ) : (
              <UserIcon className='h-4 w-4 opacity-70' />
            )}
          </AvatarFallback>
        </Avatar>
      ))}

      {remainingCount > 0 && (
        <AvatarGroupCount className='text-[11px] font-bold'>
          +{remainingCount}
        </AvatarGroupCount>
      )}
      {members.length === 0 && (
        <div className='h-8 w-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center'>
          <span className='text-[10px] text-gray-400'>0</span>
        </div>
      )}
    </AvatarGroup>
  )
}
