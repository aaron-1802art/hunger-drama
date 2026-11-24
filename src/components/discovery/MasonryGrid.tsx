import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VisualItem } from '@/data/discoveryData'
import { DiscoveryCard } from './DiscoveryCard'
import { useDiscovery } from '@/context/DiscoveryContext'
import { Sparkles, SlidersHorizontal, RefreshCcw } from 'lucide-react'

interface MasonryGridProps {
  items: VisualItem[]
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
  const { gridDensity, resetFilters } = useDiscovery()

  // Column styling based on density preference
  const densityClasses = {
    editorial: 'columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6',
    standard: 'columns-2 sm:columns-3 lg:columns-4 gap-4 [&>*]:mb-4',
    compact: 'columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 [&>*]:mb-3',
  }

  if (items.length === 0) {
    return (
      <div className="w-full py-28 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-carbon border border-graphite flex items-center justify-center mb-4 text-ember">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="font-display font-light text-2xl sm:text-3xl text-cream mb-2">
          No visual artifacts found
        </h3>
        <p className="font-body font-light text-smoke text-sm max-w-md mb-6 leading-relaxed">
          We couldn't find any images matching your current search parameters, aesthetic mood, or color palette.
        </p>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-carbon border border-graphite hover:border-ember text-cream text-xs font-body uppercase tracking-widest transition-colors tap-transparent"
        >
          <RefreshCcw className="w-3.5 h-3.5 text-ember" />
          <span>Reset all filters</span>
        </button>
      </div>
    )
  }

  return (
    <div className="w-full py-6">
      <div className={densityClasses[gridDensity]}>
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <DiscoveryCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

