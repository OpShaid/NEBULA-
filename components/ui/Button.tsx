'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = "font-semibold transition-all inline-flex items-center justify-center gap-2"

  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]",
    ghost: "border-2 border-neutral-300 bg-transparent hover:bg-neutral-100",
    icon: "bg-neutral-100 hover:bg-neutral-200"
  }

  const sizes = {
    sm: variant === 'icon' ? 'w-8 h-8' : 'px-4 py-2 text-sm',
    md: variant === 'icon' ? 'w-10 h-10' : 'px-6 py-3 text-base',
    lg: variant === 'icon' ? 'w-12 h-12' : 'px-8 py-4 text-lg'
  }

  const radius = variant === 'icon' ? 'rounded-lg' : 'rounded-[--radius-button]'

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${radius} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  )
}
