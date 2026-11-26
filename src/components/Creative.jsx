import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Girl from './Girl.jsx'
import { Butterfly } from './Showreel.jsx'
import { AnimatedText } from './ui.jsx'
import { useMood } from '../context/MoodContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const LETTERS = 'DREAM BIG'

/** Creative personality scene — scroll-scrubbed with GSAP ScrollTrigger. */
export default function Creative() {
  const root = useRef(null)
  const { mood } = useMood()

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      // DREAM BIG letters fly in from scattered positions as you scroll
      gsap.fromTo(
        q('.cre__big .ch'),
        { yPercent: (i) => (i % 2 ? 90 : -90), rotate: (i) => (i % 2 ? 25 : -25), opacity: 0, scale: 0.6 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 25%', scrub: 0.8 },
        },
      )
      // code windows drift at different speeds (parallax)
      q('[data-speed]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: () => 120 * +el.dataset.speed },
          { y: () => -120 * +el.dataset.speed, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
      // moving letter ribbon
      gsap.fromTo(q('.cre__ribbon'), { xPercent: 0 }, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      // desk scene pops in
      gsap.fromTo(q('.cre__scene'), { y: 60, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: q('.cre__scene')[0], start: 'top 85%' } })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="creative" className="creative" ref={root}>
      <div className="cre__ribbon" aria-hidden="true">
        CODE ✦ CREATE ✦ DREAM ✦ BUILD ✦ LEARN ✦ CODE ✦ CREATE ✦ DREAM ✦ BUILD ✦ LEARN ✦
      </div>

      <div className="cre__head">
        <span className="section-title__eyebrow">🎨 Creative Personality</span>
        <h2 className="cre__big" aria-label={LETTERS}>
          {LETTERS.split(' ').map((w, wi) => (
            <span className="cre__word" key={wi} aria-hidden="true">
              {[...w].map((c, ci) => (
                <span className="ch" key={ci}>
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h2>
        <AnimatedText as="p" text="Turning Ideas Into Reality." className="cre__tag" stagger={0.03} />
      </div>

      <div className="cre__stage">
        <div className="cre__code cre__code--html glass" data-speed="0.6" aria-hidden="true">
          <b>index.html</b>
          <code>
            <i className="t">&lt;section</i> <i className="a">class</i>=<i className="s">"dream"</i>
            <i className="t">&gt;</i>
            {'\n  '}
            <i className="t">&lt;h1&gt;</i>Hello, World ♥<i className="t">&lt;/h1&gt;</i>
            {'\n  '}
            <i className="t">&lt;button&gt;</i>Let's build<i className="t">&lt;/button&gt;</i>
            {'\n'}
            <i className="t">&lt;/section&gt;</i>
          </code>
        </div>
        <div className="cre__code cre__code--css glass" data-speed="1" aria-hidden="true">
          <b>style.css</b>
          <code>
            <i className="a">.dream</i> {'{'}
            {'\n  '}background: <i className="s">#F8C8DC</i>;{'\n  '}border-radius: <i className="s">24px</i>;{'\n  '}animation: <i className="s">float 3s</i>;{'\n'}
            {'}'}
          </code>
        </div>
        <div className="cre__code cre__code--js glass" data-speed="0.3" aria-hidden="true">
          <b>dream.js</b>
          <code>
            <i className="t">while</i> (alive) {'{'}
            {'\n  '}learn(); build();{'\n  '}
            <i className="a">dream</i>(<i className="s">'big'</i>);{'\n'}
            {'}'}
          </code>
        </div>

        <div className="cre__scene">
          <div className="cre__girl">
            <Girl pose="sit" mood={mood === 'idle' ? 'happy' : mood} />
          </div>
          <svg className="cre__laptop" viewBox="0 0 220 150" aria-hidden="true">
            <rect x="22" y="6" width="176" height="118" rx="12" fill="#fff" stroke="#EFA6C8" strokeWidth="3" />
            <path className="laptop__logo" d="M110 82 C96 72 88 64 88 55 a10 10 0 0 1 22 -3 a10 10 0 0 1 22 3 c0 9 -8 17 -22 27z" fill="#F28CB1" />
            <text x="110" y="108" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#D96C9D">
              {'<dream big/>'}
            </text>
            <path d="M4 128 h212 l-10 14 h-192 z" fill="#F7C6DA" stroke="#EFA6C8" strokeWidth="2" />
          </svg>
          <span className="cre__table" />
          <span className="cre__mug" aria-hidden="true">
            ☕
          </span>
          <span className="cre__plant" aria-hidden="true">
            🌷
          </span>
        </div>

        {[0, 1, 2, 3].map((i) => (
          <Butterfly key={i} className={`cre__fly cre__fly--${i}`} />
        ))}
        {['💻', '🖱️', '⌨️', '💡'].map((e, i) => (
          <span key={e} className={`cre__icon cre__icon--${i}`} aria-hidden="true">
            {e}
          </span>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="cre__heart" style={{ left: `${6 + ((i * 37) % 88)}%`, animationDelay: `${i * -0.9}s` }} aria-hidden="true">
            {i % 2 ? '♡' : '♥'}
          </span>
        ))}
      </div>
    </section>
  )
}
