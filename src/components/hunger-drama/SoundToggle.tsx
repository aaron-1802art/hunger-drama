import React from 'react'
import { useSound } from '@/context/SoundContext'

export const SoundToggle: React.FC = () => {
  const { soundEnabled, toggleSound } = useSound()

  return (
    <button
      onClick={toggleSound}
      aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
      title={soundEnabled ? 'Sound ON — click to mute' : 'Sound OFF — click to enable audio'}
      className={`
        fixed bottom-20 left-4 md:bottom-6 md:left-5 z-40
        w-11 h-11 md:w-12 md:h-12
        rounded-2xl
        border-2 border-[#292525]
        flex items-center justify-center
        transition-all duration-200
        select-none tap-transparent
        focus-visible:outline-2 focus-visible:outline-[#FF382E] focus-visible:outline-offset-2
        ${
          soundEnabled
            ? 'bg-[#22C55E] text-white shadow-[4px_4px_0px_#292525] hover:shadow-[2px_2px_0px_#292525] hover:translate-x-[2px] hover:translate-y-[2px]'
            : 'bg-[#86EFAC] text-[#292525] shadow-[4px_4px_0px_#292525] hover:shadow-[2px_2px_0px_#292525] hover:translate-x-[2px] hover:translate-y-[2px]'
        }
      `}
    >
      {soundEnabled ? (
        /* Speaker with waves */
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 7.5h2.5L9 4.5v11L5.5 12.5H3v-5z" fill="#292525"/>
          <path d="M11.5 7a3 3 0 010 6" stroke="#FF382E" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M13.5 5a5.5 5.5 0 010 10" stroke="#FF382E" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ) : (
        /* Speaker muted */
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 7.5h2.5L9 4.5v11L5.5 12.5H3v-5z" fill="#292525"/>
          <line x1="12" y1="8" x2="17" y2="13" stroke="#FF382E" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="17" y1="8" x2="12" y2="13" stroke="#FF382E" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  )
}

