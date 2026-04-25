// import { User, MessageCircle, ChevronRight } from 'lucide-react'

// interface MessageCardProps {
//   sender: string
//   content: string
//   time: string
//   unreadCount?: number
//   avatar?: string
// }

// export const MessageCard = ({
//   sender,
//   content,
//   time,
//   unreadCount = 0,
//   avatar,
// }: MessageCardProps) => {
//   return (
//     <div className="group flex items-start gap-4 p-4 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer">
//       <div className="relative">
//         {avatar ? (
//           <img src={avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-sm" />
//         ) : (
//           <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
//             <User className="w-6 h-6 text-zinc-400" />
//           </div>
//         )}
//         {unreadCount > 0 && (
//           <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950">
//             {unreadCount}
//           </div>
//         )}
//       </div>

//       <div className="flex-1 min-w-0">
//         <div className="flex items-center justify-between mb-1">
//           <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
//             {sender}
//           </h4>
//           <span className="text-[10px] font-medium text-zinc-400 whitespace-nowrap ml-2">
//             {time}
//           </span>
//         </div>
//         <p className={`text-xs truncate ${unreadCount > 0 ? 'text-zinc-900 dark:text-zinc-200 font-medium' : 'text-zinc-500 dark:text-zinc-400'}`}>
//           {content}
//         </p>
//       </div>

//       <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
//         <ChevronRight className="w-4 h-4 text-zinc-300" />
//       </div>
//     </div>
//   )
// }

import { User, MessageCircle, ChevronRight } from 'lucide-react'

interface MessageCardProps {
  sender: string
  content: string
  time: string
  unreadCount?: number
  avatar?: string
  // key?: string
}

export const MessageCard = ({
  sender,
  content,
  time,
  unreadCount = 0,
  avatar,
}: MessageCardProps) => {
  return (
    <div className='group flex items-start gap-4 p-4 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer'>
      <div className='relative'>
        {avatar ? (
          <img
            src={avatar}
            className='w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-sm'
          />
        ) : (
          <div className='w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center'>
            <User className='w-6 h-6 text-zinc-400' />
          </div>
        )}
        {unreadCount > 0 && (
          <div className='absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950'>
            {unreadCount}
          </div>
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between mb-1'>
          <h4 className='text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate'>
            {sender}
          </h4>
          <span className='text-[10px] font-medium text-zinc-400 whitespace-nowrap ml-2'>
            {time}
          </span>
        </div>
        <p
          className={`text-xs truncate ${unreadCount > 0 ? 'text-zinc-900 dark:text-zinc-200 font-medium' : 'text-zinc-500 dark:text-zinc-400'}`}
        >
          {content}
        </p>
      </div>

      <div className='self-center opacity-0 group-hover:opacity-100 transition-opacity'>
        <ChevronRight className='w-4 h-4 text-zinc-300' />
      </div>
    </div>
  )
}
