import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Image as ImageIcon, Check, Folder, Plus, Palette } from 'lucide-react'
import { useDiscovery } from '@/context/DiscoveryContext'
import { DISCOVERY_CATEGORIES, MOOD_CATEGORIES, CURATED_PALETTES } from '@/data/discoveryData'

export const UploadModal: React.FC = () => {
  const { isUploadOpen, setIsUploadOpen, uploadItem, moodboards, user } = useDiscovery()

  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState<'Architecture' | 'Interiors' | 'Objects' | 'Nocturne' | 'Spaces' | 'Tactile' | 'Typography'>('Architecture')
  const [selectedMoods, setSelectedMoods] = useState<string[]>(['Warm Minimal'])
  const [dominantColor, setDominantColor] = useState('#C4622D')
  const [location, setLocation] = useState('Kyoto, Japan')
  const [targetBoardId, setTargetBoardId] = useState(moodboards[0]?.id || '')

  if (!isUploadOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setImageUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood))
    } else {
      setSelectedMoods([...selectedMoods, mood])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || (!imageUrl && !imagePreview)) return

    uploadItem(
      {
        title: title.trim(),
        subtitle: subtitle.trim() || 'Curated member discovery',
        image: imagePreview || imageUrl,
        aspectRatio: 'aspect-[4/5]',
        category,
        moods: selectedMoods.length > 0 ? selectedMoods : ['Warm Minimal'],
        dominantColor,
        palette: [dominantColor, '#2C2926', '#EAE0D5', '#141312'],
        location: location.trim() || 'Earth',
        year: new Date().getFullYear().toString(),
        description: `Visual artifact uploaded by ${user.name} to the AFTERHOURS visual discovery archive.`,
        tags: [category.toLowerCase(), ...selectedMoods.map((m) => m.toLowerCase())],
        creator: {
          id: user.id,
          name: user.name,
          handle: user.handle,
          avatar: user.avatar,
          bio: user.bio,
          role: 'Curator',
          location: user.location,
          followersCount: 1,
          curatedCount: user.uploadedItemIds.length + 1,
        },
      },
      targetBoardId
    )

    // Reset and close
    setTitle('')
    setSubtitle('')
    setImageUrl('')
    setImagePreview('')
    setIsUploadOpen(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
        <div className="fixed inset-0 -z-10" onClick={() => setIsUploadOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-carbon border border-graphite rounded-2xl p-6 sm:p-8 shadow-2xl text-cream max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-graphite">
            <div>
              <h2 className="font-display font-light text-2xl text-off-white">
                Upload Visual Discovery
              </h2>
              <p className="font-body text-xs text-smoke">
                Add an aesthetic artifact to the AFTERHOURS archive and your moodboards.
              </p>
            </div>
            <button
              onClick={() => setIsUploadOpen(false)}
              className="p-2 rounded-full text-smoke hover:text-cream hover:bg-ash/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* Image Upload Area or URL */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-2">
                Image Source
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* File picker */}
                <label className="flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed border-graphite hover:border-ember bg-ink/50 cursor-pointer transition-colors p-4 text-center">
                  <Upload className="w-6 h-6 text-ember mb-2" />
                  <span className="text-xs font-body text-cream">Click or drop image file</span>
                  <span className="text-[10px] font-mono text-smoke/70 mt-1">PNG, JPG, WebP up to 10MB</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>

                {/* Preview or URL input */}
                <div className="flex flex-col justify-between h-44">
                  {imagePreview ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-graphite bg-black">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('')
                          setImageUrl('')
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-ink/80 text-cream"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center h-full p-4 rounded-xl bg-ink/50 border border-graphite">
                      <span className="text-xs font-body text-smoke mb-2">Or paste high-res image URL:</span>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value)
                          setImagePreview(e.target.value)
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-carbon border border-graphite text-xs text-cream focus:outline-none focus:border-ember"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1.5">
                  Artifact Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Raw Travertine Cantilever"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-ink/60 border border-graphite text-sm text-cream focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1.5">
                  Location / Studio
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. São Paulo, Brazil"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-ink/60 border border-graphite text-sm text-cream focus:outline-none focus:border-ember"
                />
              </div>
            </div>

            {/* Category & Moodboard assignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-ink/60 border border-graphite text-sm text-cream focus:outline-none focus:border-ember"
                >
                  {DISCOVERY_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1.5">
                  Add to Moodboard
                </label>
                <select
                  value={targetBoardId}
                  onChange={(e) => setTargetBoardId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-ink/60 border border-graphite text-sm text-cream focus:outline-none focus:border-ember"
                >
                  {moodboards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mood Tags */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1.5">
                Aesthetic Moods (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {MOOD_CATEGORIES.filter((m) => m !== 'All').map((mood) => {
                  const isSelected = selectedMoods.includes(mood)
                  return (
                    <button
                      type="button"
                      key={mood}
                      onClick={() => toggleMood(mood)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-body transition-colors ${
                        isSelected
                          ? 'bg-ember text-off-white font-medium'
                          : 'bg-ink/50 text-smoke hover:text-cream border border-graphite'
                      }`}
                    >
                      {mood}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dominant Color Swatch Picker */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-smoke mb-1.5">
                Dominant Chromatic Tone
              </label>
              <div className="flex items-center gap-2">
                {CURATED_PALETTES.map((palette) => (
                  <button
                    type="button"
                    key={palette.hex}
                    onClick={() => setDominantColor(palette.hex)}
                    className={`w-7 h-7 rounded-full border transition-transform ${
                      dominantColor === palette.hex ? 'scale-110 ring-2 ring-ember' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: palette.hex }}
                    title={palette.name}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-graphite flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-body text-smoke hover:text-cream transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!title.trim() || (!imageUrl && !imagePreview)}
                className="px-6 py-2.5 rounded-full bg-ember hover:bg-ember-dim text-off-white text-xs font-body font-medium uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                Publish to Archive
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

