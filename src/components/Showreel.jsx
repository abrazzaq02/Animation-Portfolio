import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Girl from './Girl.jsx'
import Cover from './Covers.jsx'
import Icon from './Icons.jsx'
import { dedication, education, profile, projects, showreel, skills } from '../data/portfolio.js'

/* ════════════════════════════════════════════════════════════════════
   40-second showreel — ONE GSAP master timeline.
   Labels: intro · hello · about · skills · projects · education · creative · contact · outro
   Edit timings in CHAPTERS; edit the character's blocking in GIRL_POS / GIRL_ACTING.
   ════════════════════════════════════════════════════════════════════ */

export const CHAPTERS = [
  { id: 'intro', at: 0, label: 'Intro' },
  { id: 'hello', at: 4, label: 'Hello' },
  { id: 'about', at: 8, label: 'About' },
  { id: 'skills', at: 12, label: 'Skills' },
  { id: 'projects', at: 17, label: 'Projects' },
  { id: 'education', at: 23, label: 'Journey' },
  { id: 'creative', at: 27, label: 'Creative' },
  { id: 'contact', at: 32, label: 'Contact' },
  { id: 'outro', at: 36, label: 'Outro' },
]
const DURATION = 40

// where the character stands in each chapter (x/y = her feet, in % of the stage; s = scale)
const GIRL_POS = {
  landscape: {
    intro: { x: 50, y: 97, s: 1.25 },
    hello: { x: 17, y: 95, s: 1 },
    about: { x: 85, y: 94, s: 1 },
    skills: { x: 9, y: 99, s: 0.85 },
    projectsStart: { x: -8, y: 99, s: 0.8 },
    projects: { x: 7, y: 99, s: 0.8 },
    education: { x: 83, y: 95, s: 1 },
    creative: { x: 50, y: 86, s: 1.15 },
    contact: { x: 15, y: 96, s: 1 },
    outro: { x: 50, y: 98, s: 1.05 },
  },
  portrait: {
    intro: { x: 50, y: 95, s: 1.35 },
    hello: { x: 50, y: 97, s: 1 },
    about: { x: 74, y: 98, s: 0.9 },
    skills: { x: 18, y: 99, s: 0.75 },
    projectsStart: { x: -18, y: 99, s: 0.75 },
    projects: { x: 18, y: 99, s: 0.75 },
    education: { x: 80, y: 98, s: 0.85 },
    creative: { x: 50, y: 80, s: 1.3 },
    contact: { x: 50, y: 98, s: 0.95 },
    outro: { x: 50, y: 97, s: 1.15 },
  },
}

// what she's doing over time (each entry holds until the next one)
const GIRL_ACTING = [
  [0, { pose: 'stand', mood: 'idle', look: 'center' }],
  [2.4, { pose: 'stand', mood: 'happy', look: 'center' }],
  [4.2, { pose: 'stand', mood: 'wave', look: 'right' }],
  [7.0, { pose: 'stand', mood: 'happy', look: 'right' }],
  [8.2, { pose: 'stand', mood: 'idle', look: 'left', holding: 'laptop' }],
  [10.4, { pose: 'stand', mood: 'happy', look: 'left', holding: 'laptop' }],
  [12.2, { pose: 'stand', mood: 'think', look: 'up' }],
  [14.6, { pose: 'stand', mood: 'happy', look: 'right' }],
  [17.0, { pose: 'walk', mood: 'idle', look: 'right' }],
  [19.4, { pose: 'stand', mood: 'happy', look: 'right' }],
  [23.2, { pose: 'stand', mood: 'idle', look: 'up' }],
  [25.4, { pose: 'stand', mood: 'happy', look: 'left' }],
  [27.0, { pose: 'sit', mood: 'idle', look: 'center' }],
  [30.0, { pose: 'sit', mood: 'happy', look: 'center' }],
  [32.2, { pose: 'stand', mood: 'wave', look: 'right' }],
  [35.0, { pose: 'stand', mood: 'happy', look: 'right' }],
  [36.3, { pose: 'stand', mood: 'celebrate', look: 'center' }],
  [38.2, { pose: 'stand', mood: 'wave', look: 'center' }],
]
const actingAt = (t) => {
  let cur = GIRL_ACTING[0][1]
  for (const [at, a] of GIRL_ACTING) if (t >= at) cur = a
  return cur
}

/* ───────────── small building blocks ───────────── */

/** Splits text into masked letters (.ch) for mask-reveal animations. */
const Split = ({ text, className = '' }) => (
  <span className={`split ${className}`} aria-label={text}>
    {text.split(' ').map((w, wi, arr) => (
      <span className="split__w" key={wi} aria-hidden="true">
        {[...w].map((c, ci) => (
          <span className="split__m" key={ci}>
            <span className="ch">{c}</span>
          </span>
        ))}
        {wi < arr.length - 1 && <span className="split__sp"> </span>}
      </span>
    ))}
  </span>
)

export const Butterfly = ({ className = '', style }) => (
  <span className={`fly ${className}`} style={style} aria-hidden="true">
    <svg viewBox="0 0 40 32">
      <g className="fly__wl">
        <path d="M20 16 C10 -2 -4 4 4 14 C-2 22 8 30 20 18Z" fill="#F4A9C9" />
        <circle cx="9" cy="10" r="2.4" fill="#fff" opacity=".7" />
      </g>
      <g className="fly__wr">
        <path d="M20 16 C30 -2 44 4 36 14 C42 22 32 30 20 18Z" fill="#EFA6C8" />
        <circle cx="31" cy="10" r="2.4" fill="#fff" opacity=".7" />
      </g>
      <rect x="19" y="8" width="2.4" height="16" rx="1.2" fill="#6B3F55" />
    </svg>
  </span>
)

// deterministic scatter positions (no layout jumps between renders)
const spot = (i, seed = 0, x0 = 4, xr = 90, y0 = 6, yr = 84) => ({
  '--i': i,
  left: `${x0 + ((i * 37 + seed * 17) % 100) * (xr / 100)}%`,
  top: `${y0 + ((i * 59 + seed * 31) % 100) * (yr / 100)}%`,
})

const FLOAT_GLYPHS = ['♥', '✦', '</>', '{ }', '★', '01', '♡', '✧', '<>', ';', '♥', '✦']

/* ───────────── the scenes (static markup, animated by the timeline) ───────────── */

const Scenes = memo(function Scenes() {
  const firstName = profile.name
  const reelProjects = showreel.projects.map((id) => projects.find((p) => p.id === id)).filter(Boolean)

  return (
    <>
      {/* ambient floaters that live across the whole reel */}
      <div className="sr-floaters" aria-hidden="true">
        {FLOAT_GLYPHS.map((g, i) => (
          <span key={i} style={spot(i, 1)}>
            {g}
          </span>
        ))}
      </div>

      {/* 0–4 · INTRO */}
      <div className="sr-scene sr-intro" data-scene="intro">
        <div className="sr-intro__glow" />
        <div className="sr-intro__title">
          <Split text="PORTFOLIO" />
        </div>
        <div className="sr-intro__reflect" aria-hidden="true">
          <span>PORTFOLIO</span>
        </div>
        <p className="sr-intro__tag">✦ a creative CS journey ✦</p>
      </div>

      {/* 4–8 · HELLO */}
      <div className="sr-scene sr-hello" data-scene="hello">
        <div className="sr-hello__float" aria-hidden="true">
          {['A', '7', 'C', '0', '1', 'S', '<', '>', 'π', '3', '#', 'Z'].map((c, i) => (
            <span key={i} style={spot(i, 2, 30, 66, 6, 70)}>
              {c}
            </span>
          ))}
        </div>
        <div className="sr-hello__text">
          <p className="sr-hello__hi">
            <Split text="HELLO, I'M" />
          </p>
          <h2 className="sr-hello__name">
            <Split text={firstName} />
          </h2>
          <p className="sr-hello__role">COMPUTER SCIENCE STUDENT</p>
          <p className="sr-hello__sub">
            {profile.subtitle.split('|').map((s) => (
              <span key={s}>{s.trim()}</span>
            ))}
          </p>
        </div>
      </div>

      {/* 8–12 · ABOUT */}
      <div className="sr-scene sr-about" data-scene="about">
        <div className="sr-about__props" aria-hidden="true">
          <span className="sr-about__prop">💻</span>
          <span className="sr-about__prop">📚</span>
          <span className="sr-about__prop">☕</span>
          <span className="sr-about__prop">{'</>'}</span>
          <span className="sr-about__prop">💡</span>
        </div>
        <div className="sr-about__panel">
          <h2 className="sr-h">
            <Split text="A LITTLE ABOUT ME" />
          </h2>
          <p className="sr-about__intro">{showreel.aboutIntro}</p>
          <ul>
            {showreel.about.map(([e, t]) => (
              <li className="sr-about__line" key={t}>
                <span>{e}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 12–17 · SKILLS */}
      <div className="sr-scene sr-skills" data-scene="skills">
        <div className="sr-skills__syms" aria-hidden="true">
          {['{ }', '</>', '01', '<>', '{ }', '</>', '01', '<>'].map((s, i) => (
            <span key={i} className="sr-skills__sym" style={spot(i, 3)}>
              {s}
            </span>
          ))}
        </div>
        <h2 className="sr-h sr-skills__h">
          <Split text="MY SKILLS" />
        </h2>
        <div className="sr-skills__grid">
          {skills.map((s) => (
            <div className="sr-skill" key={s.name}>
              <span className="sr-skill__icon">
                <Icon name={s.icon} />
              </span>
              <span className="sr-skill__name">{s.name}</span>
              <span className="sr-skill__bar">
                <i style={{ width: `${s.level}%` }} />
              </span>
              <span className="sr-skill__pct" data-level={s.level}>
                0%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 17–23 · PROJECTS */}
      <div className="sr-scene sr-projects" data-scene="projects">
        <h2 className="sr-h sr-projects__h">
          <Split text="MY PROJECTS" />
        </h2>
        <div className="sr-projects__grid">
          {reelProjects.map((p) => (
            <article className="sr-proj" key={p.id}>
              <div className="sr-proj__cover">
                <Cover type={p.cover} />
              </div>
              <div className="sr-proj__body">
                <strong>{p.title}</strong>
                <small>{p.tech.join(' · ')}</small>
                <span className="sr-proj__btns">
                  <b>Live Demo</b>
                  <i>GitHub</i>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 23–27 · EDUCATION */}
      <div className="sr-scene sr-edu" data-scene="education">
        <div className="sr-edu__floats" aria-hidden="true">
          {['📚', '🎓', '⭐', '📖', '✦', '🎓', '⭐'].map((e, i) => (
            <span key={i} className="sr-edu__float" style={spot(i, 4, 60, 36, 10, 50)}>
              {e}
            </span>
          ))}
        </div>
        <h2 className="sr-h sr-edu__h">
          <Split text="MY LEARNING JOURNEY" />
        </h2>
        <div className="sr-edu__tl">
          <div className="sr-edu__line">
            <i />
          </div>
          {education.map((e) => (
            <div className="sr-edu__item" key={e.title}>
              <span className="sr-edu__dot" />
              <small>{e.year}</small>
              <strong>{e.title}</strong>
              <em>{e.place}</em>
            </div>
          ))}
        </div>
      </div>

      {/* 27–32 · CREATIVE */}
      <div className="sr-scene sr-cre" data-scene="creative">
        <div className="sr-cre__letters" aria-hidden="true">
          CODE ✦ CREATE ✦ DREAM ✦ BUILD ✦ LEARN ✦ CODE ✦ CREATE ✦ DREAM
        </div>
        <h2 className="sr-cre__dream">
          <Split text="DREAM BIG" />
        </h2>
        <div className="sr-cre__code sr-cre__code--html" aria-hidden="true">
          <b>index.html</b>
          <span className="ln">
            <i className="t">&lt;h1&gt;</i>Hello World<i className="t">&lt;/h1&gt;</i>
          </span>
          <span className="ln">
            <i className="t">&lt;button</i> <i className="a">class</i>=<i className="s">"cute"</i>
            <i className="t">&gt;</i>
          </span>
          <span className="ln">
            {'  '}Click me ♥<i className="t">&lt;/button&gt;</i>
          </span>
        </div>
        <div className="sr-cre__code sr-cre__code--css" aria-hidden="true">
          <b>style.css</b>
          <span className="ln">
            <i className="a">.cute</i> {'{'}
          </span>
          <span className="ln">
            {'  '}color: <i className="s">#F8C8DC</i>;
          </span>
          <span className="ln">
            {'  '}border-radius: <i className="s">99px</i>;
          </span>
          <span className="ln">{'}'}</span>
        </div>
        {[0, 1, 2].map((i) => (
          <Butterfly key={i} className={`sr-fly sr-fly--${i}`} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="sr-cre__heart" style={spot(i, 5, 6, 88, 30, 40)} aria-hidden="true">
            {i % 2 ? '♡' : '♥'}
          </span>
        ))}
        {['💻', '🖱️', '⌨️'].map((e, i) => (
          <span key={e} className="sr-cre__icon" style={{ '--i': i }} aria-hidden="true">
            {e}
          </span>
        ))}
        <div className="sr-desk" aria-hidden="true">
          <svg className="sr-desk__laptop" viewBox="0 0 220 150">
            <rect x="22" y="6" width="176" height="118" rx="12" fill="#fff" stroke="#EFA6C8" strokeWidth="3" />
            <path className="sr-desk__heart" d="M110 82 C96 72 88 64 88 55 a10 10 0 0 1 22 -3 a10 10 0 0 1 22 3 c0 9 -8 17 -22 27z" fill="#F28CB1" />
            <path d="M4 128 h212 l-10 14 h-192 z" fill="#F7C6DA" stroke="#EFA6C8" strokeWidth="2" />
          </svg>
          <span className="sr-desk__table" />
          <span className="sr-desk__mug">☕</span>
          <span className="sr-desk__plant">🌷</span>
        </div>
        <p className="sr-cre__tag">
          <Split text="Turning Ideas Into Reality." />
        </p>
      </div>

      {/* 32–36 · CONTACT */}
      <div className="sr-scene sr-contact" data-scene="contact">
        <h2 className="sr-h sr-contact__h">
          <Split text="LET'S CONNECT!" />
        </h2>
        <div className="sr-env" aria-hidden="true">
          <svg viewBox="0 0 200 160">
            <g className="sr-env__letter">
              <rect x="40" y="30" width="120" height="90" rx="8" fill="#fff" stroke="#F2B6CF" strokeWidth="2" />
              <line x1="56" y1="50" x2="140" y2="50" stroke="#F8C8DC" strokeWidth="4" strokeLinecap="round" />
              <line x1="56" y1="64" x2="120" y2="64" stroke="#F8C8DC" strokeWidth="4" strokeLinecap="round" />
            </g>
            <rect x="20" y="50" width="160" height="100" rx="14" fill="#FBD3E4" stroke="#EFA6C8" strokeWidth="3" />
            <path d="M22 140 L100 96 L178 140" fill="none" stroke="#EFA6C8" strokeWidth="3" strokeLinejoin="round" />
            <path className="sr-env__flap" d="M22 58 L100 112 L178 58 Q178 50 170 50 H30 Q22 50 22 58Z" fill="#F9CFE1" stroke="#EFA6C8" strokeWidth="3" strokeLinejoin="round" />
            <ellipse className="sr-env__eye" cx="78" cy="122" rx="5" ry="6.5" fill="#3E2433" />
            <ellipse className="sr-env__eye" cx="122" cy="122" rx="5" ry="6.5" fill="#3E2433" />
            <ellipse cx="66" cy="134" rx="7" ry="3.5" fill="#F28CB1" opacity=".6" />
            <ellipse cx="134" cy="134" rx="7" ry="3.5" fill="#F28CB1" opacity=".6" />
            <path d="M92 132 Q100 140 108 132" fill="none" stroke="#B9466D" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="sr-env__heart" style={{ '--i': i }}>
              {i % 3 === 2 ? '♡' : '♥'}
            </span>
          ))}
        </div>
        <ul className="sr-contact__list">
          <li className="sr-contact__item">
            <Icon name="mail" /> {profile.email}
          </li>
          <li className="sr-contact__item">
            <Icon name="github" /> GitHub
          </li>
          <li className="sr-contact__item">
            <Icon name="linkedin" /> LinkedIn
          </li>
          <li className="sr-contact__item">
            <Icon name="instagram" /> Instagram
          </li>
        </ul>
      </div>

      {/* 36–40 · OUTRO */}
      <div className="sr-scene sr-outro" data-scene="outro">
        <div className="sr-outro__sparks" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="sr-outro__spark" style={spot(i, 6)}>
              {i % 3 === 0 ? '✦' : i % 3 === 1 ? '♥' : '✧'}
            </span>
          ))}
        </div>
        <div className="sr-outro__content">
          <h2 className="sr-outro__thanks">
            <Split text="THANK YOU FOR VISITING!" />
          </h2>
          <p className="sr-outro__keep">
            <span>KEEP DREAMING.</span> <span>KEEP CREATING.</span> <span>KEEP CODING.</span>
          </p>
          <p className="sr-outro__sig">Made with Love for {dedication.for} ♡</p>
        </div>
      </div>

      <div className="sr-wipe" aria-hidden="true">
        <span>♥</span>
      </div>
    </>
  )
})

/* ───────────── timeline ───────────── */

function buildTimeline(root, girl, portrait) {
  const q = gsap.utils.selector(root)
  const P = GIRL_POS[portrait ? 'portrait' : 'landscape']
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 0.8 } })
  CHAPTERS.forEach((c) => tl.addLabel(c.id, c.at))

  const scene = (id) => q(`[data-scene="${id}"]`)
  const show = (id, from, to) => {
    tl.set(scene(id), { autoAlpha: 1 }, from)
    if (to !== undefined) tl.set(scene(id), { autoAlpha: 0 }, to)
  }
  const chars = (sel, at, vars = {}) =>
    tl.fromTo(q(`${sel} .ch`), { yPercent: 115, rotate: vars.rotate || 0 }, { yPercent: 0, rotate: 0, stagger: vars.stagger ?? 0.05, duration: vars.duration ?? 0.7, ease: 'power4.out' }, at)
  const moveGirl = (pos, at, dur = 1, ease = 'power3.inOut') => tl.to(girl, { '--gx': pos.x, '--gy': pos.y, '--gs': pos.s, duration: dur, ease }, at)
  const wipe = (at) => {
    tl.fromTo(q('.sr-wipe'), { xPercent: -102 }, { xPercent: 0, duration: 0.4, ease: 'power2.in' }, at)
    tl.to(q('.sr-wipe'), { xPercent: 102, duration: 0.45, ease: 'power2.out' }, at + 0.42)
  }
  const out = (targets, at) => tl.to(targets, { autoAlpha: 0, y: -24, duration: 0.4, stagger: 0.03, ease: 'power2.in' }, at)

  gsap.set(q('.sr-scene'), { autoAlpha: 0 })
  gsap.set(q('.sr-wipe'), { xPercent: -102 })
  gsap.set(girl, { '--gx': P.intro.x, '--gy': P.intro.y + 45, '--gs': P.intro.s, autoAlpha: 1 })

  /* 0–4 intro */
  show('intro', 0, 4)
  tl.fromTo(q('.sr-intro__glow'), { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.6, ease: 'power2.out' }, 0)
  chars('.sr-intro__title', 0.2, { stagger: 0.09, duration: 0.9 })
  tl.fromTo(q('.sr-intro__reflect'), { autoAlpha: 0, yPercent: -20 }, { autoAlpha: 1, yPercent: 0, duration: 1.2 }, 1.0)
  tl.fromTo(q('.sr-floaters span'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.06, duration: 0.6, ease: 'back.out(2)' }, 0.6)
  tl.to(girl, { '--gy': P.intro.y, duration: 1.3, ease: 'back.out(1.3)' }, 1.1)
  tl.fromTo(q('.sr-intro__tag'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 2.1)
  out([q('.sr-intro__title'), q('.sr-intro__reflect'), q('.sr-intro__tag')], 3.55)

  /* 4–8 hello */
  show('hello', 3.9, 8)
  moveGirl(P.hello, 3.8, 1.1)
  tl.fromTo(q('.sr-hello__float span'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.05, duration: 0.5, ease: 'back.out(2)' }, 4.1)
  chars('.sr-hello__hi', 4.15, { stagger: 0.04 })
  chars('.sr-hello__name', 4.55, { stagger: 0.06, rotate: 10, duration: 0.9 })
  tl.fromTo(q('.sr-hello__role'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power2.inOut' }, 5.5)
  tl.fromTo(q('.sr-hello__sub span'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.14, duration: 0.6 }, 6.0)
  out([q('.sr-hello__text > *'), q('.sr-hello__float')], 7.45)

  /* 8–12 about */
  wipe(7.6)
  show('about', 8, 12)
  moveGirl(P.about, 7.95, 0.05, 'none')
  tl.fromTo(q('.sr-about__panel'), { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 }, 8.1)
  chars('.sr-about__panel .sr-h', 8.3, { stagger: 0.035 })
  tl.fromTo(q('.sr-about__intro'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 8.7)
  tl.fromTo(q('.sr-about__line'), { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, stagger: 0.18, duration: 0.6 }, 9.0)
  tl.fromTo(q('.sr-about__prop'), { scale: 0, rotate: -25, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(2)' }, 8.5)
  out([q('.sr-about__panel'), q('.sr-about__prop')], 11.55)

  /* 12–17 skills */
  show('skills', 11.9, 17)
  moveGirl(P.skills, 11.7, 1)
  chars('.sr-skills__h', 12.1, { stagger: 0.05 })
  tl.fromTo(q('.sr-skills__sym'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.07, duration: 0.5, ease: 'back.out(2)' }, 12.2)
  tl.fromTo(q('.sr-skill'), { autoAlpha: 0, y: 50, rotateX: -50 }, { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.7 }, 12.4)
  tl.fromTo(q('.sr-skill__bar i'), { scaleX: 0 }, { scaleX: 1, stagger: 0.08, duration: 1.1, ease: 'power2.out' }, 13.0)
  q('.sr-skill__pct').forEach((el, i) => {
    const proxy = { v: 0 }
    tl.to(proxy, { v: +el.dataset.level, duration: 1.1, ease: 'power2.out', onUpdate: () => (el.textContent = `${Math.round(proxy.v)}%`) }, 13.0 + i * 0.08)
  })
  tl.to(q('.sr-skill'), { y: -6, duration: 0.6, stagger: { each: 0.05, yoyo: true, repeat: 1 }, ease: 'sine.inOut' }, 15.0)
  out([q('.sr-skills__h'), q('.sr-skill'), q('.sr-skills__sym')], 16.5)

  /* 17–23 projects */
  wipe(16.6)
  show('projects', 17, 23)
  moveGirl(P.projectsStart, 16.98, 0.02, 'none')
  moveGirl(P.projects, 17.1, 2.3, 'none')
  chars('.sr-projects__h', 17.15, { stagger: 0.05 })
  tl.fromTo(q('.sr-proj'), { autoAlpha: 0, y: 70, rotateY: -28 }, { autoAlpha: 1, y: 0, rotateY: 0, stagger: 0.18, duration: 0.9 }, 17.45)
  q('.sr-proj').forEach((card, i) => {
    const at = 19.4 + i * 0.75
    tl.to(card, { scale: 1.06, rotateY: 8, rotateX: -4, y: -8, boxShadow: '0 30px 50px -18px rgba(217,108,157,.55)', duration: 0.35, ease: 'power2.out' }, at)
    tl.to(card, { scale: 1, rotateY: 0, rotateX: 0, y: 0, boxShadow: '0 14px 30px -14px rgba(217,108,157,.35)', duration: 0.4, ease: 'power2.inOut' }, at + 0.45)
  })
  out([q('.sr-projects__h'), q('.sr-proj')], 22.5)

  /* 23–27 education */
  show('education', 22.95, 27)
  moveGirl(P.education, 22.6, 1)
  chars('.sr-edu__h', 23.1, { stagger: 0.035 })
  tl.fromTo(q('.sr-edu__float'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' }, 23.2)
  tl.fromTo(q('.sr-edu__line i'), { scaleY: 0 }, { scaleY: 1, duration: 2.2, ease: 'none' }, 23.4)
  tl.fromTo(q('.sr-edu__item'), { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, stagger: 0.5, duration: 0.6 }, 23.5)
  tl.fromTo(q('.sr-edu__dot'), { scale: 0 }, { scale: 1, stagger: 0.5, duration: 0.5, ease: 'back.out(3)' }, 23.6)
  out([q('.sr-edu__h'), q('.sr-edu__tl'), q('.sr-edu__float')], 26.5)

  /* 27–32 creative */
  wipe(26.6)
  show('creative', 27, 32)
  moveGirl(P.creative, 26.95, 0.05, 'none')
  tl.fromTo(q('.sr-desk'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 27.05)
  chars('.sr-cre__dream', 27.4, { stagger: 0.08, rotate: 12, duration: 0.9 })
  tl.fromTo(q('.sr-cre__letters'), { xPercent: 0 }, { xPercent: -30, duration: 5, ease: 'none' }, 27)
  tl.fromTo(q('.sr-cre__code'), { autoAlpha: 0, scale: 0.6, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, stagger: 0.25, duration: 0.7, ease: 'back.out(1.6)' }, 27.8)
  tl.fromTo(q('.sr-cre__code .ln'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', stagger: 0.22, duration: 0.45, ease: 'none' }, 28.3)
  tl.fromTo(q('.sr-fly, .sr-cre__heart, .sr-cre__icon'), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' }, 28.0)
  tl.to(q('.sr-cre__dream'), { scale: 1.06, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 29.4)
  chars('.sr-cre__tag', 29.8, { stagger: 0.03 })
  out([q('.sr-cre__dream'), q('.sr-cre__code'), q('.sr-cre__tag'), q('.sr-desk'), q('.sr-fly'), q('.sr-cre__heart'), q('.sr-cre__icon')], 31.55)

  /* 32–36 contact */
  show('contact', 31.95, 36)
  moveGirl(P.contact, 31.7, 1)
  chars('.sr-contact__h', 32.1, { stagger: 0.05 })
  tl.fromTo(q('.sr-env'), { autoAlpha: 0, y: 60, scale: 0.6 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 32.25)
  tl.to(q('.sr-env__flap'), { scaleY: -1, svgOrigin: '100 54', duration: 0.5, ease: 'back.out(1.5)' }, 33.0)
  tl.fromTo(q('.sr-env__letter'), { y: 28 }, { y: -18, duration: 0.6, ease: 'back.out(1.6)' }, 33.15)
  q('.sr-env__heart').forEach((h, i) => {
    const ang = (-150 + (i / 8) * 120) * (Math.PI / 180)
    tl.fromTo(
      h,
      { x: 0, y: 0, scale: 0.2, autoAlpha: 0 },
      { x: Math.cos(ang) * 90, y: Math.sin(ang) * 110 - 20, scale: 1, autoAlpha: 1, duration: 0.9, ease: 'power2.out' },
      33.3 + i * 0.07,
    )
    tl.to(h, { y: '-=40', autoAlpha: 0, duration: 0.9, ease: 'power1.in' }, 34.4 + i * 0.07)
  })
  tl.fromTo(q('.sr-contact__item'), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, stagger: 0.15, duration: 0.6 }, 33.0)
  out([q('.sr-contact__h'), q('.sr-env'), q('.sr-contact__item')], 35.5)

  /* 36–40 outro */
  show('outro', 35.9)
  moveGirl(P.outro, 35.6, 1)
  tl.fromTo(q('.sr-outro__spark'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.05, duration: 0.6, ease: 'back.out(2)' }, 36.1)
  chars('.sr-outro__thanks', 36.2, { stagger: 0.035 })
  tl.fromTo(q('.sr-outro__keep span'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.4, duration: 0.6 }, 37.0)
  tl.fromTo(q('.sr-outro__sig'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power1.inOut' }, 38.0)
  tl.to([q('.sr-outro__content'), girl], { autoAlpha: 0, duration: 0.7, ease: 'power1.in' }, 39.3)
  tl.set({}, {}, DURATION)
  return tl
}

/* ───────────── component ───────────── */

const fmt = (t) => `0:${String(Math.floor(t)).padStart(2, '0')}`

export default function Showreel() {
  const stageRef = useRef(null)
  const girlRef = useRef(null)
  const tlRef = useRef(null)
  const scrubRef = useRef(null)
  const fillRef = useRef(null)
  const timeRef = useRef(null)
  const state = useRef({ progress: 0, wantPlay: true, inView: false, ready: false, dragging: false })
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [chapter, setChapter] = useState('intro')
  const [acting, setActing] = useState(GIRL_ACTING[0][1])
  const actingKey = useRef('')

  const syncUI = useCallback((tl) => {
    const t = tl.time()
    const p = t / DURATION
    state.current.progress = p
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`
    if (scrubRef.current && !state.current.dragging) scrubRef.current.value = Math.round(p * 1000)
    if (timeRef.current) timeRef.current.textContent = fmt(t)
    let ch = CHAPTERS[0].id
    for (const c of CHAPTERS) if (t >= c.at) ch = c.id
    setChapter(ch)
    const a = actingAt(t)
    const key = JSON.stringify(a)
    if (key !== actingKey.current) {
      actingKey.current = key
      setActing(a)
    }
  }, [])

  // build the master timeline (rebuilt for portrait ↔ landscape, keeping progress)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add({ portrait: '(max-width: 720px)', landscape: '(min-width: 721px)' }, (ctx) => {
      const tl = buildTimeline(stageRef.current, girlRef.current, ctx.conditions.portrait)
      tl.eventCallback('onUpdate', () => syncUI(tl))
      tl.eventCallback('onComplete', () => {
        setEnded(true)
        setPlaying(false)
      })
      tl.progress(state.current.progress)
      syncUI(tl)
      tlRef.current = tl
      if (state.current.ready && state.current.inView && state.current.wantPlay && tl.progress() < 1) {
        tl.play()
        setPlaying(true)
      }
      return () => tl.kill()
    })
    return () => mm.revert()
  }, [syncUI])

  // autoplay once fonts are ready and the reel is on screen; pause when scrolled away
  useEffect(() => {
    const s = state.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      s.wantPlay = false
      tlRef.current?.seek(3.8)
    }
    const tryPlay = () => {
      const tl = tlRef.current
      if (!tl) return
      if (s.ready && s.inView && s.wantPlay && tl.progress() < 1) {
        tl.play()
        setPlaying(true)
      } else if (!tl.paused()) {
        tl.pause()
        setPlaying(false)
      }
    }
    const io = new IntersectionObserver(([e]) => {
      s.inView = e.isIntersecting
      tryPlay()
    }, { threshold: 0.35 })
    io.observe(stageRef.current)
    let alive = true
    Promise.all([document.fonts?.ready, new Promise((r) => setTimeout(r, 1800))]).then(() => {
      if (!alive) return
      s.ready = true
      tryPlay()
    })
    return () => {
      alive = false
      io.disconnect()
    }
  }, [])

  const toggle = () => {
    const tl = tlRef.current
    if (!tl) return
    if (ended || tl.progress() >= 1) return replay()
    if (tl.paused()) {
      state.current.wantPlay = true
      tl.play()
      setPlaying(true)
    } else {
      state.current.wantPlay = false
      tl.pause()
      setPlaying(false)
    }
  }
  const replay = () => {
    setEnded(false)
    state.current.wantPlay = true
    tlRef.current?.restart()
    setPlaying(true)
  }
  const goTo = (label) => {
    const tl = tlRef.current
    if (!tl) return
    setEnded(false)
    state.current.wantPlay = true
    tl.play(label)
    setPlaying(true)
  }
  const onScrub = (e) => {
    const tl = tlRef.current
    if (!tl) return
    state.current.dragging = true
    setEnded(false)
    tl.pause()
    tl.progress(e.target.value / 1000)
  }
  const endScrub = () => {
    state.current.dragging = false
    const tl = tlRef.current
    if (tl && state.current.wantPlay && tl.progress() < 1) {
      tl.play()
      setPlaying(true)
    } else setPlaying(false)
  }
  const skip = () => {
    state.current.wantPlay = false
    tlRef.current?.pause()
    setPlaying(false)
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="showreel" className="sr" aria-label="Animated portfolio showreel">
      <div className="sr__frame">
        <div className="sr__stage" ref={stageRef} onClick={toggle}>
          <div className="sr__bg" aria-hidden="true" />
          <div className="sr__grain" aria-hidden="true" />
          <Scenes />
          <div className="sr__girl" ref={girlRef} aria-hidden="true">
            <Girl pose={acting.pose} mood={acting.mood} look={acting.look} holding={acting.holding || null} />
          </div>
          {ended && (
            <div className="sr__end" onClick={(e) => e.stopPropagation()}>
              <button className="btn btn--primary" onClick={replay}>
                <Icon name="replay" /> Replay
              </button>
              <button className="btn btn--ghost" onClick={skip}>
                Explore the portfolio <Icon name="down" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="sr__controls">
        <button className="sr__play" onClick={toggle} aria-label={playing ? 'Pause showreel' : 'Play showreel'}>
          <Icon name={ended ? 'replay' : playing ? 'pause' : 'play'} />
        </button>
        <div className="sr__track">
          <div className="sr__rail">
            <span className="sr__fill" ref={fillRef} />
            {CHAPTERS.slice(1).map((c) => (
              <i key={c.id} className="sr__tick" style={{ left: `${(c.at / DURATION) * 100}%` }} />
            ))}
          </div>
          <input
            ref={scrubRef}
            className="sr__scrub"
            type="range"
            min="0"
            max="1000"
            defaultValue="0"
            aria-label="Showreel position"
            onInput={onScrub}
            onPointerUp={endScrub}
            onKeyUp={endScrub}
            onBlur={() => (state.current.dragging = false)}
          />
          <div className="sr__chapters">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                className={chapter === c.id ? 'is-on' : ''}
                style={{ left: `${(c.at / DURATION) * 100}%` }}
                onClick={() => goTo(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <span className="sr__time">
          <span ref={timeRef}>0:00</span> / {fmt(DURATION)}
        </span>
        <button className="sr__skip" onClick={skip}>
          Skip <Icon name="skip" />
        </button>
      </div>
    </section>
  )
}
