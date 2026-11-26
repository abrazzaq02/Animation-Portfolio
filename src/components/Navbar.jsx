import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio.js'
import { useMood } from '../context/MoodContext.jsx'

const sectionMessages = {
  showreel: 'Grab a snack — this is my 40-second showreel 🎬',
  creative: 'Dream big, build bigger! 🦋',
  home: 'Hi! Welcome to my little corner of the internet ✨',
  about: "Here's a bit about me — nice to meet you! 💕",
  skills: 'These are the tools I love to code with 💻',
  projects: 'Ooh, my favourite part — try the live demos! 🚀',
  education: 'My academic journey so far 🎓',
  achievements: 'A few things I\'m really proud of 🏆',
  contact: "Let's connect! I'd love to hear from you 💌",
}

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setMessage, react } = useMood()

  // highlight the section in view and let the companion character comment on it
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id)
            document.body.dataset.section = e.target.id
            setMessage(sectionMessages[e.target.id] || '')
            react('wave', 1400)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [setMessage, react])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, type: 'spring', stiffness: 120, damping: 16 }}
    >
      <a href="#showreel" className="nav__logo" onClick={(e) => go(e, 'showreel')}>
        <span className="nav__logo-badge">{initials}</span>
        <span className="nav__logo-text">
          {profile.name.split(' ')[0]}
          <b>.dev</b>
        </span>
      </a>

      <nav className="nav__links" aria-label="Main">
        {navLinks.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} className={active === l.id ? 'is-active' : ''}>
            {active === l.id && <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
            <span className="nav__label">{l.label}</span>
          </a>
        ))}
      </nav>

      <button
        className={`nav__burger ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__mobile"
            aria-label="Mobile"
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className={active === l.id ? 'is-active' : ''}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <span>0{i + 1}</span> {l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
