import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowDown, Sparkles } from 'lucide-react'
import { BRAND_CONFIG, createWhatsAppGeneralMessageUrl } from '@/data/hungerDramaData'
import { useHungerDrama } from '@/context/HungerDramaContext'

export const FinalCTA: React.FC = () => {
  const { cart, checkoutWhatsApp } = useHungerDrama()

  const handleOrderClick = () => {
    if (cart.length > 0) {
      checkoutWhatsApp()
    } else {
      const url = createWhatsAppGeneralMessageUrl(
        `Hey Hunger Drama! 👋 I'm ready to order from the menu. What are today's top specials?`
      )
      window.open(url, '_blank')
    }
  }

  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-14 sm:py-28 bg-[#FF382E] text-white relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFC342]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Headline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#FFF1E1] text-xs font-mono font-bold tracking-wider uppercase mb-4 sm:mb-5 backdrop-blur">
          <Sparkles size={13} />
          <span>ZERO DRAMA ORDERING</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-5 sm:mb-6 text-white max-w-4xl mx-auto">
          CRAVING SOMETHING?
          <br />
          LET'S MAKE IT WORTH IT.
        </h2>

        <p className="font-body text-base sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          Fresh, crispy, cheesy, and spicy. No waiting in lines, no generic takeout. Tap below to send
          your craving straight to our kitchen on WhatsApp.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={handleOrderClick}
            className="w-full sm:w-auto justify-center px-6 py-3.5 sm:px-8 sm:py-[18px] rounded-full bg-[#292525] text-white hover:bg-black font-display text-sm sm:text-base tracking-wider uppercase transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3 active:scale-95"
          >
            <MessageCircle size={20} className="text-[#FFC342]" />
            <span>ORDER VIA WHATSAPP</span>
          </button>

          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto justify-center px-6 py-3.5 sm:px-8 sm:py-[18px] rounded-full bg-white text-[#292525] hover:bg-[#FFF1E1] font-display text-sm sm:text-base tracking-wider uppercase transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-2 active:scale-95"
          >
            <span>EXPLORE FULL MENU</span>
            <ArrowDown size={18} />
          </button>
        </div>

        {/* Bottom Fast Assurance Strip */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-3 sm:gap-12 text-[11px] sm:text-xs font-mono text-white/90">
          <span>⚡ INSTANT WHATSAPP DISPATCH</span>
          <span>•</span>
          <span>🍟 100% FRESH SIZZLING PREP</span>
          <span>•</span>
          <span>🌶️ CUSTOMISABLE SPICE LEVELS</span>
        </div>
      </div>
    </section>
  )
}
