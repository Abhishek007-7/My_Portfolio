import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Briefcase, GraduationCap } from 'lucide-react'
import { Chip, Reveal, SectionHeading, trackSpotlight } from '../components/ui'
import { timeline } from '../data'

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading
        index="02"
        kicker="Journey"
        title="From circuits to"
        italic="neural networks."
        sub="Industry roles and study that got me here: Bahrain, Bengaluru and now Melbourne."
      />

      <div ref={ref} className="relative">
        <div className="absolute top-2 bottom-2 left-[15px] w-px bg-line md:left-1/2" />
        <motion.div style={{ scaleY }} className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-gradient-to-b from-accent via-mint to-accent md:left-1/2" />

        <div className="space-y-12 md:space-y-20">
          {timeline.map((t, i) => {
            const Icon = t.kind === 'work' ? Briefcase : GraduationCap
            const left = i % 2 === 0
            return (
              <div key={t.title} className="relative grid md:grid-cols-2 md:gap-16">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`absolute top-6 left-0 z-10 grid size-[31px] place-items-center rounded-full border md:left-1/2 md:-translate-x-1/2 ${t.current ? 'border-mint/60 bg-mint/15 text-mint' : 'border-line bg-surface text-muted'}`}
                >
                  <Icon className="size-3.5" />
                </motion.span>

                <div className={`hidden md:flex md:items-start md:pt-6 ${left ? 'md:order-2' : 'md:justify-end'}`}>
                  <Reveal>
                    <div className="font-mono text-sm tracking-wider text-muted">{t.period}</div>
                  </Reveal>
                </div>

                <Reveal className={`pl-12 md:pl-0 ${left ? 'md:order-1' : ''}`} y={40}>
                  <article onMouseMove={trackSpotlight} className="spotlight rounded-3xl border border-line bg-surface p-6 md:p-7">
                    <div className="spotlight-border" />
                    <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
                      <span className={t.kind === 'work' ? 'text-accent' : 'text-mint'}>{t.kind === 'work' ? 'Experience' : 'Education'}</span>
                      <span className="text-dim md:hidden">· {t.period}</span>
                      {t.current && <span className="rounded-full bg-mint/10 px-2 py-0.5 text-mint">Now</span>}
                    </div>
                    <h3 className="text-xl font-medium tracking-tight md:text-2xl">{t.title}</h3>
                    <div className="mt-1 text-muted">{t.org} · {t.place}</div>
                    <ul className="mt-5 space-y-2 text-[15px] text-fg/75">
                      {t.points.map((p) => (
                        <li key={p} className="flex gap-3"><span className="mt-2.5 size-1 shrink-0 rounded-full bg-fg/30" />{p}</li>
                      ))}
                    </ul>
                    {t.tags && <div className="mt-5 flex flex-wrap gap-2">{t.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>}
                  </article>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
