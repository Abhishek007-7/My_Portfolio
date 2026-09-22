import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, Magnetic, Reveal, scrollToId, useClock } from '../components/ui'
import { profile } from '../data'
import { NAV } from './Nav'

export function useCopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email) } catch { /* clipboard blocked */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return { copied, copy }
}

export default function Contact() {
  const { copied, copy } = useCopyEmail()
  const time = useClock(profile.timezone)
  const links = [
    { l: 'LinkedIn', h: profile.linkedin, I: LinkedinIcon },
    { l: 'GitHub', h: profile.github, I: GithubIcon },
    { l: 'Résumé', h: profile.resume, I: FileText },
  ]
  return (
    <section id="contact" className="relative overflow-hidden pt-28 md:pt-40">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/20 blur-[160px]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
            <span className="text-accent">06</span><span className="h-px w-10 bg-line" /> Contact
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance">
            Let’s build something <span className="font-serif font-normal text-gradient italic">intelligent.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-lg text-pretty text-muted">
            I’m looking for AI/ML internships, research collaborations and part-time engineering roles in Melbourne or remote. My inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 rounded-full bg-ink py-3 pr-3 pl-6 text-lg font-medium text-bg">
                <Mail className="size-5" /> Say hello
                <span className="grid size-9 place-items-center rounded-full bg-bg text-ink transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="size-4" /></span>
              </a>
            </Magnetic>
            <button onClick={copy} className="relative flex items-center gap-3 overflow-hidden rounded-full border border-line bg-fg/[0.03] px-5 py-4 font-mono text-sm text-muted backdrop-blur transition-colors hover:border-fg/25 hover:text-ink">
              <span className="max-w-[58vw] truncate">{profile.email}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className={copied ? 'text-mint' : ''}>
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {links.map(({ l, h, I }) => (
            <a key={l} href={h} target="_blank" rel="noreferrer" className="group flex items-center justify-between bg-surface p-6 transition-colors hover:bg-surface-2">
              <span className="flex items-center gap-3 text-lg"><I className="size-5 text-muted transition-colors group-hover:text-accent" /> {l}</span>
              <ArrowUpRight className="size-5 text-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
            </a>
          ))}
        </div>

        <footer className="mt-24 flex flex-col gap-8 border-t border-line py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {NAV.map((n) => <button key={n.id} onClick={() => scrollToId(n.id)} className="transition-colors hover:text-ink">{n.label}</button>)}
          </div>
          <div className="font-mono text-xs text-dim">
            © {new Date().getFullYear()} Abhishek Madhu Vidya · Melbourne {time}
          </div>
          <button onClick={() => scrollToId('top')} className="group flex items-center gap-2 self-start text-sm text-muted transition-colors hover:text-ink md:self-auto">
            Back to top <span className="grid size-9 place-items-center rounded-full border border-line transition-transform group-hover:-translate-y-1"><ArrowUp className="size-4" /></span>
          </button>
        </footer>
      </div>
    </section>
  )
}
