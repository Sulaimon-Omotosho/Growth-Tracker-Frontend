'use client'

import * as React from 'react'
import { Label, Pie, PieChart, Cell } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart'
import { TrendingUp } from 'lucide-react'

const chartConfig = {
  attendance: { label: 'Attendance' },
  firstService: { label: '1st Service' },
  secondService: { label: '2nd Service' },
  thirdService: { label: '3rd Service' },
  fourthService: { label: '4th Service' },
  midweek: { label: 'Midweek' },
} satisfies ChartConfig

const chartData = [
  { service: 'thirdService', attendance: 28 }, // Moved peak to first for color priority
  { service: 'secondService', attendance: 25 },
  { service: 'fourthService', attendance: 18 },
  { service: 'midweek', attendance: 16 },
  { service: 'firstService', attendance: 13 },
]

// Mapping our CSS variables to the chart
const COLORS = [
  'var(--pie-primary)',
  'var(--pie-secondary)',
  'var(--pie-tertiary)',
  'var(--pie-quaternary)',
  'var(--pie-quinary)',
]

const AppPieChart = () => {
  const totalAttendance = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.attendance, 0)
  }, [])

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='mb-4'>
        <p className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>
          Distribution
        </p>
        <h2 className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
          Service Strength
        </h2>
      </div>

      <div className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-55'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='attendance'
              nameKey='service'
              innerRadius={70}
              outerRadius={90}
              strokeWidth={4}
              // This creates the "gap" between slices using the theme bg color
              stroke='hsl(var(--background))'
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className='transition-opacity hover:opacity-80'
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-2xl font-black tracking-tighter'
                        >
                          {totalAttendance}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className='fill-zinc-400 text-[10px] font-black uppercase tracking-widest'
                        >
                          Capacity
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <div className='mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {/* The dot now matches the primary bar color variable */}
            <div className='h-2 w-2 rounded-full bg-(--pie-primary)' />
            <span className='text-[11px] font-bold text-zinc-600 dark:text-zinc-400'>
              Peak: 3rd Service
            </span>
          </div>
          <div className='flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-500 uppercase'>
            <TrendingUp size={12} />
            Stable
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppPieChart
