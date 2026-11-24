import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, PhoneCall } from 'lucide-react'
import { InstagramIcon } from './Icons'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useHungerDrama()

  const links = [
    { label: 'The Scene', href: '#scene' },
    { label: 'Featured Dishes', href: '#featured' },
    { label: 'The Full Menu', href: '#menu' },
    { label: 'Find Us & Delivery', href: '#location' },
    { label: 'Our Story', href: '#story' },
    { label: 'Instagram', href: '#instagram' },
  ]

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    }
  }

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 bg-hd-cream flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-hd-charcoal">
            <div className="flex items-center gap-2.5">
              <img
                src={BRAND_CONFIG.mascotImage}
                alt="Mascot"
                className="w-9 h-9 object-contain"
              />
              <span className="font-display text-2xl text-hd-charcoal">
                HUNGER DRAMA
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-hd-white border-2 border-hd-charcoal shadow-drama-pop tap-transparent"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-hd-charcoal" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="py-8 flex flex-col gap-3">
            {links.map((link, idx) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between text-left py-2 group border-b border-hd-charcoal/20"
              >
                <span className="font-display text-3xl sm:text-4xl text-hd-charcoal group-hover:text-hd-red transition-colors">
                  {link.label}
                </span>
                <span className="w-8 h-8 rounded-full bg-hd-white border-2 border-hd-charcoal flex items-center justify-center group-hover:bg-hd-red group-hover:text-hd-cream transition-colors shadow-drama-pop">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-4 pt-6 border-t-2 border-hd-charcoal">
            <button
              onClick={() => handleNavClick('#menu')}
              className="w-full py-3.5 rounded-full bg-hd-red text-hd-cream font-heading text-sm uppercase tracking-wider border-2 border-hd-charcoal shadow-drama-pop"
            >
              Explore Menu & Order
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-hd-charcoal/70">
              <span>{BRAND_CONFIG.tagline}</span>
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-hd-red underline"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>{BRAND_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
