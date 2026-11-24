import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, MessageCircle } from 'lucide-react'
import { BRAND_CONFIG } from '@/data/hungerDramaData'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { useSound } from '@/context/SoundContext'
import { startSizzle } from '@/hooks/useSoundEngine'
import { HeroSearchBar } from '@/components/hunger-drama/sections/HeroSearchBar'

export const HeroSection: React.FC = () => {
  const { items, setActiveItem } = useHungerDrama()
  const { soundEnabled } = useSound()

  useEffect(() => {
    if (!soundEnabled) return
    const stop = startSizzle()
    return () => stop()
  }, [soundEnabled])

  // Optional video support — config-driven, plays only if file specified & conditions allow
  const hasHeroVideo = Boolean(BRAND_CONFIG.heroVideoUrl && BRAND_CONFIG.heroVideoUrl.trim())
  const isDataSaver = typeof navigator !== 'undefined' && Boolean((navigator as any).connection?.saveData)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const canAutoplayVideo = hasHeroVideo && !isDataSaver && !prefersReduced

  // Featured hero item to display in the floating spotlight (Paneer Crunch Wrap)
  const spotlightItem =
    items.find((i) => i.id === 'wrap-paneer-crunch') ||
    items.find((i) => i.name.toLowerCase().includes('paneer crunch wrap')) ||
    items[0]

  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToStory = () => {
    const el = document.getElementById('story')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden bg-[#FFF1E1]">
      {/* Subtle Noise / Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#292525_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Editorial Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#FF382E]/10 border border-[#FF382E]/20 text-[#FF382E] text-xs sm:text-sm font-mono font-bold tracking-wider uppercase mb-5"
            >
              <Sparkles size={14} className="text-[#FF382E]" />
              <span>{BRAND_CONFIG.tagline}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl xs:text-5xl sm:text-7xl lg:text-8xl tracking-[-0.01em] text-[#292525] uppercase leading-[0.92] sm:leading-[0.9] font-black mb-5 sm:mb-6 break-words"
            >
              YOUR CRAVINGS.
              <br />
              <span className="text-[#FF382E] relative inline-block">
                OUR DRAMA.
                {/* Decorative underline slash */}
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  className="absolute -bottom-2 left-0 h-2 bg-[#FFC342] rounded-full"
                />
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base sm:text-xl text-[#292525]/80 max-w-xl leading-relaxed mb-6 sm:mb-8 font-medium"
            >
              {BRAND_CONFIG.heroSubhead} Handcrafted street-style loaded fries, grilled sandwiches,
              creamy pasta, midnight Maggi and dessert pancakes — made fresh to steal the scene.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <button
                onClick={scrollToMenu}
                className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FF382E] text-white font-display text-sm sm:text-base tracking-wider uppercase hover:bg-[#e02d24] transition-all transform hover:-translate-y-0.5 shadow-drama-pop flex items-center gap-2 active:scale-95"
              >
                <span>EXPLORE THE MENU</span>
                <ArrowDown size={18} />
              </button>

              <button
                onClick={scrollToStory}
                className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-transparent text-[#292525] border-2 border-[#292525] font-display text-sm sm:text-base tracking-wider uppercase hover:bg-[#292525] hover:text-[#FFF1E1] transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                OUR STORY
              </button>
            </motion.div>

            {/* Street Stats Snippet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-6 mt-8 sm:mt-10 pt-6 border-t border-[#292525]/15 text-[11px] sm:text-xs font-mono text-[#292525]/70 text-center sm:text-left"
            >
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#292525] block font-display">63+ RECIPES</span>
                <span>Authentic Menu</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-[#292525]/20" />
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#292525] block font-display">FRESHLY SIZZLED</span>
                <span>Zero Pre-Made</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-[#292525]/20" />
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#292525] block font-display">WHATSAPP SPEED</span>
                <span>Direct Ordering</span>
              </div>
            </motion.div>

            {/* Mobile-Only Search Bar — Placed immediately after the opening hero fold so mobile visitors can search instantly without scrolling past the food visual */}
            <div className="lg:hidden mt-8">
              <HeroSearchBar />
            </div>
          </div>

          {/* Right Column: Visual Centerpiece & Mascot Accent (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
            {/* Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring', damping: 20 }}
              data-food-card="true"
              data-dish-id={spotlightItem?.id || 'paneer-crunch-wrap'}
              data-dish-name={spotlightItem?.name || 'Paneer Crunch Wrap'}
              data-dish-price={spotlightItem?.price || 140}
              className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-3xl bg-[#292525] border-3 border-[#292525] shadow-2xl overflow-hidden group cursor-pointer"
              onClick={() => spotlightItem && setActiveItem(spotlightItem)}
            >
              {/* Food Hero Image or Video */}
              {hasHeroVideo ? (
                <video
                  src={BRAND_CONFIG.heroVideoUrl}
                  poster={spotlightItem?.image || '/images/menu/paneer-crunch-wrap.webp'}
                  autoPlay={canAutoplayVideo}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img
                  src={spotlightItem?.image || '/images/menu/paneer-crunch-wrap.webp'}
                  alt={spotlightItem?.name || 'Paneer Crunch Wrap'}
                  width={512}
                  height={512}
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    e.currentTarget.src = BRAND_CONFIG.mascotImage
                    e.currentTarget.className = 'w-full h-full object-contain p-8 bg-[#292525]'
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#292525] via-transparent to-black/20 pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FFC342] text-[#292525] text-xs font-mono font-bold tracking-wide uppercase shadow-md">
                  ★ HERO ITEM
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[#292525] text-xs font-mono font-bold uppercase shadow-md">
                  {spotlightItem ? `₹${spotlightItem.price}` : '₹140'}
                </span>
              </div>

              {/* Bottom Card Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#292525]/10 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-lg font-bold text-[#292525]">
                      {spotlightItem?.name || 'Paneer Crunch Wrap'}
                    </h4>
                    <p className="text-xs text-[#292525]/70 line-clamp-1">
                      {spotlightItem?.description || 'Crispy spiced cottage cheese chunks wrapped in a warm toasted tortilla with chipotle drizzle'}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-[#FF382E] text-white text-xs font-display font-bold uppercase whitespace-nowrap">
                    VIEW BITE
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Circular Stamp Graphic (bottom-left) */}
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 12 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-8 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FFC342] border-2 border-[#292525] rounded-xl text-[#292525] font-display text-[10px] sm:text-sm font-bold shadow-drama-pop uppercase tracking-wider z-20"
            >
              CRISP • SPICE • DRAMA
            </motion.div>
          </div>
        </div>
      </div>

      {/* Seamless Continuous Marquee Strip */}
      <div className="w-full bg-[#292525] text-[#FFF1E1] py-3 overflow-hidden border-y-2 border-[#292525] select-none mt-8">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-6 text-sm font-display tracking-widest uppercase mx-4">
              <span className="text-[#FFC342]">★</span>
              <span>LIGHTS. BITES. ACTION.</span>
              <span className="text-[#FF382E]">★</span>
              <span>ZERO BORING BITES</span>
              <span className="text-[#FFC342]">★</span>
              <span>63 EXPLOSIVE FLAVOURS</span>
              <span className="text-[#FF382E]">★</span>
              <span>HANDCRAFTED FRESH TO ORDER</span>
              <span className="text-[#FFC342]">★</span>
              <span>WHATSAPP ORDERING</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

