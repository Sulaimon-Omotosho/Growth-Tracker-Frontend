import React from 'react'
import { Badge } from '../ui/badge'

const ResourceItem = ({ label, status, isOccupied = false }: any) => {
  return (
    <div className='flex justify-between items-center text-sm'>
      <span className='text-zinc-500'>{label}</span>
      <Badge
        variant={isOccupied ? 'destructive' : 'outline'}
        className='text-[10px]'
      >
        {status}
      </Badge>
    </div>
  )
}
export default ResourceItem
