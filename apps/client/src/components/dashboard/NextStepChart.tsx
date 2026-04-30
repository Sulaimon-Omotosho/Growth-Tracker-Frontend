'use client'

import { BookCheck } from 'lucide-react'
import { PolarAngleAxis, RadialBar, RadialBarChart, LabelList } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '../ui/chart'
import { Course } from '@repo/types'
import { formatDistanceToNow } from 'date-fns'

const chartConfig = {
  progress: { label: 'Completion' },
  course1: { color: 'hsl(var(--chart-1))' },
  course2: { color: 'hsl(var(--chart-2))' },
  course3: { color: 'hsl(var(--chart-3))' },
  course4: { color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig

interface NextStepChartProps {
  data: Course[]
}

export function NextStepChart({ data }: NextStepChartProps) {
  const formattedData = data?.map((item: any, index) => ({
    course: item.course.title?.toLowerCase() || '',
    progress: item.progress || 0,
    fill: `var(--color-course${index + 1})`,
  }))

  const lastUpdated =
    data?.length > 0
      ? new Date(
          Math.max(
            ...data.map((item: any) => {
              const timestamp =
                item.updatedAt ||
                item.course?.updatedAt ||
                item.course?.createdAt
              return new Date(timestamp).getTime()
            }),
          ),
        )
      : new Date()

  return (
    <Card className='flex flex-col border-none shadow-none bg-transparent'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-base'>Course Progress</CardTitle>
        <CardDescription>Recent milestones</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-70'
        >
          <RadialBarChart
            data={formattedData}
            startAngle={90}
            endAngle={450}
            innerRadius={40}
            outerRadius={110}
            barSize={12}
          >
            <PolarAngleAxis
              type='number'
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey='course' />}
            />
            <RadialBar
              dataKey='progress'
              background={{
                fill: 'var(--muted)',
                opacity: 0.8,
                stroke: 'currentColor',
                strokeWidth: 0.5,
                strokeOpacity: 0.2,
              }}
              cornerRadius={10}
              stroke='rgba(255,255,255,0.2)'
              strokeWidth={1}
            >
              <LabelList
                position='insideStart'
                dataKey='course'
                className='fill-foreground capitalize font-bold'
                fontSize={9}
                offset={10}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <div className='flex items-center justify-center gap-2 pb-6 text-[10px] text-muted-foreground'>
        <BookCheck className='h-3 w-3 text-green-500' />
        <span>
          Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
        </span>
      </div>
    </Card>
  )
}
