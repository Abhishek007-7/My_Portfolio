import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GraduationCap, Mountain, Sparkles } from 'lucide-react'
import { Counter, Reveal, SectionHeading, trackSpotlight, useClock } from '../components/ui'
import { about, profile } from '../data'

function Card({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={className}>
      <div onMouseMove={trackSpotlight} className="spotlight h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 md:p-7">
        <div className="spotlight-border" />
        {children}
      </div>
    </Reveal>
  )
}

const greetings = [
  { w: 'Hello', l: 'English' },
  { w: 'നമസ്കാരം', l: 'Malayalam' },
  { w: 'नमस्ते', l: 'Hindi' },
  { w: 'வணக்கம்', l: 'Tamil' },
  { w: 'ನಮಸ್ಕಾರ', l: 'Kannada' },
]

function Greeting() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % greetings.length), 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="font-mono text-[11px] tracking-widest text-dim uppercase">I speak 5 languages</div>
      <div className="relative h-14 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -40, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
          >
            <div className="text-3xl font-medium tracking-tight md:text-4xl">{greetings[i].w}</div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5">
        {greetings.map((g, j) => (
          <span key={g.l} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${j === i ? 'bg-accent' : 'bg-fg/10'}`} title={g.l} />
        ))}
      </div>
    </div>
  )
}

function Route() {
  const time = useClock(profile.timezone)
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-dim uppercase">
        <span>Where I’ve been</span>
        <span className="text-mint">{time}</span>
      </div>
      <div className="relative flex items-center justify-between">
        <svg className="absolute inset-x-3 top-1/2 h-8 w-[calc(100%-1.5rem)] -translate-y-1/2 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
          <motion.path
            d="M0 10 Q 25 -6 50 10 T 100 10"
            fill="none"
            stroke="url(#rg)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="rg" x1="0" x2="1">
              <stop offset="0" stopColor="#9d8cff" />
              <stop offset="1" stopColor="#5eead4" />
            </linearGradient>
          </defs>
        </svg>
        {about.places.map((p, i) => (
          <motion.div
            key={p}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.6, type: 'spring' }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <span className={`size-3 rounded-full ring-4 ring-surface ${i === about.places.length - 1 ? 'bg-mint' : 'bg-accent'}`} />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-sm">
        {about.places.map((p, i) => (
          <span key={p} className={i === about.places.length - 1 ? 'text-ink' : 'text-muted'}>{p}</span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="01" kicker="About" title="Engineer by training," italic="builder by curiosity." />

      <div className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-6">
        <Card className="md:col-span-4 md:row-span-2">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-dim uppercase">
              <Sparkles className="size-3.5 text-accent" /> The short version
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-pretty text-fg/80 md:text-xl">
              {about.bio.map((b) => <p key={b.slice(0, 20)}>{b}</p>)}
            </div>
            <div className="flex flex-wrap gap-2">
              {about.hobbies.map((h) => (
                <span key={h} className="rounded-full bg-fg/[0.05] px-3 py-1 text-xs text-muted">{h}</span>
              ))}
            </div>
          </div>
        </Card>

        <Reveal delay={0.1} className="md:col-span-2 md:row-span-2">
          <div className="group relative h-full min-h-[340px] overflow-hidden rounded-3xl border border-line">
            <img src="./img/about.webp" alt="Abhishek on a mountain trek" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/60 uppercase"><Mountain className="size-3.5" /> Off the clock</div>
              <div className="mt-1 text-lg font-medium">Usually on a trail somewhere.</div>
            </div>
          </div>
        </Reveal>

        <Card className="md:col-span-3" delay={0.05}>
          <div className="flex h-full flex-col justify-between gap-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-widest text-dim uppercase">Right now</span>
              <span className="flex items-center gap-2 rounded-full bg-mint/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-mint uppercase">
                <span className="relative size-1.5 rounded-full bg-mint pulse-dot" /> In progress
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent/30 to-mint/20 text-ink"><GraduationCap className="size-6" /></span>
              <div>
                <div className="text-xl font-medium tracking-tight">Master of Artificial Intelligence</div>
                <div className="text-muted">RMIT University · Melbourne</div>
              </div>
            </div>
            <div className="text-sm text-muted">{profile.openTo}.</div>
          </div>
        </Card>

        <Card className="md:col-span-3" delay={0.1}>
          <div className="grid h-full grid-cols-2 gap-x-6 gap-y-6">
            {about.stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-medium tracking-tight tabular-nums md:text-5xl">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-3" delay={0.05}><Route /></Card>
        <Card className="md:col-span-3" delay={0.1}><Greeting /></Card>
      </div>
    </section>
  )
}
