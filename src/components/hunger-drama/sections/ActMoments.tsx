/**
 * ActMoments — scroll-triggered micro-animations for Act I, II, III.
 * Each runs once when the act section scrolls into view.
 * No scroll event listeners — uses IntersectionObserver via Framer Motion viewport.
 * Respects prefers-reduced-motion (renders static on reduced).
 */
import React from 'react'
import { motion } from 'framer-motion'

interface ActMomentProps {
  act: 'fries' | 'shake' | 'pancake'
}

const inView = { opacity: 1, pathLength: 1, y: 0, scaleY: 1 }
const outView = { opacity: 0 }

/** Act I: Cheese pour over fries */
function FriesMoment() {
  return (
    <div className="relative h-20 w-16 mx-auto" aria-hidden="true">
      {/* Fries box */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#FF382E] border-2 border-[#292525] rounded-sm flex items-end justify-center overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 mx-px rounded-t-sm"
            style={{ height: `${60 + Math.random() * 20}%`, background: '#FFC342', border: '1px solid #292525' }}
          />
        ))}
      </div>
      {/* Cheese drip */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3 rounded-b-full bg-[#FFC342] border border-[#292525]"
        aria-hidden="true"
      >
        <div className="h-10 w-full" />
      </motion.div>
    </div>
  )
}

/** Act II: Shake filling up */
function ShakeMoment() {
  return (
    <div className="relative h-20 w-14 mx-auto" aria-hidden="true">
      {/* Cup outline */}
      <div className="absolute inset-0 border-2 border-[#292525] rounded-b-2xl bg-white overflow-hidden">
        {/* Fill */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          style={{ transformOrigin: 'bottom center' }}
          className="absolute inset-x-0 bottom-0 bg-[#FF382E]/80 rounded-b-2xl"
        >
          <div className="h-12 w-full" />
        </motion.div>
      </div>
      {/* Straw */}
      <div className="absolute -top-4 right-3 w-1.5 h-8 bg-[#FFC342] border border-[#292525] rounded-t-sm" />
    </div>
  )
}

/** Act III: Chocolate drizzle over pancakes */
function PancakeMoment() {
  return (
    <div className="relative h-20 w-20 mx-auto" aria-hidden="true">
      {/* Pancake stack */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col-reverse gap-0.5 items-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-full border border-[#292525] bg-[#FFC342]"
            style={{ width: `${44 - i * 6}px`, height: 8 }}
          />
        ))}
      </div>
      {/* Drizzle SVG path */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2"
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <motion.path
          d="M20 0 C20 0 10 10 20 20 C30 30 20 40 20 40"
          stroke="#292525"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 } as any}
          whileInView={{ opacity: 1, scaleY: 1 } as any}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}

export const ActMoment: React.FC<ActMomentProps> = ({ act }) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced) return null

  return (
    <div className="flex justify-center py-4" aria-hidden="true">
      {act === 'fries' && <FriesMoment />}
      {act === 'shake' && <ShakeMoment />}
      {act === 'pancake' && <PancakeMoment />}
    </div>
  )
}

