import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Bookmark,
  Heart,
  Share2,
  Download,
  Check,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  Folder,
  Palette,
  Sparkles,
} from 'lucide-react'
import { VisualItem } from '@/data/discoveryData'
import { useDiscovery } from '@/context/DiscoveryContext'

export const ImageDetailModal: React.FC = () => {
  const {
    activeItem,
    setActiveItem,
    items,
    isItemSaved,
    toggleSaveItem,
    isItemLiked,
    toggleLikeItem,
    setSelectedMood,
    setSelectedColor,
    moodboards,
    addItemToMoodboard,
    removeItemFromMoodboard,
  } = useDiscovery()

  const [copied, setCopied] = useState(false)
  const [isBoardPickerOpen, setIsBoardPickerOpen] = useState(false)

  // Find similar recommendations based on category, mood, and color harmony
  const similarItems = useMemo(() => {
    if (!activeItem) return []
    return items
      .filter((it) => it.id !== activeItem.id)
      .map((it) => {
        let score = 0
        if (it.category === activeItem.category) score += 3
        const sharedMoods = it.moods.filter((m) => activeItem.moods.includes(m))
        score += sharedMoods.length * 2
        if (it.dominantColor === activeItem.dominantColor) score += 2
        return { item: it, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((entry) => entry.item)
  }, [activeItem, items])

  if (!activeItem) return null

  const saved = isItemSaved(activeItem.id)
  const liked = isItemLiked(activeItem.id)

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    window.open(activeItem.image, '_blank')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-8">

        {/* Backdrop click to close */}
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setActiveItem(null)}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl bg-carbon border border-graphite shadow-2xl flex flex-col no-scrollbar"
        >

          {/* Close Floating Button */}
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-ink/80 hover:bg-ink text-cream border border-graphite transition-colors shadow-lg"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Main Visual Showcase & Metadata Split */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] border-b border-graphite">

            {/* Left: High-Res Visual Presentation */}
            <div className="relative p-4 sm:p-8 md:p-10 flex items-center justify-center bg-ink/40 min-h-[400px] lg:min-h-[640px]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Right: Curatorial Metadata & Actions */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">

              <div className="space-y-6">

                {/* Top Category & Coordinates */}
                <div className="flex items-center justify-between text-xs font-mono text-smoke">
                  <span className="px-2.5 py-1 rounded-full bg-ash/40 border border-graphite uppercase tracking-widest text-ember text-[10px]">
                    {activeItem.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-smoke/70" />
                    <span>{activeItem.location}</span>
                  </div>
                </div>

                {/* Title & Subdeck */}
                <div>
                  <h1 className="font-display font-light text-2xl sm:text-3xl md:text-4xl text-off-white tracking-[-0.02em] leading-tight mb-2">
                    {activeItem.title}
                  </h1>
                  {activeItem.subtitle && (
                    <p className="font-body font-light text-mist text-sm sm:text-base leading-relaxed">
                      {activeItem.subtitle}
                    </p>
                  )}
                </div>

                {/* Creator Attribution */}
                <div className="p-4 rounded-xl bg-ink/50 border border-graphite/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeItem.creator.avatar}
                      alt={activeItem.creator.name}
                      className="w-11 h-11 rounded-full object-cover border border-graphite"
                    />
                    <div>
                      <div className="font-body font-medium text-cream text-sm">
                        {activeItem.creator.name}
                      </div>
                      <div className="font-mono text-xs text-smoke">
                        {activeItem.creator.handle} · {activeItem.creator.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body font-light text-mist/90 text-sm leading-relaxed border-l-2 border-ember/60 pl-3.5 py-0.5">
                  {activeItem.description}
                </p>

                {/* Dominant Color Palette (Interactive!) */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-smoke uppercase tracking-wider mb-2">
                    <Palette className="w-3.5 h-3.5 text-ember" />
                    <span>Extracted Chromatic Palette (click to explore):</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeItem.palette.map((hex, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(hex)
                          setActiveItem(null)
                        }}
                        className="group relative flex-1 h-8 rounded-md transition-transform hover:scale-105 border border-graphite/60 shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={`Filter feed by ${hex}`}
                      >
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-ink border border-graphite text-[9px] font-mono text-cream pointer-events-none transition-opacity">
                          {hex}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeItem.moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => {
                        setSelectedMood(mood)
                        setActiveItem(null)
                      }}
                      className="px-2.5 py-1 rounded-md bg-ash/30 hover:bg-ember hover:text-off-white text-mist text-[11px] font-body transition-colors border border-graphite/40"
                    >
                      #{mood}
                    </button>
                  ))}
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-carbon text-smoke/70 text-[11px] font-body border border-graphite/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-graphite/60 flex items-center justify-between gap-3 flex-wrap">

                {/* Save to Moodboard */}
                <div className="relative">
                  <button
                    onClick={() => setIsBoardPickerOpen(!isBoardPickerOpen)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body font-medium uppercase tracking-wider transition-all duration-300 shadow-md ${
                      saved
                        ? 'bg-ember text-off-white'
                        : 'bg-cream text-ink hover:bg-off-white'
                    }`}
                  >
                    {saved ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Bookmark className="w-4 h-4" />}
                    <span>{saved ? 'Saved in Collection' : 'Save to Board'}</span>
                  </button>

                  {/* Dropdown Moodboard Selector */}
                  <AnimatePresence>
                    {isBoardPickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-12 left-0 z-40 w-64 p-2 rounded-xl bg-ink border border-graphite shadow-2xl"
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider text-smoke px-2 py-1 border-b border-graphite mb-1">
                          Assign to Moodboard
                        </div>
                        {moodboards.map((b) => {
                          const has = b.itemIds.includes(activeItem.id)
                          return (
                            <button
                              key={b.id}
                              onClick={() => {
                                if (has) {
                                  removeItemFromMoodboard(activeItem.id, b.id)
                                } else {
                                  addItemToMoodboard(activeItem.id, b.id)
                                }
                              }}
                              className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-body hover:bg-carbon text-left text-cream"
                            >
                              <span className="truncate">{b.title}</span>
                              <div
                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                                  has ? 'bg-ember text-off-white' : 'border border-graphite'
                                }`}
                              >
                                {has && <Check className="w-2.5 h-2.5" />}
                              </div>
                            </button>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Secondary Actions: Like, Download, Share */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLikeItem(activeItem.id)}
                    className={`p-2.5 rounded-full border transition-colors ${
                      liked
                        ? 'bg-ember/15 border-ember text-ember'
                        : 'bg-carbon border-graphite text-smoke hover:text-cream hover:border-smoke'
                    }`}
                    title={liked ? 'Unlike' : 'Like'}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-ember' : ''}`} />
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-2.5 rounded-full bg-carbon border border-graphite text-smoke hover:text-cream hover:border-smoke transition-colors"
                    title="View Full Resolution"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-carbon border border-graphite text-smoke hover:text-cream hover:border-smoke transition-colors relative"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-ember" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Section: Cosmos-Style Similar Visual Recommendations */}
          <div className="p-6 sm:p-8 md:p-10 bg-ink/60">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-ember" />
                <h3 className="font-display font-light text-xl text-off-white">
                  Visually Similar Elements
                </h3>
              </div>
              <span className="font-mono text-xs text-smoke">
                Harmonized by category, mood & palette
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {similarItems.map((similar) => (
                <div
                  key={similar.id}
                  onClick={() => setActiveItem(similar)}
                  className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer bg-carbon border border-graphite/40 hover:border-ember transition-colors"
                >
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                    <span className="font-display text-xs text-cream truncate">
                      {similar.title}
                    </span>
                    <span className="font-mono text-[9px] text-smoke">
                      {similar.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  )
}

