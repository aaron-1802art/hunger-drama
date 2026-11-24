import type { Variants } from 'framer-motion'

// Easing curves
export const easings = {
  reveal: [0.76, 0, 0.24, 1],
  enter: [0.0, 0.0, 0.2, 1],
  exit: [0.4, 0.0, 1, 1],
  smooth: [0.25, 0.1, 0.25, 1],
} as const

// Fade up — standard reveal for most elements
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easings.reveal },
  },
}

// Fade in — no movement
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easings.smooth },
  },
}

// Clip reveal — text wipe from bottom
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.9, ease: easings.reveal },
  },
}

// Scale in — subtle zoom for images
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: easings.reveal },
  },
}

// Slide in from left
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easings.reveal },
  },
}

// Stagger container — applies stagger to children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Stagger container (slow) — for hero sections
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.3,
    },
  },
}

// Nav item reveal
export const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.smooth },
  },
}

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: easings.enter },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: easings.exit },
  },
}

// Image parallax config (use with useScroll / useTransform)
export const parallaxConfig = {
  imageScale: [1, 1.12],
  imageY: ['0%', '10%'],
}

