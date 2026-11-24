import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Discover', href: '/discover' },
  { label: 'Collections', href: '/collections' },
  { label: 'Cities', href: '/cities' },
  { label: 'About', href: '/about' },
]

// Overlay animation
const overlayVariants = {
  closed: { opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  open: { opacity: 1, transition: { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] } },
}

// Each nav link: slides up from below and fades in
const linkVariants = {
  closed: (i: number) => ({
    opacity: 0,
    y: 32,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
      delay: i * 0.03,
    },
  }),
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1 + i * 0.08,
    },
  }),
}

const footerVariants = {
  closed: { opacity: 0, transition: { duration: 0.2 } },
  open: { opacity: 1, transition: { duration: 0.5, delay: 0.45 } },
}

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Lock body scroll when menu is open, respect safe area
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-smooth ${
          scrolled
            ? 'bg-ink/92 backdrop-blur-md border-b border-graphite/50'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 group"
              aria-label="AFTERHOURS — return to homepage"
            >
              <span className="font-display font-light text-off-white tracking-[-0.04em] text-[21px] md:text-[26px] transition-opacity duration-300 group-hover:opacity-60">
                AFTERHOURS
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative group font-body font-medium text-label uppercase tracking-[0.2em] text-smoke hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-ember transition-all duration-400 ease-reveal ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-5">
              {/* Issue pill — desktop */}
              <div className="hidden md:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" aria-hidden="true" />
                <span className="font-mono text-mono-sm text-smoke tracking-widest">№ 001</span>
              </div>

              {/* Hamburger — mobile */}
              <button
                className="md:hidden relative z-50 flex flex-col justify-center items-end gap-[6px] w-8 h-8 p-1"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <motion.span
                  className="block h-px bg-off-white origin-center"
                  animate={menuOpen
                    ? { width: 24, rotate: 45, y: 9 }
                    : { width: 24, rotate: 0, y: 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.span
                  className="block h-px bg-off-white"
                  animate={menuOpen
                    ? { width: 0, opacity: 0 }
                    : { width: 16, opacity: 1 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                />
                <motion.span
                  className="block h-px bg-off-white origin-center"
                  animate={menuOpen
                    ? { width: 24, rotate: -45, y: -9 }
                    : { width: 24, rotate: 0, y: 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.76, 0, 0.24, 1] }}
                />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-30 bg-ink flex flex-col md:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Safe-area top spacer (matches nav bar height) */}
            <div className="h-16 flex-shrink-0" style={{ paddingTop: 'env(safe-area-inset-top)' }} />

            {/* Nav links — vertically centred */}
            <nav
              className="flex-1 flex flex-col justify-center px-8 md:px-14"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="border-b border-graphite/60"
                >
                  <Link
                    to={link.href}
                    className="group flex items-baseline justify-between py-5 md:py-6"
                    onClick={() => setMenuOpen(false)}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className="font-display font-light text-cream/80 group-hover:text-off-white transition-colors duration-300"
                      style={{ fontSize: 'clamp(36px, 9vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1 }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="font-mono text-[9px] text-smoke/40 tracking-widest uppercase translate-y-1 group-hover:text-ember transition-colors duration-300"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer row */}
            <motion.div
              className="px-8 md:px-14 flex items-center justify-between"
              style={{
                paddingBottom: 'max(2rem, calc(env(safe-area-inset-bottom) + 1.5rem))',
              }}
              variants={footerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" aria-hidden="true" />
                <span className="font-mono text-mono-sm text-smoke/60 tracking-widest">
                  Current Issue № 001
                </span>
              </div>
              <span className="font-mono text-mono-sm text-smoke/30 tracking-widest">
                WINTER 2024–25
              </span>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
