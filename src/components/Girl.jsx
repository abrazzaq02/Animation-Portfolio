import { memo, useId } from 'react'

/**
 * Cute CS-student girl, drawn as layered SVG with gradients for a soft 3D look.
 *
 * pose:  'stand' | 'walk' | 'sit'   (sit = arms typing, legs hidden behind a desk)
 * mood:  'idle' | 'happy' | 'excited' | 'wave'
 *
 * All looping motion (blink, breathe, walk, wave, type) is CSS keyframes, so it runs on
 * the compositor and stays cheap even with several characters on screen.
 */
function Girl({ pose = 'stand', mood = 'idle', className = '', style }) {
  const uid = useId().replace(/:/g, '')
  const id = (n) => `${n}-${uid}`
  const waving = mood === 'wave' || mood === 'excited'
  const smiling = mood !== 'idle'

  return (
    <svg
      viewBox="0 0 200 320"
      className={`girl girl--${pose} ${waving ? 'is-waving' : ''} ${smiling ? 'is-happy' : ''} ${className}`}
      style={style}
      role="img"
      aria-label="Animated girl character, a computer science student"
    >
      <defs>
        <radialGradient id={id('skin')} cx="45%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#FFF1EA" />
          <stop offset="65%" stopColor="#FFDCCD" />
          <stop offset="100%" stopColor="#F5C3B2" />
        </radialGradient>
        <linearGradient id={id('hair')} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#6B3F55" />
          <stop offset="100%" stopColor="#3E2433" />
        </linearGradient>
        <linearGradient id={id('hoodie')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBD3E4" />
          <stop offset="55%" stopColor="#F4A9C9" />
          <stop offset="100%" stopColor="#E487B1" />
        </linearGradient>
        <linearGradient id={id('sleeve')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F7B9D3" />
          <stop offset="100%" stopColor="#E893B9" />
        </linearGradient>
        <linearGradient id={id('jeans')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8E86B8" />
          <stop offset="100%" stopColor="#6E6597" />
        </linearGradient>
        <radialGradient id={id('shine')} cx="35%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft ground shadow */}
      {pose !== 'sit' && <ellipse className="girl__shadow" cx="100" cy="304" rx="46" ry="7" fill="#E7A9C5" opacity=".35" />}

      <g className="girl__body">
        {/* legs */}
        {pose !== 'sit' && (
          <g className="girl__legs">
            <g className="girl__leg girl__leg--l">
              <rect x="80" y="226" width="17" height="66" rx="8" fill={`url(#${id('jeans')})`} />
              <path d="M74 292 q0 -10 12 -10 h6 q8 0 8 10 z" fill="#fff" stroke="#EFA6C8" strokeWidth="2" />
            </g>
            <g className="girl__leg girl__leg--r">
              <rect x="103" y="226" width="17" height="66" rx="8" fill={`url(#${id('jeans')})`} />
              <path d="M100 292 q0 -10 8 -10 h6 q12 0 12 10 z" fill="#fff" stroke="#EFA6C8" strokeWidth="2" />
            </g>
          </g>
        )}

        {/* hair (back) */}
        <path
          d="M52 96 C46 40 80 28 100 28 C124 28 158 40 150 100 C156 140 152 170 140 182 L60 182 C48 170 44 140 52 96Z"
          fill={`url(#${id('hair')})`}
        />

        {/* left arm (viewer's left) */}
        <g className="girl__arm girl__arm--l">
          <rect x="52" y="150" width="20" height="70" rx="10" fill={`url(#${id('sleeve')})`} />
          <circle cx="62" cy="222" r="9.5" fill={`url(#${id('skin')})`} />
        </g>

        {/* hoodie / torso */}
        <path
          d="M60 164 Q62 142 100 142 Q138 142 140 164 L146 236 Q100 248 54 236 Z"
          fill={`url(#${id('hoodie')})`}
        />
        <path d="M78 146 Q100 166 122 146" fill="none" stroke="#E487B1" strokeWidth="4" strokeLinecap="round" />
        <line x1="90" y1="156" x2="88" y2="182" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="110" y1="156" x2="112" y2="182" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="88" cy="184" r="3" fill="#fff" />
        <circle cx="112" cy="184" r="3" fill="#fff" />
        <text x="100" y="214" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="17" fill="#fff">
          &lt;/&gt;
        </text>
        <path d="M60 164 Q62 142 100 142 Q138 142 140 164 L146 236 Q100 248 54 236 Z" fill={`url(#${id('shine')})`} />

        {/* right arm — this is the waving one */}
        <g className="girl__arm girl__arm--r">
          <rect x="128" y="150" width="20" height="70" rx="10" fill={`url(#${id('sleeve')})`} />
          <circle cx="138" cy="222" r="9.5" fill={`url(#${id('skin')})`} />
        </g>

        {/* head */}
        <g className="girl__head">
          <rect x="92" y="128" width="16" height="18" rx="6" fill="#F5C3B2" />
          {/* space buns */}
          <circle cx="58" cy="50" r="18" fill={`url(#${id('hair')})`} />
          <circle cx="142" cy="50" r="18" fill={`url(#${id('hair')})`} />
          {/* bows */}
          <g className="girl__bow">
            <path d="M138 30 l-10 -8 v16 z M138 30 l10 -8 v16 z" fill="#F28CB1" />
            <circle cx="138" cy="30" r="3.5" fill="#E46FA0" />
          </g>
          {/* ears */}
          <circle cx="58" cy="100" r="8" fill="#F8CDBD" />
          <circle cx="142" cy="100" r="8" fill="#F8CDBD" />
          {/* face */}
          <ellipse cx="100" cy="96" rx="42" ry="44" fill={`url(#${id('skin')})`} />
          {/* bangs */}
          <path
            d="M57 92 C56 52 84 42 100 44 C120 42 146 54 143 92 C134 74 122 64 110 68 C102 58 88 60 80 72 C72 68 62 78 57 92Z"
            fill={`url(#${id('hair')})`}
          />
          {/* eyes */}
          <g className="girl__eyes">
            {smiling ? (
              <>
                <path d="M77 102 q7 -9 14 0" fill="none" stroke="#3E2433" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M109 102 q7 -9 14 0" fill="none" stroke="#3E2433" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : (
              <g className="girl__blink">
                <ellipse cx="84" cy="101" rx="6" ry="8" fill="#3E2433" />
                <ellipse cx="116" cy="101" rx="6" ry="8" fill="#3E2433" />
                <circle cx="86.5" cy="97.5" r="2.4" fill="#fff" />
                <circle cx="118.5" cy="97.5" r="2.4" fill="#fff" />
                <circle cx="82" cy="104" r="1.2" fill="#fff" />
                <circle cx="114" cy="104" r="1.2" fill="#fff" />
              </g>
            )}
          </g>
          {/* glasses */}
          <g fill="none" stroke="#C86A97" strokeWidth="2.4" opacity=".9">
            <circle cx="84" cy="101" r="13.5" />
            <circle cx="116" cy="101" r="13.5" />
            <path d="M97.5 100 q2.5 -3 5 0" />
          </g>
          {/* blush */}
          <ellipse className="girl__blush" cx="72" cy="119" rx="8" ry="4.2" fill="#F7A1C4" opacity=".7" />
          <ellipse className="girl__blush" cx="128" cy="119" rx="8" ry="4.2" fill="#F7A1C4" opacity=".7" />
          {/* mouth */}
          {smiling ? (
            <path d="M90 119 Q100 134 110 119 Z" fill="#D2577F" stroke="#B9466D" strokeWidth="1.5" strokeLinejoin="round" />
          ) : (
            <path d="M92 121 Q100 128 108 121" fill="none" stroke="#B9466D" strokeWidth="2.6" strokeLinecap="round" />
          )}
        </g>
      </g>
    </svg>
  )
}

export default memo(Girl)
