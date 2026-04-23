'use client'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'

const chartConfig = {
  sunday: {
    label: 'Sunday Service',
    color: 'hsl(var(--foreground))', // Solid contrast
  },
  midweek: {
    label: 'Midweek Service',
    color: 'hsl(var(--muted-foreground))', // Muted contrast
  },
} satisfies ChartConfig

const chartData = [
  { month: 'Jan', sunday: 186, midweek: 80 },
  { month: 'Feb', sunday: 305, midweek: 200 },
  { month: 'Mar', sunday: 237, midweek: 120 },
  { month: 'Apr', sunday: 273, midweek: 190 },
  { month: 'May', sunday: 209, midweek: 130 },
  { month: 'Jun', sunday: 214, midweek: 140 },
]

const AppAreaChart = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      {/* HEADER */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>
            Attendance Analytics
          </p>
          <h2 className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
            Service Growth Trend
          </h2>
        </div>
        <div className='hidden sm:flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest'>
          <span>H1 2026</span>
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className='aspect-auto h-62.5 w-full'
      >
        <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
          <CartesianGrid
            vertical={false}
            strokeDasharray='3 3'
            stroke='hsl(var(--muted))'
            className='opacity-50'
          />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickMargin={15}
            className='text-[10px] font-bold uppercase tracking-tighter text-zinc-400'
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={15}
            className='text-[10px] font-bold text-zinc-400'
          />

          <ChartTooltip
            cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1 }}
            content={<ChartTooltipContent hideLabel />}
          />

          <Area
            dataKey='midweek'
            type='monotone'
            fill='currentColor'
            fillOpacity={0.05}
            stroke='currentColor'
            strokeWidth={2}
            className='text-zinc-400'
          />
          <Area
            dataKey='sunday'
            type='monotone'
            fill='currentColor'
            fillOpacity={0.1}
            stroke='currentColor'
            strokeWidth={2}
            className='text-zinc-900 dark:text-zinc-100'
          />

          <ChartLegend
            content={<ChartLegendContent />}
            className='mt-6 border-t border-zinc-100 dark:border-zinc-900 pt-4'
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export default AppAreaChart
