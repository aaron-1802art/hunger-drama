import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useHungerDrama()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'The Scene', href: '#scene' },
    { label: 'Featured', href: '#featured' },
    { label: 'Menu', href: '#menu' },
    { label: 'Location', href: '#location' },
    { label: 'Our Story', href: '#story' },
    { label: 'Instagram', href: '#instagram' },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-hd-cream/90 backdrop-blur-md py-3 border-b-2 border-hd-charcoal shadow-sm'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">

          {/* Left: Brand Identity & Small Mascot */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group tap-transparent"
            aria-label="Hunger Drama Home"
          >
            {/* Small tasteful French-fry mascot with sunglasses */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <img
                src={BRAND_CONFIG.mascotImage}
                alt="Hunger Drama Mascot"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl text-hd-charcoal tracking-wide leading-none group-hover:text-hd-red transition-colors">
                HUNGER DRAMA
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-hd-charcoal/70 leading-tight">
                Lights · Bites · Action
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative font-body text-[11px] font-semibold text-hd-charcoal hover:text-hd-red uppercase tracking-[0.2em] transition-colors py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hd-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Actions (Cart Button + Order CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-hd-white border-2 border-hd-charcoal hover:border-hd-red text-hd-charcoal hover:text-hd-red shadow-drama-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 tap-transparent"
              aria-label={`Open Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-hd-red text-hd-cream font-mono text-[10px] font-bold flex items-center justify-center border border-hd-charcoal animate-badge-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA (Red button on cream canvas) */}
            <a
              href="#menu"
              onClick={(e) => scrollToSection(e, '#menu')}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-hd-red hover:bg-hd-charcoal text-hd-cream text-xs font-heading uppercase tracking-wider border-2 border-hd-charcoal shadow-drama-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 tap-transparent"
            >
              <span>Order Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-hd-white border-2 border-hd-charcoal text-hd-charcoal shadow-drama-pop tap-transparent"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  )
}

