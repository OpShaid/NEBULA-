'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'glass' | 'elevated'
  hoverable?: boolean
  className?: string
}

export function Card({
  children,
  variant = 'elevated',
  hoverable = false,
  className = ''
}: CardProps) {
  const variants = {
    glass: "bg-white/5 backdrop-blur-xl border border-white/10",
    elevated: "bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
  }

  const hoverAnimation = hoverable ? {
    whileHover: { y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.12)' },
    transition: { duration: 0.3 }
  } : {}

  return (
    <motion.div
      className={`${variants[variant]} rounded-[--radius-card] p-6 ${className}`}
      {...hoverAnimation}
    >
      {children}
    </motion.div>
  )
}
