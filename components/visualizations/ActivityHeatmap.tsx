'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface HeatmapData {
  date: string
  count: number
}

interface ActivityHeatmapProps {
  data?: HeatmapData[]
}

// Generate mock data for the last 365 days
function generateMockData(): HeatmapData[] {
  const data: HeatmapData[] = []
  const today = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20)
    })
  }

  return data
}

export function ActivityHeatmap({ data = generateMockData() }: ActivityHeatmapProps) {
  const maxCount = useMemo(() => Math.max(...data.map(d => d.count)), [data])

  const getColor = (count: number) => {
    if (count === 0) return '#F3F4F6'
    const intensity = count / maxCount
    if (intensity < 0.25) return '#DBEAFE'
    if (intensity < 0.5) return '#93C5FD'
    if (intensity < 0.75) return '#3B82F6'
    return '#1D4ED8'
  }

  const weeks = useMemo(() => {
    const weekGroups: HeatmapData[][] = []
    for (let i = 0; i < data.length; i += 7) {
      weekGroups.push(data.slice(i, i + 7))
    }
    return weekGroups
  }, [data])

  return (
    <div className="bg-white rounded-[--radius-card] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <h3 className="text-xl font-[family-name:var(--font-display)] font-bold mb-4">
        Activity Timeline
      </h3>

      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <motion.div
                  key={`${weekIdx}-${dayIdx}`}
                  className="w-3 h-3 rounded-sm cursor-pointer"
                  style={{ backgroundColor: getColor(day.count) }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (weekIdx * 7 + dayIdx) * 0.001 }}
                  whileHover={{ scale: 1.5, zIndex: 10 }}
                  title={`${day.date}: ${day.count} activities`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-neutral-100" />
          <div className="w-3 h-3 rounded-sm bg-[#DBEAFE]" />
          <div className="w-3 h-3 rounded-sm bg-[#93C5FD]" />
          <div className="w-3 h-3 rounded-sm bg-[#3B82F6]" />
          <div className="w-3 h-3 rounded-sm bg-[#1D4ED8]" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
