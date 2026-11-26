import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { profile } from '../data/portfolio.js'
import Icon from './Icons.jsx'
import { Button, Reveal, SectionTitle } from './ui.jsx'
import { useMood } from '../context/MoodContext.jsx'

/** Envelope character — blinks, bobs, opens its flap while you type, flies off on send. */
function Envelope({ state }) {
  return (
    <motion.div
      className={`envelope envelope--${state}`}
      animate={
        state === 'sent'
          ? { x: [0, -10, 400], y: [0, 10, -300], rotate: [0, -10, 25], opacity: [1, 1, 0] }
          : { x: 0, y: [0, -12, 0], rotate: [0, 2, -2, 0], opacity: 1 }
      }
      transition={state === 'sent' ? { duration: 1.4, ease: 'easeIn' } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 160">
        <defs>
          <linearGradient id="env" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE3EE" />
            <stop offset="100%" stopColor="#F6B6D1" />
          </linearGradient>
          <clipPath id="env-clip">
            <rect x="0" y="-60" width="200" height="114" />
          </clipPath>
        </defs>
        <rect x="20" y="50" width="160" height="100" rx="14" fill="url(#env)" stroke="#EFA6C8" strokeWidth="3" />
        <path d="M22 140 L100 96 L178 140" fill="none" stroke="#EFA6C8" strokeWidth="3" strokeLinejoin="round" />
        <path className="envelope__flap" d="M22 58 L100 112 L178 58 Q178 50 170 50 H30 Q22 50 22 58Z" fill="#F9CFE1" stroke="#EFA6C8" strokeWidth="3" strokeLinejoin="round" />
        {/* letter slides up out of the open envelope (clipped so it never shows below the flap line) */}
        <g clipPath="url(#env-clip)">
        <g className="envelope__letter">
          <rect x="40" y="30" width="120" height="90" rx="8" fill="#fff" stroke="#F2B6CF" strokeWidth="2" />
          <line x1="56" y1="50" x2="140" y2="50" stroke="#F8C8DC" strokeWidth="4" strokeLinecap="round" />
          <line x1="56" y1="64" x2="120" y2="64" stroke="#F8C8DC" strokeWidth="4" strokeLinecap="round" />
          <text x="100" y="92" textAnchor="middle" fontSize="20">💖</text>
        </g>
        </g>
        {/* face */}
        <g className="envelope__eyes">
          <ellipse cx="78" cy="122" rx="5" ry="6.5" fill="#3E2433" />
          <ellipse cx="122" cy="122" rx="5" ry="6.5" fill="#3E2433" />
          <circle cx="80" cy="119" r="1.8" fill="#fff" />
          <circle cx="124" cy="119" r="1.8" fill="#fff" />
        </g>
        <ellipse cx="66" cy="134" rx="7" ry="3.5" fill="#F28CB1" opacity=".6" />
        <ellipse cx="134" cy="134" rx="7" ry="3.5" fill="#F28CB1" opacity=".6" />
        <path d="M92 132 Q100 140 108 132" fill="none" stroke="#B9466D" strokeWidth="2.6" strokeLinecap="round" />
        {/* heart seal */}
        <path
          className="envelope__seal"
          d="M100 112 C93 107 89 103 89 98.5 a5 5 0 0 1 11 -1.5 a5 5 0 0 1 11 1.5 c0 4.5 -4 8.5 -11 13.5z"
          fill="#E46FA0"
        />
      </svg>
    </motion.div>
  )
}

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | typing | sent
  const { react } = useMood()

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: undefined })
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please tell me your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'A valid email, please'
    if (!form.subject.trim()) er.subject = 'What is this about?'
    if (form.message.trim().length < 10) er.message = 'A few more words? (10+ characters)'
    return er
  }

  const submit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      react('happy', 900)
      return
    }
    setState('sent')
    react('excited', 2500)
    // No backend needed: hand the message to the visitor's email app.
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    setTimeout(() => {
      window.location.href = href
    }, 900)
  }

  const reset = () => {
    setForm(empty)
    setState('idle')
  }

  const field = (k, label, type = 'text') => (
    <div className={`field ${form[k] ? 'has-value' : ''} ${errors[k] ? 'has-error' : ''}`}>
      {type === 'textarea' ? (
        <textarea id={k} rows="5" value={form[k]} onChange={set(k)} onFocus={() => setState('typing')} onBlur={() => setState('idle')} />
      ) : (
        <input id={k} type={type} value={form[k]} onChange={set(k)} onFocus={() => setState('typing')} onBlur={() => setState('idle')} autoComplete={k === 'subject' ? 'off' : k} />
      )}
      <label htmlFor={k}>{label}</label>
      <AnimatePresence>
        {errors[k] && (
          <motion.small initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {errors[k]}
          </motion.small>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <section id="contact" className="section contact">
      <SectionTitle eyebrow="💌 Contact" title="Let's Connect!" subtitle="Have an opportunity, a project idea, or just want to say hi? My inbox is always open." />

      <div className="contact__grid">
        <Reveal className="contact__side">
          <div className="contact__env-wrap">
            <Envelope state={state} />
            <AnimatePresence>
              {state === 'sent' && (
                <motion.div className="contact__sent glass" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.8 }}>
                  <span>💖</span>
                  <strong>Thank you!</strong>
                  <p>Your email app should open with your message ready to send.</p>
                  <button className="link-btn" onClick={reset}>
                    Write another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a className="contact__line glass" href={`mailto:${profile.email}`}>
            <Icon name="mail" /> {profile.email}
          </a>
          <div className="contact__line glass">
            <Icon name="pin" /> {profile.location}
          </div>

          <div className="socials">
            {[
              ['github', 'GitHub'],
              ['linkedin', 'LinkedIn'],
              ['instagram', 'Instagram'],
            ].map(([k, label], i) => (
              <motion.a
                key={k}
                href={profile.socials[k]}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`social social--${k}`}
                whileHover={{ y: -6, rotate: i % 2 ? 8 : -8, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => react('wave')}
              >
                <Icon name={k} />
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="contact__form glass" onSubmit={submit} noValidate>
            <div className="contact__row">
              {field('name', 'Your Name')}
              {field('email', 'Email Address', 'email')}
            </div>
            {field('subject', 'Subject')}
            {field('message', 'Your Message', 'textarea')}
            <Button type="submit">
              <Icon name="send" /> Send Message
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
