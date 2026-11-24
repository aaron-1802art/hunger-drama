import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/design-system/animations'

const ManifestoSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: true })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-48 bg-ink border-t border-graphite"
      aria-label="Manifesto"
    >
      {/* Background image — very subtle */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: imageY }}
      >
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1800&q=70&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      </motion.div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8"
        >

          {/* Decorative em dash */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="w-12 h-px bg-ember/60" />
            <span className="font-body text-label text-ember uppercase tracking-[0.2em]">
              Our Belief
            </span>
            <div className="w-12 h-px bg-ember/60" />
          </motion.div>

          {/* Main quote */}
          <motion.blockquote
            variants={fadeUp}
            className="font-display font-light text-off-white leading-tight tracking-[-0.025em] text-balance"
            style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}
          >
            "Some places ask to be{' '}
            <em className="font-light italic text-cream/70">found</em>.
            <br className="hidden md:block" />
            Not discovered — found."
          </motion.blockquote>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="font-body font-light text-mist max-w-2xl text-balance"
            style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: '1.75' }}
          >
            AFTERHOURS is an independent editorial platform dedicated to the places that resist the algorithm. The cafés without Instagram handles. The buildings that don't appear on maps. The corners of cities that exist only after dark.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex items-center gap-6 pt-4">
            <button className="group relative font-body font-medium text-label uppercase tracking-[0.2em] text-off-white px-8 py-3 border border-smoke/40 hover:border-ember transition-colors duration-400 overflow-hidden">
              {/* Sliding ember fill */}
              <span className="absolute inset-0 bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-reveal origin-left" aria-hidden="true" />
              {/* Label — stays cream always, sits above the fill */}
              <span className="relative z-10">
                Read the Issue
              </span>
            </button>
          </motion.div>

          {/* Coordinates decoration */}
          <motion.div
            variants={fadeUp}
            className="font-mono text-mono-sm text-smoke/30 tracking-widest mt-4"
          >
            48.8566° N · 2.3522° E  ·  35.6762° N · 139.6503° E  ·  -23.5505° S · 46.6333° W
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default ManifestoSection

