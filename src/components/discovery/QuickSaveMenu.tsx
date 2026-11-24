import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Check, Plus, Folder, Lock } from 'lucide-react'
import { useDiscovery } from '@/context/DiscoveryContext'
import { VisualItem } from '@/data/discoveryData'

interface QuickSaveMenuProps {
  item: VisualItem
  isOpen: boolean
  onClose: () => void
}

export const QuickSaveMenu: React.FC<QuickSaveMenuProps> = ({ item, isOpen, onClose }) => {
  const { moodboards, addItemToMoodboard, removeItemFromMoodboard, setIsCreateBoardOpen } = useDiscovery()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside)
    }
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: -5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -5 }}
        transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute right-0 top-11 z-50 w-64 p-2 rounded-xl bg-ink/95 backdrop-blur-xl border border-graphite shadow-2xl text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-graphite/60 text-[11px] font-mono uppercase tracking-wider text-smoke">
          <span>Save to Moodboard</span>
        </div>

        <div className="max-h-52 overflow-y-auto py-1 space-y-0.5 no-scrollbar">
          {moodboards.map((board) => {
            const hasItem = board.itemIds.includes(item.id)
            return (
              <button
                key={board.id}
                onClick={() => {
                  if (hasItem) {
                    removeItemFromMoodboard(item.id, board.id)
                  } else {
                    addItemToMoodboard(item.id, board.id)
                  }
                }}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs font-body hover:bg-carbon transition-colors group"
              >
                <div className="flex items-center gap-2 truncate">
                  <Folder className="w-3.5 h-3.5 text-smoke group-hover:text-ember transition-colors flex-shrink-0" />
                  <span className="truncate text-cream/90">{board.title}</span>
                  {board.isPrivate && <Lock className="w-2.5 h-2.5 text-smoke/60" />}
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                  <span className="font-mono text-[10px] text-smoke">{board.itemIds.length}</span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                      hasItem ? 'bg-ember text-off-white' : 'border border-graphite group-hover:border-smoke'
                    }`}
                  >
                    {hasItem && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="pt-1.5 mt-1 border-t border-graphite/60">
          <button
            onClick={() => {
              onClose()
              setIsCreateBoardOpen(true)
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-body text-ember hover:bg-carbon transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create new moodboard</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

