'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [stage, setStage] = useState<'landing' | 'zoom' | 'video' | 'credits'>('landing')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    if (stage === 'landing' && !isTransitioning) {
      setIsTransitioning(true)
      setStage('zoom')

      // Smooth zoom transition - hold for 3 seconds
      setTimeout(() => {
        setStage('video')
        setIsTransitioning(false)
      }, 3000)
    }
  }

  const handleVideoEnd = () => {
    setStage('credits')
    // After showing credits for 3 seconds, go back to landing
    setTimeout(() => {
      setStage('landing')
      setIsTransitioning(false)
    }, 3000)
  }

  const goBack = () => {
    setStage('landing')
    setIsTransitioning(false)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {/* Landing Page */}
        {stage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0 cursor-pointer"
            onClick={handleClick}
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 z-10" />
              <img
                src="/background.webp"
                alt="Background"
                className="w-full h-full object-cover"
              />

              {/* Center text overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="text-center"
                >
                  <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
                    NEBULA
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-xl md:text-2xl text-white/80 font-light tracking-wider"
                  >
                    CLICK TO EXPERIENCE
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Zoom Stage - Smoother Animation */}
        {stage === 'zoom' && (
          <motion.div
            key="zoom"
            initial={{ scale: 1 }}
            animate={{ scale: 2.5 }}
            transition={{
              duration: 3,
              ease: [0.25, 0.46, 0.45, 0.94] // Smoother easing curve
            }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-black z-10"
            />
            <img
              src="/background.webp"
              alt="Background"
              className="w-full h-full object-cover blur-md"
            />
          </motion.div>
        )}

        {/* Video Stage - Fullscreen */}
        {stage === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-black"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            >
              <source src="/nebula-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}

        {/* Credits Stage */}
        {stage === 'credits' && (
          <motion.div
            key="credits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-center"
            >
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
                NEBULA
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl md:text-3xl text-white/70 font-light tracking-wider"
              >
                Made by Shaid
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient particles effect */}
      {stage === 'landing' && mounted && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
