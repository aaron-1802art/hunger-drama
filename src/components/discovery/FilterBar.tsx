import React from 'react'
import { motion } from 'framer-motion'
import {
  DISCOVERY_CATEGORIES,
  MOOD_CATEGORIES,
  CURATED_PALETTES,
} from '@/data/discoveryData'
import { useDiscovery } from '@/context/DiscoveryContext'
import { X, Sparkles, SlidersHorizontal, Palette } from 'lucide-react'

export const FilterBar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedMood,
    setSelectedMood,
    selectedColor,
    setSelectedColor,
    filteredItems,
    items,
    searchQuery,
    resetFilters,
  } = useDiscovery()

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedMood !== 'All' ||
    selectedColor !== null ||
    searchQuery !== ''

  return (
    <div className="w-full py-4 border-b border-graphite/60 bg-ink/50 backdrop-blur-sm sticky top-16 md:top-18 z-30 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">

        {/* Top Row: Categories & Color Palette Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">

          {/* Primary Categories Scrollable Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {DISCOVERY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-body uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-200 tap-transparent ${
                    isSelected
                      ? 'bg-cream text-ink font-medium shadow-sm'
                      : 'text-smoke hover:text-cream bg-carbon/50 hover:bg-carbon border border-graphite/40'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Interactive Color Discovery Swatches */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-smoke/70 mr-1">
              <Palette className="w-3 h-3 text-ember" />
              <span>Palette:</span>
            </span>

            <div className="flex items-center gap-1.5 p-1 rounded-full bg-carbon border border-graphite">
              {CURATED_PALETTES.map((color) => {
                const isActive = selectedColor === color.hex
                return (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(isActive ? null : color.hex)}
                    className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform tap-transparent ${
                      isActive ? 'scale-125 ring-2 ring-ember shadow-md' : 'hover:scale-110 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} (${color.label})`}
                    aria-label={`Filter by ${color.name}`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow" />
                      </span>
                    )}
                  </button>
                )
              })}

              {selectedColor && (
                <button
                  onClick={() => setSelectedColor(null)}
                  className="p-0.5 text-smoke hover:text-cream rounded-full transition-colors ml-0.5"
                  title="Clear color filter"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Second Row: Aesthetic Mood Tags + Active Count */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-smoke/60 uppercase tracking-widest mr-1 hidden md:inline">
              Mood:
            </span>

            {MOOD_CATEGORIES.map((mood) => {
              const isSelected = selectedMood.toLowerCase() === mood.toLowerCase()
              return (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-body tracking-wider whitespace-nowrap transition-colors tap-transparent ${
                    isSelected
                      ? 'bg-ember text-off-white font-medium shadow-xs'
                      : 'text-smoke/70 hover:text-cream hover:bg-carbon/60'
                  }`}
                >
                  {mood}
                </button>
              )
            })}
          </div>

          {/* Right Status Indicator & Reset */}
          <div className="flex items-center gap-3 flex-shrink-0 text-[11px] font-mono text-smoke">
            <span>
              {filteredItems.length} <span className="opacity-60">/ {items.length} visuals</span>
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-ember hover:underline text-[11px] font-body tap-transparent"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

