'use client'

import React, { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, BarChart3, ClipboardList, Bell, Search } from 'lucide-react'

const roles = ['CELL', 'ZONE', 'COMMUNITY', 'DISTRICT', 'HOD', 'TEAM']

const mockData = {
  metrics: { members: 248, attendance: 187, followups: 32, growth: '+12%' },
  people: [
    { name: 'Ada Johnson', unit: 'Cell Alpha', status: 'Active' },
    { name: 'Tunde Bello', unit: 'Zone East', status: 'Pending Follow-up' },
    { name: 'Mary James', unit: 'Community Central', status: 'Active' },
  ],
  tasks: [
    'Submit weekly report',
    'Call 5 first timers',
    'Review attendance decline',
  ],
}

function StatCard({ title, value }) {
  return (
    <Card className='rounded-2xl shadow-sm'>
      <CardContent className='p-4'>
        <div className='text-sm text-gray-500'>{title}</div>
        <div className='text-2xl font-bold mt-1'>{value}</div>
      </CardContent>
    </Card>
  )
}

export default function ManagementHub() {
  const [role, setRole] = useState('CELL')
  const [query, setQuery] = useState('')

  const filteredPeople = useMemo(
    () =>
      mockData.people.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <header className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold'>
              Growth Tracker Management Hub
            </h1>
            <p className='text-gray-500'>Leadership self-service portal</p>
          </div>
          <div className='flex gap-2 flex-wrap'>
            {roles.map((r) => (
              <Button
                key={r}
                variant={r === role ? 'default' : 'outline'}
                onClick={() => setRole(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </header>

        <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <StatCard title='Members' value={mockData.metrics.members} />
          <StatCard title='Attendance' value={mockData.metrics.attendance} />
          <StatCard
            title='Pending Follow-up'
            value={mockData.metrics.followups}
          />
          <StatCard title='Growth' value={mockData.metrics.growth} />
        </section>

        <section className='grid md:grid-cols-3 gap-4'>
          <Card className='rounded-2xl md:col-span-2'>
            <CardContent className='p-4 space-y-4'>
              <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-xl flex items-center gap-2'>
                  <Users size={18} /> People
                </h2>
                <div className='relative w-64'>
                  <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    className='pl-9'
                    placeholder='Search people...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className='space-y-3'>
                {filteredPeople.map((p, i) => (
                  <div
                    key={i}
                    className='border rounded-xl p-3 flex justify-between'
                  >
                    <div>
                      <div className='font-medium'>{p.name}</div>
                      <div className='text-sm text-gray-500'>{p.unit}</div>
                    </div>
                    <div className='text-sm'>{p.status}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className='space-y-4'>
            <Card className='rounded-2xl'>
              <CardContent className='p-4'>
                <h2 className='font-semibold text-xl flex items-center gap-2'>
                  <ClipboardList size={18} /> Tasks
                </h2>
                <ul className='mt-3 space-y-2 text-sm'>
                  {mockData.tasks.map((t, i) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className='rounded-2xl'>
              <CardContent className='p-4'>
                <h2 className='font-semibold text-xl flex items-center gap-2'>
                  <BarChart3 size={18} /> Reports
                </h2>
                <p className='text-sm text-gray-500 mt-2'>
                  {role} level analytics and downloadable summaries.
                </p>
                <Button className='mt-3 w-full'>View Reports</Button>
              </CardContent>
            </Card>

            <Card className='rounded-2xl'>
              <CardContent className='p-4'>
                <h2 className='font-semibold text-xl flex items-center gap-2'>
                  <Bell size={18} /> Alerts
                </h2>
                <p className='text-sm mt-2'>
                  3 cells have declining attendance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
