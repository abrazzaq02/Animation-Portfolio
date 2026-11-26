import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { memo, useEffect, useRef, useState } from 'react'

/* ───────────── floating letters, numbers, code symbols, hearts & stars ───────────── */

const GLYPHS = ['</>', '{ }', '01', 'A', 'B', 'C', '#', ';', '=>', '()', '[ ]', '&&', 'π', '∑', '7', '3', 'λ', 'Ω', '++', '♥', '✦', '★', '✿', '♡', 'x²', '!=', 'if', 'js', '💻', '⌨️', '🖱️', '🌸']

// deterministic pseudo-random so layout is stable between renders
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const ITEMS = GLYPHS.map((g, i) => ({
  g,
  left: rand(i + 1) * 100,
  top: rand(i + 50) * 100,
  size: 14 + rand(i + 100) * 22,
  dur: 9 + rand(i + 150) * 10,
  delay: -rand(i + 200) * 12,
  depth: 0.2 + rand(i + 250) * 0.8,
  hue: i % 3,
}))

export const FloatingBackground = memo(function FloatingBackground() {
  const { scrollY } = useScroll()
  const near = useTransform(scrollY, (v) => v * -0.25)
  const far = useTransform(scrollY, (v) => v * -0.08)
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__blob ambient__blob--1" />
      <div className="ambient__blob ambient__blob--2" />
      <div className="ambient__blob ambient__blob--3" />
      {[far, near].map((y, layer) => (
        <motion.div className="ambient__layer" style={{ y }} key={layer}>
          {ITEMS.filter((_, i) => i % 2 === layer).map((it, i) => (
            <span
              key={i}
              className={`ambient__glyph hue-${it.hue}`}
              style={{
                left: `${it.left}%`,
                top: `${it.top * 2.2}%`,
                fontSize: it.size * (layer ? 1 : 0.8),
                animationDuration: `${it.dur}s`,
                animationDelay: `${it.delay}s`,
                opacity: layer ? 0.5 : 0.3,
              }}
            >
              {it.g}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  )
})

/* ───────────── top scroll progress bar ───────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

/* ───────────── intro loader ───────────── */

export function Loader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1700)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
          transition={{ duration: 0.6 }}
        >
          <div className="loader__word">
            {'WELCOME'.split('').map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0, rotate: -15 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 14 }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="loader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          <span className="loader__heart">♥</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────────── sparkle cursor trail (desktop pointers only) ───────────── */

export function SparkleTrail() {
  const ref = useRef(null)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    let last = 0
    let alive = 0
    const symbols = ['✦', '♥', '✧', '·']
    const onMove = (e) => {
      const now = performance.now()
      if (now - last < 45 || alive > 14) return
      last = now
      const s = document.createElement('span')
      s.className = 'sparkle'
      s.textContent = symbols[Math.floor(Math.random() * symbols.length)]
      s.style.left = `${e.clientX}px`
      s.style.top = `${e.clientY}px`
      s.style.setProperty('--dx', `${(Math.random() - 0.5) * 40}px`)
      ref.current?.appendChild(s)
      alive++
      setTimeout(() => {
        s.remove()
        alive--
      }, 800)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return <div ref={ref} className="sparkle-layer" aria-hidden="true" />
}
