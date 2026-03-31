//   const getData = async (): Promise<ProductsType> => {

import { columns } from './columns'
import { DataTable } from './data-table'

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
//     )
//     const data = await res.json()apps/admin/src/app/(dashboard)/workforce/columns.tsx apps/admin/src/app/(dashboard)/workforce/data-table.tsx
//     return data
//   } catch (error) {
//     console.log(error)
//     return []
//   }
// }
export const districts = [
  {
    id: '1',
    name: 'Ikeja District',
    pastor: 'Pastor Samuel Adeyemi',
    communitiesCount: 8,
    description:
      'A vibrant district focused on youth development and outreach programs.',
    createdAt: '2024-01-10T08:30:00Z',
    status: 'ACTIVE',
    membersCount: 1250,
    location: 'Ikeja, Lagos',
  },
  {
    id: '2',
    name: 'Surulere District',
    pastor: 'Pastor Grace Oladipo',
    communitiesCount: 6,
    description:
      'Known for strong community bonding and family-oriented ministries.',
    createdAt: '2024-02-05T09:00:00Z',
    status: 'ACTIVE',
    membersCount: 980,
    location: 'Surulere, Lagos',
  },
  {
    id: '3',
    name: 'Yaba District',
    pastor: 'Pastor Daniel Ogunleye',
    communitiesCount: 5,
    description: 'A tech-driven district with a focus on young professionals.',
    createdAt: '2024-03-12T10:15:00Z',
    status: 'ACTIVE',
    membersCount: 870,
    location: 'Yaba, Lagos',
  },
  {
    id: '4',
    name: 'Lekki District',
    pastor: 'Pastor Esther Akinwale',
    communitiesCount: 7,
    description: 'Rapidly growing district with diverse and dynamic members.',
    createdAt: '2024-04-01T11:20:00Z',
    status: 'ACTIVE',
    membersCount: 1100,
    location: 'Lekki, Lagos',
  },
  {
    id: '5',
    name: 'Ajah District',
    pastor: 'Pastor Michael Olatunji',
    communitiesCount: 4,
    description: 'Focused on expansion and community evangelism.',
    createdAt: '2024-05-18T07:45:00Z',
    status: 'ACTIVE',
    membersCount: 720,
    location: 'Ajah, Lagos',
  },
  {
    id: '6',
    name: 'Ikorodu District',
    pastor: 'Pastor Joseph Balogun',
    communitiesCount: 9,
    description: 'A large district with strong grassroots impact.',
    createdAt: '2024-06-22T12:10:00Z',
    status: 'ACTIVE',
    membersCount: 1400,
    location: 'Ikorodu, Lagos',
  },
  {
    id: '7',
    name: 'Epe District',
    pastor: 'Pastor Deborah Ogunyemi',
    communitiesCount: 3,
    description: 'A developing district with focus on rural outreach.',
    createdAt: '2024-07-09T08:00:00Z',
    status: 'ACTIVE',
    membersCount: 540,
    location: 'Epe, Lagos',
  },
  {
    id: '8',
    name: 'Badagry District',
    pastor: 'Pastor Philip Adebayo',
    communitiesCount: 4,
    description: 'Rich in history and strong in evangelistic activities.',
    createdAt: '2024-08-14T09:30:00Z',
    status: 'ACTIVE',
    membersCount: 610,
    location: 'Badagry, Lagos',
  },
  {
    id: '9',
    name: 'Festac District',
    pastor: 'Pastor Ruth Alabi',
    communitiesCount: 6,
    description: 'Urban district with structured administrative systems.',
    createdAt: '2024-09-03T10:50:00Z',
    status: 'ACTIVE',
    membersCount: 890,
    location: 'Festac, Lagos',
  },
  {
    id: '10',
    name: 'Apapa District',
    pastor: 'Pastor Victor Okonkwo',
    communitiesCount: 5,
    description: 'Commercial hub district with busy working-class members.',
    createdAt: '2024-10-11T11:35:00Z',
    status: 'ACTIVE',
    membersCount: 760,
    location: 'Apapa, Lagos',
  },
  {
    id: '11',
    name: 'Agege District',
    pastor: 'Pastor Emmanuel Ajayi',
    communitiesCount: 7,
    description: 'Highly energetic district with strong youth participation.',
    createdAt: '2024-11-20T07:25:00Z',
    status: 'ACTIVE',
    membersCount: 1020,
    location: 'Agege, Lagos',
  },
  {
    id: '12',
    name: 'Ojodu District',
    pastor: 'Pastor Funmi Ojo',
    communitiesCount: 5,
    description: 'Balanced district with steady growth and engagement.',
    createdAt: '2024-12-15T08:40:00Z',
    status: 'ACTIVE',
    membersCount: 830,
    location: 'Ojodu, Lagos',
  },
]

const District = () => {
  const data = districts as any

  return (
    <div className=''>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibold'>All District</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default District
