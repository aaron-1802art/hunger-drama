/**
 * Sound Engine — Web Audio API generated sounds, zero external files.
 * All sounds are off by default; user must click toggle.
 * Session storage remembers the preference.
 */

let _ctx: AudioContext | null = null

export function isSoundActive(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('hd_sound_enabled') === 'true'
}

function getCtx(): AudioContext {
  if (!_ctx) {
    _ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return _ctx
}

function masterGain(ctx: AudioContext): GainNode {
  const g = ctx.createGain()
  g.gain.value = 0.35
  g.connect(ctx.destination)
  return g
}

/** Short crunch — played on "Add to cart" */
export function playCrunch(): void {
  if (!isSoundActive()) return
  try {
    const ctx = getCtx()
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.09), ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2)
    }
    const src = ctx.createBufferSource()
    src.buffer = buf
    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 1800
    src.connect(filter)
    filter.connect(masterGain(ctx))
    src.start()
  } catch (_) {}
}

/** Soft sizzle — looping, used in hero; returned stop function */
export function startSizzle(): () => void {
  if (!isSoundActive()) return () => {}
  try {
    const ctx = getCtx()
    const bufLen = Math.floor(ctx.sampleRate * 1.5)
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.35
    }
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.loop = true
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 3200
    filter.Q.value = 0.4
    const g = ctx.createGain()
    g.gain.value = 0.05
    src.connect(filter)
    filter.connect(g)
    g.connect(ctx.destination)
    src.start()
    return () => {
      try { src.stop() } catch (_) {}
    }
  } catch (_) {
    return () => {}
  }
}

/** Clapper snap — used for intro */
export function playClapperSnap(): void {
  if (!isSoundActive()) return
  try {
    const ctx = getCtx()
    const dur = 0.07
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 4) * 0.9
    }
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(masterGain(ctx))
    src.start()
  } catch (_) {}
}

/** Small pop — mascot catches the drip */
export function playPop(): void {
  if (!isSoundActive()) return
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.connect(g)
    g.connect(masterGain(ctx))
    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08)
    g.gain.setValueAtTime(0.3, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    osc.start()
    osc.stop(ctx.currentTime + 0.12)
  } catch (_) {}
}

/** Resume the AudioContext after user gesture (required by browsers) */
export function resumeCtx(): void {
  try {
    if (_ctx && _ctx.state === 'suspended') {
      _ctx.resume()
    }
  } catch (_) {}
}

