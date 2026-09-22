import { motion } from 'motion/react'
import type { Project } from '../data'

/** Generative, animated cover art per project category, no stock images needed. */
export default function ProjectArt({ p, big = false }: { p: Project; big?: boolean }) {
  const c1 = `hsl(${p.hue} 90% 70%)`
  const c2 = `hsl(${(p.hue + 60) % 360} 80% 65%)`
  return (
    <div className="relative size-full overflow-hidden" style={{ background: `radial-gradient(120% 90% at 20% 0%, hsl(${p.hue} 60% 18%), #0c0c12 60%)` }}>
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 grid place-items-center">
        {p.category === 'Speech AI' && <Wave c1={c1} c2={c2} bars={big ? 48 : 32} />}
        {p.category === 'Computer Vision' && <Scan c1={c1} />}
        {p.category === 'NLP' && <Chat c1={c1} c2={c2} />}
        {p.category === 'Machine Learning' && <Scatter c1={c1} c2={c2} />}
        {p.category === 'IoT' && <Radar c1={c1} />}
      </div>
    </div>
  )
}

function Wave({ c1, c2, bars }: { c1: string; c2: string; bars: number }) {
  return (
    <div className="flex h-1/2 items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => {
        const base = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.45)) * Math.exp(-Math.pow((i - bars / 2) / (bars / 2.4), 2))
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full"
            style={{ background: `linear-gradient(${c1}, ${c2})`, height: '100%' }}
            animate={{ scaleY: [base, base * 0.35 + 0.1, base] }}
            transition={{ duration: 1.1 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.03 }}
          />
        )
      })}
    </div>
  )
}

function Scan({ c1 }: { c1: string }) {
  const pts = [
    [50, 18], [34, 28], [66, 28], [28, 46], [72, 46], [40, 44], [60, 44], [50, 56], [42, 68], [58, 68], [50, 82], [32, 62], [68, 62],
  ]
  const links = [[0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 6], [5, 7], [6, 7], [7, 8], [7, 9], [8, 10], [9, 10], [3, 11], [4, 12], [11, 8], [12, 9], [5, 6]]
  return (
    <div className="relative aspect-square h-[70%]">
      <svg viewBox="0 0 100 100" className="size-full">
        {links.map(([a, b], i) => (
          <motion.line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={c1} strokeOpacity="0.45" strokeWidth="0.5"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.05 }} />
        ))}
        {pts.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="1.3" fill={c1} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }} />
        ))}
        {[[12, 8], [88, 8], [12, 92], [88, 92]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y + (y < 50 ? 8 : -8)} V${y} H${x + (x < 50 ? 8 : -8)}`} fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="0.8" />
        ))}
      </svg>
      <motion.div className="absolute inset-x-[10%] h-px" style={{ background: c1, boxShadow: `0 0 16px 2px ${c1}` }} animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] whitespace-nowrap" style={{ color: c1 }}>MATCH 0.916</div>
    </div>
  )
}

function Chat({ c1, c2 }: { c1: string; c2: string }) {
  const msgs = [
    { t: 'ಬೆಳೆಗೆ ಯಾವ ಗೊಬ್ಬರ?', me: true },
    { t: 'Use NPK 10:26:26 at sowing…', me: false },
    { t: 'धन्यवाद 🙏', me: true },
  ]
  return (
    <div className="flex w-[70%] max-w-[300px] flex-col gap-2">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.5, type: 'spring', stiffness: 200, damping: 20 }}
          className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${m.me ? 'self-end rounded-br-sm text-black' : 'self-start rounded-bl-sm border border-white/10 bg-white/5 text-white/85'}`}
          style={m.me ? { background: `linear-gradient(120deg, ${c1}, ${c2})` } : undefined}
        >
          {m.t}
        </motion.div>
      ))}
      <div className="flex gap-1 self-start rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} className="size-1.5 rounded-full bg-white/60" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>
    </div>
  )
}

function Scatter({ c1, c2 }: { c1: string; c2: string }) {
  const dots = Array.from({ length: 36 }, (_, i) => {
    const a = (i * 137.5) % 360, r = 10 + ((i * 29) % 34)
    const x = 50 + Math.cos((a * Math.PI) / 180) * r, y = 50 + Math.sin((a * Math.PI) / 180) * r * 0.8
    return { x, y, cls: x + y * 0.6 > 80 }
  })
  return (
    <svg viewBox="0 0 100 100" className="h-[75%]">
      <motion.path d="M 18 92 C 40 60, 60 55, 90 20" fill="none" stroke="white" strokeOpacity="0.5" strokeDasharray="2 2" strokeWidth="0.6"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
      {dots.map((d, i) => (
        <motion.circle key={i} cx={d.x} cy={d.y} r="1.8" fill={d.cls ? c1 : c2}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03, type: 'spring' }} />
      ))}
    </svg>
  )
}

function Radar({ c1 }: { c1: string }) {
  return (
    <div className="relative grid aspect-square h-[70%] place-items-center">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="absolute inset-0 rounded-full border" style={{ borderColor: c1 }}
          animate={{ scale: [0.2, 1], opacity: [0.8, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }} />
      ))}
      <span className="absolute inset-[30%] rounded-full border border-white/10" />
      <span className="size-3 rounded-full" style={{ background: c1, boxShadow: `0 0 20px 4px ${c1}` }} />
      <div className="absolute top-[14%] right-[4%] rounded bg-black/60 px-2 py-0.5 font-mono text-[10px]" style={{ color: c1 }}>SMS · 12.97°N 77.59°E</div>
    </div>
  )
}
