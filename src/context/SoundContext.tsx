import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { resumeCtx } from '@/hooks/useSoundEngine'

interface SoundContextType {
  soundEnabled: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextType>({ soundEnabled: false, toggleSound: () => {} })

const SESSION_KEY = 'hd_sound_enabled'

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false)

  // On mount, restore from sessionStorage — but never autoplay
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    // We only restore `true` if user had explicitly enabled in this session
    if (stored === 'true') setSoundEnabled(true)
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev
      sessionStorage.setItem(SESSION_KEY, String(next))
      if (next) resumeCtx()
      return next
    })
  }, [])

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSound = () => useContext(SoundContext)

