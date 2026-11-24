import React from 'react'
import { motion } from 'framer-motion'
import { MascotState } from './MascotTypes'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

interface SimpleMascotProps {
  state: MascotState
  facing: 'left' | 'right'
  isMobile: boolean
  onClick?: () => void
}

export const SimpleMascot: React.FC<SimpleMascotProps> = ({
  state,
  facing,
  isMobile,
  onClick,
}) => {
  // Dimensions: Desktop ~65px tall, Mobile ~48px tall
  const mascotHeight = isMobile ? 48 : 65
  const mascotWidth = isMobile ? 38 : 52

  // Squashing and stretching based on state
  const bodyAnim = React.useMemo(() => {
    switch (state) {
      case 'walk':
        return {
          y: [0, -2, 0],
          rotate: facing === 'left' ? -3 : 3,
          transition: { repeat: Infinity, duration: 0.38, ease: 'easeInOut' },
        }
      case 'run':
        return {
          y: [0, -4, 0],
          rotate: facing === 'left' ? -7 : 7,
          scaleX: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 0.22, ease: 'easeInOut' },
        }
      case 'jump':
        return {
          y: [0, -12, 0],
          scaleY: [1, 1.15, 0.9, 1],
          transition: { duration: 0.45, ease: 'easeOut' },
        }
      case 'happy':
        return {
          y: [0, -5, 0],
          rotate: [0, 4, -4, 0],
          transition: { repeat: Infinity, duration: 0.4 },
        }
      case 'sleepy':
        return {
          y: 3,
          scaleY: 0.92,
          scaleX: 1.04,
          transition: { duration: 0.4 },
        }
      case 'confused':
        return {
          rotate: facing === 'left' ? 10 : -10,
          y: 0,
          transition: { duration: 0.3 },
        }
      case 'surprised':
        return {
          y: -4,
          scaleY: 1.1,
          scaleX: 0.95,
          transition: { duration: 0.2 },
        }
      case 'relaxed':
        return {
          y: 2,
          scaleY: 0.95,
          transition: { duration: 0.4 },
        }
      case 'idle':
      default:
        return {
          y: [0, -1.5, 0],
          scaleY: [1, 0.98, 1],
          rotate: 0,
          transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
        }
    }
  }, [state, facing])

  return (
    <div
      onClick={onClick}
      className="relative select-none cursor-pointer flex flex-col items-center pointer-events-auto"
      style={{
        width: `${mascotWidth}px`,
        height: `${mascotHeight}px`,
      }}
      title="Hunger Drama Fries Mascot"
    >
      {/* Subtle Ground Contact Shadow */}
      <motion.div
        animate={{
          scaleX: state === 'jump' ? 0.5 : state === 'sleepy' ? 1.2 : 1,
          opacity: state === 'jump' ? 0.15 : 0.4,
        }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1.5 bg-[#292525]/25 rounded-full blur-[1px] pointer-events-none"
      />

      {/* Main Body with Directional Flip */}
      <motion.div
        animate={bodyAnim}
        className="relative w-full h-full flex flex-col items-center justify-end"
        style={{
          transform: `scaleX(${facing === 'left' ? -1 : 1})`,
          transformOrigin: 'bottom center',
        }}
      >
        {/* Expression Particles (Cute, Small & Understated) */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 whitespace-nowrap"
          style={{ transform: `scaleX(${facing === 'left' ? -1 : 1})` }}
        >
          {state === 'sleepy' && (
            <motion.span
              animate={{ opacity: [0, 1, 0], y: [-2, -10] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-[10px] font-mono font-bold text-[#FF382E]"
            >
              zZz..
            </motion.span>
          )}

          {state === 'confused' && (
            <motion.span
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-[11px] font-bold text-[#FFC342]"
            >
              ❓
            </motion.span>
          )}

          {state === 'surprised' && (
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-bold text-sky-400"
            >
              💦
            </motion.span>
          )}

          {state === 'happy' && (
            <motion.span
              animate={{ scale: [0.9, 1.15, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-[10px] text-[#FF382E]"
            >
              ✨
            </motion.span>
          )}
        </div>

        {/* Tiny Articulated Legs / Sneakers */}
        <div className="absolute -bottom-1 w-7 sm:w-9 flex justify-between px-1 z-0 pointer-events-none">
          {/* Left Leg */}
          <motion.div
            animate={
              state === 'walk'
                ? {
                    rotate: [-20, 20, -20],
                    transition: { repeat: Infinity, duration: 0.38, ease: 'linear' },
                  }
                : state === 'run'
                ? {
                    rotate: [-35, 35, -35],
                    transition: { repeat: Infinity, duration: 0.22, ease: 'linear' },
                  }
                : state === 'jump'
                ? { rotate: 20, y: -2 }
                : state === 'sleepy' || state === 'relaxed'
                ? { rotate: 60, y: -1 }
                : { rotate: 0, y: 0 }
            }
            className="w-2.5 sm:w-3 h-1.5 bg-[#FF382E] rounded-full border border-[#292525] shadow-xs"
          />

          {/* Right Leg */}
          <motion.div
            animate={
              state === 'walk'
                ? {
                    rotate: [20, -20, 20],
                    transition: { repeat: Infinity, duration: 0.38, ease: 'linear' },
                  }
                : state === 'run'
                ? {
                    rotate: [35, -35, 35],
                    transition: { repeat: Infinity, duration: 0.22, ease: 'linear' },
                  }
                : state === 'jump'
                ? { rotate: -20, y: -2 }
                : state === 'sleepy' || state === 'relaxed'
                ? { rotate: -60, y: -1 }
                : { rotate: 0, y: 0 }
            }
            className="w-2.5 sm:w-3 h-1.5 bg-[#FF382E] rounded-full border border-[#292525] shadow-xs"
          />
        </div>

        {/* Left Cartoon Glove */}
        <motion.div
          animate={
            state === 'happy'
              ? {
                  rotate: [-80, -20, -80],
                  y: -4,
                  transition: { repeat: Infinity, duration: 0.35 },
                }
              : state === 'run'
              ? {
                  rotate: [-30, 30, -30],
                  transition: { repeat: Infinity, duration: 0.22 },
                }
              : state === 'confused'
              ? { rotate: -60, y: -3 }
              : { rotate: 0, y: 0 }
          }
          className="absolute left-0 bottom-3 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white border border-[#292525] rounded-full shadow-xs z-20 pointer-events-none"
        />

        {/* Central Mascot Artwork */}
        <div className="relative w-full h-[88%] z-10 flex items-center justify-center filter drop-shadow-sm">
          <img
            src={BRAND_CONFIG.mascotImage}
            alt="Hunger Drama Fries Mascot"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Right Cartoon Glove */}
        <motion.div
          animate={
            state === 'happy'
              ? {
                  rotate: [20, 80, 20],
                  y: -4,
                  transition: { repeat: Infinity, duration: 0.35 },
                }
              : state === 'run'
              ? {
                  rotate: [30, -30, 30],
                  transition: { repeat: Infinity, duration: 0.22 },
                }
              : { rotate: 0, y: 0 }
          }
          className="absolute right-0 bottom-3 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white border border-[#292525] rounded-full shadow-xs z-20 pointer-events-none"
        />
      </motion.div>
    </div>
  )
}

