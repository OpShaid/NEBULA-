'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [stage, setStage] = useState<'landing' | 'zoom' | 'video'>('landing')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleClick = () => {
    if (stage === 'landing' && !isTransitioning) {
      setIsTransitioning(true)
      setStage('zoom')

      // Hold zoom for 3-5 seconds, then transition to video
      setTimeout(() => {
        setStage('video')
        setIsTransitioning(false)
      }, 4000) // 4 seconds hold
    }
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

        {/* Zoom Stage */}
        {stage === 'zoom' && (
          <motion.div
            key="zoom"
            initial={{ scale: 1 }}
            animate={{ scale: 1.5 }}
            transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-black z-10"
            />
            <img
              src="/background.webp"
              alt="Background"
              className="w-full h-full object-cover blur-sm"
            />
          </motion.div>
        )}

        {/* Video Stage */}
        {stage === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 1.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96],
              rotateY: { duration: 1.2, ease: "easeInOut" }
            }}
            className="absolute inset-0"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
              <div className="relative w-full max-w-6xl aspect-video">
                <motion.div
                  initial={{ boxShadow: "0 0 0 rgba(139, 92, 246, 0)" }}
                  animate={{
                    boxShadow: [
                      "0 0 60px rgba(139, 92, 246, 0.3)",
                      "0 0 100px rgba(139, 92, 246, 0.5)",
                      "0 0 60px rgba(139, 92, 246, 0.3)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                >
                  {/* Placeholder for video - replace with your actual video */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/video.mp4" type="video/mp4" />
                  </video>

                  {/* Fallback if no video */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
                    <p className="text-white text-3xl font-light">Your Video Here</p>
                  </div>
                </motion.div>

                {/* Back button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={goBack}
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <span className="text-lg font-light tracking-wider">BACK TO START</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient particles effect */}
      {stage === 'landing' && (
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
