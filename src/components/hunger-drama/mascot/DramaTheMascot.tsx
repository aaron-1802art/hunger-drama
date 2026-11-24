/**
 * Drama the Fries — Living mascot overlay layer.
 *
 * Responsibilities:
 *  - Hero: cheese-drip chase + speech bubbles ("extra cheese pls", "too spicy??", "I'm hot!")
 *  - Menu card hover reactions (drools on Desserts & Pancakes, sweats on Chinese/spicy, thumbs-up on Fries)
 *  - Scroll story: walks along bottom edge from section to section (desktop only), pausing at each act
 *  - Idle sleep after 8s inactivity ("midnight cravings... zzz"), wakes on any input
 *  - Click: jump + quip
 *  - Mobile: stays in a fixed corner, no walking, never covers text, buttons, cart or Order Now
 *  - Reduced motion: static version, zero walking/animations
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAND_CONFIG } from '@/data/hungerDramaData'
import { useSound } from '@/context/SoundContext'
import { playPop } from '@/hooks/useSoundEngine'

// ─── Mascot lines ──────────────────────────────────────────────────────────
// Edit these strings to tweak what Drama says!
export const IDLE_LINES = [
  'extra cheese pls 🧀',
  'too spicy?? 🌶️',
  "I'm hot! 🔥",
  'crispy gang 🍟',
  'order something!!',
  'wanna try fries?',
  'midnight cravings... 🌙',
  'lights, bites, action! 🎬',
]

export const CLICK_LINES = [
  'you clicked me! 👀',
  'ouch! but make it crispy',
  'woof! — wait wrong mascot',
  'yoo! ready to eat? 👋',
  '10/10 crunch guaranteed!',
]

export const CATEGORY_LINES: Record<string, string> = {
  desserts: 'drool... pancakes 🥞',
  chinese: 'sweating... so spicy 💦',
  fries: '👍 thumbs up on fries!',
  beverages: 'shake shake shake 🥤',
  sandwiches: 'lemme bite that 😮',
  maggi: 'midnight maggi!! 🍜',
  nachos: 'crunchhhh 🌽',
  pasta: 'saucery supreme 🍝',
  dips: 'dip it! dip it!',
}

const DRIP_COLORS = ['#FFC342', '#FF382E', '#FF8C42', '#FFD700']

type SpeechState = { text: string; visible: boolean }

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const DramaTheMascot: React.FC = () => {
  const reduced = usePrefersReducedMotion()
  const { soundEnabled } = useSound()

  const [isMobile, setIsMobile] = useState(false)
  const [inHero, setInHero] = useState(true)
  const [activeSection, setActiveSection] = useState<'hero' | 'act1' | 'featured' | 'menu' | 'story' | 'footer'>('hero')

  // Hero drip-chase positions
  const [dripPos, setDripPos] = useState({ x: 120, y: 160 })
  const [dripColor, setDripColor] = useState(DRIP_COLORS[0])
  const [dripVisible, setDripVisible] = useState(true)
  const [pop, setPop] = useState(false)

  // Mascot coords & state
  const [mascotPos, setMascotPos] = useState({ x: 100, y: 160 })
  const [bottomEdgeX, setBottomEdgeX] = useState<number>(80)
  const [facing, setFacing] = useState<'left' | 'right'>('right')
  const [asleep, setAsleep] = useState(false)
  const [mascotState, setMascotState] = useState<'idle' | 'chase' | 'walk' | 'jump' | 'sleep'>('idle')
  const [speech, setSpeech] = useState<SpeechState>({ text: '', visible: false })

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dripTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMountedRef = useRef(true)

  // ── Responsive ────────────────────────────────────────────────────────
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // ── Speech bubble helper ──────────────────────────────────────────────
  const showSpeech = useCallback((text: string, duration = 2500) => {
    if (!isMountedRef.current) return
    setSpeech({ text, visible: true })
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    bubbleTimerRef.current = setTimeout(() => {
      setSpeech((s) => ({ ...s, visible: false }))
    }, duration)
  }, [])

  // ── Idle line rotation ────────────────────────────────────────────────
  useEffect(() => {
    if (reduced || asleep) return
    const timer = setInterval(() => {
      if (Math.random() < 0.35 && inHero) {
        showSpeech(pickRandom(IDLE_LINES))
      }
    }, 7000)
    return () => clearInterval(timer)
  }, [asleep, reduced, inHero, showSpeech])

  // ── Inactivity sleep (after ~8s) ──────────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    if (asleep) {
      setAsleep(false)
      setMascotState('idle')
    }
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      setAsleep(true)
      setMascotState('sleep')
      showSpeech('midnight cravings... zzz', 6000)
    }, 8000)
  }, [asleep, showSpeech])

  useEffect(() => {
    if (reduced) return
    const events = ['mousemove', 'scroll', 'touchstart', 'keydown']
    events.forEach((e) => window.addEventListener(e, resetIdleTimer, { passive: true }))
    resetIdleTimer()
    return () => events.forEach((e) => window.removeEventListener(e, resetIdleTimer))
  }, [reduced, resetIdleTimer])

  // ── Hero Drip Chase Loop (Desktop only) ────────────────────────────────
  const spawnDrip = useCallback(() => {
    if (reduced || isMobile || !inHero) return
    const maxX = Math.min(window.innerWidth - 120, 480)
    const maxY = Math.min(window.innerHeight * 0.65, 420)
    const nx = 40 + Math.random() * (maxX - 40)
    const ny = 120 + Math.random() * (maxY - 120)

    setDripVisible(true)
    setPop(false)
    setDripColor(pickRandom(DRIP_COLORS))
    setDripPos({ x: nx, y: ny })

    // Mascot notices drip and chases
    setTimeout(() => {
      if (!isMountedRef.current) return
      setMascotState('chase')
      setFacing(nx >= mascotPos.x ? 'right' : 'left')
      setMascotPos({ x: nx, y: ny })
    }, 350)

    // Catches drip with a pop
    dripTimerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return
      setDripVisible(false)
      setPop(true)
      setMascotState('jump')
      if (soundEnabled) playPop()
      showSpeech(pickRandom(['got it! 🧀', 'crispy catch! ✨', 'nom nom 🍟', 'extra drip! 🔥']))

      setTimeout(() => {
        if (!isMountedRef.current) return
        setPop(false)
        setMascotState('idle')
        dripTimerRef.current = setTimeout(spawnDrip, 2500 + Math.random() * 2500)
      }, 700)
    }, 1600)
  }, [reduced, isMobile, inHero, mascotPos.x, soundEnabled, showSpeech])

  useEffect(() => {
    if (reduced || isMobile || !inHero) return
    const timer = setTimeout(spawnDrip, 1500)
    return () => {
      clearTimeout(timer)
      if (dripTimerRef.current) clearTimeout(dripTimerRef.current)
    }
  }, [reduced, isMobile, inHero, spawnDrip])

  // ── Section Intersection Observer for Scroll Story Walk ──────────────
  useEffect(() => {
    if (reduced || isMobile) return

    const sectionPositions: Record<string, { x: number; section: typeof activeSection; speech?: string }> = {
      hero: { x: 80, section: 'hero' },
      scene: { x: 220, section: 'act1', speech: 'ACT I: The Craving 🧀' },
      featured: { x: 420, section: 'featured', speech: 'The Main Characters! 🎬' },
      'build-your-drama': { x: 580, section: 'featured', speech: 'Custom spice level! 🌶️' },
      menu: { x: 740, section: 'menu', speech: '63 bold dishes! 🍟' },
      story: { x: 880, section: 'story', speech: 'Our Origin Story ✨' },
      instagram: { x: 980, section: 'footer', speech: 'Cravings satisfied ♥' },
    }

    const observers: IntersectionObserver[] = []

    Object.keys(sectionPositions).forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const cfg = sectionPositions[id]
            if (id === 'hero') {
              setInHero(true)
              setActiveSection('hero')
            } else {
              setInHero(false)
              setActiveSection(cfg.section)
              const maxX = window.innerWidth - 100
              const targetX = Math.min(cfg.x, maxX)
              setFacing(targetX >= bottomEdgeX ? 'right' : 'left')
              setMascotState('walk')
              setBottomEdgeX(targetX)
              if (cfg.speech) showSpeech(cfg.speech, 2000)

              setTimeout(() => {
                if (isMountedRef.current) setMascotState('idle')
              }, 900)
            }
          }
        },
        { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [reduced, isMobile, bottomEdgeX, showSpeech])

  // ── Menu card hover reactions ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e: CustomEvent<{ category: string }>) => {
      const line = CATEGORY_LINES[e.detail.category] || 'ooh looks good 👀'
      setMascotState('idle')
      showSpeech(line, 2000)
    }
    window.addEventListener('hd:card-hover' as any, handler)
    return () => window.removeEventListener('hd:card-hover' as any, handler)
  }, [showSpeech])

  // ── Click handler ─────────────────────────────────────────────────────
  const handleClick = useCallback(() => {
    setMascotState('jump')
    setAsleep(false)
    showSpeech(pickRandom(CLICK_LINES))
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    setTimeout(() => {
      setMascotState('idle')
      resetIdleTimer()
    }, 550)
  }, [showSpeech, resetIdleTimer])

  // ── Cleanup ───────────────────────────────────────────────────────────
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
      if (dripTimerRef.current) clearTimeout(dripTimerRef.current)
    }
  }, [])

  // ── Animations ────────────────────────────────────────────────────────
  const bodyVariants = {
    idle: { y: [0, -2.5, 0], transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' } },
    chase: { y: [0, -5, 0], rotate: facing === 'right' ? [0, 4, 0] : [0, -4, 0], transition: { repeat: Infinity, duration: 0.28, ease: 'easeInOut' } },
    walk: { y: [0, -4, 0], rotate: facing === 'right' ? 3 : -3, transition: { repeat: Infinity, duration: 0.32, ease: 'easeInOut' } },
    jump: { y: -16, scaleY: [1, 1.15, 0.95, 1], transition: { duration: 0.35 } },
    sleep: { y: 2, scaleY: 0.92, scaleX: 1.05, transition: { duration: 0.4 } },
  }

  const size = isMobile ? 48 : 64

  // Reduced motion: static subtle corner badge
  if (reduced) {
    return (
      <div
        className="fixed bottom-20 right-5 z-[15] pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={BRAND_CONFIG.mascotImage}
          alt=""
          width={48}
          height={48}
          className="object-contain select-none"
          draggable={false}
        />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[15] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* ── Hero Drip Item (Cheese / Ketchup) ────────────────────────── */}
      <AnimatePresence>
        {inHero && dripVisible && !isMobile && (
          <motion.div
            key="drip"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: [1, 1.18, 1],
              y: [0, 4, 0],
              transition: { y: { repeat: Infinity, duration: 0.9 } },
            }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ position: 'absolute', left: dripPos.x, top: dripPos.y }}
            className="pointer-events-none drop-shadow-sm"
          >
            <svg width="22" height="28" viewBox="0 0 20 26" aria-hidden="true">
              <ellipse cx="10" cy="8" rx="7" ry="7" fill={dripColor} />
              <path d="M10 14 Q10 24 10 24" stroke={dripColor} strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pop Starburst on Catch ───────────────────────────────────── */}
      <AnimatePresence>
        {inHero && pop && !isMobile && (
          <motion.div
            key="pop"
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'absolute', left: dripPos.x - 8, top: dripPos.y - 8 }}
            className="pointer-events-none font-display text-2xl text-[#FFC342]"
          >
            ✦
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Drama the Mascot Character ───────────────────────────────── */}
      <motion.div
        animate={
          isMobile
            ? { x: 0, y: 0 }
            : inHero
            ? { x: mascotPos.x, y: mascotPos.y, transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] } }
            : { x: bottomEdgeX, y: window.innerHeight - 80, transition: { duration: 0.8, ease: 'easeOut' } }
        }
        style={
          isMobile
            ? { position: 'fixed', bottom: 80, right: 14, zIndex: 35 }
            : { position: 'fixed', left: 0, top: 0, zIndex: 35 }
        }
        className="pointer-events-auto cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Drama the Fries mascot — click to interact"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick()
        }}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {speech.visible && (
            <motion.div
              key={speech.text}
              initial={{ opacity: 0, y: 4, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.88 }}
              transition={{ duration: 0.18 }}
              className={`
                absolute -top-11
                ${isMobile ? 'right-0 left-auto translate-x-0 after:right-4 after:left-auto after:translate-x-0' : 'left-1/2 -translate-x-1/2 after:left-1/2 after:-translate-x-1/2'}
                bg-white border-2 border-[#292525]
                px-2.5 py-1 rounded-xl
                shadow-[2px_2px_0px_#292525]
                font-mono text-[10px] font-bold text-[#292525]
                whitespace-nowrap pointer-events-none z-30
                after:content-[''] after:absolute after:bottom-[-7px]
                after:border-4 after:border-transparent after:border-t-[#292525]
              `}
            >
              {speech.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Artwork with Transforms */}
        <motion.div
          animate={bodyVariants[mascotState] ?? bodyVariants.idle}
          style={{
            scaleX: facing === 'left' ? -1 : 1,
            transformOrigin: 'bottom center',
          }}
          className="relative"
        >
          {/* Sleep indicator */}
          {asleep && (
            <motion.div
              animate={{ opacity: [0, 1, 0], y: [-2, -12] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 right-0 font-mono text-[11px] font-bold text-[#FF382E] pointer-events-none"
            >
              zZz..
            </motion.div>
          )}

          <img
            src={BRAND_CONFIG.mascotImage}
            alt="Drama the Fries"
            width={size}
            height={size}
            className="object-contain select-none filter drop-shadow-md"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
