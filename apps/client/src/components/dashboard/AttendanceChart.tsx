'use client'

import { TrendingUp, Users } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '../ui/chart'

export const description = 'Church service attendance'

const chartData = [
  { month: 'January', sunday: 186, midweek: 80 },
  { month: 'February', sunday: 305, midweek: 200 },
  { month: 'March', sunday: 237, midweek: 120 },
  { month: 'April', sunday: 73, midweek: 190 },
  { month: 'May', sunday: 209, midweek: 130 },
  { month: 'June', sunday: 214, midweek: 140 },
]

const chartConfig = {
  sunday: {
    label: 'Sunday Service',
    color: 'hsl(var(--chart-1))',
  },
  midweek: {
    label: 'Midweek Service',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function AttendanceChart() {
  return (
    <Card className='border-none shadow-none bg-transparent'>
      <CardHeader className='flex flex-row items-center justify-between pb-8'>
        <div className='grid gap-1'>
          <CardTitle className='text-base font-bold'>
            Attendance Trends
          </CardTitle>
          <CardDescription className='text-xs'>
            Comparing Sunday and Midweek engagement
          </CardDescription>
        </div>
        <div className='flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full'>
          <TrendingUp className='w-3 h-3 text-green-600' />
          <span className='text-[10px] font-bold text-green-600 uppercase'>
            +12%
          </span>
        </div>
      </CardHeader>
      <CardContent className='px-0'>
        <ChartContainer config={chartConfig} className='h-75 w-full'>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id='fillSunday' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-sunday)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-sunday)'
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='fillMidweek' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-midweek)'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-midweek)'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray='3 3'
              className='stroke-muted'
            />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value) => value.slice(0, 3)}
              className='text-[10px] font-medium text-muted-foreground'
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              className='text-[10px] font-medium text-muted-foreground'
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='midweek'
              type='monotone' // Swapped 'natural' for 'monotone' for a cleaner curve
              fill='url(#fillMidweek)'
              stroke='var(--color-midweek)'
              strokeWidth={2}
            />
            <Area
              dataKey='sunday'
              type='monotone'
              fill='url(#fillSunday)'
              stroke='var(--color-sunday)'
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent className='mt-4' />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='pt-4 px-0'>
        <div className='flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
          <Users className='w-3 h-3' />
          Data verified for H1 2026
        </div>
      </CardFooter>
    </Card>
  )
}
