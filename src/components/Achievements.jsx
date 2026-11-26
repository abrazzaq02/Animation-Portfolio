import { motion } from 'framer-motion'
import { achievements } from '../data/portfolio.js'
import Icon from './Icons.jsx'
import { SectionTitle, TiltCard } from './ui.jsx'
import { useReactive } from '../context/MoodContext.jsx'

function Card({ a, i }) {
  const reactive = useReactive('excited')
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (i % 3) * 0.1, type: 'spring', stiffness: 150, damping: 16 }}
    >
      <TiltCard className="ach glass" tabIndex={0} {...reactive}>
        <span className="ach__ribbon">{a.tag}</span>
        <div className="ach__icon">
          <Icon name={a.icon} />
          <span className="ach__sparkle ach__sparkle--1">✦</span>
          <span className="ach__sparkle ach__sparkle--2">✧</span>
        </div>
        <h3>{a.title}</h3>
        <p>{a.text}</p>
        <span className="ach__glare" aria-hidden="true" />
      </TiltCard>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <SectionTitle eyebrow="🏆 Achievements" title="Proud Moments" subtitle="Certificates, challenges and milestones along the way." />
      <div className="ach__grid">
        {achievements.map((a, i) => (
          <Card key={a.title} a={a} i={i} />
        ))}
      </div>
    </section>
  )
}
