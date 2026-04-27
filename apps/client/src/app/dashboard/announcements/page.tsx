'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, Megaphone, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useAnnouncements } from '@/hooks/get-events'
import { AnnouncementCard } from '@/components/dashboard/AnnouncementCard'

const SCOPES = [
  'ALL',
  'GENERAL',
  'CELL',
  'ZONE',
  'COMMUNITY',
  'TEAM',
  'DEPARTMENT',
  'SMALL_GROUP',
]

export default function AnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('ALL')

  const filteredAnnouncements = useMemo(() => {
    if (!announcements) return []

    return announcements.filter((ann: any) => {
      const matchesSearch =
        ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ann.content.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTab = activeTab === 'ALL' || ann.scope === activeTab

      return matchesSearch && matchesTab
    })
  }, [announcements, searchQuery, activeTab])

  return (
    <div className='max-w-5xl mx-auto p-4 md:p-8 space-y-6'>
      {/* Header Section */}
      <div className='flex flex-col gap-4'>
        <Link
          href='/dashboard'
          className='text-xs flex items-center gap-1 text-zinc-500 hover:text-zinc-900 transition-colors w-fit'
        >
          <ChevronLeft className='w-3 h-3' /> Back to Dashboard
        </Link>

        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <h1 className='text-3xl font-bold flex items-center gap-3'>
            <Megaphone className='w-7 h-7 text-orange-500' />
            Announcements
          </h1>

          <div className='relative w-full md:w-72'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
            <Input
              placeholder='Search announcements...'
              className='pl-10'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className='flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-x-auto no-scrollbar'>
        {SCOPES.map((scope) => (
          <button
            key={scope}
            onClick={() => setActiveTab(scope)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === scope
                ? 'bg-white dark:bg-zinc-800 shadow-sm text-orange-600'
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            {scope.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Results Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {isLoading ? (
          <p className='text-zinc-500 animate-pulse'>Loading feed...</p>
        ) : filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((ann: any) => (
            <AnnouncementCard
              key={ann.id}
              title={ann.title}
              content={ann.content}
              authorName={`${ann.author?.firstName} ${ann.author?.lastName}`}
              date={ann.createdAt}
              priority={ann.priority}
              scope={ann.scope}
            />
          ))
        ) : (
          <div className='col-span-full py-20 text-center border-2 border-dashed rounded-3xl'>
            <p className='text-zinc-500'>
              No announcements found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveTab('ALL')
              }}
              className='mt-2 text-sm text-orange-600 font-bold hover:underline'
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
