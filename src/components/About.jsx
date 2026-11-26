import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { about, profile } from '../data/portfolio.js'
import Girl from './Girl.jsx'
import Icon from './Icons.jsx'
import { Counter, Reveal, SectionTitle } from './ui.jsx'
import { useReactive } from '../context/MoodContext.jsx'

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]
const TYPE_WORDS = ['HELLO', 'CODE', 'CREATE', 'DREAM']

/** Pastel keyboard whose keys press themselves to spell words. */
function AnimatedKeyboard() {
  const [pressed, setPressed] = useState(null)
  const [typed, setTyped] = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })

  useEffect(() => {
    if (!inView) return
    let w = 0
    let c = 0
    let t
    const step = () => {
      const word = TYPE_WORDS[w]
      if (c < word.length) {
        const ch = word[c]
        setPressed(ch)
        setTyped(word.slice(0, c + 1))
        c++
        t = setTimeout(() => {
          setPressed(null)
          t = setTimeout(step, 120)
        }, 180)
      } else {
        t = setTimeout(() => {
          w = (w + 1) % TYPE_WORDS.length
          c = 0
          setTyped('')
          step()
        }, 1200)
      }
    }
    step()
    return () => clearTimeout(t)
  }, [inView])

  return (
    <div className="kb glass" ref={ref} aria-hidden="true">
      <div className="kb__screen">
        &gt; {typed}
        <span className="caret" />
      </div>
      {KEYS.map((row, r) => (
        <div className="kb__row" key={r} style={{ paddingLeft: r * 12 }}>
          {row.map((k) => (
            <span key={k} className={`kb__key ${pressed === k ? 'is-down' : ''}`}>
              {k}
            </span>
          ))}
        </div>
      ))}
      <div className="kb__row">
        <span className="kb__key kb__key--space">{'♥'}</span>
      </div>
    </div>
  )
}

function Interest({ label, icon, i }) {
  const reactive = useReactive('happy')
  return (
    <motion.li
      className="chip glass"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * i, type: 'spring', stiffness: 300, damping: 15 }}
      whileHover={{ y: -4, rotate: i % 2 ? 3 : -3 }}
      tabIndex={0}
      {...reactive}
    >
      <Icon name={icon} /> {label}
    </motion.li>
  )
}

export default function About() {
  const girlRef = useRef(null)
  const girlInView = useInView(girlRef, { amount: 0.5 })
  const [hello, setHello] = useState(false)

  useEffect(() => {
    if (!girlInView) return
    setHello(true)
    const t = setTimeout(() => setHello(false), 2600)
    return () => clearTimeout(t)
  }, [girlInView])

  return (
    <section id="about" className="section about">
      <SectionTitle eyebrow="👩🏻‍💻 About Me" title="A LITTLE ABOUT ME" subtitle="A little story about the human behind the code." />

      <div className="about__grid">
        <Reveal className="about__art">
          <div className="about__stage" ref={girlRef} onMouseEnter={() => setHello(true)} onMouseLeave={() => setHello(false)}>
            <div className="about__ring" />
            <div className="about__ring about__ring--2" />
            <motion.div className="about__girl" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <Girl pose="stand" mood={hello ? 'wave' : 'idle'} />
            </motion.div>
            <motion.div
              className="about__bubble glass"
              animate={{ opacity: hello ? 1 : 0, scale: hello ? 1 : 0.6, y: hello ? 0 : 10 }}
            >
              Hi, I'm {profile.name}! 💖
            </motion.div>
            {profile.photo && (
              <motion.img
                className="about__photo"
                src={profile.photo}
                alt={profile.name}
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.3 }}
              />
            )}
            <span className="orbit orbit--1">{'</>'}</span>
            <span className="orbit orbit--2">☕</span>
            <span className="orbit orbit--3">💡</span>
            <span className="orbit orbit--4">♥</span>
          </div>
          <AnimatedKeyboard />
        </Reveal>

        <div className="about__copy">
          <Reveal>
            <p className="about__lead">{about.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{about.more}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="about__meta">
              <span>
                <Icon name="grad" /> {profile.role}
              </span>
              <span>
                <Icon name="uni" /> {profile.university}
              </span>
              <span>
                <Icon name="pin" /> {profile.location}
              </span>
            </p>
          </Reveal>

          <h3 className="about__h3">Things I love</h3>
          <ul className="chips">
            {about.interests.map((it, i) => (
              <Interest key={it.label} {...it} i={i} />
            ))}
          </ul>

          <div className="stats">
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="stat glass">
                <strong className="gradient-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
