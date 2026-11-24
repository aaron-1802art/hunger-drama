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

        {/* Filter & Search Bar Container */}
        <div className="bg-white border-2 border-[#292525] rounded-3xl p-4 sm:p-6 mb-8 sm:mb-10 shadow-sm">
          {/* Top Row: Search Input & Dietary Toggles */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-[#292525]/10">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#292525]/50 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fries, maggi, paneer, shakes, pancakes..."
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-[#FFF1E1]/60 border border-[#292525]/20 rounded-2xl text-sm font-body text-[#292525] placeholder:text-[#292525]/45 focus:outline-none focus:ring-2 focus:ring-[#FF382E] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#292525]/50 hover:text-[#292525]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dietary Toggle Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 self-start md:self-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar max-w-full">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                    className="group bg-white border-2 border-[#292525] rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-drama-pop transition-all duration-200 cursor-pointer"
                  >
                    {/* Item Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#292525]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        width={380}
                        height={192}
                        onError={(e) => {
                          e.currentTarget.src = BRAND_CONFIG.mascotImage
                          e.currentTarget.className = 'w-full h-full object-contain p-8 bg-[#292525]'
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Dietary Dot Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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
                          {item.dietary === 'veg' ? 'VEG' : 'NON-VEG'}
                        </span>
                      </div>

                      {/* Spice Indicator */}
                      {item.spiceLevel === 'spicy' && (
                        <div className="absolute top-3 right-3 bg-[#FF382E] text-white p-1 rounded-lg shadow">
                          <Flame size={14} />
                        </div>
                      )}

                      {/* Price Pill */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#292525]/90 backdrop-blur text-white font-display text-base font-bold shadow-md">
                        {BRAND_CONFIG.currencySymbol}{item.price}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF382E] block mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-display text-lg font-bold text-[#292525] group-hover:text-[#FF382E] transition-colors line-clamp-1 mb-1.5">
                          {item.name}
                        </h4>
                        <p className="font-body text-xs text-[#292525]/80 line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Bottom CTA */}
                      <div className="pt-3 border-t border-[#292525]/10 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            orderItemDirectly(item)
                          }}
                          className="p-2 rounded-xl text-[#292525] hover:bg-[#FFF1E1] transition-colors"
                          title="Direct WhatsApp Order"
                        >
                          <MessageCircle size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(item, e)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-display text-xs tracking-wider uppercase transition-all shadow-sm ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#292525] text-white hover:bg-[#FF382E]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check size={14} /> ADDED
                            </>
                          ) : (
                            <>
                              <Plus size={14} /> ADD {BRAND_CONFIG.currencySymbol}{item.price}
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
