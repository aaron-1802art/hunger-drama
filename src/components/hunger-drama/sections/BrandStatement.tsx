import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Utensils, Coffee, Flame } from 'lucide-react'
import { BRAND_CONFIG } from '@/data/hungerDramaData'
import { ActMoment } from './ActMoments'

export const BrandStatement: React.FC = () => {
  const acts = [
    {
      num: '01',
      title: 'THE CRAVING',
      tagline: 'Hot, Crispy, Savoury Hits',
      desc: 'Golden crispy fries loaded with molten cheese, toasted artisanal sandwiches, spicy Mom’s special Maggi, and sizzling Chinese wok boxes.',
      color: 'bg-[#FF382E]',
      textColor: 'text-white',
      badge: 'ACT I',
      icon: Flame,
    },
    {
      num: '02',
      title: 'THE SIP',
      tagline: 'Chilled, Creamy, Refreshing',
      desc: 'Velvety thick shakes, cool bubbly mocktails, iced coffees, and fizzy soda twists crafted to wash down every bold spice note.',
      color: 'bg-[#FFC342]',
      textColor: 'text-[#292525]',
      badge: 'ACT II',
      icon: Coffee,
    },
    {
      num: '03',
      title: 'THE PLOT TWIST',
      tagline: 'Warm, Gooey, Sweet Finale',
      desc: 'Fluffy mini pancakes drowned in chocolate hazelnut, sizzling chocolate brownies with vanilla bean drizzle, and rich dessert waffle pops.',
      color: 'bg-[#292525]',
      textColor: 'text-[#FFF1E1]',
      badge: 'ACT III',
      icon: Sparkles,
    },
  ]

  return (
    <section className="py-14 sm:py-28 bg-[#FFF1E1] border-b border-[#292525]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#292525] text-[#FFF1E1] text-xs font-mono font-semibold tracking-wider uppercase mb-5">
            <span>BRAND MANIFESTO</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black text-[#292525] uppercase tracking-[-0.01em] leading-[0.95] mb-5 sm:mb-6">
            NOT JUST FOOD.
            <br />
            <span className="text-[#FF382E]">IT'S A WHOLE SCENE.</span>
          </h2>

          <p className="font-body text-base sm:text-xl text-[#292525]/85 leading-relaxed font-normal">
            At <strong className="font-semibold text-[#292525]">Hunger Drama</strong>, every bite
            deserves a little attention. We bring flavour, fun and unapologetic personality together
            to turn everyday cravings into something worth talking about.
          </p>
        </div>

        {/* 3-Act Narrative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {acts.map((act, index) => {
            const Icon = act.icon
            return (
              <motion.div
                key={act.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative rounded-3xl border-2 border-[#292525] p-7 sm:p-8 bg-white flex flex-col justify-between shadow-sm hover:shadow-drama-pop transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-4xl font-black text-[#292525]/30 group-hover:text-[#FF382E] transition-colors">
                      {act.num}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#FFF1E1] border border-[#292525]/15 text-[#292525]">
                      {act.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#FFF1E1] border border-[#292525]/20 flex items-center justify-center text-[#292525] mb-5 group-hover:bg-[#FF382E] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#292525] uppercase tracking-tight mb-1">
                    {act.title}
                  </h3>
                  <p className="font-mono text-xs font-bold text-[#FF382E] uppercase tracking-wider mb-4">
                    {act.tagline}
                  </p>

                  <p className="font-body text-sm sm:text-base text-[#292525]/80 leading-relaxed mb-4">
                    {act.desc}
                  </p>

                  {/* Scroll-triggered Act micro-animation */}
                  <ActMoment act={index === 0 ? 'fries' : index === 1 ? 'shake' : 'pancake'} />
                </div>

                <div className="pt-6 mt-6 border-t border-[#292525]/10 flex items-center justify-between text-xs font-mono text-[#292525]/70">
                  <span>HUNGER DRAMA ACTS</span>
                  <span className="font-bold text-[#292525]">SCENE {index + 1}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

