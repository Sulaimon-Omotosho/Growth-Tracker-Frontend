import { useInfiniteQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { fetcher } from '@/lib/fetcher'

export function AnnouncementFeed() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['announcements', 'feed'],
    queryFn: ({ pageParam }) =>
      fetcher(`/announcements/feed?cursor=${pageParam}`),
    getNextPageParam: (lastPage) =>
      lastPage.length === 10 ? lastPage[lastPage.length - 1].id : undefined,
    initialPageParam: '',
  })

  return (
    <div className='space-y-4'>
      {data?.pages.map((page) =>
        page.map((announcement: any) => (
          <div
            key={announcement.id}
            className='p-4 border rounded-xl bg-card shadow-sm'
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
                className='w-5 h-5 rounded-full'
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
          className='text-xs text-blue-500 w-full py-4'
        >
          Load more announcements
        </button>
      )}
    </div>
  )
}
