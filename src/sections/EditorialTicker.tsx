import React, { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { tickerItems } from '@/data/editorial'

const EditorialTicker: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  // Triple-clone the list so the loop is wide enough to never gap
  const items = [...tickerItems, ...tickerItems, ...tickerItems]

  return (
    <div
      className="border-y border-graphite bg-carbon overflow-hidden py-3 select-none"
      aria-label="Destinations ticker"
      aria-live="off"
    >
      <motion.div
        ref={trackRef}
        className="flex items-center whitespace-nowrap"
        style={{ width: 'max-content', willChange: 'transform' }}
        // Animate from 0 to -1/3 of total width (= 1 set), then loop
        animate={shouldReduceMotion ? {} : { x: ['0%', '-33.333%'] }}
        transition={
          shouldReduceMotion
            ? {}
            : {
                duration: 36,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              }
        }
      >
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <span className="font-mono text-mono-sm text-smoke/55 tracking-widest px-5 md:px-7 uppercase">
              {item}
            </span>
            <span className="text-ember/35 text-[8px] leading-none" aria-hidden="true">◆</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export default EditorialTicker
