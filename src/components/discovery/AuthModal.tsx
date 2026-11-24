import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Check, Shield, Sparkles, LogOut, ExternalLink } from 'lucide-react'
import { useDiscovery } from '@/context/DiscoveryContext'
import { CREATORS } from '@/data/discoveryData'

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, user, loginDemoUser, logout, updateProfile } = useDiscovery()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio)
  const [location, setLocation] = useState(user.location)

  if (!isAuthOpen) return null

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, bio, location })
    setIsEditing(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="fixed inset-0 -z-10" onClick={() => setIsAuthOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-carbon border border-graphite rounded-2xl p-6 sm:p-7 shadow-2xl text-cream"
        >
          {/* Close button */}
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 text-smoke hover:text-cream rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* User Profile Card */}
          <div className="text-center pt-2 pb-6 border-b border-graphite">
            <div className="relative inline-block mb-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-ember shadow-md mx-auto"
              />
              <span className="absolute bottom-0 right-0 p-1 rounded-full bg-ember text-white">
                <Sparkles className="w-3 h-3" />
              </span>
            </div>

            <h2 className="font-display font-light text-2xl text-off-white">
              {user.name}
            </h2>
            <p className="font-mono text-xs text-ember mt-0.5">{user.handle}</p>
            <p className="font-body font-light text-smoke text-xs max-w-xs mx-auto mt-2 leading-relaxed">
              {user.bio}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-graphite/40">
              <div className="p-2 rounded-lg bg-ink/50 border border-graphite/30">
                <span className="block font-mono text-base text-cream">{user.createdBoardIds.length}</span>
                <span className="text-[10px] font-mono uppercase text-smoke">Boards</span>
              </div>
              <div className="p-2 rounded-lg bg-ink/50 border border-graphite/30">
                <span className="block font-mono text-base text-cream">{user.savedItemIds.length}</span>
                <span className="text-[10px] font-mono uppercase text-smoke">Saved</span>
              </div>
              <div className="p-2 rounded-lg bg-ink/50 border border-graphite/30">
                <span className="block font-mono text-base text-cream">{user.likedItemIds.length}</span>
                <span className="text-[10px] font-mono uppercase text-smoke">Likes</span>
              </div>
            </div>
          </div>

          {/* Edit bio or Demo Accounts */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="py-4 space-y-3">
              <div>
                <label className="block text-[10px] font-mono uppercase text-smoke mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-ink border border-graphite text-xs text-cream focus:border-ember focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-smoke mb-1">Curatorial Bio</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-ink border border-graphite text-xs text-cream focus:border-ember focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-full text-xs text-smoke hover:text-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-ember text-off-white text-xs font-medium"
                >
                  Save Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="py-4 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-smoke">
                Switch Active Discovery Persona
              </div>

              {/* Persona 1: Elena Rostova */}
              <button
                onClick={() => loginDemoUser('curator')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
                  user.handle === '@elena.arch'
                    ? 'border-ember bg-ember/10 text-cream'
                    : 'border-graphite bg-ink/40 hover:bg-ink text-smoke hover:text-cream'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80&fit=crop"
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-body text-xs text-cream font-medium">Elena Rostova</div>
                    <div className="font-mono text-[10px] text-smoke">Spatial Researcher & Curator</div>
                  </div>
                </div>
                {user.handle === '@elena.arch' && <Check className="w-4 h-4 text-ember" />}
              </button>

              {/* Persona 2: Kenji Takahashi */}
              <button
                onClick={() => loginDemoUser('architect')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
                  user.handle === '@kenji_t'
                    ? 'border-ember bg-ember/10 text-cream'
                    : 'border-graphite bg-ink/40 hover:bg-ink text-smoke hover:text-cream'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop"
                    alt=""
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-body text-xs text-cream font-medium">Kenji Takahashi</div>
                    <div className="font-mono text-[10px] text-smoke">Architect & Concrete Specialist</div>
                  </div>
                </div>
                {user.handle === '@kenji_t' && <Check className="w-4 h-4 text-ember" />}
              </button>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-body text-ember hover:underline"
                >
                  Edit Profile Details
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-xs font-mono text-smoke hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

