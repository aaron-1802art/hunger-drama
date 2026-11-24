import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export type LegalDocType = 'privacy' | 'terms' | null

interface LegalModalProps {
  type: LegalDocType
  onClose: () => void
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null

  const isPrivacy = type === 'privacy'

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#292525]/70 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-title"
          className="relative bg-[#FFF1E1] border-3 border-[#292525] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[8px_8px_0px_#292525] text-[#292525] z-10 max-h-[88vh] flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#292525]/15 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FF382E] text-white flex items-center justify-center">
                {isPrivacy ? <ShieldCheck size={18} /> : <FileText size={18} />}
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#FF382E] tracking-wider block">
                  LEGAL & TRANSPARENCY
                </span>
                <h3 id="legal-title" className="font-display text-2xl font-black uppercase text-[#292525]">
                  {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-[#292525]/20 text-[#292525] hover:bg-[#FF382E] hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Owner Review Badge */}
          <div className="p-3 rounded-xl bg-[#FFC342]/20 border border-[#FFC342] text-[11px] font-mono text-[#292525] mb-4">
            <span className="font-bold">⚠️ NOTE FOR SITE OWNER:</span> Review and customize before official launch. This template accurately reflects your direct WhatsApp ordering workflow with zero on-site payment gateway or tracking.
          </div>

          {/* Content Body */}
          <div className="overflow-y-auto pr-2 space-y-4 font-body text-xs sm:text-sm text-[#292525]/85 leading-relaxed flex-1">
            {isPrivacy ? (
              <>
                <p>
                  <strong>Effective Date:</strong> {new Date().getFullYear()} · Hunger Drama ({BRAND_CONFIG.locationArea}, {BRAND_CONFIG.city})
                </p>
                <div className="space-y-3">
                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    1. No Data Selling or Monetization
                  </h4>
                  <p>
                    We believe good food should come with peace of mind. Hunger Drama does not sell, rent, or trade your personal information with any third-party advertisers or data brokers.
                  </p>

                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    2. How Orders & Messages Work
                  </h4>
                  <p>
                    This website serves as an interactive digital menu and food discovery experience. Clicking "Order via WhatsApp", "Send to Kitchen", or checking out initiates a pre-filled direct message on WhatsApp (powered by Meta/WhatsApp). We do not collect credit card numbers, passwords, or bank credentials on this website.
                  </p>

                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    3. Local Browser Storage
                  </h4>
                  <p>
                    We store your temporary order selections (your shopping cart items and special cooking notes) locally inside your browser's private local storage solely to prevent accidental cart loss upon page refresh. No invasive advertising tracking cookies are installed.
                  </p>

                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    4. Contact & Queries
                  </h4>
                  <p>
                    For any questions regarding your order, food preparation, or data privacy, reach out directly to our kitchen manager at WhatsApp +{BRAND_CONFIG.whatsappNumber}.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Effective Date:</strong> {new Date().getFullYear()} · Hunger Drama ({BRAND_CONFIG.locationArea}, {BRAND_CONFIG.city})
                </p>
                <div className="space-y-3">
                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    1. Order Fulfillment & Confirmation
                  </h4>
                  <p>
                    Menu selections submitted via WhatsApp are subject to kitchen item availability, prep timing, and delivery radius constraints. An order is finalized and confirmed only after our kitchen representative acknowledges your WhatsApp message and confirms the delivery address.
                  </p>

                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    2. Transparent Pricing
                  </h4>
                  <p>
                    All dish prices displayed on this website represent current menu pricing in Indian Rupees (₹ INR). Applicable delivery fees or special packaging charges (if any) are confirmed upfront on WhatsApp before food preparation begins.
                  </p>

                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    3. Food Allergies & Customizations
                  </h4>
                  <p>
                    While we maintain strict hygiene standards in our kitchen, customers with severe allergies (nuts, dairy, gluten, soy) are strongly advised to specify all dietary restrictions in the order note and discuss them with our staff over WhatsApp prior to ordering.
                  </p>

                  <h4 className="font-display text-base font-bold text-[#292525] uppercase">
                    4. Modifications & Cancellations
                  </h4>
                  <p>
                    Because every dish is cooked fresh to order, cancellations or modifications can only be accepted before the kitchen begins sizzling your order. Please communicate changes promptly on WhatsApp.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#292525]/15 mt-4 flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#292525]/60 flex items-center gap-1">
              <CheckCircle2 size={13} className="text-emerald-600" />
              Honest & Transparent
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#292525] text-white font-display text-xs tracking-wider uppercase hover:bg-[#FF382E] transition-colors"
            >
              UNDERSTOOD
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

