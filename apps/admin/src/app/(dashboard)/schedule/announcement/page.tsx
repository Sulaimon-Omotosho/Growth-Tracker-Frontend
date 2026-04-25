'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { MOCK_ANNOUNCEMENTS } from '@/store/mock'

// Simulated fetcher function
const fetchMockAnnouncements = async (cursor: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network lag

  const startIndex = cursor ? parseInt(cursor) : 0
  const pageSize = 10
  const data = MOCK_ANNOUNCEMENTS.slice(startIndex, startIndex + pageSize)

  return data
}

export default function AnnouncementPage() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['announcements', 'feed'],
      queryFn: ({ pageParam }) => fetchMockAnnouncements(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextCursor = allPages.flat().length
        return nextCursor < MOCK_ANNOUNCEMENTS.length
          ? nextCursor.toString()
          : undefined
      },
      initialPageParam: '0',
    })

  if (isLoading)
    return (
      <div className='p-8 text-center text-muted-foreground'>
        Loading Feed...
      </div>
    )

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-4'>
      <h1 className='text-2xl font-bold mb-6'>Announcements</h1>

      {data?.pages.map((page) =>
        page.map((announcement: any) => (
          <div
            key={announcement.id}
            className='p-4 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-center justify-between mb-2'>
              <Badge variant='outline' className='text-[10px] uppercase'>
                {announcement.scope}
              </Badge>
              {announcement.priority === 'URGENT' && (
                <Badge variant='destructive' className='animate-pulse'>
                  Urgent
                </Badge>
              )}
            </div>

            <h4 className='font-bold text-lg'>{announcement.title}</h4>
            <p className='text-sm text-muted-foreground mt-1 line-clamp-3'>
              {announcement.content}
            </p>

            <div className='mt-4 flex items-center gap-2 text-[10px] text-zinc-500'>
              <img
                src={announcement.author.image || '/placeholder-user.png'}
                className='w-5 h-5 rounded-full bg-zinc-200'
                alt='Avatar'
              />
              <span>
                {announcement.author.firstName} {announcement.author.lastName}
              </span>
              <span>•</span>
              <span>
                {formatDistanceToNow(new Date(announcement.createdAt))} ago
              </span>
            </div>
          </div>
        )),
      )}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='text-sm font-medium text-blue-500 w-full py-8 hover:underline disabled:opacity-50'
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load more announcements'}
        </button>
      )}

      {!hasNextPage && (
        <p className='text-center text-zinc-400 text-xs py-8'>
          No more announcements to show.
        </p>
      )}
    </div>
  )
}
