import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'

//   const getData = async (): Promise<ProductsType> => {

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
//     )
//     const data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//     return []
//   }
// }

export const departments = [
  {
    id: 'dept-001',
    name: 'Media',
    head: 'Brother Samuel Ade',
    team: 'Faith Builders',
    membersCount: 18,
    email: 'media@church.org',
    status: 'ACTIVE',
    description:
      'Handles visuals, live streaming, photography, and media coverage.',
    createdAt: '2023-10-12',
  },
  {
    id: 'dept-002',
    name: 'Ushering',
    head: 'Sister Joy Bello',
    team: 'Faith Builders',
    membersCount: 32,
    email: 'ushers@church.org',
    status: 'ACTIVE',
    description:
      'Welcomes members, maintains order, and assists congregants during services.',
    createdAt: '2023-09-08',
  },
  {
    id: 'dept-003',
    name: 'Choir',
    head: 'Brother David Martins',
    team: 'Royal Priests',
    membersCount: 24,
    email: 'choir@church.org',
    status: 'ACTIVE',
    description: 'Leads worship and praise sessions during church services.',
    createdAt: '2023-08-25',
  },
  {
    id: 'dept-004',
    name: 'Prayer',
    head: 'Pastor Grace Okoye',
    team: 'Watchmen',
    membersCount: 40,
    email: 'prayer@church.org',
    status: 'ACTIVE',
    description: 'Coordinates prayer meetings and intercessory activities.',
    createdAt: '2023-07-18',
  },
  {
    id: 'dept-005',
    name: 'Children Ministry',
    head: 'Sister Ruth Akinwale',
    team: 'Virtuous Women',
    membersCount: 22,
    email: 'children@church.org',
    status: 'ACTIVE',
    description: 'Cares for and teaches children during services and programs.',
    createdAt: '2023-09-30',
  },
  {
    id: 'dept-006',
    name: 'Protocol',
    head: 'Brother Emmanuel Lawal',
    team: 'Gate Keepers',
    membersCount: 14,
    email: 'protocol@church.org',
    status: 'ACTIVE',
    description: 'Manages special guests, pastors, and official church events.',
    createdAt: '2023-06-12',
  },
  {
    id: 'dept-007',
    name: 'Evangelism',
    head: 'Pastor Joshua Danjuma',
    team: 'Harvest Workers',
    membersCount: 29,
    email: 'evangelism@church.org',
    status: 'ACTIVE',
    description: 'Organizes outreach and soul-winning programs.',
    createdAt: '2023-11-03',
  },
  {
    id: 'dept-008',
    name: 'Technical',
    head: 'Brother Peter Collins',
    team: 'Light Bearers',
    membersCount: 16,
    email: 'technical@church.org',
    status: 'ACTIVE',
    description: 'Responsible for sound, lighting, and technical equipment.',
    createdAt: '2023-08-01',
  },
  {
    id: 'dept-009',
    name: 'Welfare',
    head: 'Sister Comfort Adebola',
    team: 'Helping Hands',
    membersCount: 21,
    email: 'welfare@church.org',
    status: 'ACTIVE',
    description: 'Provides care, assistance, and support to church members.',
    createdAt: '2023-10-22',
  },
  {
    id: 'dept-010',
    name: 'Counseling',
    head: 'Pastor Lydia Akinwale',
    team: 'Hope Restorers',
    membersCount: 12,
    email: 'counseling@church.org',
    status: 'ACTIVE',
    description: 'Offers spiritual and personal counseling to members.',
    createdAt: '2023-05-14',
  },

  // ---------- MORE ----------
  {
    id: 'dept-011',
    name: 'Logistics',
    head: 'Brother Victor Adebisi',
    team: 'Builders Network',
    membersCount: 19,
    email: 'logistics@church.org',
    status: 'ACTIVE',
    description: 'Manages setup, equipment movement, and event logistics.',
    createdAt: '2023-06-28',
  },
  {
    id: 'dept-012',
    name: 'Security',
    head: 'Brother Ibrahim Musa',
    team: 'Gate Keepers',
    membersCount: 15,
    email: 'security@church.org',
    status: 'ACTIVE',
    description: 'Ensures safety and order within church premises.',
    createdAt: '2023-07-09',
  },
  {
    id: 'dept-013',
    name: 'Follow-up',
    head: 'Sister Deborah Hassan',
    team: 'Harvest Workers',
    membersCount: 17,
    email: 'followup@church.org',
    status: 'ACTIVE',
    description: 'Follows up on new members and converts.',
    createdAt: '2023-10-05',
  },
  {
    id: 'dept-014',
    name: 'Youth Ministry',
    head: 'Pastor Nathaniel King',
    team: 'Rising Generation',
    membersCount: 45,
    email: 'youth@church.org',
    status: 'ACTIVE',
    description: 'Coordinates youth programs and leadership training.',
    createdAt: '2024-01-10',
  },
  {
    id: 'dept-015',
    name: 'Drama',
    head: 'Brother Zion Okafor',
    team: 'Flame Carriers',
    membersCount: 13,
    email: 'drama@church.org',
    status: 'ACTIVE',
    description:
      'Uses drama and stage performances to convey biblical messages.',
    createdAt: '2023-11-18',
  },
  {
    id: 'dept-016',
    name: 'Finance',
    head: 'Brother Paul Adeniyi',
    team: 'Good Stewards',
    membersCount: 9,
    email: 'finance@church.org',
    status: 'ACTIVE',
    description: 'Handles church finances, budgeting, and accountability.',
    createdAt: '2023-04-21',
  },
  {
    id: 'dept-017',
    name: 'Administration',
    head: 'Sister Hannah Williams',
    team: 'Good Stewards',
    membersCount: 11,
    email: 'admin@church.org',
    status: 'ACTIVE',
    description: 'Oversees administrative records and coordination.',
    createdAt: '2023-05-02',
  },
  {
    id: 'dept-018',
    name: 'Discipleship',
    head: 'Pastor Andrew Collins',
    team: 'True Vine',
    membersCount: 20,
    email: 'discipleship@church.org',
    status: 'ACTIVE',
    description: 'Guides members through spiritual growth and discipleship.',
    createdAt: '2023-12-08',
  },
  {
    id: 'dept-019',
    name: 'Music',
    head: 'Brother Elijah Martins',
    team: 'Voice of Triumph',
    membersCount: 26,
    email: 'music@church.org',
    status: 'ACTIVE',
    description:
      'Supports worship through instruments and musical coordination.',
    createdAt: '2023-09-17',
  },
  {
    id: 'dept-020',
    name: 'Maintenance',
    head: 'Brother Michael Ade',
    team: 'Living Stones',
    membersCount: 10,
    email: 'maintenance@church.org',
    status: 'ACTIVE',
    description: 'Maintains church facilities and equipment.',
    createdAt: '2023-06-01',
  },
]

const Departments = () => {
  const data = departments
  // const data = await getData()
  return (
    <div className=''>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibold'>All Departments</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Departments
