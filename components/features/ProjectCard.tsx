'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'

interface ProjectCardProps {
  title: string
  description: string
  progress: number
  color: string
}

export function ProjectCard({ title, description, progress, color }: ProjectCardProps) {
  return (
    <Card hoverable className="relative overflow-hidden cursor-pointer">
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: `linear-gradient(135deg, ${color}00 0%, ${color} 100%)` }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-[family-name:var(--font-display)] font-bold mb-1">{title}</h3>
            <p className="text-neutral-500 text-sm">{description}</p>
          </div>
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Progress</span>
            <span className="font-semibold" style={{ color }}>{progress}%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium">
            Design
          </span>
          <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium">
            Active
          </span>
        </div>
      </div>
    </Card>
  )
}
