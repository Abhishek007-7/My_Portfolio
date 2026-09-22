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

/** Switch theme with a circular reveal expanding from (x, y) where supported. */
export function toggleTheme(x = innerWidth / 2, y = 0) {
  const next: Theme = read() === 'dark' ? 'light' : 'dark'
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!doc.startViewTransition || reduce) return apply(next)
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const vt = doc.startViewTransition(() => apply(next))
  vt.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(.76,0,.24,1)', pseudoElement: '::view-transition-new(root)' },
    )
  }).catch(() => {})
}

export function useTheme(): Theme {
  return useSyncExternalStore((cb) => (listeners.add(cb), () => listeners.delete(cb)), read, () => 'dark')
}
