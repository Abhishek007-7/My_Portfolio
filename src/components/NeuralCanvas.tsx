import { useEffect, useRef } from 'react'

/**
 * Interactive "neural network" background: drifting nodes that link up when close,
 * and light up / get pulled toward the cursor.
 */
export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    let pts: P[] = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(110, (w * h) / 14000))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const LINK = 130, MOUSE_R = 190
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const light = document.documentElement.classList.contains('light')
      const base = light ? '30,24,60' : '255,255,255'
      const hotLine = light ? '100,80,224' : '157,140,255'
      const hotDot = light ? '13,148,132' : '94,234,212'
      for (const p of pts) {
        if (!reduce) { p.x += p.vx; p.y += p.vy }
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy)
        if (d < MOUSE_R && d > 1) { p.x += (dx / d) * 0.35; p.y += (dy / d) * 0.35 }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            const md = Math.hypot(mouse.x - (a.x + b.x) / 2, mouse.y - (a.y + b.y) / 2)
            const hot = md < MOUSE_R ? 1 - md / MOUSE_R : 0
            const alpha = (1 - d / LINK) * (0.14 + hot * 0.6)
            ctx.strokeStyle = hot > 0 ? `rgba(${hotLine},${alpha})` : `rgba(${base},${alpha})`
            ctx.lineWidth = 0.6 + hot
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        const md = Math.hypot(mouse.x - p.x, mouse.y - p.y)
        const hot = md < MOUSE_R ? 1 - md / MOUSE_R : 0
        ctx.fillStyle = hot > 0 ? `rgba(${hotDot},${0.4 + hot * 0.6})` : `rgba(${base},0.35)`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + hot * 1.8, 0, Math.PI * 2); ctx.fill()
      }
      if (visible) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = mouse.y = -9999 }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })

    resize(); io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />
}
