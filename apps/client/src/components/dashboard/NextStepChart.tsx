'use client'

import { BookCheck, TrendingUp } from 'lucide-react'
import { LabelList, PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '../ui/chart'

export const description = 'A radial chart for Next Steps'

const chartData = [
  { course: 'new believer', progress: 100, fill: 'var(--color-believer)' },
  { course: 'foundation', progress: 25, fill: 'var(--color-foundation)' },
  { course: 'growth track', progress: 75, fill: 'var(--color-growth)' },
  { course: 'baptism', progress: 40, fill: 'var(--color-baptism)' },
  { course: 'leadership', progress: 90, fill: 'var(--color-leadership)' },
]

const chartConfig = {
  progress: {
    label: 'Completion',
  },
  believer: {
    label: 'New Believer',
    color: 'hsl(var(--chart-1))',
  },
  growth: {
    label: 'Growth Track',
    color: 'hsl(var(--chart-2))',
  },
  foundation: {
    label: 'Foundation',
    color: 'hsl(var(--chart-3))',
  },
  baptism: {
    label: 'Baptism',
    color: 'hsl(var(--chart-4))',
  },
  leadership: {
    label: 'Leadership',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export function NextStepChart() {
  return (
    <Card className='flex flex-col border-none shadow-none bg-transparent'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-base'>Course Progress</CardTitle>
        <CardDescription>Overall track completion</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-70'
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={450}
            innerRadius={40}
            outerRadius={120}
            barSize={15}
          >
            <PolarAngleAxis
              type='number'
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel nameKey='course' suffix='%' />
              }
            />
            <RadialBar
              dataKey='progress'
              background={{ fill: 'var(--muted)', opacity: 0.2 }}
              cornerRadius={10}
            >
              <LabelList
                position='insideStart'
                dataKey='course'
                className='fill-foreground capitalize font-medium'
                fontSize={10}
                offset={8}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <div className='flex items-center justify-center gap-2 pb-6 text-xs text-muted-foreground'>
        <BookCheck className='h-4 w-4 text-green-500' />
        <span>Updated 2 hours ago</span>
      </div>
    </Card>
  )
}
