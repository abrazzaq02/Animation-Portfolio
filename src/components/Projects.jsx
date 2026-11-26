import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { projects } from '../data/portfolio.js'
import Icon from './Icons.jsx'
import { Button, SectionTitle, TiltCard } from './ui.jsx'
import { CalculatorDemo, StudentsDemo, TodoDemo } from './Demos.jsx'

/* Illustrated thumbnails — pure CSS/SVG so there are no image files to manage. */
function Art({ type }) {
  if (type === 'portfolio')
    return (
      <div className="art art--portfolio">
        <div className="art__win">
          <div className="art__bar">
            <i /> <i /> <i />
          </div>
          <div className="art__hero">
            <span className="art__avatar">👩🏻‍💻</span>
            <span className="art__line art__line--lg" />
            <span className="art__line" />
          </div>
          <div className="art__cards">
            <span />
            <span />
            <span />
          </div>
        </div>
        <span className="art__float">♥</span>
      </div>
    )
  if (type === 'students')
    return (
      <div className="art art--students">
        <div className="art__table">
          {['👩', '👨', '👧', '🧑'].map((e, i) => (
            <div className="art__row" key={i} style={{ animationDelay: `${i * 0.2}s` }}>
              <span>{e}</span>
              <i style={{ width: `${50 + ((i * 17) % 40)}%` }} />
              <b>{['A+', 'A', 'B+', 'A-'][i]}</b>
            </div>
          ))}
        </div>
      </div>
    )
  if (type === 'calculator')
    return (
      <div className="art art--calc">
        <div className="art__calc">
          <div className="art__display">
            12 × 7 = <b>84</b>
          </div>
          <div className="art__keys">
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+'].map((k, i) => (
              <span key={k} style={{ animationDelay: `${(i * 0.37) % 3}s` }}>
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  return (
    <div className="art art--todo">
      <div className="art__list">
        {['Finish DSA homework', 'Push to GitHub', 'Design new UI', 'Drink water 💧'].map((t, i) => (
          <div className="art__task" key={t} style={{ animationDelay: `${i * 0.6}s` }}>
            <span className="art__check">✓</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

function DemoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const Demo = { calculator: CalculatorDemo, todo: TodoDemo, students: StudentsDemo }[project.id]

  return (
    <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="modal__card glass"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} live demo`}
        initial={{ y: 60, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close demo" autoFocus>
          ×
        </button>
        <span className="section-title__eyebrow">Live Demo</span>
        <h3 className="modal__title">{project.title}</h3>
        {Demo && <Demo />}
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)

  const onDemo = (p) => (e) => {
    if (p.demo && p.demo.startsWith('#')) {
      e.preventDefault()
      document.getElementById(p.demo.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else if (!p.demo) {
      e.preventDefault()
      setOpen(p)
    }
  }

  return (
    <section id="projects" className="section projects">
      <SectionTitle eyebrow="🚀 Projects" title="Things I've Built" subtitle="A few favourites — click Live Demo to play with them right here." />

      <div className="projects__grid">
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            className="project-wrap"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (i % 2) * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="project glass" max={6}>
              <div className="project__art">
                <Art type={p.art} />
                <span className="project__num">0{i + 1}</span>
              </div>
              <div className="project__body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul className="project__tech">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="project__actions">
                  <Button href={p.demo || '#'} onClick={onDemo(p)} target={p.demo && !p.demo.startsWith('#') ? '_blank' : undefined} rel="noreferrer">
                    <Icon name="external" /> Live Demo
                  </Button>
                  <Button href={p.github} variant="ghost" target="_blank" rel="noreferrer" mood="happy">
                    <Icon name="github" /> GitHub
                  </Button>
                </div>
              </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>{open && <DemoModal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
