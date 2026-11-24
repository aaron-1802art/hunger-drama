/**
 * ScrollStoryIndicator
 * Shows a small time label + colored strip in the nav that shifts
 * from afternoon → dusk → night → midnight as the user scrolls.
 * Uses IntersectionObserver (no scroll listeners).
 */
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollStory } from '@/hooks/useScrollStory'

const SECTION_IDS = ['hero', 'featured', 'menu', 'story', 'instagram', 'footer-section']

export const ScrollStoryIndicator: React.FC = () => {
  const story = useScrollStory(SECTION_IDS)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={story.timeLabel}
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: 6 }}
        transition={{ duration: 0.4 }}
        className="
          hidden md:flex
          fixed top-[52px] right-4 z-40
          items-center gap-1.5
          px-2.5 py-1 rounded-full
          border border-[#292525]/20
          bg-white/80 backdrop-blur
          shadow-sm
          font-mono text-[10px] font-bold uppercase tracking-widest
          text-[#292525]
          pointer-events-none
          select-none
        "
        aria-label={`Story time: ${story.timeLabel}`}
        aria-live="polite"
      >
        <span
          className="w-2 h-2 rounded-full border border-[#292525]/20 flex-shrink-0"
          style={{ background: story.accentColor }}
          aria-hidden="true"
        />
        {story.timeLabel}
      </motion.div>
    </AnimatePresence>
  )
}

