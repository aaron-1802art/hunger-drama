import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Flame, Sparkles, Plus, Check, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react'
import { BRAND_CONFIG, MENU_ITEMS, MenuItem } from '@/data/hungerDramaData'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { playCrunch } from '@/hooks/useSoundEngine'

export const BuildYourDrama: React.FC = () => {
  const { cart, addToCart } = useHungerDrama()

  // Base dishes to choose from (wraps, sandwiches, fries, maggi)
  const baseCandidates = useMemo(() => {
    return MENU_ITEMS.filter(
      (item) =>
        item.categorySlug === 'sandwiches' ||
        item.categorySlug === 'fries' ||
        item.categorySlug === 'maggi'
    )
  }, [])

  // Optional extras (Dips category from menu)
  const availableExtras = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.categorySlug === 'dips')
  }, [])

  // State
  const [selectedDishId, setSelectedDishId] = useState<string>(
    baseCandidates[0]?.id || 'wrap-paneer-crunch'
  )
  const [spiceLevel, setSpiceLevel] = useState<number>(3)
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([])
  const [customerNotes, setCustomerNotes] = useState<string>('')
  const [addedDirectly, setAddedDirectly] = useState<boolean>(false)

  const selectedDish = useMemo(() => {
    return MENU_ITEMS.find((it) => it.id === selectedDishId) || baseCandidates[0]
  }, [selectedDishId, baseCandidates])

  const selectedExtras = useMemo(() => {
    return availableExtras.filter((extra) => selectedExtraIds.includes(extra.id))
  }, [availableExtras, selectedExtraIds])

  const toggleExtra = (id: string) => {
    setSelectedExtraIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Calculate total: dish price + extras price. Validate that every item has a valid numeric price.
  const allItemsHavePrice = useMemo(() => {
    if (!selectedDish || typeof selectedDish.price !== 'number' || isNaN(selectedDish.price)) {
      return false
    }
    return selectedExtras.every((ext) => typeof ext.price === 'number' && !isNaN(ext.price))
  }, [selectedDish, selectedExtras])

  const totalCalculatedPrice = useMemo(() => {
    if (!allItemsHavePrice || !selectedDish) return null
    const extrasSum = selectedExtras.reduce((sum, item) => sum + (item.price || 0), 0)
    return selectedDish.price + extrasSum
  }, [allItemsHavePrice, selectedDish, selectedExtras])

  // Mascot spice reaction
  const spiceReactions = [
    { label: 'Mild Comfort', emoji: '😌', text: 'Gentle & cozy.', mascot: 'happy' },
    { label: 'Medium Zing', emoji: '😋', text: 'A playful kick.', mascot: 'happy' },
    { label: 'Hot Drama', emoji: '💦', text: 'Sweating... so spicy!', mascot: 'sweat' },
    { label: 'Fiery Scene', emoji: '🔥', text: 'Flames on the stage!', mascot: 'fire' },
    { label: 'EXTREME FIRE', emoji: '🚒', text: 'BREATHING FULL FIRE!! 🔥🔥', mascot: 'dragon' },
  ]

  const currentSpice = spiceReactions[Math.max(0, Math.min(4, spiceLevel - 1))]

  // Generate WhatsApp order message
  const handleSendToKitchen = () => {
    if (!selectedDish) return

    const spiceText = `Level ${spiceLevel}/5 (${currentSpice.label})`
    const extrasText =
      selectedExtras.length > 0
        ? selectedExtras.map((e) => `  + ${e.name} (₹${e.price || 0})`).join('\n')
        : '  None'

    let message = `Hello Hunger Drama! 🍟🎬\n\nI just built my custom drama order:\n`
    message += `• *Dish:* ${selectedDish.name} (₹${selectedDish.price || 'N/A'})\n`
    message += `• *Spice Level:* ${spiceText}\n`
    message += `• *Dips / Extras:*\n${extrasText}\n`

    if (totalCalculatedPrice !== null) {
      message += `• *Custom Dish Total:* ₹${totalCalculatedPrice}\n`
    }

    if (customerNotes.trim()) {
      message += `• *Special Instructions:* ${customerNotes.trim()}\n`
    }

    // Include existing cart items if any exist
    if (cart.length > 0) {
      message += `\n*Also from my Cart:*\n`
      cart.forEach((c) => {
        message += `• ${c.item.name} (x${c.quantity}) — ₹${c.item.price * c.quantity}\n`
      })
      const cartTotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0)
      const grandTotal = totalCalculatedPrice !== null ? totalCalculatedPrice + cartTotal : cartTotal
      message += `\n*Grand Total Estimated:* ₹${grandTotal}\n`
    }

    message += `\n*Delivery Info:*\nName:\nPhone:\nDelivery Address:\n\nPlease confirm availability and delivery time!`

    const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const handleAddCustomToCart = () => {
    if (!selectedDish) return
    playCrunch()
    addToCart(selectedDish)
    selectedExtras.forEach((extra) => addToCart(extra))
    setAddedDirectly(true)
    setTimeout(() => setAddedDirectly(false), 2000)
  }

  return (
    <section id="build-your-drama" className="py-14 sm:py-28 bg-[#FFF1E1] border-y-2 border-[#292525] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF382E] text-white text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <Sparkles size={13} />
            <span>DIRECTOR’S CUT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#292525] uppercase tracking-[-0.01em]">
            BUILD YOUR DRAMA.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#292525]/80 mt-2">
            You hold the clapperboard. Pick your base, tune your heat, pile on the dips, and send the scene straight to our kitchen.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Step 1: Choose Base Dish */}
            <div className="bg-white border-2 border-[#292525] rounded-3xl p-4 sm:p-7 shadow-[4px_4px_0px_#292525]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase text-[#FF382E] tracking-wider">
                  STEP 01
                </span>
                <span className="font-mono text-xs text-[#292525]/60 font-semibold">
                  SELECT BASE DISH
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#292525] uppercase mb-4">
                CHOOSE YOUR LEAD CHARACTER
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                {baseCandidates.slice(0, 8).map((item) => {
                  const isSelected = item.id === selectedDishId
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedDishId(item.id)}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#FF382E] bg-[#FF382E]/5 shadow-sm'
                          : 'border-[#292525]/20 hover:border-[#292525] bg-white'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="font-display text-sm font-bold text-[#292525] line-clamp-1">
                          {item.name}
                        </div>
                        <div className="font-mono text-xs text-[#292525]/60">
                          {item.category}
                        </div>
                      </div>
                      <div className="font-display text-sm font-bold text-[#FF382E] flex-shrink-0">
                        ₹{item.price}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Set Spice Level 1 to 5 */}
            <div className="bg-white border-2 border-[#292525] rounded-3xl p-4 sm:p-7 shadow-[4px_4px_0px_#292525]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase text-[#FF382E] tracking-wider">
                  STEP 02
                </span>
                <span className="font-mono text-xs text-[#292525]/60 font-semibold">
                  HEAT INTENSITY
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#292525] uppercase flex items-center gap-2">
                  <Flame size={20} className={spiceLevel >= 3 ? 'text-[#FF382E]' : 'text-[#FFC342]'} />
                  SPICE LEVEL: {spiceLevel} / 5
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-[#292525] text-white font-mono text-[11px] sm:text-xs font-bold">
                  {currentSpice.label}
                </span>
              </div>

              {/* Slider */}
              <div className="py-3 sm:py-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={spiceLevel}
                  onChange={(e) => setSpiceLevel(parseInt(e.target.value, 10))}
                  aria-label="Spice level slider from 1 to 5"
                  className="w-full h-3 bg-[#FFF1E1] border-2 border-[#292525] rounded-lg appearance-none cursor-pointer accent-[#FF382E]"
                />
                <div className="flex justify-between text-[11px] sm:text-xs font-mono font-bold text-[#292525]/70 mt-2 px-1">
                  <span>1 (Gentle)</span>
                  <span>2</span>
                  <span>3 (Hot)</span>
                  <span>4</span>
                  <span>5 (Inferno)</span>
                </div>
              </div>

              {/* Live Spice Reaction Box */}
              <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-[#FFF1E1] border border-[#292525]/15 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#292525]/20 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  {currentSpice.emoji}
                </div>
                <div>
                  <div className="font-mono text-[11px] sm:text-xs font-bold text-[#292525] uppercase">
                    Spice Profile:
                  </div>
                  <div className="font-body text-xs sm:text-sm text-[#FF382E] font-semibold">
                    "{currentSpice.text}"
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Pick Optional Dips / Extras */}
            <div className="bg-white border-2 border-[#292525] rounded-3xl p-4 sm:p-7 shadow-[4px_4px_0px_#292525]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase text-[#FF382E] tracking-wider">
                  STEP 03
                </span>
                <span className="font-mono text-xs text-[#292525]/60 font-semibold">
                  SUPPORTING CAST
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#292525] uppercase mb-4">
                PICK YOUR DIPS & EXTRAS
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableExtras.map((extra) => {
                  const isChecked = selectedExtraIds.includes(extra.id)
                  return (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        isChecked
                          ? 'border-[#292525] bg-[#FFC342] shadow-[2px_2px_0px_#292525]'
                          : 'border-[#292525]/20 hover:border-[#292525] bg-[#FFF1E1]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-4 h-4 rounded-full border border-[#292525] flex items-center justify-center bg-white">
                          {isChecked && <Check size={12} className="text-[#292525] stroke-[3]" />}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#292525]">
                          +₹{extra.price}
                        </span>
                      </div>
                      <div className="font-display text-xs font-bold text-[#292525] line-clamp-1">
                        {extra.name}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Special Instructions */}
              <div className="mt-5">
                <label htmlFor="customer-notes" className="block font-mono text-xs font-bold text-[#292525]/70 uppercase mb-2">
                  Special Instructions / Requests:
                </label>
                <input
                  id="customer-notes"
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="e.g. crispy fries, extra napkins, cutlery..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF1E1]/50 border border-[#292525]/20 text-xs font-body text-[#292525] focus:outline-none focus:ring-2 focus:ring-[#FF382E]"
                />
              </div>
            </div>
          </div>

          {/* Live Order Summary Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#292525] text-white border-3 border-[#292525] rounded-3xl p-5 sm:p-7 shadow-[6px_6px_0px_#FF382E]">
              {/* Slate Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-[#FFC342] uppercase tracking-widest block">
                    PRODUCTION TICKET
                  </span>
                  <h4 className="font-display text-2xl font-black uppercase text-white">
                    LIVE SCENE SUMMARY
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-[#FFC342]" />
                </div>
              </div>

              {/* Dish Line */}
              <div className="space-y-4 font-body text-sm">
                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase block">Dish:</span>
                    <span className="font-display text-lg text-white font-bold">
                      {selectedDish ? selectedDish.name : 'None selected'}
                    </span>
                  </div>
                  <span className="font-display text-lg text-[#FFC342]">
                    {selectedDish && typeof selectedDish.price === 'number'
                      ? `₹${selectedDish.price}`
                      : '—'}
                  </span>
                </div>

                {/* Spice Line */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-white/50 uppercase block">Spice Level:</span>
                    <span className="font-mono text-sm text-[#FF382E] font-bold">
                      Level {spiceLevel}/5 · {currentSpice.label}
                    </span>
                  </div>
                  <span className="text-xl">{currentSpice.emoji}</span>
                </div>

                {/* Extras List */}
                <div className="pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-white/50 uppercase block mb-1">
                    Dips & Extras ({selectedExtras.length}):
                  </span>
                  {selectedExtras.length === 0 ? (
                    <span className="font-body text-xs text-white/50 italic">None selected</span>
                  ) : (
                    <div className="space-y-1">
                      {selectedExtras.map((ext) => (
                        <div key={ext.id} className="flex justify-between text-xs text-white/80">
                          <span>+ {ext.name}</span>
                          <span className="font-mono text-[#FFC342]">₹{ext.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Inclusion Notice */}
                {cart.length > 0 && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                    <span className="text-[#FFC342] font-bold block mb-1">
                      + CART INCLUDED ({cart.length} item{cart.length > 1 ? 's' : ''}):
                    </span>
                    {cart.map((c) => (
                      <div key={c.item.id} className="flex justify-between text-[11px] text-white/60">
                        <span>{c.item.name} x{c.quantity}</span>
                        <span>₹{c.item.price * c.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="pt-6 mt-4 border-t-2 border-white/20 flex items-end justify-between mb-6">
                <div>
                  <span className="font-mono text-xs text-white/60 uppercase block">
                    TOTAL ESTIMATED
                  </span>
                  <span className="text-[11px] font-mono text-white/40">
                    Includes all extras
                  </span>
                </div>
                <div className="text-right">
                  {totalCalculatedPrice !== null ? (
                    <span className="font-display text-4xl font-black text-[#FFC342]">
                      ₹
                      {cart.length > 0
                        ? totalCalculatedPrice +
                          cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0)
                        : totalCalculatedPrice}
                    </span>
                  ) : (
                    <span className="font-mono text-sm text-white/50">Price TBD</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSendToKitchen}
                  className="w-full py-3.5 sm:py-4 px-3 rounded-2xl bg-[#FF382E] hover:bg-[#e02d24] text-white font-display text-sm sm:text-base tracking-wider uppercase transition-all shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} className="text-[#FFC342]" />
                  <span>SEND TO KITCHEN ON WHATSAPP</span>
                </button>

                <button
                  onClick={handleAddCustomToCart}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  {addedDirectly ? (
                    <>
                      <Check size={16} className="text-emerald-400" />
                      <span>ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>ADD ALL TO CART FIRST</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

