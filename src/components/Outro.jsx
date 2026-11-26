import { motion } from 'framer-motion'
import { useState } from 'react'
import { dedication } from '../data/portfolio.js'
import Girl from './Girl.jsx'
import { AnimatedText } from './ui.jsx'

const KEEP = ['KEEP DREAMING.', 'KEEP CREATING.', 'KEEP CODING.']

/** Final "thank you" scene with the character waving goodbye. */
export default function Outro() {
  const [cheer, setCheer] = useState(false)
  return (
    <section id="thanks" className="outro" aria-label="Thank you">
      <div className="outro__sparks" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} style={{ left: `${(i * 41) % 96}%`, top: `${(i * 67) % 90}%`, animationDelay: `${i * -0.45}s` }}>
            {i % 3 === 0 ? '✦' : i % 3 === 1 ? '♥' : '✧'}
          </span>
        ))}
      </div>

      <div className="outro__card">
        <AnimatedText as="h2" text="THANK YOU FOR VISITING!" className="outro__thanks" stagger={0.03} />
        <p className="outro__keep">
          {KEEP.map((k, i) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.3, duration: 0.6 }}
            >
              {k}
            </motion.span>
          ))}
        </p>

        <motion.div
          className="outro__girl"
          onMouseEnter={() => setCheer(true)}
          onMouseLeave={() => setCheer(false)}
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.4 }}
        >
          <Girl pose="stand" mood={cheer ? 'celebrate' : 'wave'} />
          <span className="outro__bye">Bye bye! 👋</span>
        </motion.div>

        <motion.p
          className="outro__sig"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.4, ease: 'easeInOut' }}
        >
          Made with Love for {dedication.for} ♡
        </motion.p>
        {dedication.from && <p className="outro__from">— from {dedication.from}</p>}
      </div>
    </section>
  )
}
