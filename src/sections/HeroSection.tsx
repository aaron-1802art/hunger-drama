import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import EditorialTag from '@/components/ui/EditorialTag'

// Individual line reveal — clips upward from baseline
const lineReveal = {
  hidden: { y: '105%', opacity: 0 },
  visible: (delay: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: [0.76, 0, 0.24, 1],
      delay,
    },
  }),
}

// Fade in for supporting copy
const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    },
  }),
}

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Disable parallax entirely for reduced-motion users
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '15%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Entrance timing (seconds)
  const T = {
    tag: 0.5,
    line1: 0.65,
    line2: 0.85,
    sub: 1.1,
    cta: 1.3,
    meta: 1.0,
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink"
      aria-label="Hero — The Brutalist Towers of São Paulo"
    >
      {/* ── Background image with parallax ─────────────────────── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=2000&q=90&fit=crop"
          alt="São Paulo concrete skyline at dusk — brutalist architecture"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient stack for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/20 to-transparent" />
        {/* Edge vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(13,12,11,0.7) 100%)',
          }}
        />
      </motion.div>

      {/* ── Top-left: Issue badge ──────────────────────────────── */}
      <motion.div
        className="absolute top-20 md:top-24 left-6 md:left-10 lg:left-16 flex items-center gap-3"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <span className="font-mono text-mono-sm text-smoke/70 tracking-widest">
          № 001 — WINTER 2024–25
        </span>
      </motion.div>

      {/* ── Top-right: Vertical scroll hint ───────────────────── */}
      <motion.div
        className="absolute top-20 md:top-24 right-6 md:right-10 lg:right-16 hidden md:flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        aria-hidden="true"
      >
        <span
          className="font-mono text-[9px] text-smoke/40 tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="w-px h-14 bg-smoke/25" />
      </motion.div>

      {/* ── Decorative ghost word ──────────────────────────────── */}
      <div
        className="absolute left-0 top-0 h-full flex items-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.span
          className="font-display font-light leading-none tracking-[-0.05em]"
          style={{
            fontSize: 'clamp(120px, 18vw, 240px)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: 'rgba(250,248,245,0.03)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          AFTER
        </motion.span>
      </div>

      {/* ── Main content — anchored bottom-left ───────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-20"
          style={{ paddingBottom: 'max(4rem, calc(env(safe-area-inset-bottom) + 3rem))' }}
        >
          <div className="max-w-3xl flex flex-col gap-4 md:gap-5">

            {/* Category tag */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={T.tag}
              variants={fadeIn}
            >
              <EditorialTag label="Architecture · São Paulo" variant="outline" />
            </motion.div>

            {/* Headline — two lines, each clipped independently */}
            <h1
              className="font-display font-light text-off-white leading-none tracking-[-0.04em] flex flex-col gap-0"
              style={{ fontSize: 'clamp(50px, 7.5vw, 108px)' }}
            >
              {/* Line 1 */}
              <span className="overflow-hidden block">
                <motion.span
                  className="block"
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={T.line1}
                >
                  The Brutalist
                </motion.span>
              </span>

              {/* Line 2 */}
              <span className="overflow-hidden block">
                <motion.span
                  className="block"
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={T.line2}
                >
                  <em className="font-light italic">Towers</em>
                </motion.span>
              </span>
            </h1>

            {/* Subdeck */}
            <motion.p
              className="font-body font-light text-mist max-w-sm md:max-w-md"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: '1.7' }}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={T.sub}
            >
              Where raw concrete meets the rhythm of a city that never quiets. A visual survey of São Paulo's most confrontational structures.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex items-center gap-5 pt-1"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={T.cta}
            >
              <button
                className="group flex items-center gap-3 font-body font-medium text-label text-off-white uppercase tracking-[0.2em] transition-colors duration-300 @media(hover:hover):hover:text-ember"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span>Read the story</span>
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                >→</span>
              </button>

              <div className="w-px h-5 bg-smoke/35" aria-hidden="true" />

              <span className="font-mono text-mono-sm text-smoke/55">8 min read</span>
            </motion.div>

          </div>

          {/* Issue line — desktop only */}
          <motion.div
            className="hidden md:flex items-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: T.cta + 0.3, duration: 0.6 }}
          >
            <div className="w-14 h-px bg-smoke/25" />
            <span className="font-mono text-mono-sm text-smoke/35 tracking-widest uppercase">
              Issue № 001
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Ghost counter — bottom right, desktop ──────────────── */}
      <motion.div
        className="absolute bottom-20 right-6 md:right-10 lg:right-16 hidden md:flex flex-col items-end gap-1.5"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-mono font-light leading-none" style={{ fontSize: '40px', color: 'rgba(250,248,245,0.08)' }}>01</span>
        <span className="font-mono text-mono-sm text-smoke/35 tracking-widest">/ 06</span>
      </motion.div>

    </section>
  )
}

export default HeroSection
