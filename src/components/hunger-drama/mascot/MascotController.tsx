import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SimpleMascot } from './SimpleMascot'
import { MascotState, Position } from './MascotTypes'

export const MascotController: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [state, setState] = useState<MascotState>('idle')
  const [facing, setFacing] = useState<'left' | 'right'>('left')

  // Current position and destination
  const [pos, setPos] = useState<Position>({ x: 200, y: 300 })
  const targetPosRef = useRef<Position>({ x: 200, y: 300 })

  // Timers and activity refs
  const moveTimerRef = useRef<any>(null)
  const gestureTimerRef = useRef<any>(null)
  const isMovingRef = useRef<boolean>(false)
  const isDocumentHiddenRef = useRef<boolean>(false)

  // Safe viewport boundary calculator
  const getSafeBounds = useCallback(() => {
    if (typeof window === 'undefined') {
      return { minX: 20, maxX: 800, minY: 80, maxY: 600 }
    }
    const mobile = window.innerWidth < 640
    return {
      minX: 20,
      maxX: Math.max(40, window.innerWidth - (mobile ? 55 : 75)),
      minY: 85,
      maxY: Math.max(120, window.innerHeight - (mobile ? 65 : 85)),
    }
  }, [])

  // Generate a random destination within safe viewport margins
  const getRandomDestination = useCallback((): Position => {
    const bounds = getSafeBounds()
    const x = Math.round(bounds.minX + Math.random() * (bounds.maxX - bounds.minX))
    const y = Math.round(bounds.minY + Math.random() * (bounds.maxY - bounds.minY))
    return { x, y }
  }, [getSafeBounds])

  // Perform a small spontaneous gesture while resting
  const triggerRestGesture = useCallback(() => {
    if (isMovingRef.current || isDocumentHiddenRef.current) return

    const gestures: MascotState[] = [
      'idle',
      'happy',
      'confused',
      'sleepy',
      'relaxed',
      'surprised',
    ]
    // 60% chance to remain calm idle, 40% chance for a cute gesture
    const nextGesture =
      Math.random() < 0.6
        ? 'idle'
        : gestures[Math.floor(Math.random() * gestures.length)]

    setState(nextGesture)

    // Settle back to calm idle after gesture finishes
    clearTimeout(gestureTimerRef.current)
    if (nextGesture !== 'idle') {
      const gestureDuration = nextGesture === 'sleepy' ? 3500 : 2000
      gestureTimerRef.current = setTimeout(() => {
        if (!isMovingRef.current) {
          setState('idle')
        }
      }, gestureDuration)
    }
  }, [])

  // Roam to a new random position
  const roamToNewPosition = useCallback(() => {
    clearTimeout(moveTimerRef.current)
    clearTimeout(gestureTimerRef.current)

    if (isDocumentHiddenRef.current || typeof window === 'undefined') return

    const newTarget = getRandomDestination()
    targetPosRef.current = newTarget

    const dx = newTarget.x - pos.x
    const dy = newTarget.y - pos.y
    const dist = Math.hypot(dx, dy)

    // Update facing direction
    setFacing(dx >= 0 ? 'right' : 'left')

    // Determine movement style
    // Longer distances have chance to run, shorter walk or occasionally hop
    const isRun = dist > 220 && Math.random() < 0.4
    const isHop = dist < 120 && Math.random() < 0.25

    const moveState: MascotState = isRun ? 'run' : isHop ? 'jump' : 'walk'
    setState(moveState)
    isMovingRef.current = true

    // Calculate movement duration (smooth, natural speed)
    const baseSpeed = isRun ? 180 : 90 // pixels per second
    const duration = prefersReducedMotion ? 0 : Math.max(1.2, Math.min(3.8, dist / baseSpeed))

    // Animate position
    setPos(newTarget)

    // Schedule arrival
    moveTimerRef.current = setTimeout(() => {
      isMovingRef.current = false
      setState('idle')

      // 40% chance to do a quick cute gesture halfway through resting
      const restDuration = 3500 + Math.random() * (isMobile ? 4500 : 3500)
      gestureTimerRef.current = setTimeout(() => {
        triggerRestGesture()
      }, 1500)

      // Schedule next roam
      moveTimerRef.current = setTimeout(() => {
        roamToNewPosition()
      }, restDuration)
    }, duration * 1000)
  }, [
    pos.x,
    pos.y,
    getRandomDestination,
    prefersReducedMotion,
    isMobile,
    triggerRestGesture,
  ])

  // Direct click / tap interaction
  const handleMascotClick = () => {
    clearTimeout(moveTimerRef.current)
    clearTimeout(gestureTimerRef.current)
    isMovingRef.current = false

    // Cute cheerful hop and wave!
    setState('jump')

    gestureTimerRef.current = setTimeout(() => {
      setState('happy')
      gestureTimerRef.current = setTimeout(() => {
        setState('idle')
        moveTimerRef.current = setTimeout(roamToNewPosition, 2500)
      }, 1400)
    }, 450)
  }

  // Lifecycle & Event Listeners
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      const mobile = window.innerWidth < 640
      setIsMobile(mobile)
    }
    checkMobile()

    // Initial position: cozy bottom-right area
    const bounds = getSafeBounds()
    const initialPos = {
      x: Math.max(bounds.minX, bounds.maxX - (window.innerWidth < 640 ? 40 : 80)),
      y: Math.max(bounds.minY, bounds.maxY - (window.innerWidth < 640 ? 50 : 70)),
    }
    setPos(initialPos)
    targetPosRef.current = initialPos

    // Visibility Change: pause when tab inactive
    const handleVisibilityChange = () => {
      isDocumentHiddenRef.current = document.hidden
      if (document.hidden) {
        clearTimeout(moveTimerRef.current)
        clearTimeout(gestureTimerRef.current)
        isMovingRef.current = false
      } else {
        // Resume roaming after tab becomes visible again
        moveTimerRef.current = setTimeout(roamToNewPosition, 2000)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Resize Handler
    const handleResize = () => {
      checkMobile()
      // Clamp mascot within new bounds if window shrank
      setPos((prev) => {
        const b = getSafeBounds()
        return {
          x: Math.max(b.minX, Math.min(b.maxX, prev.x)),
          y: Math.max(b.minY, Math.min(b.maxY, prev.y)),
        }
      })
    }
    window.addEventListener('resize', handleResize)

    // Scroll Handler: occasionally pick a new destination after scrolling
    let scrollTimeout: any = null
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // If mascot has been resting for a while, let it roam after scroll
        if (!isMovingRef.current && Math.random() < 0.4) {
          roamToNewPosition()
        }
      }, 1200)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Start first roam after 2.5s of initial rest
    moveTimerRef.current = setTimeout(roamToNewPosition, 2500)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
      clearTimeout(moveTimerRef.current)
      clearTimeout(gestureTimerRef.current)
    }
  }, [getSafeBounds, roamToNewPosition])

  // Movement animation duration based on state
  const animDuration = prefersReducedMotion
    ? 0
    : state === 'run'
    ? 1.5
    : state === 'jump'
    ? 1.2
    : 2.6

  return (
    <motion.div
      animate={{
        x: pos.x,
        y: pos.y,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              x: { duration: animDuration, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: animDuration, ease: [0.25, 0.1, 0.25, 1] },
            }
      }
      className="fixed top-0 left-0 z-[15] pointer-events-none"
      style={{
        willChange: 'transform',
      }}
    >
      <SimpleMascot
        state={state}
        facing={facing}
        isMobile={isMobile}
        onClick={handleMascotClick}
      />
    </motion.div>
  )
}
