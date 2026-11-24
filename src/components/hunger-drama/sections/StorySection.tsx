import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Flame, ShieldCheck } from 'lucide-react'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      num: '01',
      title: 'FRESHLY SIZZLED TO ORDER',
      desc: 'No reheated fries, no pre-assembled sandwiches. The moment your order lands, our kitchen lights up.',
    },
    {
      icon: Sparkles,
      num: '02',
      title: 'UNAPOLOGETIC FLAVOUR',
      desc: 'We do not believe in shy sauces. Every seasoning, dip, and drizzle is built with intense, bold character.',
    },
    {
      icon: Heart,
      num: '03',
      title: 'STREET SOUL, STUDIO CRAFT',
      desc: 'Inspired by the late-night street food culture, elevated with culinary hygiene and premium ingredients.',
    },
  ]

  return (
    <section id="story" className="py-14 sm:py-28 bg-[#292525] text-[#FFF1E1] relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FF382E]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FFC342]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF382E] text-white text-xs font-mono font-bold tracking-wider uppercase mb-5">
              <span>OUR ORIGIN</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-[-0.01em] leading-[0.95] mb-5 sm:mb-6">
              BEHIND THE <span className="text-[#FFC342]">DRAMA.</span>
            </h2>

            <div className="space-y-4 font-body text-base sm:text-lg text-[#FFF1E1]/80 leading-relaxed max-w-2xl">
              <p>
                Hunger Drama was born from a simple obsession: why should late-night food be boring?
                We wanted food that felt like an event — crispier, cheesier, saucier and packed with
                loud, unforgettable character.
              </p>
              <p>
                From our signature golden crinkle fries drizzled with hot cheese to slow-grilled
                Tandoori Twist sandwiches and sweet midnight pancakes, every recipe on our menu is
                crafted to deliver maximum drama in every single bite.
              </p>
            </div>
          </div>

          {/* Right Column: Brand Seal Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 rounded-3xl bg-white/5 border-2 border-white/10 backdrop-blur-md max-w-sm w-full text-center flex flex-col items-center"
            >
              {/* Brand Hallmark Badge */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 mb-5 rounded-2xl bg-[#FF382E] border-2 border-[#292525] flex items-center justify-center shadow-drama-pop">
                <Sparkles size={40} className="text-[#FFC342]" />
              </div>

              <span className="font-display text-2xl font-bold tracking-tight text-[#FFF1E1] uppercase mb-1">
                THE DRAMA STANDARD
              </span>
              <p className="font-mono text-xs text-[#FFC342] uppercase tracking-widest mb-6">
                LIGHTS • BITES • ACTION
              </p>

              <div className="w-full pt-4 border-t border-white/10 flex items-center justify-around text-center">
                <div>
                  <span className="font-display text-2xl font-bold text-[#FF382E] block">63</span>
                  <span className="text-[11px] font-mono text-[#FFF1E1]/60 uppercase">Recipes</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="font-display text-2xl font-bold text-[#FFC342] block">10K+</span>
                  {/* TODO: Confirm accuracy of "10K+ Cravings Fed" stat before publishing */}
                  <span className="text-[11px] font-mono text-[#FFF1E1]/60 uppercase">Cravings Fed</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="font-display text-2xl font-bold text-white block">100%</span>
                  <span className="text-[11px] font-mono text-[#FFF1E1]/60 uppercase">Fresh Cook</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-10 border-t border-white/10">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF382E]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF382E]/20 text-[#FF382E] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FFC342]">{pillar.num}</span>
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-[#FFF1E1]/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

