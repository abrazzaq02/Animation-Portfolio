import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { certifications, courses, education, profile } from '../data/portfolio.js'
import Icon from './Icons.jsx'
import { Reveal, SectionTitle } from './ui.jsx'

export default function Education() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="education" className="section education">
      <SectionTitle eyebrow="🎓 Education" title="My Academic Journey" subtitle={`${profile.role} at ${profile.university}`} />

      <div className="timeline" ref={ref}>
        <div className="timeline__line">
          <motion.span style={{ scaleY }} />
        </div>
        {education.map((e, i) => (
          <motion.div
            key={e.title}
            className={`timeline__item ${i % 2 ? 'is-right' : 'is-left'}`}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="timeline__dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.2 }}
            >
              <Icon name={e.icon} />
            </motion.span>
            <div className="timeline__card glass">
              <span className="timeline__year">{e.year}</span>
              <h3>{e.title}</h3>
              <span className="timeline__place">{e.place}</span>
              <p>{e.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="edu-lists">
        <Reveal className="edu-list glass">
          <h3>
            <Icon name="book" /> Key Courses
          </h3>
          <ul>
            {courses.map((c, i) => (
              <motion.li key={c} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                {c}
              </motion.li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="edu-list glass" delay={0.1}>
          <h3>
            <Icon name="cert" /> Certifications
          </h3>
          <ul>
            {certifications.map((c, i) => (
              <motion.li key={c} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                {c}
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
