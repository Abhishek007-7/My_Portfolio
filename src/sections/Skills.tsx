import { motion } from 'motion/react'
import { Award, Brain, Code2, Cpu, Cloud } from 'lucide-react'
import { Reveal, SectionHeading, trackSpotlight } from '../components/ui'
import { certifications, marquee, skills } from '../data'

const icons = [Brain, Code2, Cloud, Cpu]

export function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee-track flex w-max gap-10">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-medium tracking-tight whitespace-nowrap text-fg/25 md:text-4xl">
            {m}
            <span className="font-serif text-accent/60 italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading index="05" kicker="Toolkit" title="What I work" italic="with." />
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((g, gi) => {
          const Icon = icons[gi]
          return (
            <Reveal key={g.group} delay={gi * 0.06}>
              <div onMouseMove={trackSpotlight} className="spotlight h-full rounded-3xl border border-line bg-surface p-6 md:p-7">
                <div className="spotlight-border" />
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-fg/[0.05] text-accent"><Icon className="size-5" /></span>
                  <h3 className="text-lg font-medium tracking-tight">{g.group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.03, type: 'spring', stiffness: 300, damping: 20 }}
                      whileHover={{ y: -3 }}
                      className="cursor-default rounded-xl border border-line bg-fg/[0.02] px-3.5 py-2 text-sm text-fg/80 transition-colors hover:border-accent/50 hover:text-ink"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.1} className="mt-4">
        <div className="rounded-3xl border border-line bg-surface p-6 md:p-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-fg/[0.05] text-mint"><Award className="size-5" /></span>
            <h3 className="text-lg font-medium tracking-tight">Certifications</h3>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <div key={c.name} className="bg-surface p-5 transition-colors hover:bg-surface-2">
                <div className="font-medium">{c.name}</div>
                <div className="mt-1 text-sm text-muted">{c.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
