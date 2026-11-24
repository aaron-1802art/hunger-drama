import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Heart, ChevronDown, Check, ArrowUpRight } from 'lucide-react'
import { VisualItem } from '@/data/discoveryData'
import { useDiscovery } from '@/context/DiscoveryContext'
import { QuickSaveMenu } from './QuickSaveMenu'

interface DiscoveryCardProps {
  item: VisualItem
  index?: number
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ item, index = 0 }) => {
  const { setActiveItem, isItemSaved, toggleSaveItem, isItemLiked, toggleLikeItem } = useDiscovery()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const saved = isItemSaved(item.id)
  const liked = isItemLiked(item.id)

  const handleQuickSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSaveItem(item.id)
  }

  const handleOpenDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen((prev) => !prev)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLikeItem(item.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative cursor-pointer rounded-lg overflow-hidden bg-carbon border border-graphite/40 transition-all duration-300 hover:border-graphite tap-transparent"
      onClick={() => setActiveItem(item)}
    >
      {/* Visual Image container with variable aspect ratio */}
      <div className={`relative w-full ${item.aspectRatio} overflow-hidden bg-ash/20`}>
        <img
          src={item.image}
          alt={item.title}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-reveal [@media(hover:hover)]:group-hover:scale-[1.04] ${
            isImageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          loading="lazy"
        />

        {/* Ambient Gradient Overlays for Cosmos Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Left: Dominant Color swatch + Category Chip */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <span
            className="w-2.5 h-2.5 rounded-full ring-1 ring-white/40 shadow-sm"
            style={{ backgroundColor: item.dominantColor }}
          />
          <span className="px-2 py-0.5 rounded-full bg-ink/70 backdrop-blur-md text-[9px] font-body uppercase tracking-widest text-mist border border-graphite/40">
            {item.category}
          </span>
        </div>

        {/* Top Right: Cosmos Save & Board Picker Button Cluster */}
        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={handleQuickSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-body font-medium transition-all duration-200 shadow-md tap-transparent ${
              saved
                ? 'bg-ember text-off-white'
                : 'bg-ink/80 hover:bg-ink text-cream border border-graphite backdrop-blur-md'
            }`}
            title={saved ? 'Remove from saved' : 'Save to Moodboard'}
          >
            {saved ? (
              <>
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3 h-3" />
                <span>Save</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenDropdown}
            className="p-1.5 rounded-full bg-ink/80 hover:bg-ink text-cream border border-graphite backdrop-blur-md transition-colors shadow-md tap-transparent"
            title="Save to specific moodboard"
          >
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Quick Save Dropdown */}
          <QuickSaveMenu
            item={item}
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>

        {/* Bottom Content: Title, Creator, Likes */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display font-light text-cream text-[17px] sm:text-[19px] leading-tight truncate">
              {item.title}
            </h3>
            <span className="text-smoke/60 hover:text-ember transition-colors flex-shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px]">
            {/* Creator avatar & handle */}
            <div className="flex items-center gap-1.5 truncate">
              <img
                src={item.creator.avatar}
                alt={item.creator.name}
                className="w-4 h-4 rounded-full object-cover flex-shrink-0 border border-graphite"
              />
              <span className="font-body text-mist truncate">{item.creator.name}</span>
            </div>

            {/* Like button with counter */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors tap-transparent ${
                liked ? 'text-ember' : 'text-smoke hover:text-cream'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-ember' : ''}`} />
              <span className="font-mono text-[10px]">{item.likesCount}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile persistent minimal info bar */}
      <div className="sm:hidden px-2.5 py-2 flex items-center justify-between border-t border-graphite/30 text-xs">
        <span className="font-display text-[14px] text-cream truncate max-w-[65%]">
          {item.title}
        </span>
        <button
          onClick={handleQuickSave}
          className={`flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
            saved ? 'bg-ember/20 text-ember' : 'text-smoke'
          }`}
        >
          <Bookmark className="w-2.5 h-2.5" />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </motion.div>
  )
}

