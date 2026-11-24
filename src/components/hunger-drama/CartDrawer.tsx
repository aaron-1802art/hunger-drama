import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ArrowRight, MessageSquareText, ShoppingBag } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartNote,
    setCartNote,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    checkoutWhatsApp,
    clearCart,
  } = useHungerDrama()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-hd-charcoal/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-hd-cream border-l-2 border-hd-charcoal shadow-2xl flex flex-col justify-between p-6 sm:p-8"
          >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-hd-charcoal">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-hd-red" />
              <h2 className="font-display text-2xl text-hd-charcoal">
                YOUR ORDER BAG ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full bg-hd-white border-2 border-hd-charcoal shadow-drama-pop hover:bg-hd-red hover:text-hd-cream transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-hd-charcoal/70">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-hd-charcoal flex items-center justify-center mb-4 shadow-[3px_3px_0px_#292525]">
                  <ShoppingBag className="w-8 h-8 text-hd-charcoal" />
                </div>
                <h3 className="font-display text-2xl text-hd-charcoal mb-1">BAG IS EMPTY!</h3>
                <p className="font-body text-xs max-w-xs mb-6">
                  The drama hasn’t started yet. Explore the menu to pick your favourite dishes!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-hd-red text-hd-cream font-heading text-xs uppercase tracking-wider border-2 border-hd-charcoal shadow-drama-pop"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-hd-white border-2 border-hd-charcoal shadow-drama-pop flex items-center gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = BRAND_CONFIG.mascotImage
                      e.currentTarget.className = 'w-16 h-16 rounded-lg object-contain p-2 bg-[#292525] border border-hd-charcoal/40 flex-shrink-0'
                    }}
                    className="w-16 h-16 rounded-lg object-cover border border-hd-charcoal/40 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.dietary === 'veg' ? 'bg-green-600' : 'bg-hd-red'
                        }`}
                      />
                      <h4 className="font-display text-lg text-hd-charcoal leading-tight truncate">
                        {item.name}
                      </h4>
                    </div>
                    <div className="font-mono text-xs font-semibold text-hd-red">
                      {BRAND_CONFIG.currencySymbol}{item.price * quantity}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-hd-cream border border-hd-charcoal flex items-center justify-center text-hd-charcoal hover:bg-hd-red hover:text-hd-cream"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-5 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-hd-cream border border-hd-charcoal flex items-center justify-center text-hd-charcoal hover:bg-hd-red hover:text-hd-cream"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-hd-charcoal/50 hover:text-hd-red transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="pt-4 pb-safe border-t-2 border-hd-charcoal space-y-3">
              {/* Optional Kitchen Note Input */}
              <div>
                <label htmlFor="cart-kitchen-note" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-hd-charcoal/70 mb-1">
                  Kitchen Note (Optional):
                </label>
                <input
                  id="cart-kitchen-note"
                  type="text"
                  value={cartNote}
                  onChange={(e) => setCartNote(e.target.value)}
                  placeholder="e.g. less spicy, no onion, extra napkins"
                  className="w-full px-3 py-2 text-xs font-body rounded-xl border border-hd-charcoal/30 bg-hd-white focus:outline-none focus:ring-2 focus:ring-hd-red text-hd-charcoal"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-hd-charcoal/70">
                  Subtotal
                </span>
                <span className="font-mono text-xl font-bold text-hd-charcoal">
                  {BRAND_CONFIG.currencySymbol}{cartTotal}
                </span>
              </div>

              {/* Order via WhatsApp Button */}
              <button
                onClick={checkoutWhatsApp}
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading text-xs uppercase tracking-wider border-2 border-hd-charcoal shadow-drama-pop flex items-center justify-center gap-2 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Send Order on WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-hd-charcoal/60 px-1">
                <span>Fast & direct order message</span>
                <button
                  onClick={clearCart}
                  className="text-hd-charcoal/70 hover:text-hd-red underline"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  )
}
