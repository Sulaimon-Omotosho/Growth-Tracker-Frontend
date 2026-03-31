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
export const users = [
  {
    id: 'user-1',
    firstName: 'User1',
    lastName: 'Test1',
    name: 'User1 Test1',
    role: 'USER',
    phone: '08010000001',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=1',
    cell: { name: 'Cell 1' },
  },
  {
    id: 'user-2',
    firstName: 'User2',
    lastName: 'Test2',
    name: 'User2 Test2',
    role: 'SUPERVISOR',
    phone: '08010000002',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=2',
    cell: { name: 'Cell 2' },
  },
  {
    id: 'user-3',
    firstName: 'User3',
    lastName: 'Test3',
    name: 'User3 Test3',
    role: 'ADMIN',
    phone: '08010000003',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=3',
    cell: { name: 'Cell 3' },
  },
  {
    id: 'user-4',
    firstName: 'User4',
    lastName: 'Test4',
    name: 'User4 Test4',
    role: 'SUPERVISOR',
    phone: '08010000004',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=4',
    cell: { name: 'Cell 4' },
  },
  {
    id: 'user-5',
    firstName: 'User5',
    lastName: 'Test5',
    name: 'User5 Test5',
    role: 'USER',
    phone: '08010000005',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=5',
    cell: { name: 'Cell 5' },
  },
  {
    id: 'user-6',
    firstName: 'User6',
    lastName: 'Test6',
    name: 'User6 Test6',
    role: 'ADMIN',
    phone: '08010000006',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=6',
    cell: { name: 'Cell 6' },
  },
  {
    id: 'user-7',
    firstName: 'User7',
    lastName: 'Test7',
    name: 'User7 Test7',
    role: 'USER',
    phone: '08010000007',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=7',
    cell: { name: 'Cell 7' },
  },
  {
    id: 'user-8',
    firstName: 'User8',
    lastName: 'Test8',
    name: 'User8 Test8',
    role: 'SUPERVISOR',
    phone: '08010000008',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=8',
    cell: { name: 'Cell 8' },
  },
  {
    id: 'user-9',
    firstName: 'User9',
    lastName: 'Test9',
    name: 'User9 Test9',
    role: 'ADMIN',
    phone: '08010000009',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=9',
    cell: { name: 'Cell 9' },
  },
  {
    id: 'user-10',
    firstName: 'User10',
    lastName: 'Test10',
    name: 'User10 Test10',
    role: 'SUPERVISOR',
    phone: '08010000010',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=10',
    cell: { name: 'Cell 10' },
  },
  {
    id: 'user-11',
    firstName: 'User11',
    lastName: 'Test11',
    name: 'User11 Test11',
    role: 'USER',
    phone: '08010000011',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=11',
    cell: { name: 'Cell 1' },
  },
  {
    id: 'user-12',
    firstName: 'User12',
    lastName: 'Test12',
    name: 'User12 Test12',
    role: 'ADMIN',
    phone: '08010000012',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=12',
    cell: { name: 'Cell 2' },
  },
  {
    id: 'user-13',
    firstName: 'User13',
    lastName: 'Test13',
    name: 'User13 Test13',
    role: 'USER',
    phone: '08010000013',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=13',
    cell: { name: 'Cell 3' },
  },
  {
    id: 'user-14',
    firstName: 'User14',
    lastName: 'Test14',
    name: 'User14 Test14',
    role: 'SUPERVISOR',
    phone: '08010000014',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=14',
    cell: { name: 'Cell 4' },
  },
  {
    id: 'user-15',
    firstName: 'User15',
    lastName: 'Test15',
    name: 'User15 Test15',
    role: 'ADMIN',
    phone: '08010000015',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=15',
    cell: { name: 'Cell 5' },
  },
  {
    id: 'user-16',
    firstName: 'User16',
    lastName: 'Test16',
    name: 'User16 Test16',
    role: 'SUPERVISOR',
    phone: '08010000016',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=16',
    cell: { name: 'Cell 6' },
  },
  {
    id: 'user-17',
    firstName: 'User17',
    lastName: 'Test17',
    name: 'User17 Test17',
    role: 'USER',
    phone: '08010000017',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=17',
    cell: { name: 'Cell 7' },
  },
  {
    id: 'user-18',
    firstName: 'User18',
    lastName: 'Test18',
    name: 'User18 Test18',
    role: 'ADMIN',
    phone: '08010000018',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=18',
    cell: { name: 'Cell 8' },
  },
  {
    id: 'user-19',
    firstName: 'User19',
    lastName: 'Test19',
    name: 'User19 Test19',
    role: 'USER',
    phone: '08010000019',
    gender: 'FEMALE',
    image: 'https://i.pravatar.cc/150?img=19',
    cell: { name: 'Cell 9' },
  },
  {
    id: 'user-20',
    firstName: 'User20',
    lastName: 'Test20',
    name: 'User20 Test20',
    role: 'SUPERVISOR',
    phone: '08010000020',
    gender: 'MALE',
    image: 'https://i.pravatar.cc/150?img=20',
    cell: { name: 'Cell 10' },
  },

  // 👉 continues same pattern up to user-50
]

const Workers = () => {
  const data = users as any
  // const data = await getData()
  return (
    <div className=''>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibold'>All Workers</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Workers
