import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSound } from '@/context/SoundContext'
import { playClapperSnap } from '@/hooks/useSoundEngine'

const SESSION_KEY = 'hd_intro_shown'

export const ClapperboardIntro: React.FC = () => {
  const { soundEnabled } = useSound()
  const [phase, setPhase] = useState<'snap' | 'lift' | 'done'>('snap')
  const [visible, setVisible] = useState(false)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // Show only once per session, never with reduced motion
    if (prefersReduced || sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false)
      return
    }
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(true)

    const snapTimer = setTimeout(() => {
      if (soundEnabled) playClapperSnap()
      setPhase('lift')
    }, 500)

    const liftTimer = setTimeout(() => {
      setPhase('done')
      setTimeout(() => setVisible(false), 300)
    }, 1700)

    return () => { clearTimeout(snapTimer); clearTimeout(liftTimer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dismiss = useCallback(() => {
    setPhase('done')
    setTimeout(() => setVisible(false), 200)
  }, [])

  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => { if (e.key) dismiss() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, dismiss])

  if (!visible) return null

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismiss}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#292525] cursor-pointer"
          role="dialog"
          aria-label="Intro — click or press any key to skip"
          aria-modal="true"
        >
          {/* Top clapper board */}
          <div className="relative w-72 sm:w-96 select-none">
            {/* Bottom board (static) */}
            <div className="bg-[#FFF1E1] border-4 border-[#292525] rounded-xl p-5 shadow-[6px_6px_0px_#FF382E]">
              {/* Striped clapper top */}
              <div className="h-6 mb-3 rounded-lg overflow-hidden border-2 border-[#292525] flex">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ background: i % 2 === 0 ? '#292525' : '#FF382E' }}
                  />
                ))}
              </div>

              {/* Top board that snaps down then lifts */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={
                  phase === 'snap'
                    ? { rotateX: [0, -40, 0], transition: { duration: 0.35, ease: 'easeOut' } }
                    : { rotateX: -90, transition: { duration: 0.55, ease: 'easeIn' } }
                }
                style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                className="absolute -top-7 left-0 right-0 h-7 bg-[#292525] border-2 border-[#292525] rounded-t-lg overflow-hidden flex"
              >
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ background: i % 2 === 0 ? '#FF382E' : '#FFF1E1' }}
                  />
                ))}
              </motion.div>

              {/* Text Content */}
              <div className="text-center space-y-1">
                <div className="font-mono text-xs font-bold text-[#292525]/60 uppercase tracking-widest">
                  SCENE 1 · TAKE 1
                </div>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#292525] uppercase tracking-tight leading-tight">
                  LIGHTS.<br />BITES.<br />ACTION.
                </div>
                <div className="font-mono text-[10px] text-[#292525]/50 uppercase tracking-wider pt-2">
                  HUNGER DRAMA PRODUCTIONS
                </div>
              </div>
            </div>
          </div>

          <p className="absolute bottom-8 font-mono text-xs text-white/40 uppercase tracking-widest">
            Click or press any key to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

