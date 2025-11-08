'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ProjectCard } from '@/components/features/ProjectCard'
import { ActivityHeatmap } from '@/components/visualizations/ActivityHeatmap'
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
  },
  {
    id: '4',
    title: 'Aurora Wave',
    description: 'Real-time collaboration platform',
    progress: 55,
    color: '#F59E0B'
  },
  {
    id: '5',
    title: 'Nebula Spark',
    description: 'Motion design toolkit',
    progress: 78,
    color: '#EF4444'
  },
  {
    id: '6',
    title: 'Lunar Tide',
    description: 'Data visualization library',
    progress: 34,
    color: '#3B82F6'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 overflow-auto">
          {/* Hero section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-[family-name:var(--font-display)] font-bold mb-2">
              Your Creative Universe
            </h2>
            <p className="text-neutral-500 text-lg">
              Manage projects with intelligence and style
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-[--radius-card] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <div className="text-3xl font-[family-name:var(--font-display)] font-bold text-primary-500">
                {mockProjects.length}
              </div>
              <div className="text-neutral-500 text-sm">Active Projects</div>
            </div>
            <div className="bg-white rounded-[--radius-card] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <div className="text-3xl font-[family-name:var(--font-display)] font-bold text-accent-500">
                {Math.round(mockProjects.reduce((acc, p) => acc + p.progress, 0) / mockProjects.length)}%
              </div>
              <div className="text-neutral-500 text-sm">Avg. Progress</div>
            </div>
            <div className="bg-white rounded-[--radius-card] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
              <div className="text-3xl font-[family-name:var(--font-display)] font-bold text-[#10B981]">
                12h
              </div>
              <div className="text-neutral-500 text-sm">This Week</div>
            </div>
          </motion.div>

          {/* Projects header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-[family-name:var(--font-display)] font-bold">Projects</h3>
            <Button icon={Plus}>New Project</Button>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

          {/* Activity Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <ActivityHeatmap />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
