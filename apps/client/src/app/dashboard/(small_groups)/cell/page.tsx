'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  BookOpen,
  Sparkles,
  Share2,
} from 'lucide-react'
import { useMyCell } from '@/hooks/get-church'
import CellSkeleton from '@/components/skeletons/CellSkeleton'
import { format, formatDistanceToNow } from 'date-fns'
import { getNextCellSunday } from '@/utils/date-utils'
import LeaderContactCard from '@/components/dashboard/LeaderContactCard'
import ShareTestimony from '@/components/dashboard/ShareTestimony'
import { useAnnouncements } from '@/hooks/get-events'
import { Announcement } from '@repo/types'

export default function UserCellPage() {
  const { data: cell, isLoading, isError } = useMyCell()
  // console.log('Cell Page Data:', cell)

  const { data: announcements, isLoading: announcementsLoading } =
    useAnnouncements()
  console.log('Announcements:', announcements)

  if (isLoading) return <CellSkeleton />
  if (isError || !cell)
    return <p className='text-center mt-10'>No cell found.</p>

  return (
    <div className='max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24'>
      {/* --- THE WELCOME MAT --- */}
      <div className='relative h-48 rounded-3xl bg-zinc-900 overflow-hidden flex items-center p-8 text-white shadow-2xl'>
        <div className='absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20' />
        <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-6'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <Badge className='bg-blue-500/20 text-blue-300 border-none px-2 py-0 text-[10px] font-bold'>
                YOUR FAMILY
              </Badge>
              <span className='text-[10px] text-zinc-400 font-bold uppercase tracking-widest'>
                {cell.community?.district.name} District • {cell.zone?.name}
              </span>
            </div>
            <h1 className='text-4xl font-black tracking-tighter'>
              {cell.name}
            </h1>
            <p className='text-zinc-400 text-sm font-medium'>
              Home to {cell._count?.users} brothers and sisters
            </p>
          </div>
          <div className='flex -space-x-3'>
            {cell.users?.slice(0, 3).map((u) => (
              <Avatar key={u.id} className='border-4 border-zinc-900 w-12 h-12'>
                <AvatarImage
                  src={u.image || ''}
                  alt={u.username || 'Member'}
                  className='object-cover'
                />
                <AvatarFallback className='bg-zinc-800 text-xs text-white'>
                  {u.username?.substring(0, 2).toUpperCase() || '??'}
                </AvatarFallback>
              </Avatar>
            ))}
            {cell._count.users > 3 && (
              <div className='w-12 h-12 rounded-full bg-blue-600 border-4 border-zinc-900 flex items-center justify-center text-xs font-bold z-10'>
                +{cell._count.users - 3}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* --- NEXT MEETING (LOGISTICS) --- */}
        <Card className='md:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden'>
          <CardHeader className='bg-zinc-50/50 border-b pb-4'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-black flex items-center gap-2'>
                <Calendar size={20} className='text-blue-600' /> Next Fellowship
              </CardTitle>
              <Badge
                variant='outline'
                className='text-blue-600 border-blue-100 bg-blue-50/50'
              >
                Coming Up
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='p-2 bg-zinc-100 rounded-xl'>
                    <MapPin size={18} className='text-zinc-600' />
                  </div>
                  <div>
                    <p className='text-[10px] font-bold text-zinc-400 uppercase'>
                      Location
                    </p>
                    {cell.isOnline ? (
                      <div className=''>
                        <p className='text-sm font-bold text-blue-600'>
                          Online Meeting
                        </p>
                        <p className='text-sm font-bold'>
                          {cell.leader?.username ||
                            cell.leader?.firstName ||
                            'TBD'}
                        </p>
                      </div>
                    ) : (
                      <div className=''>
                        <p className='text-sm font-bold'>
                          {cell.leader?.username ||
                            cell.leader?.firstName ||
                            'TBD'}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {cell.address?.street || 'Address not set'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='p-2 bg-zinc-100 rounded-xl'>
                    <Clock size={18} className='text-zinc-600' />
                  </div>
                  <div>
                    <p className='text-[10px] font-bold text-zinc-400 uppercase'>
                      Schedule
                    </p>
                    <p className='text-sm font-bold'>
                      {format(getNextCellSunday(), 'EEEE, MMMM do')}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Starts at 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-zinc-50 rounded-2xl p-4 flex flex-col justify-between border'>
                <p className='text-[11px] font-bold text-zinc-500 uppercase flex items-center gap-1'>
                  <BookOpen size={14} /> Tonight's Study
                </p>
                <p className='text-lg font-black mt-2 leading-tight'>
                  {/* {cellData.currentStudy} */}
                  The Book of Acts: Part 4
                </p>
                <Button className='w-full mt-4 bg-zinc-900 rounded-xl text-xs h-9'>
                  Get Study Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- QUICK ACTIONS --- */}
        <div className='space-y-4'>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-100 gap-2'>
                <MessageCircle size={20} /> Share Testimony
              </Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-sm'>
              <DialogHeader>
                <DialogTitle className='text-2xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Share Your Testimony
                </DialogTitle>
                <DialogDescription className='text-zinc-500 dark:text-zinc-400'>
                  Let the community hear what great things God has done in your
                  life.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className='space-y-5 mt-2'>
                <div className='space-y-2'>
                  <label className='text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'>
                    Title of Testimony
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='e.g., Miraculous Healing, Provision for School Fees...'
                    className='h-12 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 focus-visible:ring-blue-500'
                    disabled={isSubmitting}
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'>
                    Your Story
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Write the full details of your testimony here...'
                    className='min-h-[160px] rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 resize-none focus-visible:ring-blue-500 p-4'
                    disabled={isSubmitting}
                  />
                </div>

                <div className='flex justify-end gap-3 pt-2'>
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={() => setOpen(false)}
                    className='rounded-xl px-5'
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 gap-2'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <>
                        <Send size={16} /> Post Testimony
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog> */}
          <ShareTestimony scope='CELL' targetId={cell.id} />

          <Button
            variant='outline'
            className='w-full h-14 rounded-2xl font-bold border-2 gap-2'
          >
            <Share2 size={20} /> Invite a Friend
          </Button>
          <LeaderContactCard leader={cell.leader} />
        </div>
      </div>

      {/* --- SECTION 4: THE CELL WALL --- */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-4'>
          <h3 className='font-black text-sm uppercase tracking-widest text-zinc-400 pl-1'>
            Cell Updates
          </h3>

          {announcementsLoading ? (
            <p className='text-xs text-muted-foreground pl-1'>
              Loading your feed...
            </p>
          ) : announcements && announcements.length > 0 ? (
            <div className='max-h-[500px] overflow-y-auto p-2 space-y-4 no-scrollbar'>
              {(Array.isArray(announcements)
                ? announcements
                : [announcements]
              ).map((post: Announcement) => {
                const initials =
                  `${post.author?.firstName?.[0] || ''}${post.author?.lastName?.[0] || ''}` ||
                  'U'
                const formattedTime = post.createdAt
                  ? formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })
                  : 'Just now'
                return (
                  <Card
                    key={post.id}
                    className='rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow'
                  >
                    <CardContent className='p-2 space-y-3'>
                      <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-8 w-8'>
                            {post.author?.image && (
                              <AvatarImage
                                src={post.author.image}
                                alt={`${post.author.firstName} ${post.author.lastName}`}
                              />
                            )}
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className='text-xs font-bold'>
                              {post.author?.firstName} {post.author?.lastName}{' '}
                              <span className='font-normal text-muted-foreground'>
                                shared an update
                              </span>
                            </p>
                            <p className='text-[10px] text-zinc-400'>
                              {formattedTime}
                            </p>
                          </div>
                        </div>
                        <Heart
                          size={16}
                          className='text-zinc-300 hover:text-rose-500 cursor-pointer'
                        />
                      </div>

                      <div className='space-y-1'>
                        <h4 className='text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wide'>
                          {post.title}
                        </h4>
                        <p className='text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line'>
                          {post.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <p className='text-xs text-muted-foreground pl-1 py-4'>
              No updates posted yet.
            </p>
          )}
        </div>

        {/* --- SPIRITUAL MILESTONES --- */}
        <Card className='rounded-3xl border-none bg-linear-to-br from-zinc-50 to-white shadow-sm h-fit'>
          <CardHeader>
            <CardTitle className='text-sm font-black flex items-center gap-2'>
              <Sparkles size={18} className='text-orange-400' /> My Growth
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <div className='flex justify-between text-[10px] font-bold uppercase tracking-tighter'>
                <span className='text-zinc-400'>Monthly Attendance</span>
                <span>3/4 Weeks</span>
              </div>
              <Progress value={75} className='h-1.5' />
            </div>
            <div className='p-4 bg-orange-50 border border-orange-100 rounded-2xl'>
              <p className='text-[10px] font-black text-orange-700 uppercase'>
                Current Badge
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <div className='w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center text-orange-700'>
                  🏆
                </div>
                <p className='text-sm font-bold text-orange-900'>
                  Faithful Steward
                </p>
              </div>
            </div>
            <Button
              variant='link'
              className='w-full text-xs font-bold text-zinc-400 p-0'
            >
              View All Milestones
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
