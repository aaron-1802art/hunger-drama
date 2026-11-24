import React from 'react'
import { motion } from 'framer-motion'
import { CosmosNavigation } from '@/components/layout/CosmosNavigation'
import { ImageDetailModal } from '@/components/discovery/ImageDetailModal'
import { UploadModal } from '@/components/discovery/UploadModal'
import { AuthModal } from '@/components/discovery/AuthModal'
import { CreateBoardModal } from '@/components/discovery/CreateBoardModal'
import { CREATORS } from '@/data/discoveryData'
import { useDiscovery } from '@/context/DiscoveryContext'
import { useNavigate } from 'react-router-dom'
import { MapPin, Users, Sparkles, ArrowUpRight, FolderHeart } from 'lucide-react'

export const Creators: React.FC = () => {
  const { items, setSearchQuery } = useDiscovery()
  const navigate = useNavigate()

  const handleExploreCreator = (creatorName: string) => {
    setSearchQuery(creatorName)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-ink text-cream transition-colors duration-300">
      <CosmosNavigation />

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-graphite/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ember" />
              <span className="font-mono text-[10px] text-smoke uppercase tracking-[0.25em]">
                Curators, Studios & Architects
              </span>
            </div>
            <h1 className="font-display font-light text-3xl sm:text-5xl text-off-white tracking-[-0.03em]">
              Creator & Studio Discovery
            </h1>
          </div>
          <p className="font-body font-light text-mist text-xs sm:text-sm max-w-md leading-relaxed">
            The visionary minds, archives, and spatial researchers shaping the AFTERHOURS visual universe.
          </p>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATORS.map((creator) => {
            const creatorVisuals = items.filter((it) => it.creator.id === creator.id)

            return (
              <motion.div
                key={creator.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-carbon border border-graphite/60 hover:border-ember p-6 flex flex-col justify-between transition-colors shadow-sm"
              >
                <div>
                  {/* Top info */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-graphite"
                    />
                    <div className="flex-1 truncate">
                      <h3 className="font-display font-light text-xl text-off-white truncate">
                        {creator.name}
                      </h3>
                      <p className="font-mono text-xs text-ember">{creator.handle}</p>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-smoke mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{creator.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-body font-light text-mist text-xs leading-relaxed mb-4">
                    {creator.bio}
                  </p>

                  {/* Curated visual previews */}
                  <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden mb-4 bg-ink/40 p-1">
                    {creatorVisuals.slice(0, 3).map((vis) => (
                      <div key={vis.id} className="aspect-square rounded-lg overflow-hidden bg-ash">
                        <img src={vis.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="flex items-center justify-between pt-4 border-t border-graphite/40">
                  <span className="font-mono text-xs text-smoke">
                    {creator.followersCount.toLocaleString()} followers
                  </span>

                  <button
                    onClick={() => handleExploreCreator(creator.name)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink/70 hover:bg-ember hover:text-off-white text-cream border border-graphite text-xs font-body transition-colors tap-transparent"
                  >
                    <span>View Archive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

      </main>

      <ImageDetailModal />
      <UploadModal />
      <AuthModal />
      <CreateBoardModal />
    </div>
  )
}

export default Creators

