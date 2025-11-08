'use client'

import { motion } from 'framer-motion'
import { Home, Lightbulb, Zap, Archive, BarChart3 } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: Lightbulb, label: 'Ideas', id: 'ideas' },
  { icon: Zap, label: 'Active', id: 'active' },
  { icon: Archive, label: 'Archive', id: 'archive' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
]

export function Sidebar() {
  const [active, setActive] = useState('home')

  return (
    <motion.aside
      className="w-64 border-r bg-white p-4"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <nav className="space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
              active === item.id
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                : 'hover:bg-neutral-100'
            }`}
            whileHover={{ x: 4 }}
            onClick={() => setActive(item.id)}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  )
}
