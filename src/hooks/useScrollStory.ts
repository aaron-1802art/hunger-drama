/**
 * useScrollStory — maps scroll progress to a time-of-day story phase.
 * Uses IntersectionObserver, no scroll event listeners.
 */
import { useState, useEffect, useRef } from 'react'

export type StoryPhase = 'afternoon' | 'dusk' | 'night' | 'midnight'

export interface StoryConfig {
  phase: StoryPhase
  timeLabel: string
  /** CSS color for the nav accent strip (always keeps contrast with text) */
  accentColor: string
  /** Used as a subtle tint on the scroll progress bar / nav strip */
  bgTint: string
}

const PHASES: Record<StoryPhase, StoryConfig> = {
  afternoon: { phase: 'afternoon', timeLabel: '12:30 PM', accentColor: '#FF382E', bgTint: '#FFC342' },
  dusk:      { phase: 'dusk',      timeLabel: '3:30 PM',  accentColor: '#FF6B2E', bgTint: '#FF8C42' },
  night:     { phase: 'night',     timeLabel: '6:00 PM',  accentColor: '#CC2820', bgTint: '#CC6020' },
  midnight:  { phase: 'midnight',  timeLabel: '8:00 PM',  accentColor: '#292525', bgTint: '#3D3030' },
}

/**
 * Pass the IDs of the section landmarks in page order.
 * Returns the current phase and config.
 */
export function useScrollStory(sectionIds: string[]): StoryConfig {
  const [phase, setPhase] = useState<StoryPhase>('afternoon')
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    const phaseMap: Record<string, StoryPhase> = {
      hero:      'afternoon',
      scene:     'afternoon',
      featured:  'afternoon',
      menu:      'dusk',
      story:     'night',
      instagram: 'midnight',
      footer:    'midnight',
    }

    observersRef.current.forEach(o => o.disconnect())
    observersRef.current = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const p = phaseMap[id] ?? 'afternoon'
            setPhase(p)
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      observersRef.current.push(obs)
    })

    return () => observersRef.current.forEach(o => o.disconnect())
  }, [sectionIds])

  return PHASES[phase]
}

