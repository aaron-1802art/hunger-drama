import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CosmosNavigation } from '@/components/layout/CosmosNavigation'
import { ImageDetailModal } from '@/components/discovery/ImageDetailModal'
import { UploadModal } from '@/components/discovery/UploadModal'
import { AuthModal } from '@/components/discovery/AuthModal'
import { CreateBoardModal } from '@/components/discovery/CreateBoardModal'
import { MasonryGrid } from '@/components/discovery/MasonryGrid'
import { useDiscovery } from '@/context/DiscoveryContext'
import { CURATED_PALETTES } from '@/data/discoveryData'
import { Palette, Check, Sparkles, RefreshCcw } from 'lucide-react'

export const ColorDiscovery: React.FC = () => {
  const { items } = useDiscovery()
  const [activePalette, setActivePalette] = useState(CURATED_PALETTES[0].hex)

  // Filter items matching active palette
  const matchingItems = items.filter(
    (it) =>
      it.dominantColor.toLowerCase() === activePalette.toLowerCase() ||
      it.palette.some((hex) => hex.toLowerCase() === activePalette.toLowerCase())
  )

  const activeColorInfo = CURATED_PALETTES.find((p) => p.hex === activePalette)

  return (
    <div className="min-h-screen bg-ink text-cream transition-colors duration-300">
      <CosmosNavigation />

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* Page Header */}
        <div className="pb-6 mb-8 border-b border-graphite/60">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ember" />
            <span className="font-mono text-[10px] text-smoke uppercase tracking-[0.25em]">
              Chromatic Harmony & Palette Engine
            </span>
          </div>
          <h1 className="font-display font-light text-3xl sm:text-5xl text-off-white tracking-[-0.03em]">
            Interactive Color Discovery
          </h1>
          <p className="font-body font-light text-mist text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
            Explore visual artifacts grouped by extracted pigment tones, earth minerals, raw travertine, and nocturnal atmosphere.
          </p>
        </div>

        {/* Large Interactive Color Spectrum Selector */}
        <div className="p-6 rounded-2xl bg-carbon border border-graphite mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-smoke mb-4 flex items-center justify-between">
            <span>Select Aesthetic Color Tone:</span>
            {activeColorInfo && (
              <span className="text-ember font-medium">
                {activeColorInfo.name} — {activeColorInfo.label} ({activeColorInfo.hex})
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {CURATED_PALETTES.map((color) => {
              const isSelected = activePalette === color.hex
              return (
                <button
                  key={color.hex}
                  onClick={() => setActivePalette(color.hex)}
                  className={`group relative h-20 rounded-xl p-2.5 flex flex-col justify-between transition-all duration-300 tap-transparent ${
                    isSelected
                      ? 'ring-2 ring-ember scale-105 shadow-xl'
                      : 'hover:scale-102 opacity-85 hover:opacity-100 border border-graphite/50'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="flex justify-end">
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-white/90 text-ink flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="bg-ink/75 backdrop-blur-md px-2 py-1 rounded text-left">
                    <span className="block text-[11px] font-display font-medium text-cream leading-tight">
                      {color.name}
                    </span>
                    <span className="block text-[9px] font-mono text-smoke">
                      {color.hex}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Matching Items Count and Masonry */}
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-graphite/40">
          <div className="flex items-center gap-2 text-sm font-mono text-smoke">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: activePalette }}
            />
            <span>
              Showing {matchingItems.length} visual artifacts containing {activeColorInfo?.name}
            </span>
          </div>
        </div>

        <MasonryGrid items={matchingItems} />

      </main>

      <ImageDetailModal />
      <UploadModal />
      <AuthModal />
      <CreateBoardModal />
    </div>
  )
}

export default ColorDiscovery

