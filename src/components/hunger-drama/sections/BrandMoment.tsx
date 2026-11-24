import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Dices, ArrowRight } from 'lucide-react'
import { useHungerDrama } from '@/context/HungerDramaContext'

export const BrandMoment: React.FC = () => {
  const { items, setActiveItem } = useHungerDrama()
  const [isSpinning, setIsSpinning] = useState(false)

  // Interactive Craving Decider: Pick a random delicious item
  const handleDecideForMe = () => {
    if (items.length === 0) return
    setIsSpinning(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * items.length)
      const chosen = items[randomIndex]
      setIsSpinning(false)
      setActiveItem(chosen)
    }, 600)
  }

  return (
    <section className="py-14 sm:py-24 bg-[#FFC342] text-[#292525] relative overflow-hidden border-y-2 border-[#292525]">
      {/* Dynamic Background Kinetic Marquee 1 */}
      <div className="w-full bg-[#FF382E] text-white py-3.5 -rotate-1 scale-105 overflow-hidden shadow-md select-none border-y-2 border-[#292525]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-6 text-base sm:text-2xl font-display tracking-widest uppercase mx-4">
              <span>LIGHTS</span>
              <span className="text-[#FFC342]">★</span>
              <span>BITES</span>
              <span className="text-[#FFC342]">★</span>
              <span>ACTION</span>
              <span className="text-[#FFC342]">★</span>
              <span>HUNGER DRAMA</span>
              <span className="text-[#FFC342]">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center Interactive Craving Wheel Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#292525] text-[#FFC342] text-xs font-mono font-bold tracking-wider uppercase mb-4 sm:mb-5">
          <Sparkles size={14} />
          <span>INDECISIVE EATER? WE GOT YOU</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#292525] mb-3 sm:mb-4">
          CAN'T CHOOSE?
          <br />
          LET THE DRAMA DECIDE.
        </h2>

        <p className="font-body text-base sm:text-lg text-[#292525]/90 max-w-xl mx-auto mb-6 sm:mb-8 font-medium">
          With 63 mouth-watering recipes, making up your mind can be high drama. Click below and
          let fate pick your next bite.
        </p>

        <button
          onClick={handleDecideForMe}
          disabled={isSpinning}
          className="inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-[18px] rounded-full bg-[#292525] text-white hover:bg-[#FF382E] font-display text-sm sm:text-base tracking-wider uppercase transition-all transform hover:-translate-y-1 shadow-drama-pop active:scale-95 disabled:opacity-75"
        >
          <Dices size={20} className={isSpinning ? 'animate-spin' : ''} />
          <span>{isSpinning ? 'ROLLING THE DRAMA...' : 'SPIN FOR A RANDOM BITE'}</span>
        </button>
      </div>

      {/* Dynamic Background Kinetic Marquee 2 (Reversed / Charcoal) */}
      <div className="w-full bg-[#292525] text-[#FFF1E1] py-3.5 rotate-1 scale-105 overflow-hidden shadow-md select-none border-y-2 border-[#292525]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-6 text-sm sm:text-xl font-display tracking-widest uppercase mx-4">
              <span className="text-[#FF382E]">★</span>
              <span>NO BORING BITES</span>
              <span className="text-[#FFC342]">★</span>
              <span>SIZZLING CRUNCH</span>
              <span className="text-[#FF382E]">★</span>
              <span>HOT MELTY CHEESE</span>
              <span className="text-[#FFC342]">★</span>
              <span>WHATSAPP ORDERING READY</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

