import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn } from '@/design-system/animations'
import { editorialItems } from '@/data/editorial'
import EditorialTag from '@/components/ui/EditorialTag'

const FeaturedSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.1, once: true })

  const main = editorialItems[0]
  const side = editorialItems.slice(1, 3)

  return (
    <section className="bg-ink py-16 md:py-28 lg:py-36" aria-label="Featured stories">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <motion.div
          className="flex items-baseline justify-between mb-10 md:mb-14"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="w-8 h-px bg-ember" />
            <span className="font-body text-label text-ember uppercase tracking-[0.2em]">
              Featured
            </span>
          </motion.div>
          <motion.button
            variants={fadeUp}
            className="font-body font-medium text-label text-smoke uppercase tracking-[0.2em] transition-colors duration-300 group flex items-center gap-2 tap-transparent"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            All Stories
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.button>
        </motion.div>

        {/* Asymmetric grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 md:gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >

          {/* Large main card */}
          <motion.article
            variants={scaleIn}
            className="relative group cursor-pointer overflow-hidden bg-carbon tap-transparent"
            style={{ aspectRatio: '16/10', WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={main.image}
                alt={main.title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-reveal [@media(hover:hover)]:group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <EditorialTag label={main.category} variant="ember" />
                  <span className="font-mono text-mono-sm text-smoke/60">{main.location}</span>
                </div>
                <h2 className="font-display font-light text-headline text-off-white leading-tight">
                  {main.title}
                </h2>
                <p className="font-body font-light text-editorial text-mist max-w-lg line-clamp-2">
                  {main.subtitle}
                </p>
                <div className="flex items-center gap-4 pt-1">
                  <span className="font-mono text-mono-sm text-smoke/50">{main.coordinates}</span>
                  <div className="w-px h-4 bg-graphite" />
                  <span className="font-mono text-mono-sm text-smoke/50">{main.readTime}</span>
                </div>
              </div>
            </div>

            {/* Issue tag - top right */}
            <div className="absolute top-6 right-6">
              <span className="font-mono text-mono-sm text-smoke/50 tracking-widest">{main.issue}</span>
            </div>
          </motion.article>

          {/* Side cards column */}
          <div className="flex flex-col gap-4 md:gap-5">
            {side.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeUp}
                className="relative group cursor-pointer overflow-hidden bg-carbon flex-1"
                style={{ minHeight: '200px' }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-reveal [@media(hover:hover)]:group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />
                </div>

                <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                  <EditorialTag label={item.category} size="sm" variant="outline" />
                  <h3 className="font-display font-light text-title text-off-white leading-tight mt-2 mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-mono-sm text-smoke/50">{item.location}</span>
                    <div className="w-px h-3 bg-graphite" />
                    <span className="font-mono text-mono-sm text-smoke/50">{item.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default FeaturedSection

