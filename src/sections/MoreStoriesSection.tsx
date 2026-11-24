import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn } from '@/design-system/animations'
import { editorialItems } from '@/data/editorial'
import EditorialTag from '@/components/ui/EditorialTag'

const MoreStoriesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.1, once: true })

  // Items 3-5
  const items = editorialItems.slice(3)

  return (
    <section className="bg-ink border-t border-graphite py-16 md:py-28" aria-label="More stories">
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
              Also in this issue
            </span>
          </motion.div>
        </motion.div>

        {/* 3-col grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {items.map((item) => (
            <motion.article
              key={item.id}
              variants={scaleIn}
              className="group cursor-pointer tap-transparent"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden bg-carbon mb-4"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-reveal [@media(hover:hover)]:group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 to-transparent" />
                {/* Category overlay */}
                <div className="absolute top-4 left-4">
                  <EditorialTag label={item.category} variant="ember" size="sm" />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-mono-sm text-smoke/50">{item.location}</span>
                  <div className="w-px h-3 bg-graphite" />
                  <span className="font-mono text-mono-sm text-smoke/50">{item.readTime}</span>
                </div>
                <h3 className="font-display font-light text-title text-off-white leading-tight [@media(hover:hover)]:group-hover:text-ember transition-colors duration-400">
                  {item.title}
                </h3>
                <p className="font-body font-light text-editorial text-smoke line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              {/* Hover bottom line */}
              <div className="mt-4 w-full h-px bg-graphite relative overflow-hidden">
                <div className="absolute inset-0 bg-ember scale-x-0 [@media(hover:hover)]:group-hover:scale-x-100 transition-transform duration-500 ease-reveal origin-left" />
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default MoreStoriesSection

