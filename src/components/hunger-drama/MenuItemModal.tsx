import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, MessageCircle, Flame, Check } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const MenuItemModal: React.FC = () => {
  const { activeItem, setActiveItem, addToCart, orderItemDirectly } = useHungerDrama()
  const [justAdded, setJustAdded] = React.useState(false)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null)
      }
    }
    if (activeItem) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeItem, setActiveItem])

  if (!activeItem) return null

  const handleAdd = () => {
    addToCart(activeItem)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 bg-[#292525]/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#FFF1E1] border-2 border-[#292525] rounded-3xl shadow-2xl z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-3.5 right-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur border border-[#292525] flex items-center justify-center text-[#292525] hover:bg-[#FF382E] hover:text-white transition-all shadow-md active:scale-90"
            aria-label="Close modal"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Modal Image Header */}
          <div className="relative h-48 sm:h-72 w-full overflow-hidden bg-[#292525]">
            <img
              src={activeItem.image}
              alt={activeItem.name}
              onError={(e) => {
                e.currentTarget.src = BRAND_CONFIG.mascotImage
                e.currentTarget.className = 'w-full h-full object-contain p-8 bg-[#292525]'
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292525]/80 via-transparent to-transparent" />

            {/* Badges on Image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 bg-[#292525]/90 backdrop-blur text-white text-xs font-mono font-medium tracking-wider uppercase rounded-full border border-white/20">
                {activeItem.category}
              </span>

              <div className="flex items-center gap-2">
                {activeItem.act && (
                  <span className="px-2.5 py-0.5 bg-[#FFC342] text-[#292525] text-[11px] font-bold uppercase rounded-full">
                    {activeItem.act}
                  </span>
                )}
                {/* Dietary Tag */}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeItem.dietary === 'veg'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeItem.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  />
                  {activeItem.dietary === 'veg' ? 'VEG' : 'NON-VEG'}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-5 sm:p-8">
            <div className="flex items-start justify-between gap-3 mb-2.5 sm:mb-3">
              <h3 className="font-display text-xl sm:text-3xl font-bold tracking-tight text-[#292525]">
                {activeItem.name}
              </h3>
              <div className="text-right flex-shrink-0">
                <span className="text-xl sm:text-3xl font-display font-bold text-[#FF382E]">
                  {BRAND_CONFIG.currencySymbol}{activeItem.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#292525]/80 font-body text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
              {activeItem.description}
            </p>

            {/* Dietary & Spice Meta Info */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-2.5 sm:py-3 border-y border-[#292525]/15 mb-5 sm:mb-6 text-[11px] sm:text-xs font-mono text-[#292525]/70">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-[#292525]">Dietary:</span>{' '}
                {activeItem.dietary === 'veg' ? '100% Vegetarian' : 'Non-Vegetarian'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-[#292525]">Spice:</span>
                {activeItem.spiceLevel === 'spicy' ? (
                  <span className="inline-flex items-center text-[#FF382E] font-bold">
                    <Flame size={13} className="inline mr-0.5" /> Hot & Spicy
                  </span>
                ) : activeItem.spiceLevel === 'medium' ? (
                  <span className="inline-flex items-center text-amber-700">
                    <Flame size={13} className="inline mr-0.5" /> Medium Kick
                  </span>
                ) : (
                  <span>Mild Comfort</span>
                )}
              </span>
              <span>•</span>
              <span>
                <span className="font-semibold text-[#292525]">Serving:</span> Fresh to Order
              </span>
            </div>

            {/* Dual CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className={`flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl font-display text-sm tracking-wide transition-all shadow-sm active:scale-95 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#292525] text-white hover:bg-[#292525]/90'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={18} /> ADDED TO BAG!
                  </>
                ) : (
                  <>
                    <Plus size={18} /> ADD TO ORDER ({BRAND_CONFIG.currencySymbol}{activeItem.price})
                  </>
                )}
              </button>

              {/* Direct WhatsApp Order */}
              <button
                onClick={() => orderItemDirectly(activeItem)}
                className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#FF382E] text-white font-display text-sm tracking-wide hover:bg-[#e02d24] transition-all shadow-md active:scale-95"
              >
                <MessageCircle size={18} />
                ORDER ON WHATSAPP
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

