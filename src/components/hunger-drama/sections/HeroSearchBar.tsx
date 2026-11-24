import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Flame, Sparkles, ArrowDown, Plus, MessageCircle } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG, MenuItem } from '@/data/hungerDramaData'

const QUICK_TAGS = [
  'Paneer Wrap',
  'Cheese Fries',
  'Cold Coffee',
  'Chilli Chicken',
  'Mom’s Maggi',
  'Nutella Pancakes',
  'Alfredo Pasta',
]

export const HeroSearchBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    dietaryFilter,
    setDietaryFilter,
    filteredItems,
    items,
    setActiveItem,
    addToCart,
    orderItemDirectly,
  } = useHungerDrama()

  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Top 4 instant preview matches when user is actively searching
  const previewMatches: MenuItem[] = searchQuery.trim()
    ? filteredItems.slice(0, 4)
    : []

  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    scrollToMenu()
  }

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag)
    scrollToMenu()
  }

  // Close live preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section
      id="quick-search"
      className="relative z-30 -mt-3 sm:-mt-4 pb-12 sm:pb-16 bg-[#FFF1E1] select-none"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {/* Main Search Container */}
        <div className="bg-white border-3 border-[#292525] rounded-3xl p-4 sm:p-6 shadow-[6px_6px_0px_#292525] relative">
          {/* Header Label Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[#292525]/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF382E] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#292525]">
                HUNGER RADAR · INSTANT DISH SEARCH
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#292525]/60 font-semibold">
              63 Fresh Recipes · Vikaspuri Kitchen
            </span>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
              {/* Input Field */}
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#292525]/50 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Craving something? Type fries, paneer wrap, cold coffee, maggi..."
                  className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-[#FFF1E1]/70 border-2 border-[#292525] rounded-2xl text-sm sm:text-base font-body text-[#292525] placeholder:text-[#292525]/50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF382E] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#292525]/50 hover:text-[#292525] rounded-lg hover:bg-[#292525]/5"
                    aria-label="Clear search query"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Find Bite CTA Button */}
              <button
                type="submit"
                className="px-7 py-3.5 sm:py-4 rounded-2xl bg-[#FF382E] hover:bg-[#e02d24] text-white font-display text-sm sm:text-base uppercase tracking-wider border-2 border-[#292525] shadow-[3px_3px_0px_#292525] hover:shadow-[1px_1px_0px_#292525] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 active:scale-95 flex-shrink-0"
              >
                <span>FIND BITE</span>
                <ArrowDown size={17} />
              </button>
            </div>
          </form>

          {/* Quick Craving Tags & Dietary Filters Row */}
          <div className="mt-3.5 pt-3 border-t border-[#292525]/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            {/* Quick Craving Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <span className="font-mono text-[11px] font-bold text-[#292525]/60 uppercase mr-1 flex-shrink-0">
                Popular:
              </span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-2.5 py-1 rounded-xl bg-[#FFF1E1] hover:bg-[#FFC342] border border-[#292525]/20 text-[#292525] font-mono text-[11px] font-bold whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1 rounded-xl font-mono text-[11px] font-bold uppercase transition-all ${
                  dietaryFilter === 'all'
                    ? 'bg-[#292525] text-white'
                    : 'bg-[#FFF1E1] text-[#292525] hover:bg-[#FFF1E1]/80'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl font-mono text-[11px] font-bold uppercase transition-all ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Veg
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter('non-veg')}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl font-mono text-[11px] font-bold uppercase transition-all ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Non-Veg
              </button>
            </div>
          </div>

          {/* Live Instant Search Dropdown Preview (opens when user types) */}
          <AnimatePresence>
            {isFocused && searchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white border-3 border-[#292525] rounded-3xl p-4 shadow-2xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#292525]/10">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#292525]/70">
                    MATCHING DISHES ({filteredItems.length} found)
                  </span>
                  <button
                    onClick={scrollToMenu}
                    className="font-mono text-xs font-bold text-[#FF382E] hover:underline flex items-center gap-1"
                  >
                    View all in menu ↓
                  </button>
                </div>

                {previewMatches.length === 0 ? (
                  <div className="py-6 text-center text-[#292525]/70 font-body text-sm">
                    No dishes found matching "<strong className="text-[#292525]">{searchQuery}</strong>". Try searching for <em>fries</em>, <em>paneer</em>, or <em>shakes</em>.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {previewMatches.map((dish) => (
                      <div
                        key={dish.id}
                        onClick={() => setActiveItem(dish)}
                        className="p-2.5 rounded-2xl border border-[#292525]/15 hover:border-[#292525] bg-[#FFF1E1]/40 hover:bg-[#FFF1E1] transition-all flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            onError={(e) => {
                              e.currentTarget.src = BRAND_CONFIG.mascotImage
                              e.currentTarget.className = 'w-12 h-12 rounded-xl object-contain p-1 bg-[#292525] flex-shrink-0'
                            }}
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-[#292525]/20"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  dish.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                                }`}
                              />
                              <h5 className="font-display text-sm font-bold text-[#292525] group-hover:text-[#FF382E] transition-colors truncate">
                                {dish.name}
                              </h5>
                            </div>
                            <span className="font-mono text-[10px] text-[#292525]/60 uppercase">
                              {dish.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-display text-base font-bold text-[#292525]">
                            {BRAND_CONFIG.currencySymbol}{dish.price}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              orderItemDirectly(dish)
                            }}
                            className="p-2 rounded-xl bg-white border border-[#292525]/20 text-[#292525] hover:bg-[#FF382E] hover:text-white transition-colors"
                            title="Direct WhatsApp Order"
                          >
                            <MessageCircle size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              addToCart(dish)
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#292525] text-white font-display text-xs uppercase hover:bg-[#FF382E] transition-colors"
                          >
                            <Plus size={13} />
                            <span>ADD</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredItems.length > 4 && (
                      <button
                        onClick={scrollToMenu}
                        className="w-full py-2.5 mt-2 rounded-xl bg-[#292525] hover:bg-[#FF382E] text-white font-display text-xs uppercase tracking-wider text-center transition-colors"
                      >
                        VIEW ALL {filteredItems.length} RESULTS IN FULL MENU ↓
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
