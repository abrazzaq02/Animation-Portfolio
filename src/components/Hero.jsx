import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio.js'
import { useMood } from '../context/MoodContext.jsx'
import Girl from './Girl.jsx'
import { AnimatedText, Button } from './ui.jsx'

const CODE = [
  { t: 'const ', c: 'k' },
  { t: 'me', c: 'v' },
  { t: ' = {\n', c: 'p' },
  { t: '  name', c: 'v' },
  { t: ': ', c: 'p' },
  { t: `'${profile.name}'`, c: 's' },
  { t: ',\n', c: 'p' },
  { t: '  loves', c: 'v' },
  { t: ': [', c: 'p' },
  { t: "'code'", c: 's' },
  { t: ', ', c: 'p' },
  { t: "'design'", c: 's' },
  { t: '],\n', c: 'p' },
  { t: '  mood', c: 'v' },
  { t: ': ', c: 'p' },
  { t: "'✨ curious'", c: 's' },
  { t: '\n};\n', c: 'p' },
  { t: 'me', c: 'v' },
  { t: '.', c: 'p' },
  { t: 'build', c: 'f' },
  { t: '(', c: 'p' },
  { t: "'dreams'", c: 's' },
  { t: ');', c: 'p' },
]
const FULL = CODE.reduce((n, s) => n + s.t.length, 0)

/** Code editor window that types itself out, pauses, then restarts. */
function TypingCode() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setN((v) => (v >= FULL + 40 ? 0 : v + 1)), n >= FULL ? 70 : 55)
    return () => clearTimeout(t)
  }, [n])
  let left = Math.min(n, FULL)
  return (
    <pre className="code-win__body">
      {CODE.map((s, i) => {
        if (left <= 0) return null
        const part = s.t.slice(0, left)
        left -= s.t.length
        return (
          <span key={i} className={`tok-${s.c}`}>
            {part}
          </span>
        )
      })}
      <span className="caret" />
    </pre>
  )
}

function DeskScene() {
  const { mood } = useMood()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 15 })
  const sy = useSpring(my, { stiffness: 60, damping: 15 })
  const back = { x: useTransform(sx, (v) => v * -12), y: useTransform(sy, (v) => v * -12) }
  const mid = { x: useTransform(sx, (v) => v * 8), y: useTransform(sy, (v) => v * 8) }
  const front = { x: useTransform(sx, (v) => v * 20), y: useTransform(sy, (v) => v * 20) }

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  return (
    <motion.div
      className="desk"
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="desk__halo" style={back} />

      {/* floating code editor */}
      <motion.div className="code-win glass" style={back}>
        <div className="code-win__bar">
          <i /> <i /> <i />
          <span>me.js</span>
        </div>
        <TypingCode />
      </motion.div>

      {/* floating chips */}
      <motion.div className="desk__chip desk__chip--1 glass" style={front}>
        <span>💡</span> Idea → Code
      </motion.div>
      <motion.div className="desk__chip desk__chip--2 glass" style={front}>
        <span>🐞</span> 0 bugs <small>(today)</small>
      </motion.div>

      {/* the student */}
      <motion.div className="desk__girl" style={mid}>
        <Girl pose="sit" mood={mood} />
        <div className={`desk__thought ${mood !== 'idle' ? 'is-on' : ''}`}>♥</div>
      </motion.div>

      {/* desk & gadgets */}
      <div className="desk__table">
        <svg className="laptop" viewBox="0 0 220 150" aria-hidden="true">
          <defs>
            <linearGradient id="lid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F3D3E2" />
            </linearGradient>
          </defs>
          <rect x="22" y="6" width="176" height="118" rx="12" fill="url(#lid)" stroke="#EFA6C8" strokeWidth="3" />
          <path
            className="laptop__logo"
            d="M110 82 C96 72 88 64 88 55 a10 10 0 0 1 22 -3 a10 10 0 0 1 22 3 c0 9 -8 17 -22 27z"
            fill="#F28CB1"
          />
          <text x="110" y="108" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#D07AA2">
            {'<code with love/>'}
          </text>
          <path d="M4 128 h212 l-10 14 h-192 z" fill="#F7C6DA" stroke="#EFA6C8" strokeWidth="2" />
          {/* stickers */}
          <circle cx="50" cy="30" r="9" fill="#FADADD" stroke="#EFA6C8" />
          <text x="50" y="34" textAnchor="middle" fontSize="10">⭐</text>
          <rect x="160" y="22" width="22" height="14" rx="4" fill="#FADADD" stroke="#EFA6C8" />
          <text x="171" y="32" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#C86A97">{'{ }'}</text>
        </svg>

        {/* mug with steam */}
        <div className="mug">
          <div className="mug__steam">
            <i />
            <i />
            <i />
          </div>
          <div className="mug__cup">☕</div>
        </div>

        {/* mouse with click pulse */}
        <div className="mouse" aria-hidden="true">
          <div className="mouse__body">
            <span className="mouse__wheel" />
          </div>
          <span className="mouse__click" />
        </div>

        {/* plant */}
        <div className="plant" aria-hidden="true">🌷</div>
      </div>
    </motion.div>
  )
}

const WORDS = ['Eat.', 'Sleep.', 'Code.', 'Repeat.']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero" ref={ref}>
      <motion.div className="hero__text" style={{ y: textY, opacity: fade }}>
        <motion.span
          className="hero__badge glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
          <span className="dot" /> Available for internships
        </motion.span>

        <h1 className="hero__title">
          <AnimatedText text="HELLO, I'M A" className="hero__title-1" delay={1.8} stagger={0.04} />
          <AnimatedText text="COMPUTER SCIENCE" className="hero__title-2 gradient-text" delay={2.2} stagger={0.035} />
          <AnimatedText text="STUDENT" className="hero__title-3" delay={2.75} stagger={0.05} />
        </h1>

        <motion.p
          className="hero__name"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.1 }}
        >
          <span className="hero__wave">👋</span> I'm <strong>{profile.name}</strong>
        </motion.p>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.25 }}
        >
          {profile.subtitle.split('|').map((part, i, arr) => (
            <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && <em> | </em>}
            </span>
          ))}
        </motion.p>

        <div className="hero__mantra" aria-label="Eat. Sleep. Code. Repeat.">
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 3.4 + i * 0.15 },
                y: { delay: 3.4 + i * 0.15, duration: 2.4, repeat: Infinity, repeatDelay: 0.6 + i * 0.1, ease: 'easeInOut' },
              }}
            >
              {w}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6 }}
        >
          <Button href="#projects" onClick={scrollTo('projects')}>
            Explore My Work <span aria-hidden>→</span>
          </Button>
          <Button href="#contact" variant="ghost" onClick={scrollTo('contact')} mood="wave">
            Contact Me <span aria-hidden>💌</span>
          </Button>
        </motion.div>
      </motion.div>

      <DeskScene />

      <a href="#about" className="hero__scroll" onClick={scrollTo('about')} aria-label="Scroll to About section">
        <span className="hero__scroll-mouse">
          <i />
        </span>
        scroll
      </a>
    </section>
  )
}
