import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio.js'
import Icon from './Icons.jsx'
import { useMood } from '../context/MoodContext.jsx'
import Girl from './Girl.jsx'

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon name="up" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/** Small character in the corner that comments on each section and reacts to hovers. */
export function Companion() {
  const { mood, message } = useMood()
  const [hidden, setHidden] = useState(false)
  const [bubble, setBubble] = useState(true)

  useEffect(() => {
    setBubble(true)
    const t = setTimeout(() => setBubble(false), 4200)
    return () => clearTimeout(t)
  }, [message])

  if (hidden) {
    return (
      <button className="companion-show" onClick={() => setHidden(false)} aria-label="Show helper character">
        👩🏻‍💻
      </button>
    )
  }
  return (
    <motion.div
      className="companion"
      initial={{ y: 140 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.4, type: 'spring', stiffness: 120, damping: 14 }}
    >
      <AnimatePresence mode="wait">
        {bubble && message && (
          <motion.div
            key={message}
            className="companion__bubble glass"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
      <button className="companion__girl" onClick={() => setBubble((b) => !b)} aria-label="Toggle helper message">
        <Girl pose="stand" mood={mood} />
      </button>
      <button className="companion__close" onClick={() => setHidden(true)} aria-label="Hide helper character">
        ×
      </button>
    </motion.div>
  )
}

export default function Footer() {
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <footer className="footer">
      <div className="footer__float" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} style={{ left: `${(i * 6.3) % 100}%`, animationDelay: `${(i * 0.7) % 6}s`, animationDuration: `${6 + (i % 5)}s` }}>
            {i % 3 === 0 ? '★' : i % 3 === 1 ? '♥' : '✦'}
          </span>
        ))}
      </div>

      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__heart">💗</span>
          <h3>{profile.name}</h3>
          <p>{profile.subtitle}</p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="footer__socials">
          {['github', 'linkedin', 'instagram'].map((k) => (
            <a key={k} href={profile.socials[k]} target="_blank" rel="noreferrer" aria-label={k}>
              <Icon name={k} />
            </a>
          ))}
        </div>
        <p className="footer__credit">
          Designed &amp; Created with <span className="beat">♥</span> Love by <strong>{profile.name}</strong> · © {new Date().getFullYear()}
        </p>
        <motion.button className="footer__top" onClick={toTop} whileHover={{ y: -6 }} whileTap={{ scale: 0.92 }}>
          <span className="footer__top-icon">
            <Icon name="up" />
          </span>
          Back to Top
        </motion.button>
      </div>
    </footer>
  )
}
