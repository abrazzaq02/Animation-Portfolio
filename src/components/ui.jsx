import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReactive } from '../context/MoodContext.jsx'

/** Letter-by-letter entrance. Words stay together so lines wrap naturally. */
export function AnimatedText({ text, as = 'span', className = '', delay = 0, stagger = 0.035, once = true }) {
  const Tag = motion[as]
  const words = text.split(' ')
  let i = 0
  return (
    <Tag
      className={`anim-text ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span className="anim-text__word" key={wi} aria-hidden="true">
          {[...word].map((ch) => {
            const idx = i++
            return (
              <motion.span
                key={idx}
                className="anim-text__char"
                variants={{
                  hidden: { opacity: 0, y: '0.6em', rotate: 8, scale: 0.6 },
                  show: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    transition: { delay: delay + idx * stagger, type: 'spring', stiffness: 380, damping: 18 },
                  },
                }}
              >
                {ch}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

export function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="section-title">
      <motion.span
        className="section-title__eyebrow"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {eyebrow}
      </motion.span>
      <AnimatedText as="h2" text={title} className="section-title__text" />
      <svg className="section-title__squiggle" viewBox="0 0 120 12" aria-hidden="true">
        <motion.path
          d="M2 7 Q 12 1 22 7 T 42 7 T 62 7 T 82 7 T 102 7 T 118 6"
          fill="none"
          stroke="url(#squiggle-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="squiggle-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#F8C8DC" />
            <stop offset="50%" stopColor="#E07AA8" />
            <stop offset="100%" stopColor="#D96C9D" />
          </linearGradient>
        </defs>
      </svg>
      {subtitle && (
        <motion.p
          className="section-title__sub"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/** Button / link that makes the character react on hover. */
export function Button({ href, onClick, variant = 'primary', children, mood = 'excited', ...rest }) {
  const reactive = useReactive(mood)
  const Comp = href ? motion.a : motion.button
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={`btn btn--${variant}`}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      {...reactive}
      {...rest}
    >
      <span className="btn__shine" aria-hidden="true" />
      {children}
    </Comp>
  )
}

/** Counts up from 0 when scrolled into view. */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

/** Fade + rise on scroll, reused by many sections. */
export const Reveal = ({ children, delay = 0, y = 30, className = '', ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
)

/** Card that tilts toward the cursor in 3D. */
export function TiltCard({ children, className = '', max = 10, ...rest }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${-py * max}deg`)
    el.style.setProperty('--ry', `${px * max}deg`)
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }
  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </div>
  )
}
