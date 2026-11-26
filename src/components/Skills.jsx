import { motion } from 'framer-motion'
import { skills } from '../data/portfolio.js'
import Icon from './Icons.jsx'
import { SectionTitle, TiltCard } from './ui.jsx'
import { useReactive } from '../context/MoodContext.jsx'

const R = 34
const CIRC = 2 * Math.PI * R

function SkillCard({ skill, i }) {
  const reactive = useReactive('happy')
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: i % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (i % 5) * 0.08, type: 'spring', stiffness: 160, damping: 16 }}
    >
      <TiltCard className="skill glass" tabIndex={0} {...reactive}>
        <div className="skill__ring">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r={R} className="skill__track" />
            <motion.circle
              cx="40"
              cy="40"
              r={R}
              className="skill__fill"
              style={{ stroke: skill.color }}
              strokeDasharray={CIRC}
              initial={{ strokeDashoffset: CIRC }}
              whileInView={{ strokeDashoffset: CIRC * (1 - skill.level / 100) }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.2 + (i % 5) * 0.08, ease: 'easeOut' }}
            />
          </svg>
          <span className="skill__icon" style={{ color: skill.color }}>
            <Icon name={skill.icon} />
          </span>
        </div>
        <h3>{skill.name}</h3>
        <div className="skill__bar">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3 + (i % 5) * 0.08, ease: 'easeOut' }}
          />
        </div>
        <span className="skill__pct">{skill.level}%</span>
      </TiltCard>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <SectionTitle eyebrow="💻 Skills" title="My Tech Toolbox" subtitle="Languages, frameworks and superpowers I use to bring ideas to life." />
      <div className="skills__grid">
        {skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} i={i} />
        ))}
      </div>
    </section>
  )
}
