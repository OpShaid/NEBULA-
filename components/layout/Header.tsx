'use client'

import { motion } from 'framer-motion'
import { Sparkles, User, Settings } from 'lucide-react'
import { AIOrb } from '@/components/features/AIOrb'

export function Header() {
  return (
    <motion.header
      className="h-16 border-b flex items-center justify-between px-6 bg-white"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="text-primary-500" size={28} />
        <h1 className="text-xl font-[family-name:var(--font-display)] font-bold">NEBULA</h1>
      </div>

      <div className="flex items-center gap-3">
        <AIOrb />
        <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
          <User size={20} />
        </button>
        <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </motion.header>
  )
}
