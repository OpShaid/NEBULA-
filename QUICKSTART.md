# NEBULA - Quick Start Guide

Get your flagship portfolio project running in 30 minutes.

---

## Step 1: Initialize Project (5 minutes)

```bash
# Create Next.js project
npx create-next-app@latest nebula --typescript --tailwind --app --no-src-dir
cd nebula

# Install all dependencies at once
npm install framer-motion three @react-three/fiber @react-three/drei zustand @tanstack/react-query cmdk @dnd-kit/core @dnd-kit/sortable d3 recharts clsx tailwind-merge date-fns zod lucide-react react-hot-toast
```

---

## Step 2: Setup Design System (5 minutes)

### Create `lib/constants/design-tokens.ts`:

```typescript
export const colors = {
  primary: {
    50: '#E6F0FF',
    500: '#0066FF',
    600: '#0052CC',
  },
  accent: {
    50: '#F3E5FF',
    500: '#8000FF',
    600: '#6600CC',
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    500: '#6B7280',
    900: '#111827',
  }
}

export const animations = {
  spring: [0.22, 1, 0.36, 1],
  timings: { fast: 200, normal: 300, slow: 500 }
}
```

### Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          500: '#0066FF',
          600: '#0052CC',
        },
        accent: {
          50: '#F3E5FF',
          500: '#8000FF',
          600: '#6600CC',
        }
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'button': '12px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 102, 255, 0.3)',
        'elevated': '0 8px 32px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
export default config
```

### Update `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Nebula - AI Creative Command Center',
  description: 'Next-generation project management for creatives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
```

### Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-neutral-200;
  }
  body {
    @apply bg-neutral-50 text-neutral-900;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }

  .glow-primary {
    box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
  }
}
```

---

## Step 3: Create Core Components (10 minutes)

### `components/ui/Button.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  variant?: 'primary' | 'ghost'
  children: React.ReactNode
  icon?: LucideIcon
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  children,
  icon: Icon,
  onClick
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow',
    ghost: 'border-2 border-neutral-300 bg-transparent hover:bg-neutral-100'
  }

  return (
    <motion.button
      className={`${variants[variant]} px-6 py-3 rounded-button font-semibold flex items-center gap-2`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  )
}
```

### `components/ui/Card.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  hoverable?: boolean
  className?: string
}

export function Card({ children, hoverable = false, className = '' }: CardProps) {
  return (
    <motion.div
      className={`bg-white rounded-card p-6 shadow-elevated ${className}`}
      whileHover={hoverable ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Step 4: Build Main Layout (5 minutes)

### `components/layout/Header.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { Sparkles, User, Settings } from 'lucide-react'

export function Header() {
  return (
    <motion.header
      className="h-16 border-b flex items-center justify-between px-6 bg-white"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="text-primary-500" size={28} />
        <h1 className="text-xl font-display font-bold">NEBULA</h1>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center shadow-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
        <button className="p-2 rounded-lg hover:bg-neutral-100">
          <User size={20} />
        </button>
        <button className="p-2 rounded-lg hover:bg-neutral-100">
          <Settings size={20} />
        </button>
      </div>
    </motion.header>
  )
}
```

### `components/layout/Sidebar.tsx`:

```typescript
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
```

---

## Step 5: Create Hero Project Card (5 minutes)

### `components/features/ProjectCard.tsx`:

```typescript
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
    <Card hoverable className="relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: `linear-gradient(135deg, ${color}00 0%, ${color} 100%)` }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-display font-bold mb-1">{title}</h3>
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
```

---

## Step 6: Build Main Page (5 minutes)

### `app/page.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ProjectCard } from '@/components/features/ProjectCard'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'

const mockProjects = [
  {
    id: '1',
    title: 'Stellar Vision',
    description: 'Next-gen design system',
    progress: 67,
    color: '#0066FF'
  },
  {
    id: '2',
    title: 'Quantum Pulse',
    description: 'AI-powered analytics dashboard',
    progress: 42,
    color: '#8000FF'
  },
  {
    id: '3',
    title: 'Cosmic Flow',
    description: 'Creative workflow automation',
    progress: 89,
    color: '#10B981'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          {/* Hero section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-display font-bold mb-2">
              Your Creative Universe
            </h2>
            <p className="text-neutral-500 text-lg">
              Manage projects with intelligence and style
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-card p-6 shadow-elevated">
              <div className="text-3xl font-display font-bold text-primary-500">
                {mockProjects.length}
              </div>
              <div className="text-neutral-500 text-sm">Active Projects</div>
            </div>
            <div className="bg-white rounded-card p-6 shadow-elevated">
              <div className="text-3xl font-display font-bold text-accent-500">
                {Math.round(mockProjects.reduce((acc, p) => acc + p.progress, 0) / mockProjects.length)}%
              </div>
              <div className="text-neutral-500 text-sm">Avg. Progress</div>
            </div>
            <div className="bg-white rounded-card p-6 shadow-elevated">
              <div className="text-3xl font-display font-bold text-green-500">
                12h
              </div>
              <div className="text-neutral-500 text-sm">This Week</div>
            </div>
          </motion.div>

          {/* Projects grid */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-display font-bold">Projects</h3>
            <Button icon={Plus}>New Project</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
```

---

## Step 7: Run Your Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and see your flagship project come to life!

---

## What You've Built (in 30 minutes):

✅ Modern Next.js 14 app with TypeScript
✅ Beautiful design system with Tailwind
✅ Framer Motion animations throughout
✅ Responsive layout with sidebar navigation
✅ Animated project cards with progress tracking
✅ Pulsing AI orb in header
✅ Quick stats dashboard
✅ Gradient effects and glassmorphism

---

## Next Steps to Take It to 10/10:

1. **Add 3D Elements**: Integrate Three.js project cards (see full plan Phase 4)
2. **Build Data Viz**: Add activity heatmap and progress orbits (Phase 6)
3. **AI Integration**: Connect OpenAI for smart suggestions (Phase 5)
4. **Command Palette**: Add Cmd+K quick actions (Phase 7)
5. **Advanced Animations**: Implement particle effects and hover states
6. **Drag & Drop**: Make projects reorderable (Phase 7)
7. **Dark Mode**: Add theme toggle with smooth transitions
8. **Mobile Polish**: Optimize for all screen sizes (Phase 9)

---

## Pro Tips:

🎨 **Design First**: Spend time perfecting one component before moving to the next
⚡ **Performance**: Use `useCallback`, `useMemo`, and React.lazy for optimization
📱 **Mobile**: Test on real devices, not just browser DevTools
🎭 **Animations**: Less is more - make every animation purposeful
♿ **Accessibility**: Add keyboard navigation and ARIA labels
📸 **Screenshots**: Capture the best angles for your portfolio

---

**You now have a working foundation. Follow the complete NEBULA_PROJECT_PLAN.md to build it into a portfolio showstopper!**
