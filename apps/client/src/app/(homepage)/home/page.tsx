import { CheckCircle2, MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  'Connecting with the church',
  'Discovering your strengths and purpose',
  'Developing your personal leadership skills',
  'Using these discoveries to make a difference',
]

const steps = [
  {
    title: 'Small Group',
    image: '/assets/Growthtrack-img1.jpg',
    desc: 'Find community and grow together in smaller, intimate settings designed for fellowship.',
  },
  {
    title: 'Workforce',
    image: '/assets/Growthtrack-img1.jpg',
    desc: 'Join a department and use your unique skills to serve the kingdom and others.',
  },
  {
    title: 'Water Baptism',
    image: '/assets/Growthtrack-img1.jpg',
    desc: 'Make a public declaration of your faith and your new life in Christ Jesus.',
  },
]

export default function Home() {
  return (
    <main className='min-h-screen'>
      {/* HERO SECTION */}
      <section className='relative w-full h-[70vh] min-h-125 flex items-end overflow-hidden'>
        <Image
          src='/assets/Pastor-Bolaji-Idowu.png'
          alt='Growth Track'
          fill
          className='object-cover object-center'
          priority
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent' />

        <div className='relative z-10 w-full max-w-5xl mx-auto px-6 pb-20 text-white'>
          <h1 className='text-5xl md:text-7xl font-black tracking-tighter mb-4 italic'>
            GROWTH TRACK
          </h1>
          <p className='text-lg md:text-xl font-medium max-w-2xl text-gray-200 leading-relaxed'>
            Know HICC and be empowered to walk in Christ's fullness. Your
            journey to purpose starts here.
          </p>
        </div>
      </section>

      {/* MISSION DESCRIPTION */}
      <section className='max-w-4xl mx-auto px-6 py-24'>
        <div className='grid md:grid-cols-2 gap-12 items-start'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
              The Growth Tracker
            </h2>
            <p className='text-muted-foreground text-lg leading-relaxed mb-6'>
              The Harvesters Growth Track is a system designed to help you know
              Harvesters, discover your God-given purpose, and grow in the
              Church of Christ.
            </p>
            <Button className='rounded-full px-8'>Get Started Now</Button>
          </div>

          <div className='bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl space-y-4 border border-gray-100 dark:border-gray-800'>
            <p className='font-bold text-sm uppercase tracking-widest text-blue-600 mb-2'>
              What to expect
            </p>
            {features.map((feature, i) => (
              <div key={i} className='flex items-start gap-3'>
                <CheckCircle2 className='w-5 h-5 text-blue-600 mt-0.5 shrink-0' />
                <span className='text-foreground font-medium'>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT STEPS SECTION */}
      <section className='bg-gray-50 dark:bg-gray-900/50 py-24'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold tracking-tight mb-2'>
              Next Steps
            </h2>
            <p className='text-blue-600 font-semibold text-lg'>
              Other available decisions for your journey
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {steps.map((step, i) => (
              <div
                key={i}
                className='group bg-background rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300'
              >
                <div className='relative h-64 w-full overflow-hidden'>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                </div>
                <div className='p-8'>
                  <h3 className='text-2xl font-bold mb-3'>{step.title}</h3>
                  <p className='text-muted-foreground leading-relaxed mb-6'>
                    {step.desc}
                  </p>
                  <Link
                    href='/sign-up'
                    className='inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all'
                  >
                    Sign Up <MoveRight className='w-5 h-5' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
