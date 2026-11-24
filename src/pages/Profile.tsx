import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CosmosNavigation } from '@/components/layout/CosmosNavigation'
import { ImageDetailModal } from '@/components/discovery/ImageDetailModal'
import { UploadModal } from '@/components/discovery/UploadModal'
import { AuthModal } from '@/components/discovery/AuthModal'
import { CreateBoardModal } from '@/components/discovery/CreateBoardModal'
import { MasonryGrid } from '@/components/discovery/MasonryGrid'
import { useDiscovery } from '@/context/DiscoveryContext'
import { Bookmark, Folder, Heart, Upload, MapPin, Sparkles, Settings } from 'lucide-react'

export const Profile: React.FC = () => {
  const { user, items, moodboards, setIsAuthOpen, setIsUploadOpen, setIsCreateBoardOpen } = useDiscovery()
  const [activeTab, setActiveTab] = useState<'saved' | 'boards' | 'uploads' | 'likes'>('saved')

  // Filtered lists for each tab
  const savedItems = items.filter((it) => user.savedItemIds.includes(it.id))
  const likedItems = items.filter((it) => user.likedItemIds.includes(it.id))
  const uploadedItems = items.filter((it) => user.uploadedItemIds.includes(it.id))
  const userMoodboards = moodboards.filter((b) => user.createdBoardIds.includes(b.id) || b.curator === user.name)

  return (
    <div className="min-h-screen bg-ink text-cream transition-colors duration-300">
      <CosmosNavigation />

      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* User Hero Header */}
        <div className="p-6 sm:p-10 rounded-2xl bg-carbon border border-graphite mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-ember shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-light text-2xl sm:text-4xl text-off-white">
                  {user.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-ember/20 text-ember text-[10px] font-mono uppercase">
                  Curator
                </span>
              </div>
              <p className="font-mono text-xs text-smoke mt-0.5">{user.handle} · Member since {user.joinedDate}</p>
              <p className="font-body font-light text-mist text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
                {user.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 rounded-full bg-ember text-off-white text-xs font-body uppercase tracking-wider font-medium hover:bg-ember-dim transition-colors"
            >
              + Upload
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2 rounded-full bg-ink border border-graphite text-smoke hover:text-cream transition-colors"
              title="Edit Profile"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 border-b border-graphite pb-4 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body uppercase tracking-wider transition-colors tap-transparent ${
              activeTab === 'saved'
                ? 'bg-cream text-ink font-medium shadow-sm'
                : 'text-smoke hover:text-cream bg-carbon/50 border border-graphite/50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Inspiration ({savedItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('boards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body uppercase tracking-wider transition-colors tap-transparent ${
              activeTab === 'boards'
                ? 'bg-cream text-ink font-medium shadow-sm'
                : 'text-smoke hover:text-cream bg-carbon/50 border border-graphite/50'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>My Moodboards ({userMoodboards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('uploads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body uppercase tracking-wider transition-colors tap-transparent ${
              activeTab === 'uploads'
                ? 'bg-cream text-ink font-medium shadow-sm'
                : 'text-smoke hover:text-cream bg-carbon/50 border border-graphite/50'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>My Uploads ({uploadedItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('likes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body uppercase tracking-wider transition-colors tap-transparent ${
              activeTab === 'likes'
                ? 'bg-cream text-ink font-medium shadow-sm'
                : 'text-smoke hover:text-cream bg-carbon/50 border border-graphite/50'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Liked ({likedItems.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'saved' && <MasonryGrid items={savedItems} />}

        {activeTab === 'likes' && <MasonryGrid items={likedItems} />}

        {activeTab === 'uploads' && (
          uploadedItems.length > 0 ? (
            <MasonryGrid items={uploadedItems} />
          ) : (
            <div className="py-20 text-center text-smoke">
              <Upload className="w-8 h-8 text-ember mx-auto mb-3" />
              <p className="text-sm font-body mb-3">You haven't uploaded any visual artifacts yet.</p>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="px-5 py-2 rounded-full bg-ember text-off-white text-xs font-body uppercase tracking-wider"
              >
                Upload your first image
              </button>
            </div>
          )
        )}

        {activeTab === 'boards' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsCreateBoardOpen(true)}
                className="px-4 py-2 rounded-full bg-carbon border border-graphite text-cream hover:border-ember text-xs font-body uppercase tracking-wider"
              >
                + Create New Moodboard
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userMoodboards.map((b) => (
                <div key={b.id} className="p-5 rounded-xl bg-carbon border border-graphite">
                  <h3 className="font-display text-xl text-off-white mb-1">{b.title}</h3>
                  <p className="font-body text-xs text-smoke mb-3">{b.description}</p>
                  <span className="font-mono text-xs text-ember">{b.itemIds.length} items</span>
                </div>
              ))}
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

export default Profile

