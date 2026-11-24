import React from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquareQuote } from 'lucide-react'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const SceneReviews: React.FC = () => {
  // Never fabricate reviews: section remains hidden until real reviews are provided in BRAND_CONFIG
  if (!BRAND_CONFIG.reviews || BRAND_CONFIG.reviews.length === 0) {
    return null
  }

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FFF1E1] border-t-2 border-[#292525] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF382E] text-white text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <Star size={13} fill="currentColor" />
            <span>REAL WORDS FROM REAL CRAVERS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#292525] uppercase tracking-[-0.01em]">
            SCENE REVIEWS.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#292525]/80 mt-2">
            No paid hype. Just genuine food lovers sharing their honest take on our bites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BRAND_CONFIG.reviews.map((review, idx) => (
            <motion.div
              key={review.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border-2 border-[#292525] rounded-3xl p-6 sm:p-7 shadow-[4px_4px_0px_#292525] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#FFC342]">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#292525]/60 bg-[#FFF1E1] px-2 py-0.5 rounded-full border border-[#292525]/15">
                    {review.source}
                  </span>
                </div>

                <p className="font-body text-sm sm:text-base text-[#292525]/85 leading-relaxed italic mb-6">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#292525]/10 flex items-center justify-between">
                <span className="font-display text-base font-bold text-[#292525] uppercase">
                  {review.name}
                </span>
                {review.date && (
                  <span className="font-mono text-xs text-[#292525]/50">
                    {review.date}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

