import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Girl from './Girl.jsx'

const WORDS = ['HELLO', 'CREATIVE', 'CODING', 'CS STUDENT', 'WELCOME']

function Row({ reverse, outline }) {
  const list = [...WORDS, ...WORDS]
  return (
    <div className={`band__row ${reverse ? 'band__row--rev' : ''} ${outline ? 'band__row--outline' : ''}`}>
      <div className="band__track">
        {[0, 1].map((k) => (
          <div className="band__group" key={k} aria-hidden={k === 1}>
            {list.map((w, i) => (
              <span key={i} className="band__word">
                {w}
                <i>{i % 2 ? '♥' : '✦'}</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Two scrolling word ribbons with a little student walking back and forth on top. */
export default function WordBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 2])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -2])

  return (
    <section className="band" ref={ref} aria-label="Hello, creative, coding, CS student, welcome">
      <div className="band__walkway" aria-hidden="true">
        <div className="band__walker">
          <div className="band__walker-flip">
            <Girl pose="walk" />
          </div>
          <span className="band__walker-bubble">Hello! 👋</span>
        </div>
      </div>
      <motion.div style={{ rotate }} className="band__ribbon band__ribbon--a">
        <Row />
      </motion.div>
      <motion.div style={{ rotate: rotate2 }} className="band__ribbon band__ribbon--b">
        <Row reverse outline />
      </motion.div>
    </section>
  )
}
