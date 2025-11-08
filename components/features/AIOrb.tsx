'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, Lightbulb, Clock } from 'lucide-react'
import { useState } from 'react'

const insights = [
  { icon: TrendingUp, text: 'Your productivity peaked on Tuesday at 3pm', color: '#0066FF' },
  { icon: Lightbulb, text: 'Consider breaking down "Large Project" into milestones', color: '#8000FF' },
  { icon: Clock, text: 'You tend to work on design projects on Mondays', color: '#10B981' }
]

export function AIOrb() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      <motion.button
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.3)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0,102,255,0.3)',
            '0 0 40px rgba(128,0,255,0.5)',
            '0 0 20px rgba(0,102,255,0.3)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="text-white" size={16} />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-16 right-0 w-96 bg-white rounded-[--radius-card] shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 z-50"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-primary-500" size={20} />
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg">AI Insights</h3>
            </div>

            <div className="space-y-3">
              {insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${insight.color}15` }}
                  >
                    <insight.icon size={16} style={{ color: insight.color }} />
                  </div>
                  <p className="text-sm text-neutral-700 flex-1">{insight.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ask AI Anything
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
