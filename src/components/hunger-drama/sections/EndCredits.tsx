/**
 * EndCredits — footer "cast roll" of real menu items.
 * Slow upward marquee, triggered when in view.
 */
import React, { useEffect, useRef, useState } from 'react'
import { MENU_ITEMS } from '@/data/hungerDramaData'

export const EndCredits: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Pick a subset of real dish names for the cast list
  const castNames = MENU_ITEMS
    .filter(i => i.featured)
    .map(i => i.name)
    .slice(0, 18)

  return (
    <div
      ref={ref}
      className="border-t-2 border-white/10 mt-8 pt-8 overflow-hidden"
      aria-label="End credits"
    >
      <div className="text-center font-mono text-[10px] text-[#FFF1E1]/50 uppercase tracking-widest mb-4">
        — Cast of Flavours —
      </div>

      <div
        className="relative h-28 overflow-hidden"
        aria-hidden="true"
      >
        <div
          style={
            inView && !reduced
              ? { animation: 'creditsRoll 14s linear forwards' }
              : { transform: 'translateY(0)' }
          }
          className="text-center space-y-1"
        >
          {castNames.map((name, i) => (
            <div
              key={i}
              className="font-body text-xs text-[#FFF1E1]/60"
            >
              {name}
            </div>
          ))}
          <div className="font-body text-xs text-[#FFC342] pt-3 pb-1">
            Thank you for making us a part of your cravings ♥
          </div>
        </div>
      </div>

      <style>{`
        @keyframes creditsRoll {
          from { transform: translateY(100%) }
          to   { transform: translateY(-100%) }
        }
      `}</style>
    </div>
  )
}

