import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Plus, Filter, Flame, Check, MessageCircle } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG, MenuItem } from '@/data/hungerDramaData'

export const MenuSection: React.FC = () => {
  const {
    items,
    filteredItems,
    categories,
    selectedCategory,
    setSelectedCategory,
    dietaryFilter,
    setDietaryFilter,
    searchQuery,
    setSearchQuery,
    addToCart,
    setActiveItem,
    orderItemDirectly,
  } = useHungerDrama()

  const [addedId, setAddedId] = React.useState<string | null>(null)

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(item)
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  const handleResetFilters = () => {
    setSelectedCategory('all')
    setDietaryFilter('all')
    setSearchQuery('')
  }

  return (
    <section id="menu" className="py-14 sm:py-28 bg-[#FFF1E1] border-t border-[#292525]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292525] text-[#FFF1E1] text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <span>FULL 63-ITEM ROSTER</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#292525] uppercase tracking-tight">
            THE MENU. NO BAD DECISIONS.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#292525]/80 mt-2">
            Loaded fries, artisanal sandwiches, guilt-free nachos, authentic pasta, late-night Maggi,
            and sweet pancake endings — made to turn everyday hunger into high drama.
          </p>
        </div>

        {/* Filter & Dietary Bar Container */}
        <div className="bg-white border-2 border-[#292525] rounded-3xl p-4 sm:p-6 mb-8 sm:mb-10 shadow-sm">
          {/* Top Row: Search Status & Dietary Toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-[#292525]/10">
            {/* Active Search / Item Count Status */}
            <div className="flex items-center gap-2 flex-wrap">
              {searchQuery ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF382E]/10 border border-[#FF382E]/30 text-xs font-mono font-bold text-[#FF382E]">
                  <Search size={14} />
                  <span>Searching for: &quot;{searchQuery}&quot;</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="ml-1 p-0.5 rounded-full hover:bg-[#FF382E]/20 text-[#292525]"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-[#292525]/70">
                  <Flame size={14} className="text-[#FF382E]" />
                  <span className="font-bold text-[#292525]">{filteredItems.length} Dishes</span>
                  <span>ready to sizzle</span>
                </div>
              )}
            </div>

            {/* Dietary Toggle Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0 no-scrollbar max-w-full">
              <span className="text-xs font-mono font-bold text-[#292525]/60 uppercase mr-1 hidden sm:inline">
                Dietary:
              </span>
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                  dietaryFilter === 'all'
                    ? 'bg-[#292525] text-white shadow-sm'
                    : 'bg-[#FFF1E1]/70 text-[#292525] hover:bg-[#FFF1E1]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Veg Only
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Non-Veg
              </button>
            </div>
          </div>

          {/* Bottom Row: Category Horizontal Scroll Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-display tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#FF382E] text-white shadow-sm'
                  : 'bg-[#FFF1E1] text-[#292525] hover:bg-[#292525] hover:text-white'
              }`}
            >
              All Items (63)
            </button>
            {categories.map((cat) => {
              const count = items.filter((i) => i.categorySlug === cat.slug).length
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-display tracking-wider uppercase whitespace-nowrap transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-[#FF382E] text-white shadow-sm'
                      : 'bg-[#FFF1E1] text-[#292525] hover:bg-[#292525] hover:text-white'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Header Counter */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs font-mono text-[#292525]/70">
          <span>
            SHOWING <strong className="text-[#292525]">{filteredItems.length}</strong> DISHES
          </span>
          {(selectedCategory !== 'all' || dietaryFilter !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-[#FF382E] font-bold hover:underline flex items-center gap-1"
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white border-2 border-dashed border-[#292525]/20 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF1E1] flex items-center justify-center mx-auto mb-4 text-[#292525]">
              <Search size={28} />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#292525] uppercase mb-2">
              No matching bites found
            </h3>
            <p className="text-[#292525]/70 text-sm max-w-md mx-auto mb-6">
              We couldn't find anything matching your search. Try resetting your filters to explore
              all 63 Hunger Drama recipes.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 rounded-full bg-[#FF382E] text-white font-display text-sm tracking-wider uppercase hover:bg-[#e02d24] transition-all shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => {
                const isJustAdded = addedId === item.id

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setActiveItem(item)}
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
                    className="group bg-white border-2 border-[#292525] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-drama-pop transition-all duration-200 cursor-pointer"
                  >
                    {/* Item Image */}
                    <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-[#292525]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        width={380}
                        height={192}
                        onError={(e) => {
                          e.currentTarget.src = BRAND_CONFIG.mascotImage
                          e.currentTarget.className = 'w-full h-full object-contain p-4 sm:p-8 bg-[#292525]'
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Dietary Dot Badge */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                            item.dietary === 'veg'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          />
                          <span className="hidden xs:inline">{item.dietary === 'veg' ? 'VEG' : 'NON-VEG'}</span>
                        </span>
                      </div>

                      {/* Spice Indicator */}
                      {item.spiceLevel === 'spicy' && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#FF382E] text-white p-0.5 sm:p-1 rounded-md sm:rounded-lg shadow">
                          <Flame size={12} className="sm:w-3.5 sm:h-3.5" />
                        </div>
                      )}

                      {/* Price Pill */}
                      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-[#292525]/90 backdrop-blur text-white font-display text-xs sm:text-base font-bold shadow-md">
                        {BRAND_CONFIG.currencySymbol}{item.price}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF382E] block mb-0.5 sm:mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-display text-sm sm:text-lg font-bold text-[#292525] group-hover:text-[#FF382E] transition-colors line-clamp-1 mb-1">
                          {item.name}
                        </h4>
                        <p className="font-body text-[11px] sm:text-xs text-[#292525]/80 line-clamp-2 leading-snug sm:leading-relaxed mb-2.5 sm:mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Bottom CTA */}
                      <div className="pt-2 sm:pt-3 border-t border-[#292525]/10 flex items-center justify-between gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            orderItemDirectly(item)
                          }}
                          className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-[#292525] hover:bg-[#FFF1E1] transition-colors"
                          title="Direct WhatsApp Order"
                        >
                          <MessageCircle size={15} className="sm:w-[17px] sm:h-[17px]" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(item, e)}
                          className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-display text-[11px] sm:text-xs tracking-wider uppercase transition-all shadow-sm ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#292525] text-white hover:bg-[#FF382E]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">ADDED</span>
                            </>
                          ) : (
                            <>
                              <Plus size={12} className="sm:w-3.5 sm:h-3.5" /> <span>ADD</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
