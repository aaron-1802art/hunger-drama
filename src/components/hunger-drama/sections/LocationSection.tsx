import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, MessageCircle, ExternalLink, Bike, ShieldCheck } from 'lucide-react'
import { BRAND_CONFIG } from '@/data/hungerDramaData'
import { getKitchenStatus, KitchenStatus } from '@/utils/kitchenStatus'

export const LocationSection: React.FC = () => {
  const [status, setStatus] = useState<KitchenStatus>(getKitchenStatus)

  // Recalculate status every minute so badge updates in real time
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getKitchenStatus())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="location" className="py-14 sm:py-28 bg-[#FFF1E1] border-t-2 border-[#292525] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292525] text-white text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <MapPin size={13} className="text-[#FFC342]" />
            <span>KITCHEN & DELIVERY HQ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#292525] uppercase tracking-[-0.01em]">
            FIND US & DELIVERY.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#292525]/80 mt-2">
            Handcrafted fresh in {BRAND_CONFIG.locationArea}, {BRAND_CONFIG.city}. Direct from our kitchen straight to your door with zero middleman delays.
          </p>
        </div>

        {/* Location & Delivery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Info Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#292525] rounded-3xl p-5 sm:p-9 shadow-[6px_6px_0px_#292525] flex flex-col justify-between">
            <div>
              {/* Live Kitchen Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#292525]/15 mb-6">
                <div>
                  <span className="text-[11px] font-mono text-[#292525]/60 uppercase tracking-wider block mb-1">
                    LIVE SERVICE STATUS
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        status.isOpen
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          status.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
                        }`}
                      />
                      {status.badgeText}
                    </span>
                    <span className="font-body text-xs text-[#292525]/75">
                      {status.detailText}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#292525]/60 uppercase tracking-wider block mb-1">
                    WORKING DAYS
                  </span>
                  <span className="font-display text-sm font-bold text-[#292525] uppercase">
                    {BRAND_CONFIG.hours.displayDays}
                  </span>
                </div>
              </div>

              {/* Location & Hours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Location */}
                <div className="p-4 rounded-2xl bg-[#FFF1E1] border border-[#292525]/15">
                  <div className="flex items-center gap-2 text-[#FF382E] mb-2 font-display text-base font-bold uppercase">
                    <MapPin size={18} />
                    <span>Kitchen Location</span>
                  </div>
                  <p className="font-display text-xl text-[#292525] font-black uppercase">
                    {BRAND_CONFIG.locationArea}
                  </p>
                  <p className="font-body text-xs text-[#292525]/70 mt-1">
                    {BRAND_CONFIG.city}, India
                  </p>
                </div>

                {/* Operating Hours */}
                <div className="p-4 rounded-2xl bg-[#FFF1E1] border border-[#292525]/15">
                  <div className="flex items-center gap-2 text-[#FF382E] mb-2 font-display text-base font-bold uppercase">
                    <Clock size={18} />
                    <span>Operating Hours</span>
                  </div>
                  <p className="font-display text-xl text-[#292525] font-black uppercase">
                    {BRAND_CONFIG.hours.displayHours}
                  </p>
                  <p className="font-body text-xs text-[#292525]/70 mt-1">
                    {BRAND_CONFIG.hours.displayDays} (No Holiday Breaks)
                  </p>
                </div>
              </div>

              {/* Delivery Coverage Info — only displayed if filled */}
              {BRAND_CONFIG.deliveryAreaText && (
                <div className="p-4 rounded-2xl bg-white border-2 border-[#292525] shadow-[2px_2px_0px_#292525] mb-6 flex items-start gap-3">
                  <Bike size={20} className="text-[#FF382E] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs font-bold uppercase text-[#292525] block mb-0.5">
                      Delivery Coverage:
                    </span>
                    <p className="font-body text-xs text-[#292525]/80 leading-relaxed">
                      {BRAND_CONFIG.deliveryAreaText}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-[#292525]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Hunger Drama! 🍟 What are the current specials and estimated delivery time to my address?'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-[#292525] text-white hover:bg-[#FF382E] transition-all font-display text-sm tracking-wider uppercase text-center shadow-[3px_3px_0px_#FF382E] flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} className="text-[#FFC342]" />
                <span>Order via WhatsApp (+{BRAND_CONFIG.whatsappNumber})</span>
              </a>

              {/* Google Maps Link — config-driven, only renders if URL exists */}
              {BRAND_CONFIG.googleMapsUrl && (
                <a
                  href={BRAND_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-[#FFF1E1] hover:bg-[#FFC342] text-[#292525] border-2 border-[#292525] font-mono text-xs font-bold uppercase transition-colors shadow-[2px_2px_0px_#292525] flex items-center justify-center gap-1.5 text-center"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Delivery & Assurance Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#292525] text-white border-2 border-[#292525] rounded-3xl p-5 sm:p-9 shadow-[6px_6px_0px_#FF382E] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFC342] text-xs font-mono font-bold tracking-wider uppercase w-fit mb-5">
                <ShieldCheck size={14} />
                <span>KITCHEN STANDARD</span>
              </div>

              <h3 className="font-display text-3xl font-black uppercase text-white mb-4">
                FAST. FRESH. SIZZLING.
              </h3>

              <div className="space-y-4 font-body text-sm text-[#FFF1E1]/80 leading-relaxed mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF382E] font-display text-lg">01</span>
                  <p>
                    <strong className="text-white block font-display text-base uppercase">Cooked To Order</strong>
                    Fries dropped in hot oil and patties sizzled only when your WhatsApp notification chimes.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FFC342] font-display text-lg">02</span>
                  <p>
                    <strong className="text-white block font-display text-base uppercase">Direct From Kitchen</strong>
                    No middleman platform markups or hidden packaging fees. You get restaurant-fresh food directly from the creators.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-white font-display text-lg">03</span>
                  <p>
                    <strong className="text-white block font-display text-base uppercase">Safe & Hygienic</strong>
                    Prepared in sanitized kitchen stations with commercial grade culinary care.
                  </p>
                </div>
              </div>

              {/* Optional Swiggy / Zomato links if populated */}
              {(BRAND_CONFIG.swiggyUrl || BRAND_CONFIG.zomatoUrl) && (
                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-white/50 uppercase block mb-2">
                    Also Available On:
                  </span>
                  <div className="flex items-center gap-2">
                    {BRAND_CONFIG.swiggyUrl && (
                      <a
                        href={BRAND_CONFIG.swiggyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#FC8019] text-white font-display text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                      >
                        Swiggy ↗
                      </a>
                    )}
                    {BRAND_CONFIG.zomatoUrl && (
                      <a
                        href={BRAND_CONFIG.zomatoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#CB202D] text-white font-display text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                      >
                        Zomato ↗
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#FFF1E1]/60">
              <span>HUNGER DRAMA HQ</span>
              <span>VIKASPURI, DELHI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

