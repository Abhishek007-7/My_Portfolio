import { Fragment, useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDownRight, FileText, MapPin } from 'lucide-react'
import NeuralCanvas from '../components/NeuralCanvas'
import { GithubIcon, LinkedinIcon, Magnetic, scrollToId, useClock } from '../components/ui'
import { profile } from '../data'

const ease = [0.22, 1, 0.36, 1] as const

function SplitWord({ text, delay }: { text: string; delay: number }) {
  let n = 0
  return (
    <>
      {text.split(' ').map((word, wi) => (
        <Fragment key={wi}>
        {wi > 0 && ' '}
        <span className="inline-block overflow-hidden pr-[0.02em] pb-[0.08em] align-bottom whitespace-nowrap">
          {word.split('').map((c) => (
            <motion.span
              key={n}
              className="inline-block"
              initial={{ y: '110%', rotate: 8 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: delay + n++ * 0.035, ease }}
            >
              {c}
            </motion.span>
          ))}
        </span>
        </Fragment>
      ))}
    </>
  )
}

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="font-serif whitespace-nowrap text-gradient italic"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Portrait() {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16)
  }
  const chips = [
    { t: '3 papers published', c: 'top-[8%] -left-[14%]', d: 0 },
    { t: 'React · TypeScript', c: 'bottom-[18%] -left-[18%]', d: 1.2 },
    { t: 'Machine Learning', c: 'top-[30%] -right-[12%]', d: 0.6 },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, delay: 0.5, ease }}
      className="relative mx-auto w-[min(78vw,380px)] [perspective:1000px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => (rx.set(0), ry.set(0))}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative aspect-[4/5] rounded-[2rem] border border-line bg-surface p-2"
      >
        <div className="absolute -inset-px -z-10 rounded-[2rem] bg-gradient-to-br from-accent/40 via-transparent to-mint/30 blur-2xl" />
        <img src="./img/profile.webp" alt="Portrait of Abhishek Madhu Vidya" className="size-full rounded-[1.6rem] object-cover"  />
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-b-[1.6rem] bg-gradient-to-t from-black/80 to-transparent px-5 pt-16 pb-4 text-white" style={{ transform: 'translateZ(40px)' }}>
          <div>
            <div className="text-sm font-medium">Abhishek Madhu Vidya</div>
            <div className="font-mono text-[11px] text-white/60">MAI · RMIT University</div>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-white/10 backdrop-blur"><MapPin className="size-4" /></span>
        </div>
        {chips.map((c) => (
          <motion.div
            key={c.t}
            className={`absolute hidden rounded-full border border-line bg-surface-2/80 px-3.5 py-1.5 font-mono text-[11px] whitespace-nowrap text-ink shadow-2xl backdrop-blur-md sm:block ${c.c}`}
            style={{ transform: 'translateZ(70px)' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: c.d, ease: 'easeInOut' }}
          >
            <span className="mr-2 inline-block size-1.5 rounded-full bg-mint align-middle" />
            {c.t}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const time = useClock(profile.timezone)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 grid-bg" />
      <NeuralCanvas />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <motion.div style={{ y, opacity }} className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-fg/[0.03] py-1.5 pr-4 pl-2 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex size-2 rounded-full bg-mint pulse-dot" />
            <span className="text-ink">{profile.status}</span>
            <span className="text-dim">·</span> {profile.location.split(',')[0]}
          </motion.div>

          <h1 className="text-[clamp(3rem,8.4vw,6.6rem)] leading-[0.92] font-medium tracking-[-0.045em]">
            <SplitWord text="Abhishek" delay={0.2} />
            <br />
            <span className="text-fg/45"><SplitWord text="Madhu Vidya" delay={0.45} /></span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="mt-8 text-2xl tracking-tight md:text-3xl"
          >
            <span className="text-muted">I’m </span>
            <RotatingRole />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="mt-5 max-w-lg text-pretty text-muted md:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button onClick={() => scrollToId('work')} className="group flex items-center gap-2 rounded-full bg-ink py-3 pr-3 pl-6 font-medium text-bg">
                See my work
                <span className="grid size-7 place-items-center rounded-full bg-bg text-ink transition-transform duration-300 group-hover:-rotate-45"><ArrowDownRight className="size-4" /></span>
              </button>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-line bg-fg/[0.03] px-5 py-3 font-medium backdrop-blur transition-colors hover:border-fg/25">
                <FileText className="size-4" /> Résumé
              </a>
            </Magnetic>
            <div className="ml-1 flex gap-2">
              {[{ h: profile.github, I: GithubIcon, l: 'GitHub' }, { h: profile.linkedin, I: LinkedinIcon, l: 'LinkedIn' }].map(({ h, I, l }) => (
                <Magnetic key={l} strength={0.5}>
                  <a href={h} target="_blank" rel="noreferrer" aria-label={l} className="grid size-12 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg/25 hover:text-ink">
                    <I className="size-[18px]" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        <Portrait />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden max-w-6xl items-center justify-between px-8 font-mono text-[11px] tracking-widest text-dim uppercase md:flex"
      >
        <span>Melbourne · {time}</span>
        <button onClick={() => scrollToId('about')} className="flex items-center gap-3 transition-colors hover:text-ink">
          Scroll
          <span className="relative h-8 w-px overflow-hidden bg-line">
            <motion.span className="absolute inset-x-0 top-0 h-3 bg-ink" animate={{ y: [-12, 32] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
          </span>
        </button>
        <span>Portfolio © {new Date().getFullYear()}</span>
      </motion.div>
    </section>
  )
}
