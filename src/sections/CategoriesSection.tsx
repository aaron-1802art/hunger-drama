import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/design-system/animations'
import { categories } from '@/data/editorial'

const CategoriesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.15, once: true })

  return (
    <section className="bg-carbon border-t border-graphite py-16 md:py-28" aria-label="Categories">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          className="flex items-baseline justify-between mb-10 md:mb-14"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="w-8 h-px bg-ember" />
            <span className="font-body text-label text-ember uppercase tracking-[0.2em]">
              Explore by category
            </span>
          </motion.div>
          <motion.p variants={fadeUp} className="hidden md:block font-mono text-mono-sm text-smoke/50 tracking-widest">
            6 categories · 157 stories
          </motion.p>
        </motion.div>

        {/* Horizontal scroll strip */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              variants={fadeUp}
              custom={i}
              className="group relative cursor-pointer overflow-hidden bg-graphite tap-transparent"
              style={{ aspectRatio: '3/4', WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Background image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-reveal [@media(hover:hover)]:group-hover:scale-[1.08] opacity-60 [@media(hover:hover)]:group-hover:opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-4">
                {/* Count */}
                <span className="font-mono text-[10px] text-smoke/50 tracking-widest self-end">
                  {cat.count} stories
                </span>

                {/* Label */}
                <div>
                  <h3 className="font-display font-light text-off-white leading-tight mb-1"
                    style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}
                  >
                    {cat.label}
                  </h3>
                  <p className="font-body font-light text-[11px] text-smoke/60 leading-snug line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Hover ember line — desktop only via CSS */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-ember scale-x-0 [@media(hover:hover)]:group-hover:scale-x-100 transition-transform duration-400 ease-reveal origin-left" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default CategoriesSection

