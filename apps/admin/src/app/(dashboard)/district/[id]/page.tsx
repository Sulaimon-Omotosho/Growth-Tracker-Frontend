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

export const communities = [
  {
    id: '1',
    name: 'Grace Community Ikeja',
    pastor: 'Pastor Samuel Adeyemi',
    cellCount: 12,
    description:
      'A thriving community focused on spiritual growth and leadership development.',
    createdAt: '2024-01-15T08:30:00Z',
    status: 'ACTIVE',
    membersCount: 320,
    location: 'Ikeja, Lagos',
  },
  {
    id: '2',
    name: 'Victory Community Surulere',
    pastor: 'Pastor Grace Oladipo',
    cellCount: 10,
    description: 'Strong emphasis on family values and youth empowerment.',
    createdAt: '2024-02-10T09:00:00Z',
    status: 'ACTIVE',
    membersCount: 280,
    location: 'Surulere, Lagos',
  },
  {
    id: '3',
    name: 'Dominion Community Yaba',
    pastor: 'Pastor Daniel Ogunleye',
    cellCount: 8,
    description:
      'Tech-savvy community with many young professionals and students.',
    createdAt: '2024-03-18T10:15:00Z',
    status: 'ACTIVE',
    membersCount: 250,
    location: 'Yaba, Lagos',
  },
  {
    id: '4',
    name: 'Harvest Community Lekki',
    pastor: 'Pastor Esther Akinwale',
    cellCount: 11,
    description: 'Fast-growing community with a diverse membership base.',
    createdAt: '2024-04-05T11:20:00Z',
    status: 'ACTIVE',
    membersCount: 300,
    location: 'Lekki, Lagos',
  },
  {
    id: '5',
    name: 'Faith Community Ajah',
    pastor: 'Pastor Michael Olatunji',
    cellCount: 7,
    description: 'Focused on evangelism and community outreach programs.',
    createdAt: '2024-05-22T07:45:00Z',
    status: 'ACTIVE',
    membersCount: 190,
    location: 'Ajah, Lagos',
  },
  {
    id: '6',
    name: 'Glory Community Ikorodu',
    pastor: 'Pastor Joseph Balogun',
    cellCount: 14,
    description: 'Large community with strong grassroots engagement.',
    createdAt: '2024-06-25T12:10:00Z',
    status: 'ACTIVE',
    membersCount: 360,
    location: 'Ikorodu, Lagos',
  },
  {
    id: '7',
    name: 'Hope Community Epe',
    pastor: 'Pastor Deborah Ogunyemi',
    cellCount: 5,
    description: 'Developing community with focus on rural transformation.',
    createdAt: '2024-07-12T08:00:00Z',
    status: 'ACTIVE',
    membersCount: 140,
    location: 'Epe, Lagos',
  },
  {
    id: '8',
    name: 'Heritage Community Badagry',
    pastor: 'Pastor Philip Adebayo',
    cellCount: 6,
    description: 'Historically rich community with strong evangelism culture.',
    createdAt: '2024-08-18T09:30:00Z',
    status: 'ACTIVE',
    membersCount: 170,
    location: 'Badagry, Lagos',
  },
  {
    id: '9',
    name: 'Unity Community Festac',
    pastor: 'Pastor Ruth Alabi',
    cellCount: 9,
    description: 'Structured and well-organized community with steady growth.',
    createdAt: '2024-09-07T10:50:00Z',
    status: 'ACTIVE',
    membersCount: 260,
    location: 'Festac, Lagos',
  },
  {
    id: '10',
    name: 'Covenant Community Apapa',
    pastor: 'Pastor Victor Okonkwo',
    cellCount: 8,
    description: 'Busy commercial area community with committed members.',
    createdAt: '2024-10-15T11:35:00Z',
    status: 'ACTIVE',
    membersCount: 210,
    location: 'Apapa, Lagos',
  },
  {
    id: '11',
    name: 'Revival Community Agege',
    pastor: 'Pastor Emmanuel Ajayi',
    cellCount: 10,
    description: 'Highly energetic community with strong youth presence.',
    createdAt: '2024-11-25T07:25:00Z',
    status: 'ACTIVE',
    membersCount: 290,
    location: 'Agege, Lagos',
  },
  {
    id: '12',
    name: 'Elevation Community Ojodu',
    pastor: 'Pastor Funmi Ojo',
    cellCount: 8,
    description: 'Balanced and steadily growing community.',
    createdAt: '2024-12-20T08:40:00Z',
    status: 'ACTIVE',
    membersCount: 240,
    location: 'Ojodu, Lagos',
  },
]

const Community = () => {
  const data = communities as any
  // const data = await getData()
  return (
    <div className=''>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibold'>All Communities</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Community
