import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { projects } from '../data/portfolio.js'
import Icon from './Icons.jsx'
import Cover from './Covers.jsx'
import { Button, SectionTitle, TiltCard } from './ui.jsx'
import { AIChatDemo, CalculatorDemo, StudentsDemo, TodoDemo, VisionDemo } from './Demos.jsx'
import { useMood } from '../context/MoodContext.jsx'

const DEMOS = { calculator: CalculatorDemo, todo: TodoDemo, students: StudentsDemo, 'ai-chat': AIChatDemo, 'ai-vision': VisionDemo }
const FILTERS = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'ai', label: 'AI / ML', emoji: '🤖' },
  { id: 'web', label: 'Web', emoji: '🌐' },
  { id: 'app', label: 'Apps', emoji: '📱' },
]
const CAT_LABEL = { ai: 'AI · Machine Learning', web: 'Web Development', app: 'Application' }

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

  const Demo = DEMOS[project.id]
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

function Actions({ p, onDemo }) {
  return (
    <div className="project__actions">
      <Button href={p.demo || '#'} onClick={onDemo(p)} target={p.demo && !p.demo.startsWith('#') ? '_blank' : undefined} rel="noreferrer">
        <Icon name="external" /> Live Demo
      </Button>
      <Button href={p.github} variant="ghost" target="_blank" rel="noreferrer" mood="happy">
        <Icon name="github" /> GitHub
      </Button>
    </div>
  )
}

function Featured({ p, onDemo }) {
  const { react } = useMood()
  return (
    <motion.article
      layout
      className="featured"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => react('excited')}
    >
      <div className="featured__frame">
        <div className="featured__inner glass">
          <div className="featured__cover">
            <Cover type={p.cover} />
            <span className="featured__badge">
              <span>★</span> Featured Project
            </span>
          </div>
          <div className="featured__body">
            <span className="project__cat">
              {CAT_LABEL[p.category]} · {p.year}
            </span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="featured__points">
              <li>Explains topics step by step in plain language</li>
              <li>Generates practice quizzes from your notes</li>
              <li>Remembers what you studied across sessions</li>
            </ul>
            <ul className="project__tech">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <Actions p={p} onDemo={onDemo} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function Card({ p, i, onDemo }) {
  return (
    <motion.article
      layout
      className="project-wrap"
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="project glass" max={6}>
        <div className="project__art">
          <Cover type={p.cover} />
          <a href={p.demo || '#'} onClick={onDemo(p)} className="project__peek" tabIndex={-1} aria-hidden="true">
            <span>▶ Try it live</span>
          </a>
          <span className="project__year">{p.year}</span>
        </div>
        <div className="project__body">
          <span className="project__cat">{CAT_LABEL[p.category]}</span>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <ul className="project__tech">
            {p.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <Actions p={p} onDemo={onDemo} />
        </div>
      </TiltCard>
    </motion.article>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)
  const [filter, setFilter] = useState('all')

  const onDemo = (p) => (e) => {
    if (p.demo && p.demo.startsWith('#')) {
      e.preventDefault()
      document.getElementById(p.demo.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else if (!p.demo) {
      e.preventDefault()
      setOpen(p)
    }
  }

  const visible = projects.filter((p) => filter === 'all' || p.category === filter)
  const featured = visible.find((p) => p.featured)
  const rest = visible.filter((p) => p !== featured)

  return (
    <section id="projects" className="section projects">
      <SectionTitle eyebrow="🚀 Projects" title="Things I've Built" subtitle="From AI assistants to everyday apps — click Live Demo to play with them right here." />

      <div className="filters" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count = f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length
          return (
            <button key={f.id} role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'is-on' : ''} onClick={() => setFilter(f.id)}>
              {filter === f.id && <motion.span layoutId="filter-pill" className="filters__pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className="filters__label">
                {f.emoji} {f.label} <small>{count}</small>
              </span>
            </button>
          )
        })}
      </div>

      <LayoutGroup>
        <AnimatePresence mode="popLayout">{featured && <Featured key={featured.id} p={featured} onDemo={onDemo} />}</AnimatePresence>
        <motion.div layout className="projects__grid">
          <AnimatePresence mode="popLayout">
            {rest.map((p, i) => (
              <Card key={p.id} p={p} i={i} onDemo={onDemo} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>{open && <DemoModal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
