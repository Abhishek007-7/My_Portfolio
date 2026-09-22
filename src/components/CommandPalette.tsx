import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Copy, CornerDownLeft, FileText, Hash, Mail, Search, SunMoon } from 'lucide-react'
import { toggleTheme } from './theme'
import { GithubIcon, LinkedinIcon, modKey, scrollToId, setScrollLock } from './ui'
import { NAV } from '../sections/Nav'
import { profile, projects } from '../data'

type Item = { id: string; label: string; group: string; icon: React.ReactNode; run: () => void; hint?: string }

export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const [toast, setToast] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const items: Item[] = useMemo(() => {
    const nav: Item[] = [{ id: 'top', label: 'Home' }, ...NAV, { id: 'skills', label: 'Toolkit' }].map((n) => ({
      id: 'nav-' + n.id, label: n.label, group: 'Navigate', icon: <Hash className="size-4" />, run: () => scrollToId(n.id),
    }))
    const actions: Item[] = [
      { id: 'copy', label: 'Copy email address', group: 'Actions', icon: <Copy className="size-4" />, hint: profile.email, run: () => { navigator.clipboard?.writeText(profile.email).catch(() => {}); setToast('Email copied to clipboard') } },
      { id: 'theme', label: 'Toggle light / dark mode', group: 'Actions', icon: <SunMoon className="size-4" />, run: () => toggleTheme() },
      { id: 'mail', label: 'Send an email', group: 'Actions', icon: <Mail className="size-4" />, run: () => (location.href = `mailto:${profile.email}`) },
      { id: 'resume', label: 'Open résumé (PDF)', group: 'Actions', icon: <FileText className="size-4" />, run: () => window.open(profile.resume, '_blank') },
      { id: 'gh', label: 'GitHub', group: 'Links', icon: <GithubIcon />, hint: 'Abhishek007-7', run: () => window.open(profile.github, '_blank') },
      { id: 'li', label: 'LinkedIn', group: 'Links', icon: <LinkedinIcon />, run: () => window.open(profile.linkedin, '_blank') },
    ]
    const proj: Item[] = projects.map((p) => ({
      id: 'p-' + p.id, label: p.title, group: 'Projects', hint: p.category, icon: <ArrowRight className="size-4" />, run: () => scrollToId('work'),
    }))
    return [...nav, ...actions, ...proj]
  }, [])

  const filtered = items.filter((i) => (i.label + ' ' + i.group + ' ' + (i.hint ?? '')).toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(!open) }
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  useEffect(() => {
    setScrollLock(open)
    if (open) { setQ(''); setSel(0); setTimeout(() => input.current?.focus(), 30) }
  }, [open])

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2000); return () => clearTimeout(t) }, [toast])

  const run = (i: Item) => { setOpen(false); setTimeout(i.run, 120) }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && filtered[sel]) run(filtered[sel])
  }

  let lastGroup = ''
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div
              role="dialog"
              aria-label="Command menu"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-fg/10 bg-surface/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 text-dim" />
                <input
                  ref={input}
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setSel(0) }}
                  onKeyDown={onInputKey}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-[15px] outline-none focus-visible:outline-none placeholder:text-dim"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">ESC</kbd>
              </div>
              <div data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && <div className="px-3 py-8 text-center text-sm text-dim">No results for “{q}”</div>}
                {filtered.map((i, idx) => {
                  const header = i.group !== lastGroup ? (lastGroup = i.group) : null
                  return (
                    <div key={i.id}>
                      {header && <div className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-widest text-dim uppercase">{header}</div>}
                      <button
                        onMouseMove={() => setSel(idx)}
                        onClick={() => run(i)}
                        className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${sel === idx ? 'bg-fg/[0.07] text-ink' : 'text-muted'}`}
                      >
                        <span className={sel === idx ? 'text-accent' : 'text-dim'}>{i.icon}</span>
                        <span className="flex-1 truncate">{i.label}</span>
                        {i.hint && <span className="truncate font-mono text-[11px] text-dim">{i.hint}</span>}
                        {sel === idx && <CornerDownLeft className="size-3.5 text-dim" />}
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
                <span>↑↓ navigate</span><span>↵ select</span><span className="ml-auto">{modKey} K to open</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-line bg-surface-2 px-4 py-2 text-sm shadow-xl">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
