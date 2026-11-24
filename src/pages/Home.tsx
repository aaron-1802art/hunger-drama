import React from 'react'
import { motion } from 'framer-motion'
import { CosmosNavigation } from '@/components/layout/CosmosNavigation'
import { FilterBar } from '@/components/discovery/FilterBar'
import { MasonryGrid } from '@/components/discovery/MasonryGrid'
import { ImageDetailModal } from '@/components/discovery/ImageDetailModal'
import { UploadModal } from '@/components/discovery/UploadModal'
import { AuthModal } from '@/components/discovery/AuthModal'
import { CreateBoardModal } from '@/components/discovery/CreateBoardModal'
import { useDiscovery } from '@/context/DiscoveryContext'
import { Sparkles, ArrowDown, Compass } from 'lucide-react'

export const Home: React.FC = () => {
  const { filteredItems, searchQuery, selectedCategory, selectedMood, selectedColor, resetFilters } = useDiscovery()

  const isFiltering =
    searchQuery !== '' || selectedCategory !== 'All' || selectedMood !== 'All' || selectedColor !== null

  return (
    <div className="min-h-screen bg-ink text-cream transition-colors duration-300">
      <CosmosNavigation />

      {/* Atmospheric Discovery Intro (Only when not deeply filtering) */}
      {!isFiltering && (
        <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-4 max-w-[1720px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-graphite/40">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                <span className="font-mono text-[10px] text-smoke uppercase tracking-[0.25em]">
                  Cosmos-Inspired Visual Discovery Engine
                </span>
              </div>
              <h1 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-off-white tracking-[-0.03em] leading-none">
                Curate the <em className="italic text-cream/70">Unseen</em>
              </h1>
            </div>

            <p className="font-body font-light text-mist text-xs sm:text-sm max-w-md leading-relaxed">
              An endless visual canvas for architectural geometry, tactile materiality, raw concrete, wabi-sabi spaces, and cinematic nocturnes.
            </p>
          </div>
        </section>
      )}

      {/* Filter Bar (Categories, Moods, Palette) */}
      <FilterBar />

      {/* Main Visual Masonry Feed */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <MasonryGrid items={filteredItems} />
      </main>

      {/* Modals & Dialogs */}
      <ImageDetailModal />
      <UploadModal />
      <AuthModal />
      <CreateBoardModal />
    </div>
  )
}

export default Home
