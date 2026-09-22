import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'
const KEY = 'theme'

const listeners = new Set<() => void>()
const read = (): Theme => (document.documentElement.classList.contains('light') ? 'light' : 'dark')

export function initTheme() {
  let saved: string | null = null
  try { saved = localStorage.getItem(KEY) } catch { /* storage blocked */ }
  document.documentElement.classList.toggle('light', saved === 'light')
}

function apply(t: Theme) {
  document.documentElement.classList.toggle('light', t === 'light')
  try { localStorage.setItem(KEY, t) } catch { /* storage blocked */ }
  listeners.forEach((l) => l())
}

const BG: Record<Theme, string> = { dark: '#08080c', light: '#f5f4fa' }
let busy = false

/**
 * Switch theme with a circular wipe expanding from (x, y).
 * Only a single circle's `transform` is animated (GPU-composited), so it stays at full frame rate
 * instead of re-snapshotting and repainting the whole page.
 */
export function toggleTheme(x = innerWidth / 2, y = 0) {
  const next: Theme = read() === 'dark' ? 'light' : 'dark'
  if (busy) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next)
  busy = true

  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const el = document.createElement('div')
  Object.assign(el.style, {
    position: 'fixed', left: `${x - r}px`, top: `${y - r}px`, width: `${r * 2}px`, height: `${r * 2}px`,
    borderRadius: '50%', background: BG[next], zIndex: '200', pointerEvents: 'none',
    transform: 'scale(0)', willChange: 'transform, opacity',
  })
  document.body.appendChild(el)

  const grow = el.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
    duration: 520, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards',
  })
  grow.finished.then(() => {
    apply(next) // page underneath switches while fully covered
    requestAnimationFrame(() => {
      const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: 'ease-out', fill: 'forwards' })
      fade.finished.then(() => { el.remove(); busy = false })
    })
  })
}

export function useTheme(): Theme {
  return useSyncExternalStore((cb) => (listeners.add(cb), () => listeners.delete(cb)), read, () => 'dark')
}
