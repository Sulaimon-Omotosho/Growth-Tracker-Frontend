import Image from 'next/image'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

const latestMessages = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://i.pravatar.cc/150?img=1',
    message: 'Hey, I just joined your department.',
    date: '2026-03-29',
    time: '10:45 AM',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    image: 'https://i.pravatar.cc/150?img=5',
    message: 'Can we meet after service?',
    date: '2026-03-29',
    time: '09:20 AM',
  },
  {
    id: 3,
    name: 'Michael Smith',
    image: 'https://i.pravatar.cc/150?img=8',
    message: 'I’ve updated the growth record.',
    date: '2026-03-28',
    time: '06:15 PM',
  },
  {
    id: 4,
    name: 'Esther Williams',
    image: 'https://i.pravatar.cc/150?img=12',
    message: 'Prayer meeting starts at 6pm.',
    date: '2026-03-28',
    time: '03:10 PM',
  },
  {
    id: 5,
    name: 'Esther Williams',
    image: 'https://i.pravatar.cc/150?img=12',
    message: 'Prayer meeting starts at 6pm.',
    date: '2026-03-28',
    time: '03:10 PM',
  },
]
const latestNotifications = [
  {
    id: 1,
    title: 'Added to Department',
    sender: 'John Doe',
    date: '2026-03-29',
    time: '08:30 AM',
  },
  {
    id: 2,
    title: 'New Member Registered',
    sender: 'Admin',
    date: '2026-03-29',
    time: '07:10 AM',
  },
  {
    id: 3,
    title: 'Role Updated',
    sender: 'System',
    date: '2026-03-28',
    time: '09:45 PM',
  },
  {
    id: 4,
    title: 'New Message Received',
    sender: 'Sarah Johnson',
    date: '2026-03-28',
    time: '05:20 PM',
  },
  {
    id: 5,
    title: 'New Message Received',
    sender: 'Sarah Johnson',
    date: '2026-03-28',
    time: '05:20 PM',
  },
]

const CardList = async ({ title }: { title: string }) => {
  // let products: ProductsType = []
  // let orders: OrderType[] = []

  // const { getToken } = await auth()
  // const token = await getToken()
  // if (title === 'Popular Products') {
  //   products = await fetch(
  //     `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?limit=5&popular=true`,
  //   ).then((res) => res.json())
  // } else {
  //   orders = await fetch(
  //     `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders?limit=5`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   ).then((res) => res.json())
  // }
  return (
    <div className=''>
      <h1 className='text-lg font-medium mb-6'>{title}</h1>
      <div className='flex flex-col gap-2'>
        {/* MESSAGES  */}
        {title === 'Latest Messages' &&
          latestMessages.map((item) => (
            <Card
              key={item.id}
              className='flex-row items-center gap-4 p-4 hover:bg-muted/50 hover:cursor-pointer transition rounded-lg'
            >
              {/* Avatar  */}
              <div className='w-12 h-12 rounded-full relative overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='object-cover'
                />
              </div>

              {/* Content  */}
              <CardContent className='flex-1 p-0'>
                <CardTitle className='text-sm font-semibold'>
                  {item.name}
                </CardTitle>
                <p className='text-xs text-muted-foreground truncate'>
                  {item.message}
                </p>
                {/* <Badge variant='secondary'>{item.badge}</Badge> */}
              </CardContent>

              {/* Time  */}
              {/* <CardFooter className='p-0 text-xs text-muted-foreground flex flex-col items-end'>
                <span>{item.time} </span>
                <span>{item.date} </span>
              </CardFooter> */}
            </Card>
          ))}

        {/* NOTIFICATIONS  */}
        {title === 'Latest Notifications' &&
          latestNotifications.map((item) => (
            <Card
              key={item.id}
              className='flex-row items-center gap-4 p-4 hover:bg-muted/50 hover:cursor-pointer transition rounded-lg'
            >
              {/* <div className='w-12 h-12 rounded-sm relative overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover'
                  />
                </div> */}
              <CardContent className='flex-1 p-0'>
                <CardTitle className='text-sm font-semibold'>
                  {item.title}
                </CardTitle>
                <div className='flex items-center gap-2 mt-1'>
                  <Badge variant='secondary'>{item.sender}</Badge>
                </div>
              </CardContent>
              <CardFooter className='p-0 text-xs text-muted-foreground flex flex-col items-end'>
                <span>{item.time}</span>
                <span>{item.date}</span>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default CardList
