import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'motion/react'
import type Lenis from 'lenis'

/* ── Smooth scroll bridge ─────────────────────────────────── */
let lenisRef: Lenis | null = null
export const setLenis = (l: Lenis | null) => (lenisRef = l)
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisRef) lenisRef.scrollTo(el, { offset: id === 'top' ? 0 : -24, duration: 1.3 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function setScrollLock(lock: boolean) {
  document.documentElement.style.overflow = lock ? 'hidden' : ''
  if (lenisRef) (lock ? lenisRef.stop() : lenisRef.start())
}

/* ── Brand icons (lucide no longer ships these) ───────────── */
export const GithubIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
export const LinkedinIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

/* ── Reveal on scroll ─────────────────────────────────────── */
export function Reveal({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Section heading ──────────────────────────────────────── */
export function SectionHeading({ index, kicker, title, italic, sub }: { index: string; kicker: string; title: string; italic?: string; sub?: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-line" />
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-4xl font-medium tracking-tight text-balance md:text-6xl">
          {title} {italic && <span className="font-serif font-normal text-gradient italic">{italic}</span>}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-pretty text-muted md:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ── Magnetic wrapper ─────────────────────────────────────── */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.3 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.3 })
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => (x.set(0), y.set(0))} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

/* ── Spotlight tracking helper ────────────────────────────── */
export const trackSpotlight = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

/* ── Animated counter ─────────────────────────────────────── */
export function Counter({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = v.toFixed(decimals) + suffix),
    })
    return () => c.stop()
  }, [inView, value, decimals, suffix])
  return <span ref={ref}>{(0).toFixed(decimals) + suffix}</span>
}

/* ── Live clock for a timezone ────────────────────────────── */
export function useClock(timeZone: string) {
  const fmt = () => new Intl.DateTimeFormat('en-AU', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15_000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])
  return t
}

export const Chip = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`inline-flex items-center rounded-full border border-line bg-fg/[0.03] px-3 py-1 font-mono text-[11px] tracking-wide text-muted ${className}`}>{children}</span>
)

/* ── Keyboard shortcut label: ⌘ on Apple devices, Ctrl elsewhere ── */
export const isApple = (() => {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
  const p = nav.userAgentData?.platform || navigator.platform || navigator.userAgent
  return /mac|iphone|ipad|ipod/i.test(p)
})()
export const modKey = isApple ? '⌘' : 'Ctrl'

/* ── AM monogram in Syne ExtraBold on a burnt-orange tile ── */
export function Logo({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="logo-t" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f08a45" />
          <stop offset="1" stopColor="#c2481f" />
        </linearGradient>
        <radialGradient id="logo-h" cx="0.28" cy="0.18" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#logo-t)" />
      <rect width="64" height="64" rx="15" fill="url(#logo-h)" />
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
      <path fill="#1c0d05" transform="translate(8.82 40.78) scale(0.1769 0.2742)" d="M28.50 0L1 0L43.90-64L71.70-64L115 0L87.50 0L81.20-9.70L34.70-9.70L28.50 0M44.40-24.70L71.50-24.70L57.90-45.70 M142-64L188.90-15.40L236-64L261-64L261 0L236 0L236-32.80L204 0L174 0L142-32.60L142 0L117 0L117-64" />
    </svg>
  )
}
