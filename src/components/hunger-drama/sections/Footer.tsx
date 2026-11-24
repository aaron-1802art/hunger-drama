import React, { useState } from 'react'
import { MessageCircle, Heart, ArrowUp, ShieldCheck } from 'lucide-react'
import { InstagramIcon } from '../Icons'
import { BRAND_CONFIG, MENU_CATEGORIES } from '@/data/hungerDramaData'
import { useHungerDrama } from '@/context/HungerDramaContext'
import { EndCredits } from './EndCredits'
import { LegalModal, LegalDocType } from '../LegalModal'

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useHungerDrama()
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug)
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#292525] text-[#FFF1E1] pt-16 pb-12 border-t-2 border-[#292525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Mascot Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Logo & Mascot in header format */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 relative rounded-xl bg-[#FFF1E1] p-1 flex items-center justify-center border border-white/10">
                  <img
                    src={BRAND_CONFIG.mascotImage}
                    alt="Hunger Drama"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-display text-2xl font-black tracking-tight text-[#FFF1E1] block uppercase">
                    {BRAND_CONFIG.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#FFC342] tracking-widest uppercase block">
                    {BRAND_CONFIG.tagline}
                  </span>
                </div>
              </div>

              <p className="font-body text-sm text-[#FFF1E1]/70 leading-relaxed max-w-sm mb-6">
                Not just food. It’s a whole scene. Handcrafting unforgettable street-style loaded
                bites, cold shakes, and dessert twists with zero boring moments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF382E] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Menu Categories (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFC342] mb-4">
              MENU CATEGORIES
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="text-left font-body text-xs text-[#FFF1E1]/70 hover:text-white hover:translate-x-1 transition-all py-1"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Service Hours & Direct Order (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFC342] mb-4">
              KITCHEN DRAMA HOURS
            </h4>
            <div className="space-y-2 text-xs font-mono text-[#FFF1E1]/70 mb-4">
              <p>
                <span className="text-white font-bold block">LOCATION:</span>
                {BRAND_CONFIG.locationArea}, {BRAND_CONFIG.city}
              </p>
              <p>
                <span className="text-white font-bold block">{BRAND_CONFIG.hours.displayDays.toUpperCase()}:</span>
                {BRAND_CONFIG.hours.displayHours}
              </p>
              <p>
                <span className="text-white font-bold block">DIRECT ORDERS:</span>
                WhatsApp: +{BRAND_CONFIG.whatsappNumber}
              </p>
              {/* FSSAI License Number — config-driven, hidden if empty */}
              {BRAND_CONFIG.fssaiNumber && (
                <p className="pt-1 text-[#FFC342]">
                  <span className="text-white font-bold block">FSSAI REGISTRATION:</span>
                  Lic. No: {BRAND_CONFIG.fssaiNumber}
                </p>
              )}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-bold uppercase text-white hover:bg-white hover:text-[#292525] transition-all"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* End Credits Marquee */}
        <EndCredits />

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FFF1E1]/60">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Lights. Bites.
            Action.
          </div>

          {/* Privacy & Terms Links */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setLegalDoc('privacy')}
              className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalDoc('terms')}
              className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart size={12} className="text-[#FF382E] fill-[#FF382E] inline mx-1" />
            <span>in {BRAND_CONFIG.locationArea}.</span>
          </div>
        </div>
      </div>

      {/* Honest Privacy & Terms Modal */}
      <LegalModal type={legalDoc} onClose={() => setLegalDoc(null)} />
    </footer>
  )
}
