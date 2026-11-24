import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CosmosNavigation } from '@/components/layout/CosmosNavigation'
import { ImageDetailModal } from '@/components/discovery/ImageDetailModal'
import { UploadModal } from '@/components/discovery/UploadModal'
import { AuthModal } from '@/components/discovery/AuthModal'
import { CreateBoardModal } from '@/components/discovery/CreateBoardModal'
import { MasonryGrid } from '@/components/discovery/MasonryGrid'
import { useDiscovery } from '@/context/DiscoveryContext'
import { Moodboard } from '@/data/discoveryData'
import { Plus, Folder, ArrowLeft, Lock, Globe, Sparkles } from 'lucide-react'

export const Collections: React.FC = () => {
  const { moodboards, items, setIsCreateBoardOpen, user } = useDiscovery()
  const [selectedBoard, setSelectedBoard] = useState<Moodboard | null>(null)

  // Get items belonging to the selected board
  const boardItems = selectedBoard
    ? items.filter((item) => selectedBoard.itemIds.includes(item.id))
    : []

  return (
    <div className="min-h-screen bg-ink text-cream transition-colors duration-300">
      <CosmosNavigation />

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* Selected Board Detail View */}
        {selectedBoard ? (
          <div>
            <div className="mb-8 pb-6 border-b border-graphite/60">
              <button
                onClick={() => setSelectedBoard(null)}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-smoke hover:text-ember transition-colors mb-4 tap-transparent"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to all Moodboards</span>
              </button>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {selectedBoard.isPrivate ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-ember">
                        <Lock className="w-3 h-3" /> Secret Board
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-smoke">
                        <Globe className="w-3 h-3" /> Public Moodboard
                      </span>
                    )}
                    <span className="text-smoke/50">·</span>
                    <span className="font-mono text-xs text-smoke">Curated by {selectedBoard.curator}</span>
                  </div>

                  <h1 className="font-display font-light text-3xl sm:text-5xl text-off-white tracking-[-0.02em]">
                    {selectedBoard.title}
                  </h1>
                  <p className="font-body font-light text-mist text-sm max-w-xl mt-2 leading-relaxed">
                    {selectedBoard.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-carbon border border-graphite text-cream">
                    {boardItems.length} visual artifacts
                  </span>
                </div>
              </div>
            </div>

            {/* Masonry Grid for this Board */}
            <MasonryGrid items={boardItems} />
          </div>
        ) : (
          /* Moodboards Overview */
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-graphite/60">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                  <span className="font-mono text-[10px] text-smoke uppercase tracking-[0.25em]">
                    Curated & Personal Archives
                  </span>
                </div>
                <h1 className="font-display font-light text-3xl sm:text-5xl text-off-white tracking-[-0.03em]">
                  Moodboards & Collections
                </h1>
              </div>

              <button
                onClick={() => setIsCreateBoardOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ember text-off-white text-xs font-body font-medium uppercase tracking-wider hover:bg-ember-dim transition-all shadow-md self-start sm:self-auto tap-transparent"
              >
                <Plus className="w-4 h-4" />
                <span>New Moodboard</span>
              </button>
            </div>

            {/* Moodboard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moodboards.map((board) => {
                // Get 3-4 preview images for this board
                const previewImages = items
                  .filter((it) => board.itemIds.includes(it.id))
                  .slice(0, 4)
                  .map((it) => it.image)

                return (
                  <motion.div
                    key={board.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedBoard(board)}
                    className="group cursor-pointer rounded-2xl bg-carbon border border-graphite/60 hover:border-ember p-4 sm:p-5 flex flex-col justify-between transition-colors shadow-sm tap-transparent"
                  >
                    {/* Multi-Image Collage Cover */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-ink/60 mb-4 grid grid-cols-3 gap-1 p-1">
                      {previewImages.length > 0 ? (
                        <>
                          <div className="col-span-2 h-full rounded-lg overflow-hidden">
                            <img
                              src={previewImages[0]}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <div className="flex flex-col gap-1 h-full">
                            <div className="flex-1 rounded-md overflow-hidden bg-ash">
                              {previewImages[1] && (
                                <img
                                  src={previewImages[1]}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 rounded-md overflow-hidden bg-ash">
                              {previewImages[2] && (
                                <img
                                  src={previewImages[2]}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-3 flex items-center justify-center text-smoke text-xs font-mono">
                          Empty Moodboard
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-smoke mb-1.5">
                        <span>{board.itemIds.length} items</span>
                        <span>{board.curator}</span>
                      </div>

                      <h3 className="font-display font-light text-2xl text-off-white group-hover:text-ember transition-colors leading-tight mb-1.5">
                        {board.title}
                      </h3>

                      <p className="font-body font-light text-mist text-xs line-clamp-2 leading-relaxed mb-3">
                        {board.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {board.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-ink/60 border border-graphite/40 text-[10px] font-mono text-smoke"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

      </main>

      <ImageDetailModal />
      <UploadModal />
      <AuthModal />
      <CreateBoardModal />
    </div>
  )
}

export default Collections

