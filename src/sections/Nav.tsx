import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from 'motion/react'
import { Menu, Search, X } from 'lucide-react'
import { modKey, scrollToId } from '../components/ui'
import ThemeToggle from '../components/ThemeToggle'

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ onPalette }: { onPalette: () => void }) {
  const [active, setActive] = useState('')
  const [hover, setHover] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollYProgress, scrollY } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 400 && !open)
  })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...NAV.map((n) => n.id), 'skills'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const go = (id: string) => { setOpen(false); scrollToId(id) }
  const current = active === 'skills' ? 'research' : active

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent to-mint" />
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      >
        <nav className="flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-line bg-bg/70 py-2 pr-2 pl-5 backdrop-blur-xl">
          <button onClick={() => go('top')} className="group flex items-center gap-2 font-medium tracking-tight">
            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-accent to-mint font-mono text-[11px] font-semibold text-bg transition-transform group-hover:rotate-12">AM</span>
            <span className="hidden sm:inline">Abhishek</span>
          </button>

          <ul className="hidden items-center md:flex" onMouseLeave={() => setHover(null)}>
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  onMouseEnter={() => setHover(n.id)}
                  className={`relative isolate px-4 py-2 text-sm transition-colors ${current === n.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {(hover ?? current) === n.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  {n.label}
                  {current === n.id && <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={onPalette}
              className="flex h-9 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-fg/20 hover:text-ink"
              aria-label={`Open command menu (${modKey}+K)`}
              title={`Search & shortcuts (${modKey}+K)`}
            >
              <Search className="size-3.5" />
              <kbd className="hidden items-center gap-1 font-mono text-[11px] sm:inline-flex">
                <span className="rounded border border-line px-1 py-px">{modKey}</span>
                <span className="rounded border border-line px-1 py-px">K</span>
              </kbd>
            </button>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); go('contact') }}
              className="hidden h-9 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition-transform hover:scale-[1.03] sm:inline-flex md:hidden lg:inline-flex"
            >
              Let’s talk
            </a>
            <button onClick={() => setOpen((o) => !o)} className="grid size-9 place-items-center rounded-full border border-line md:hidden" aria-label="Menu">
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-surface px-8 md:hidden"
          >
            {NAV.map((n, i) => (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={() => go(n.id)}
                className="flex items-baseline gap-4 py-3 text-left text-5xl font-medium tracking-tight"
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                {n.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
