import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, BookOpen, X } from 'lucide-react'
import ProjectArt from '../components/ProjectArt'
import { Chip, GithubIcon, SectionHeading, setScrollLock, trackSpotlight } from '../components/ui'
import { profile, projects, type Project } from '../data'

const filters = ['All', 'Speech AI', 'Computer Vision', 'NLP', 'Machine Learning', 'IoT'] as const

function ProjectCard({ p, big, onOpen }: { p: Project; big: boolean; onOpen: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={trackSpotlight}
      className={`spotlight group cursor-pointer overflow-hidden rounded-3xl border border-line bg-surface ${big ? 'md:col-span-2 md:grid md:grid-cols-[1.25fr_1fr]' : ''}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      aria-label={`Open details for ${p.title}`}
    >
      <div className="spotlight-border" />
      <div className={`relative overflow-hidden border-b border-line ${big ? 'aspect-[16/10] md:aspect-auto md:min-h-[360px] md:border-r md:border-b-0' : 'aspect-[16/10]'}`}>
        <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ProjectArt p={p} big={big} />
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="rounded-full bg-black/50 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur">{p.category}</span>
          {p.paper && <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 font-mono text-[11px] text-mint backdrop-blur"><BookOpen className="size-3" /> {p.paper}</span>}
        </div>
        <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100 md:-rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className={`p-6 md:p-7 ${big ? 'md:flex md:flex-col md:justify-center md:p-10' : ''}`}>
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-medium tracking-tight ${big ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{p.title}</h3>
          <span className="shrink-0 pt-1 font-mono text-xs text-dim">{p.year}</span>
        </div>
        <p className="mt-3 max-w-2xl text-pretty text-muted">{p.blurb}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {p.metric && <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] text-accent">{p.metric}</span>}
          {p.tags.slice(0, big ? 4 : 3).map((t) => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
    </motion.article>
  )
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface md:rounded-3xl"
      >
        <div className="relative aspect-[16/7]">
          <ProjectArt p={p} big />
          <button onClick={onClose} className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-black/60 backdrop-blur transition-colors hover:bg-black/80" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span className="text-accent">{p.category}</span> · {p.year} {p.paper && <>· <span className="text-mint">{p.paper}</span></>}
          </div>
          <h3 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">{p.title}</h3>
          <p className="mt-4 text-lg text-pretty text-fg/75">{p.blurb}</p>
          <ul className="mt-8 space-y-3">
            {p.details.map((d, i) => (
              <motion.li key={d} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }} className="flex gap-3 text-fg/80">
                <span className="mt-1 font-mono text-xs text-accent">0{i + 1}</span>{d}
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">{p.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={p.github ?? profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-medium text-bg transition-transform hover:scale-[1.03]">
              <GithubIcon /> {p.github ? 'View source' : 'More on GitHub'}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [open, setOpen] = useState<Project | null>(null)
  const list = projects.filter((p) => filter === 'All' || p.category === filter)

  useEffect(() => {
    setScrollLock(!!open)
  }, [open])

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="03" kicker="Selected work" title="Things I’ve" italic="built & shipped." sub="Research-grade models and the software around them. Click any project for the details." />

      <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {filters.map((f) => {
          const count = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative isolate shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${filter === f ? 'border-transparent text-bg' : 'border-line text-muted hover:text-ink'}`}
            >
              {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              {f} <span className="ml-1 font-mono text-[10px] opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectCard key={p.id} p={p} big={filter === 'All' && (i === 0 || (i === list.length - 1 && list.length % 2 === 0))} onOpen={() => setOpen(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 flex justify-center">
        <a href={profile.github} target="_blank" rel="noreferrer" className="group flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-muted transition-colors hover:border-fg/25 hover:text-ink">
          <GithubIcon /> All repositories on GitHub <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
