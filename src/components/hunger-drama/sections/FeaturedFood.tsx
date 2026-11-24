import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowUpRight, Sparkles, MessageCircle, HelpCircle, RotateCcw } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG, MenuItem } from '@/data/hungerDramaData'

interface CharacterMeta {
  role: string
  backstory: string
}

const CHARACTER_LORE: Record<string, CharacterMeta> = {
  'wrap-paneer-crunch': {
    role: 'THE HERO',
    backstory: 'Crowned king of the crunch scene, wrapped in warm tortilla and stealing the limelight on first bite.',
  },
  'fries-cheese-drizzled': {
    role: 'THE GOLDEN STAR',
    backstory: 'Crinkle-cut veteran drenched in molten cheddar who refuses to ever play a supporting role.',
  },
  'chinese-chilli-chicken': {
    role: 'THE FIERY REBEL',
    backstory: 'Wok-born daredevil tossed in dark soy and raw heat, unapologetically loud in every single scene.',
  },
  'dessert-nutella-burst-pancakes': {
    role: 'THE SWEET TWIST',
    backstory: 'Midnight plot twist drenched in chocolate hazelnut bliss, guaranteeing every story ends happily.',
  },
}

export const FeaturedFood: React.FC = () => {
  const { items, addToCart, setActiveItem, orderItemDirectly } = useHungerDrama()
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Find the 4 main featured items (featuring the hero Paneer Crunch Wrap)
  const featuredIds = [
    'wrap-paneer-crunch',
    'fries-cheese-drizzled',
    'chinese-chilli-chicken',
    'dessert-nutella-burst-pancakes',
  ]

  const featuredItems: MenuItem[] = featuredIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item))

  return (
    <section id="featured" className="py-14 sm:py-28 bg-[#FFF1E1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF382E] text-white text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              <span>CROWD BLOCKBUSTERS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#292525] uppercase tracking-tight">
              THE MAIN CHARACTERS.
            </h2>
            <p className="font-body text-base sm:text-lg text-[#292525]/80 mt-2 max-w-xl">
              These dishes don't wait for your approval. They steal the show on first bite.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 font-display text-sm tracking-wider uppercase text-[#292525] hover:text-[#FF382E] transition-colors pb-1 border-b-2 border-[#292525] hover:border-[#FF382E] self-start md:self-auto"
          >
            <span>VIEW ALL 63 DISHES</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Equal 2-column grid on all sizes, full 1-column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredItems.map((item, index) => {
            const isFlipped = Boolean(flippedCards[item.id])
            const charMeta = CHARACTER_LORE[item.id] || {
              role: 'FEATURED LEAD',
              backstory: 'Crafted fresh to order with unapologetic flavour and maximum crunch.',
            }

            const badgeText =
              index === 0
                ? '★ #1 HERO ITEM'
                : index === 1
                ? 'CRISPY FAVOURITE'
                : index === 2
                ? 'WOK SIZZLE'
                : 'SWEET FINALE'

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('hd:card-hover', {
                      detail: { category: item.categorySlug },
                    })
                  )
                }}
                data-food-card="true"
                data-dish-id={item.id}
                data-dish-name={item.name}
                data-dish-price={item.price}
                className="group relative bg-white border-2 border-[#292525] rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-drama-pop transition-all duration-300 min-h-[460px]"
              >
                <AnimatePresence mode="wait">
                  {isFlipped ? (
                    /* Backstory Card Face */
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 flex-1 flex flex-col justify-between bg-[#292525] text-white"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="px-3 py-1 rounded-full bg-[#FF382E] text-white text-xs font-mono font-bold tracking-wider uppercase">
                            ROLE: {charMeta.role}
                          </span>
                          <button
                            onClick={(e) => toggleFlip(item.id, e)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Flip back to dish details"
                          >
                            <RotateCcw size={16} />
                          </button>
                        </div>

                        <span className="text-xs font-mono text-[#FFC342] uppercase tracking-widest block mb-2">
                          CHARACTER PROFILE · {item.category}
                        </span>
                        <h3 className="font-display text-3xl font-black text-white uppercase tracking-tight mb-4">
                          {item.name}
                        </h3>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-body text-base text-[#FFF1E1]/90 leading-relaxed mb-6">
                          "{charMeta.backstory}"
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={(e) => toggleFlip(item.id, e)}
                          className="font-mono text-xs font-bold text-[#FFC342] uppercase tracking-wider hover:underline"
                        >
                          ← BACK TO DISH VIEW
                        </button>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-2.5 rounded-xl bg-[#FF382E] text-white font-display text-xs tracking-wider uppercase hover:bg-[#e02d24]"
                        >
                          ADD ({BRAND_CONFIG.currencySymbol}{item.price})
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Front Food Face */
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      {/* Image Container */}
                      <div
                        className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#292525] cursor-pointer"
                        onClick={() => setActiveItem(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          width={600}
                          height={300}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = BRAND_CONFIG.mascotImage
                            e.currentTarget.className = 'w-full h-full object-contain p-8 bg-[#292525]'
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#292525]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#FFC342] text-[#292525] text-xs font-mono font-bold tracking-wider uppercase shadow-md">
                            {badgeText}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => toggleFlip(item.id, e)}
                              className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[#292525] text-[11px] font-mono font-bold tracking-wider uppercase shadow-md hover:bg-[#FFC342] transition-colors flex items-center gap-1"
                              title="View Character Lore"
                            >
                              <span>LORE</span>
                              <HelpCircle size={12} />
                            </button>

                            <div
                              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                item.dietary === 'veg'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                                }`}
                              />
                              {item.dietary === 'veg' ? 'VEG' : 'NON-VEG'}
                            </div>
                          </div>
                        </div>

                        {/* Price Tag Overlay */}
                        <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-2xl bg-[#292525]/90 backdrop-blur text-white font-display text-xl font-bold shadow-lg">
                          {BRAND_CONFIG.currencySymbol}{item.price}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF382E]">
                              {item.category}
                            </span>
                            <span className="text-[11px] font-mono text-[#292525]/50 font-bold uppercase">
                              {charMeta.role}
                            </span>
                          </div>

                          <h3
                            onClick={() => setActiveItem(item)}
                            className="font-display text-2xl sm:text-3xl font-bold text-[#292525] uppercase tracking-tight group-hover:text-[#FF382E] transition-colors cursor-pointer mb-2"
                          >
                            {item.name}
                          </h3>

                          <p className="font-body text-sm text-[#292525]/80 leading-relaxed line-clamp-2 mb-6">
                            {item.description}
                          </p>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-3 sm:pt-4 border-t border-[#292525]/10 flex flex-wrap items-center justify-between gap-2">
                          <button
                            onClick={() => setActiveItem(item)}
                            className="text-xs font-mono font-bold text-[#292525] uppercase tracking-wider hover:text-[#FF382E] transition-colors"
                          >
                            <span className="hidden sm:inline">DETAILS & SPICE →</span>
                            <span className="sm:hidden">DETAILS →</span>
                          </button>

                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                              onClick={(e) => toggleFlip(item.id, e)}
                              className="px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-[#FFF1E1] border border-[#292525]/20 text-[#292525] hover:bg-[#FFC342] text-[11px] sm:text-xs font-mono font-bold uppercase transition-colors"
                              title="Read Character Lore"
                            >
                              ROLE 🎭
                            </button>

                            <button
                              onClick={() => orderItemDirectly(item)}
                              className="p-2 sm:p-2.5 rounded-xl bg-[#FFF1E1] border border-[#292525]/20 text-[#292525] hover:bg-[#FF382E] hover:text-white transition-colors"
                              title="Quick WhatsApp Order"
                              aria-label={`Order ${item.name} directly on WhatsApp`}
                            >
                              <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </button>

                            <button
                              onClick={() => addToCart(item)}
                              className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-[#292525] text-white hover:bg-[#FF382E] transition-all font-display text-xs tracking-wider uppercase active:scale-95 shadow-sm"
                            >
                              <Plus size={15} />
                              <span>ADD</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

