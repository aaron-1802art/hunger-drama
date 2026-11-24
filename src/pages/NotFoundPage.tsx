import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Sparkles } from 'lucide-react'
import { BRAND_CONFIG } from '@/data/hungerDramaData'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF1E1] text-[#292525] selection:bg-[#FF382E] selection:text-white flex flex-col items-center justify-center p-6 text-center">
      {/* Background radial texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#292525_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-lg mx-auto bg-white border-3 border-[#292525] rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#292525]">
        {/* Brand Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#FF382E] border-2 border-[#292525] flex items-center justify-center text-white shadow-drama-pop">
          <Sparkles size={36} className="text-[#FFC342]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF382E] text-white text-xs font-mono font-bold tracking-wider uppercase mb-4">
          <Sparkles size={13} />
          <span>SCENE NOT FOUND</span>
        </div>

        <h1 className="font-display text-6xl sm:text-7xl font-black text-[#292525] tracking-tight uppercase mb-3">
          404.
        </h1>

        <h2 className="font-display text-2xl sm:text-3xl font-black text-[#FF382E] uppercase mb-4 leading-tight">
          YOU WANDERED BACKSTAGE.
        </h2>

        <p className="font-body text-sm sm:text-base text-[#292525]/80 leading-relaxed mb-8">
          This scene was left on the cutting room floor or never existed. Don't let your cravings get cold — head straight to the kitchen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/#menu"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FF382E] hover:bg-[#e02d24] text-white font-display text-sm uppercase tracking-wider shadow-[3px_3px_0px_#292525] hover:shadow-[1px_1px_0px_#292525] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>BACK TO MENU</span>
            <span className="text-[#FFC342]">🍟</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#FFF1E1] hover:bg-white text-[#292525] border-2 border-[#292525] font-display text-sm uppercase tracking-wider shadow-[2px_2px_0px_#292525] transition-all flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>HOME</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 font-mono text-xs text-[#292525]/50">
        {BRAND_CONFIG.name} · {BRAND_CONFIG.tagline}
      </div>
    </div>
  )
}

export default NotFoundPage

