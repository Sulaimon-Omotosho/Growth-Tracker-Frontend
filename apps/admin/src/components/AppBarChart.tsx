'use client'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

// const chartConfig = {
//   present: {
//     label: 'Present',
//     color: 'hsl(var(--zinc-700))',
//   },
//   absent: {
//     label: 'Absent',
//     color: 'hsl(var(--zinc-400))',
//   },
// } satisfies ChartConfig
const chartConfig = {
  present: {
    label: 'Present',
    color: 'var(--present-bar)',
  },
  absent: {
    label: 'Absent',
    color: 'var(--absent-bar)',
  },
} satisfies ChartConfig

const chartData = [
  { month: 'Jan', present: 186, absent: 80 },
  { month: 'Feb', present: 305, absent: 200 },
  { month: 'Mar', present: 237, absent: 120 },
  { month: 'Apr', present: 173, absent: 150 },
  { month: 'May', present: 209, absent: 130 },
  { month: 'Jun', present: 214, absent: 140 },
]

const AppBarChart = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      {/* HEADER */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>
            Retention
          </p>
          <h2 className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
            Monthly Presence Gap
          </h2>
        </div>
        <div className='text-right'>
          <p className='text-[10px] font-black text-zinc-400 uppercase tracking-widest'>
            Avg. Rate
          </p>
          <p className='text-sm font-black text-zinc-900 dark:text-zinc-100'>
            64.2%
          </p>
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className='aspect-auto h-62.5 w-full'
      >
        <BarChart data={chartData} margin={{ left: -20 }} barGap={0}>
          <CartesianGrid
            vertical={false}
            strokeDasharray='3 3'
            className='stroke-zinc-100 dark:stroke-zinc-900'
          />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={15}
            axisLine={false}
            className='text-[10px] font-bold uppercase tracking-tighter text-zinc-400'
          />
          <YAxis
            tickLine={false}
            tickMargin={15}
            axisLine={false}
            className='text-[10px] font-bold text-zinc-400'
          />

          <ChartTooltip
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
            content={<ChartTooltipContent indicator='dashed' />}
          />

          <ChartLegend
            content={<ChartLegendContent />}
            className='mt-6 border-t border-zinc-100 dark:border-zinc-900 pt-4'
          />

          {/* Stacked Bars */}
          <Bar
            dataKey='absent'
            stackId='a'
            fill='var(--color-absent)'
            radius={[2, 2, 0, 0]}
            barSize={32}
          />
          <Bar
            dataKey='present'
            stackId='a'
            fill='var(--color-present)'
            radius={[0, 0, 0, 0]}
            barSize={32}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default AppBarChart
