import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FolderPlus, Lock, Globe } from 'lucide-react'
import { useDiscovery } from '@/context/DiscoveryContext'

export const CreateBoardModal: React.FC = () => {
  const { isCreateBoardOpen, setIsCreateBoardOpen, createMoodboard } = useDiscovery()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  if (!isCreateBoardOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    createMoodboard(title.trim(), description.trim(), tags, isPrivate)

    setTitle('')
    setDescription('')
    setTagsInput('')
    setIsPrivate(false)
    setIsCreateBoardOpen(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="fixed inset-0 -z-10" onClick={() => setIsCreateBoardOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-carbon border border-graphite rounded-2xl p-6 sm:p-7 shadow-2xl text-cream"
        >
          <div className="flex items-center justify-between pb-4 border-b border-graphite">
            <div className="flex items-center gap-2.5">
              <FolderPlus className="w-5 h-5 text-ember" />
              <h2 className="font-display font-light text-xl text-off-white">
                Create Moodboard
              </h2>
            </div>
            <button
              onClick={() => setIsCreateBoardOpen(false)}
              className="p-1.5 rounded-full text-smoke hover:text-cream transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1">
                Board Name *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Nordic Sanctuary, São Paulo Concrete..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-ink border border-graphite text-sm text-cream focus:outline-none focus:border-ember"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Evocative description of this visual aesthetic..."
                className="w-full px-3.5 py-2 rounded-lg bg-ink border border-graphite text-xs text-cream focus:outline-none focus:border-ember"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="architecture, linen, brutalism"
                className="w-full px-3.5 py-2 rounded-lg bg-ink border border-graphite text-xs text-cream focus:outline-none focus:border-ember"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsPrivate(!isPrivate)}
                className="flex items-center gap-2 text-xs font-body text-smoke hover:text-cream"
              >
                {isPrivate ? <Lock className="w-4 h-4 text-ember" /> : <Globe className="w-4 h-4 text-smoke" />}
                <span>{isPrivate ? 'Secret Board (Only you)' : 'Public Moodboard'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-graphite flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsCreateBoardOpen(false)}
                className="px-4 py-2 rounded-full text-xs text-smoke hover:text-cream"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-5 py-2 rounded-full bg-ember hover:bg-ember-dim text-off-white text-xs font-medium uppercase tracking-wider transition-all disabled:opacity-40"
              >
                Create Board
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

