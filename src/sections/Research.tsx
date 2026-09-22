import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui'
import { publications } from '../data'

export default function Research() {
  return (
    <section id="research" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeading
        index="04"
        kicker="Research"
        title="Peer-reviewed"
        italic="publications."
        sub="Three conference papers across deep learning, multilingual NLP and computer vision."
      />
      <div className="border-t border-line">
        {publications.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <a
              href={`https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}`}
              target="_blank"
              rel="noreferrer"
              className="group relative isolate grid gap-4 overflow-hidden border-b border-line py-8 md:grid-cols-[80px_1fr_140px] md:gap-8 md:py-10"
            >
              <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-r from-accent/[0.08] to-mint/[0.04] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <span className="font-mono text-sm text-dim transition-colors group-hover:text-accent">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-balance transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{p.title}</h3>
                <div className="mt-2 text-sm text-mint/90">{p.venue}</div>
                <p className="mt-3 max-w-2xl text-pretty text-muted">{p.summary}</p>
              </div>
              <div className="flex items-start justify-between md:flex-col md:items-end md:justify-between">
                <span className="font-mono text-sm text-muted">{p.date}</span>
                <span className="grid size-10 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-transparent group-hover:bg-ink group-hover:text-bg">
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
