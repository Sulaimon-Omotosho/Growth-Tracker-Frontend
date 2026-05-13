import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageSquare, Mail } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'

export const LeaderContactCard = ({ leader }: any) => (
  <Card className='hover:shadow-md transition-shadow'>
    <CardContent className='p-6 text-center'>
      <Avatar className='h-20 w-20 mx-auto mb-4 border-4 border-slate-50'>
        <AvatarImage src={leader?.image} />
        <AvatarFallback>{leader?.firstName?.[0]}</AvatarFallback>
      </Avatar>
      <h4 className='font-bold text-lg'>
        {leader?.firstName} {leader?.lastName}
      </h4>
      <p className='text-sm text-slate-500 mb-6'>Group Leader</p>

      <div className='flex gap-2'>
        <Button variant='outline' className='flex-1 gap-2'>
          <a
            href={`mailto:${leader?.email}`}
            className='flex items-center gap-1 text-blue-600 font-bold w-full h-full justify-center'
          >
            <Mail size={16} /> Email
          </a>
        </Button>
        <Button className='flex-1 gap-2'>
          <MessageSquare size={16} /> Chat
        </Button>
      </div>
    </CardContent>
  </Card>
)

{
  /* <a
                    href={`tel:${leader?.phone}`}
                    className='flex items-center gap-1 text-[10px] text-green-600 font-bold'
                  >
                    <Phone size={10} /> Call {leader?.phone}
                  </a>
                  <a
                    href={`mailto:${leader?.email}`}
                    className='flex items-center gap-1 text-[10px] text-blue-600 font-bold'
                  >
                    <Mail size={10} /> Email {leader?.email}
                  </a> */
}
