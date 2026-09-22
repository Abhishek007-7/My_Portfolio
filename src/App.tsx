import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Lenis from 'lenis'
import { setLenis } from './components/ui'
import CommandPalette from './components/CommandPalette'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Journey from './sections/Journey'
import Projects from './sections/Projects'
import Research from './sections/Research'
import Skills, { Marquee } from './sections/Skills'
import Contact from './sections/Contact'

function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const start = performance.now(), dur = 1100
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 150)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 md:p-10"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex justify-between font-mono text-xs tracking-widest text-dim uppercase">
        <span>Abhishek Madhu Vidya</span>
        <span>Portfolio · {new Date().getFullYear()}</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="font-serif text-2xl text-muted italic md:text-3xl">Loading neurons…</div>
        <div className="text-[clamp(4rem,16vw,12rem)] leading-none font-medium tracking-tighter tabular-nums">{n}</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line">
        <div className="h-full bg-gradient-to-r from-accent to-mint" style={{ width: `${n}%` }} />
      </div>
    </motion.div>
  )
}

const seen = () => { try { return sessionStorage.getItem('intro') === '1' } catch { return false } }

export default function App() {
  const [ready, setReady] = useState(seen)
  const [palette, setPalette] = useState(false)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    setLenis(lenis)
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null) }
  }, [])

  const done = () => { try { sessionStorage.setItem('intro', '1') } catch { /* ignore */ } setReady(true) }

  return (
    <div className="grain">
      <AnimatePresence>{!ready && <Loader onDone={done} />}</AnimatePresence>
      {ready && (
        <>
          <Nav onPalette={() => setPalette(true)} />
          <main>
            <Hero />
            <About />
            <Marquee />
            <Journey />
            <Projects />
            <Research />
            <Skills />
          </main>
          <Contact />
        </>
      )}
      <CommandPalette open={palette} setOpen={setPalette} />
    </div>
  )
}
