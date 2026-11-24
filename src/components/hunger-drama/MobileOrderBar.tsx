import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { BRAND_CONFIG } from '@/data/hungerDramaData'
import { trackEvent } from '@/utils/analytics'

export const MobileOrderBar: React.FC = () => {
  const { cart, cartCount, cartTotal, setIsCartOpen, checkoutWhatsApp } = useHungerDrama()
  const [footerVisible, setFooterVisible] = useState(false)

  // Hide sticky bar when footer is in view
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const handleOrderClick = () => {
    trackEvent({ type: 'whatsapp_order_click', context: 'sticky_bar', total: cartTotal })
    if (cart.length > 0) {
      setIsCartOpen(true)
    } else {
      const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        'Hello Hunger Drama! 🍟 I would like to place an order from your Vikaspuri kitchen.'
      )}`
      window.open(url, '_blank')
    }
  }

  // Hidden on tablet/desktop and when footer is visible
  if (footerVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-gradient-to-t from-[#292525]/90 via-[#292525]/80 to-transparent pointer-events-none pb-safe">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={handleOrderClick}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white border-2 border-[#292525] shadow-[4px_4px_0px_#292525] flex items-center justify-between active:scale-98 transition-all"
          aria-label={cartCount > 0 ? `Review order of ${cartCount} items` : 'Order on WhatsApp'}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageCircle size={18} className="text-white fill-white" />
            </div>
            <div className="text-left">
              <span className="font-display text-sm font-black tracking-wider uppercase block leading-tight">
                {cartCount > 0 ? 'REVIEW ORDER & SEND' : 'ORDER ON WHATSAPP'}
              </span>
              <span className="font-mono text-[10px] text-white/90">
                {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''} in Bag · ₹${cartTotal}` : 'Fast kitchen dispatch'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-display text-xs uppercase tracking-wider bg-[#292525] text-white px-3 py-1.5 rounded-xl shadow-xs">
            <span>{cartCount > 0 ? `₹${cartTotal}` : 'ORDER'}</span>
            <ArrowRight size={13} />
          </div>
        </button>
      </div>
    </div>
  )
}

