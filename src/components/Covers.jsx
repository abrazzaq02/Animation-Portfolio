import { memo, useId } from 'react'

/**
 * Illustrated project covers — hand-built SVG "pictures" (device mockups, UI screens,
 * neural-network art). Vector, so they stay crisp at any size and weigh almost nothing.
 * Small parts animate with CSS classes prefixed `cv-` (see global.css).
 */

function useIds() {
  const u = useId().replace(/:/g, '')
  return (n) => `${n}-${u}`
}

/* shared dreamy backdrop: gradient, soft bokeh, faint dot grid */
function Backdrop({ id, from = '#FFE3EF', via = '#F8C8DC', to = '#F4B6D1' }) {
  return (
    <>
      <defs>
        <linearGradient id={id('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="55%" stopColor={via} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <pattern id={id('dots')} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#fff" opacity=".55" />
        </pattern>
        <radialGradient id={id('glow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={id('shadow')} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#C8588B" floodOpacity=".28" />
        </filter>
        <linearGradient id={id('pink')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8C8DC" />
          <stop offset="60%" stopColor="#EFA6C8" />
          <stop offset="100%" stopColor="#E07AA8" />
        </linearGradient>
        <linearGradient id={id('violet')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4B6D6" />
          <stop offset="100%" stopColor="#D96C9D" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id('bg')})`} />
      <rect width="400" height="260" fill={`url(#${id('dots')})`} />
      <circle className="cv-float" cx="60" cy="50" r="46" fill={`url(#${id('glow')})`} />
      <circle className="cv-float cv-d2" cx="350" cy="210" r="60" fill={`url(#${id('glow')})`} />
      <circle cx="330" cy="40" r="7" fill="#fff" opacity=".6" />
      <circle cx="40" cy="220" r="5" fill="#fff" opacity=".7" />
    </>
  )
}

const Sparkle = ({ x, y, s = 1, className = 'cv-twinkle' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className={className} d="M0 -8 C1 -2 2 -1 8 0 C2 1 1 2 0 8 C-1 2 -2 1 -8 0 C-2 -1 -1 -2 0 -8Z" fill="#fff" />
  </g>
)

/* ───────────── AI chat assistant ───────────── */
function AIChat() {
  const id = useIds()
  const nodes = [
    [30, 70], [30, 130], [30, 190], [75, 100], [75, 160], [360, 80], [360, 140], [360, 200], [320, 110], [320, 170],
  ]
  const links = [[0, 3], [1, 3], [1, 4], [2, 4], [0, 4], [5, 8], [6, 8], [6, 9], [7, 9], [5, 9]]
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="cover" role="img" aria-label="AI chat assistant illustration">
      <Backdrop id={id} from="#FFE6F1" via="#F6C6E0" to="#F2B3CF" />
      {/* neural network */}
      <g opacity=".75">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#fff" strokeWidth="1.4" opacity=".8" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} className="cv-pulse" style={{ animationDelay: `${i * 0.25}s` }} cx={x} cy={y} r="5" fill="#fff" stroke="#E07AA8" strokeWidth="2" />
        ))}
      </g>
      {/* chat window */}
      <g filter={`url(#${id('shadow')})`}>
        <rect x="92" y="30" width="216" height="200" rx="18" fill="#fff" />
      </g>
      <rect x="92" y="30" width="216" height="44" rx="18" fill="#FFF0F6" />
      <rect x="92" y="56" width="216" height="18" fill="#FFF0F6" />
      <circle cx="116" cy="52" r="13" fill={`url(#${id('violet')})`} />
      {/* tiny robot face */}
      <rect x="108" y="46" width="16" height="12" rx="4" fill="#fff" />
      <circle className="cv-blink" cx="113" cy="52" r="1.8" fill="#B8487D" />
      <circle className="cv-blink" cx="119" cy="52" r="1.8" fill="#B8487D" />
      <text x="136" y="50" fontFamily="Poppins, sans-serif" fontWeight="600" fontSize="11" fill="#382B35">Study Buddy AI</text>
      <circle cx="139" cy="61" r="3" fill="#6FD3A0" />
      <text x="146" y="64" fontFamily="Poppins, sans-serif" fontSize="7.5" fill="#8a7d8c">online · ready to help</text>
      {/* bubbles */}
      <rect className="cv-pop" x="106" y="86" width="140" height="30" rx="12" fill="#F7EEF9" />
      <text x="116" y="99" fontFamily="Poppins, sans-serif" fontSize="7.6" fill="#5E5460">Hi! What shall we</text>
      <text x="116" y="110" fontFamily="Poppins, sans-serif" fontSize="7.6" fill="#5E5460">learn today? ✨</text>
      <rect className="cv-pop cv-d1" x="176" y="124" width="118" height="24" rx="12" fill={`url(#${id('pink')})`} />
      <text x="186" y="139.5" fontFamily="Poppins, sans-serif" fontSize="7.6" fontWeight="600" fill="#fff">Explain recursion 🤔</text>
      <rect className="cv-pop cv-d2" x="106" y="156" width="160" height="30" rx="12" fill="#F7EEF9" />
      <text x="116" y="169" fontFamily="Poppins, sans-serif" fontSize="7.6" fill="#5E5460">A function that calls itself</text>
      <text x="116" y="180" fontFamily="Poppins, sans-serif" fontSize="7.6" fill="#5E5460">until a base case… 🪆</text>
      <g transform="translate(116 202)">
        <circle className="cv-dot" cx="0" cy="0" r="3" fill="#EFA6C8" />
        <circle className="cv-dot cv-d1" cx="9" cy="0" r="3" fill="#EFA6C8" />
        <circle className="cv-dot cv-d2" cx="18" cy="0" r="3" fill="#EFA6C8" />
      </g>
      <rect x="150" y="194" width="146" height="18" rx="9" fill="#FFF5F9" stroke="#F8C8DC" />
      <text x="160" y="206" fontFamily="Poppins, sans-serif" fontSize="7" fill="#b9a8b8">Ask me anything…</text>
      <circle cx="286" cy="203" r="7" fill={`url(#${id('pink')})`} />
      <path d="M283 203 l6 -3 -2 3 2 3z" fill="#fff" />
      {/* floating robot */}
      <g transform="translate(300 150)"><g className="cv-float cv-d1">
        <line x1="22" y1="-2" x2="22" y2="-14" stroke="#D96C9D" strokeWidth="3" strokeLinecap="round" />
        <circle className="cv-pulse" cx="22" cy="-16" r="4.5" fill="#F28CB1" />
        <rect x="0" y="0" width="44" height="36" rx="12" fill="#fff" stroke="#F8C8DC" strokeWidth="2" />
        <rect x="6" y="7" width="32" height="18" rx="8" fill="#3E2F4F" />
        <circle className="cv-blink" cx="15" cy="16" r="3.4" fill="#FFC2DD" />
        <circle className="cv-blink" cx="29" cy="16" r="3.4" fill="#FFC2DD" />
        <path d="M17 29 q5 4 10 0" stroke="#E07AA8" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g></g>
      <Sparkle x={70} y={40} s={1.2} />
      <Sparkle x={330} y={58} s={0.8} className="cv-twinkle cv-d1" />
      <Sparkle x={365} y={235} s={1} className="cv-twinkle cv-d2" />
    </svg>
  )
}

/* ───────────── AI image classifier ───────────── */
function AIVision() {
  const id = useIds()
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="cover" role="img" aria-label="AI image classifier illustration">
      <Backdrop id={id} from="#FFEAF3" via="#F9CFE2" to="#F4BCD5" />
      {/* photo card */}
      <g filter={`url(#${id('shadow')})`}>
        <rect x="34" y="34" width="208" height="192" rx="16" fill="#fff" />
      </g>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9F2" />
          <stop offset="100%" stopColor="#FAD3E4" />
        </linearGradient>
        <clipPath id={id('photo')}>
          <rect x="44" y="44" width="188" height="172" rx="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id('photo')})`}>
        <rect x="44" y="44" width="188" height="172" fill={`url(#${id('sky')})`} />
        <circle cx="200" cy="74" r="14" fill="#FFF6D8" />
        <path d="M44 186 q60 -26 120 -6 q40 12 68 0 v36 h-188z" fill="#FBE1EC" />
        {/* cat */}
        <g transform="translate(70 104)">
          <ellipse cx="40" cy="78" rx="38" ry="26" fill="#F3C9A8" />
          <circle cx="40" cy="40" r="30" fill="#F6D3B6" />
          <path d="M14 26 L18 0 L36 16Z" fill="#F6D3B6" />
          <path d="M66 26 L62 0 L44 16Z" fill="#F6D3B6" />
          <path d="M19 20 L21 7 L30 15Z" fill="#F7A8C4" />
          <path d="M61 20 L59 7 L50 15Z" fill="#F7A8C4" />
          <ellipse className="cv-blink" cx="29" cy="40" rx="4" ry="5" fill="#3E2433" />
          <ellipse className="cv-blink" cx="51" cy="40" rx="4" ry="5" fill="#3E2433" />
          <path d="M37 50 l3 3 3 -3z" fill="#E07AA8" />
          <path d="M40 53 q-4 5 -8 2 M40 53 q4 5 8 2" stroke="#8a5a4a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M10 46 h-12 M10 51 h-11 M70 46 h12 M70 51 h11" stroke="#c9a38c" strokeWidth="1.2" />
          <ellipse cx="22" cy="50" rx="5" ry="3" fill="#F7A8C4" opacity=".6" />
          <ellipse cx="58" cy="50" rx="5" ry="3" fill="#F7A8C4" opacity=".6" />
        </g>
        {/* flower */}
        <g transform="translate(190 150)">
          <line x1="0" y1="10" x2="0" y2="46" stroke="#7CC59A" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="0" cy="-8" rx="6" ry="10" fill="#F28CB1" transform={`rotate(${r})`} />
          ))}
          <circle r="5" fill="#FFD66E" />
        </g>
        {/* scan line */}
        <g className="cv-scan">
          <rect x="44" y="44" width="188" height="3" fill="#E07AA8" opacity=".8" />
          <rect x="44" y="20" width="188" height="24" fill="#E07AA8" opacity=".12" />
        </g>
      </g>
      {/* detection boxes */}
      <rect className="cv-dash" x="62" y="94" width="96" height="114" rx="8" fill="none" stroke="#E07AA8" strokeWidth="2.5" strokeDasharray="7 5" />
      <rect x="62" y="80" width="78" height="18" rx="6" fill="#E07AA8" />
      <text x="70" y="93" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700" fill="#fff">cat · 98.4%</text>
      <rect className="cv-dash cv-d1" x="170" y="126" width="42" height="74" rx="8" fill="none" stroke="#D96C9D" strokeWidth="2.5" strokeDasharray="7 5" />
      <rect x="166" y="112" width="58" height="16" rx="6" fill="#D96C9D" />
      <text x="171" y="123.5" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fontWeight="700" fill="#fff">flower 91%</text>
      {/* results panel */}
      <g filter={`url(#${id('shadow')})`}>
        <rect x="256" y="48" width="118" height="132" rx="14" fill="#fff" />
      </g>
      <text x="268" y="68" fontFamily="Poppins, sans-serif" fontWeight="600" fontSize="10" fill="#382B35">Predictions</text>
      {[
        ['🐱 cat', 0.98, '#E07AA8'],
        ['🌸 flower', 0.91, '#D96C9D'],
        ['🐶 dog', 0.12, '#EFA6C8'],
        ['🦊 fox', 0.06, '#F4C2D7'],
      ].map(([label, v, c], i) => (
        <g key={label} transform={`translate(268 ${80 + i * 24})`}>
          <text x="0" y="6" fontFamily="Poppins, sans-serif" fontSize="7.5" fill="#5E5460">{label}</text>
          <rect x="0" y="10" width="94" height="5" rx="2.5" fill="#FBE4EE" />
          <rect className="cv-grow-x" style={{ animationDelay: `${i * 0.15}s` }} x="0" y="10" width={94 * v} height="5" rx="2.5" fill={c} />
        </g>
      ))}
      {/* model chip */}
      <g transform="translate(278 194)"><g className="cv-float cv-d1">
        <rect width="86" height="40" rx="12" fill={`url(#${id('violet')})`} filter={`url(#${id('shadow')})`} />
        <text x="12" y="17" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="700" fill="#fff">CNN · v2.1</text>
        <text x="12" y="30" fontFamily="Poppins, sans-serif" fontSize="7" fill="#fff" opacity=".9">accuracy 96.7%</text>
      </g></g>
      <Sparkle x={250} y={30} />
      <Sparkle x={24} y={240} s={0.8} className="cv-twinkle cv-d2" />
    </svg>
  )
}

/* ───────────── portfolio (laptop + phone mockup) ───────────── */
function Portfolio() {
  const id = useIds()
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="cover" role="img" aria-label="Portfolio website on laptop and phone">
      <Backdrop id={id} />
      {/* laptop */}
      <g filter={`url(#${id('shadow')})`}>
        <rect x="58" y="34" width="250" height="160" rx="12" fill="#3B2F3D" />
      </g>
      <rect x="66" y="42" width="234" height="144" rx="6" fill="#FFF9FB" />
      <path d="M36 196 h294 l-12 14 h-270z" fill="#E9D6E0" />
      <rect x="160" y="196" width="46" height="5" rx="2.5" fill="#d6bccb" />
      {/* site inside */}
      <rect x="74" y="50" width="218" height="12" rx="6" fill="#FDE7F0" />
      <circle cx="82" cy="56" r="3" fill="#E07AA8" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={220 + i * 17} y="54" width="12" height="4" rx="2" fill="#EFA6C8" />
      ))}
      <rect className="cv-grow-x" x="78" y="74" width="92" height="9" rx="4" fill="#E07AA8" />
      <rect x="78" y="88" width="120" height="13" rx="5" fill={`url(#${id('pink')})`} />
      <rect x="78" y="106" width="70" height="6" rx="3" fill="#E9CAD8" />
      <rect x="78" y="118" width="38" height="11" rx="5.5" fill="#E07AA8" />
      <rect x="120" y="118" width="38" height="11" rx="5.5" fill="none" stroke="#E07AA8" />
      {/* mini girl avatar */}
      <circle cx="248" cy="104" r="34" fill="#FADADD" />
      <circle cx="232" cy="80" r="9" fill="#5A3447" />
      <circle cx="264" cy="80" r="9" fill="#5A3447" />
      <path d="M222 112 c-2 -30 14 -36 26 -36 c14 0 30 6 26 36z" fill="#5A3447" />
      <ellipse cx="248" cy="104" rx="20" ry="21" fill="#FFE2D4" />
      <path d="M228 100 c2 -16 12 -20 20 -19 c10 -1 20 5 20 19 c-6 -7 -12 -10 -18 -8 c-6 -5 -16 -2 -22 8z" fill="#5A3447" />
      <circle className="cv-blink" cx="241" cy="106" r="2.6" fill="#3E2433" />
      <circle className="cv-blink" cx="255" cy="106" r="2.6" fill="#3E2433" />
      <path d="M244 114 q4 4 8 0" stroke="#B9466D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M232 138 q16 -14 32 0" fill="#F4A9C9" />
      {[0, 1, 2].map((i) => (
        <rect key={i} className="cv-float" style={{ animationDelay: `${-i}s` }} x={78 + i * 72} y="146" width="64" height="32" rx="8" fill="#FDE7F0" />
      ))}
      {/* phone */}
      <g className="cv-float cv-d1">
        <g filter={`url(#${id('shadow')})`}>
          <rect x="300" y="88" width="66" height="132" rx="14" fill="#3B2F3D" />
        </g>
        <rect x="305" y="93" width="56" height="122" rx="10" fill="#FFF9FB" />
        <rect x="324" y="97" width="18" height="4" rx="2" fill="#3B2F3D" />
        <circle cx="333" cy="124" r="13" fill="#FADADD" />
        <text x="333" y="129" textAnchor="middle" fontSize="13">👩🏻‍💻</text>
        <rect x="312" y="144" width="42" height="6" rx="3" fill="#E07AA8" />
        <rect x="316" y="154" width="34" height="4" rx="2" fill="#E9CAD8" />
        <rect x="312" y="164" width="42" height="9" rx="4.5" fill={`url(#${id('pink')})`} />
        <rect x="312" y="178" width="20" height="26" rx="5" fill="#FDE7F0" />
        <rect x="334" y="178" width="20" height="26" rx="5" fill="#FDE7F0" />
      </g>
      <text className="cv-pulse" x="44" y="38" fontSize="16">💖</text>
      <Sparkle x={350} y={50} s={1.1} />
      <Sparkle x={30} y={130} s={0.8} className="cv-twinkle cv-d1" />
    </svg>
  )
}

/* ───────────── student management dashboard ───────────── */
function Students() {
  const id = useIds()
  const bars = [40, 62, 50, 78, 66, 88, 72]
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="cover" role="img" aria-label="Student management dashboard">
      <Backdrop id={id} from="#FFF0F6" via="#F9D3E3" to="#F6C4DA" />
      <g filter={`url(#${id('shadow')})`}>
        <rect x="30" y="26" width="340" height="208" rx="16" fill="#fff" />
      </g>
      {/* sidebar */}
      <rect x="30" y="26" width="56" height="208" rx="16" fill={`url(#${id('pink')})`} />
      <rect x="70" y="26" width="16" height="208" fill={`url(#${id('pink')})`} />
      <circle cx="58" cy="50" r="11" fill="#fff" opacity=".95" />
      <text x="58" y="54" textAnchor="middle" fontSize="11">🎓</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="46" y={78 + i * 24} width="24" height="14" rx="5" fill="#fff" opacity={i === 0 ? 0.95 : 0.45} />
      ))}
      <text x="100" y="48" fontFamily="Poppins, sans-serif" fontWeight="600" fontSize="12" fill="#382B35">Class Dashboard</text>
      <text x="100" y="60" fontFamily="Poppins, sans-serif" fontSize="7" fill="#8a7d8c">Semester 5 · BS Computer Science</text>
      {/* stat cards */}
      {[
        ['Students', '128', '#FDE7F0'],
        ['Avg grade', 'A-', '#FFF0F5'],
        ['Attendance', '94%', '#FDE7F0'],
      ].map(([l, v, c], i) => (
        <g key={l} transform={`translate(${100 + i * 88} 70)`}>
          <rect width="80" height="40" rx="10" fill={c} />
          <text x="10" y="16" fontFamily="Poppins, sans-serif" fontSize="7" fill="#8a7d8c">{l}</text>
          <text x="10" y="32" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="14" fill="#C8588B">{v}</text>
        </g>
      ))}
      {/* bar chart */}
      <rect x="100" y="120" width="160" height="100" rx="10" fill="#FFF9FB" stroke="#FBE1EC" />
      <text x="110" y="134" fontFamily="Poppins, sans-serif" fontSize="7" fontWeight="600" fill="#5E5460">Weekly attendance</text>
      {bars.map((h, i) => (
        <rect
          key={i}
          className="cv-grow-y"
          style={{ animationDelay: `${i * 0.12}s` }}
          x={112 + i * 20}
          y={210 - h * 0.7}
          width="12"
          height={h * 0.7}
          rx="4"
          fill={i === 5 ? '#E07AA8' : '#F4B6D1'}
        />
      ))}
      {/* donut + table */}
      <circle cx="306" cy="150" r="24" fill="none" stroke="#FBE4EE" strokeWidth="10" />
      <circle className="cv-spin-slow" cx="306" cy="150" r="24" fill="none" stroke="#E07AA8" strokeWidth="10" strokeDasharray="110 151" strokeLinecap="round" transform="rotate(-90 306 150)" />
      <text x="306" y="154" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="11" fill="#C8588B">73%</text>
      {['Aisha  A+', 'Bilal  B+', 'Sara   A'].map((t, i) => (
        <g key={t} className="cv-pop" style={{ animationDelay: `${i * 0.3}s` }}>
          <rect x="272" y={184 + i * 14} width="86" height="11" rx="4" fill={i % 2 ? '#FFF6FA' : '#FDE7F0'} />
          <text x="278" y={192 + i * 14} fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#5E5460">{t}</text>
        </g>
      ))}
      <Sparkle x={372} y={22} />
    </svg>
  )
}

/* ───────────── calculator phone ───────────── */
function Calculator() {
  const id = useIds()
  const keys = ['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+']
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="cover" role="img" aria-label="Calculator app on a phone">
      <Backdrop id={id} from="#FFEFF5" via="#F8C8DC" to="#F8CDE0" />
      {['π', '√', '∑', '×', '÷', '+', '=', '%'].map((s, i) => (
        <text
          key={s}
          className="cv-float"
          style={{ animationDelay: `${-i * 0.7}s` }}
          x={[40, 340, 70, 320, 30, 360, 100, 300][i]}
          y={[60, 70, 200, 200, 130, 140, 110, 112][i]}
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fontSize={[26, 22, 20, 26, 18, 18, 16, 16][i]}
          fill="#fff"
          opacity=".85"
        >
          {s}
        </text>
      ))}
      <g transform="rotate(-6 200 130)">
        <g filter={`url(#${id('shadow')})`}>
          <rect x="140" y="14" width="120" height="236" rx="22" fill="#3B2F3D" />
        </g>
        <rect x="146" y="20" width="108" height="224" rx="17" fill="#FFF9FB" />
        <rect x="186" y="25" width="28" height="6" rx="3" fill="#3B2F3D" />
        <text x="244" y="58" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#a0919f">128 × 6 =</text>
        <text x="244" y="80" textAnchor="end" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="22" fill="#C8588B">768</text>
        {keys.map((k, i) => {
          const x = 154 + (i % 4) * 24
          const y = 92 + Math.floor(i / 4) * 30
          const op = i % 4 === 3
          return (
            <g key={k} className="cv-press" style={{ animationDelay: `${(i * 0.43) % 4}s` }}>
              <rect x={x} y={y} width="20" height="24" rx="8" fill={op ? `url(#${id('pink')})` : i < 3 ? '#FDE2EE' : '#fff'} stroke="#F6D2E2" />
              <text x={x + 10} y={y + 15.5} textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="600" fontSize="9" fill={op ? '#fff' : '#5E5460'}>
                {k}
              </text>
            </g>
          )
        })}
        <rect x="154" y="212" width="44" height="24" rx="10" fill="#fff" stroke="#F6D2E2" />
        <text x="176" y="227.5" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="600" fontSize="9" fill="#5E5460">0</text>
        <rect x="202" y="212" width="20" height="24" rx="8" fill="#fff" stroke="#F6D2E2" />
        <text x="212" y="227.5" textAnchor="middle" fontSize="9" fill="#5E5460">.</text>
        <rect x="226" y="212" width="20" height="24" rx="8" fill="#C8588B" />
        <text x="236" y="227.5" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="10" fill="#fff">=</text>
      </g>
      <Sparkle x={290} y={36} s={1.2} />
      <Sparkle x={110} y={232} className="cv-twinkle cv-d1" />
    </svg>
  )
}

/* ───────────── to-do list ───────────── */
function Todo() {
  const id = useIds()
  const tasks = ['Finish DSA homework', 'Push code to GitHub', 'Design new UI', 'Drink water 💧']
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="cover" role="img" aria-label="To-do list app">
      <Backdrop id={id} from="#FFF3F7" via="#FAD4E4" to="#F7C9DC" />
      {/* sticky notes */}
      <g transform="rotate(-10 60 70)"><g className="cv-float">
        <rect x="28" y="40" width="64" height="60" rx="6" fill="#FFF0F5" />
        <text x="38" y="62" fontFamily="Poppins, sans-serif" fontSize="9" fill="#B8487D">exam fri!</text>
        <text x="38" y="80" fontSize="14">📚</text>
      </g></g>
      <g transform="rotate(8 345 200)"><g className="cv-float cv-d2">
        <rect x="314" y="170" width="62" height="58" rx="6" fill="#FADADD" />
        <text x="324" y="192" fontFamily="Poppins, sans-serif" fontSize="9" fill="#B8487D">you got</text>
        <text x="324" y="206" fontFamily="Poppins, sans-serif" fontSize="9" fill="#B8487D">this ✨</text>
      </g></g>
      <g filter={`url(#${id('shadow')})`}>
        <rect x="104" y="26" width="200" height="210" rx="18" fill="#fff" />
      </g>
      <text x="122" y="54" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="14" fill="#382B35">My Tasks</text>
      <text x="122" y="67" fontFamily="Poppins, sans-serif" fontSize="7.5" fill="#8a7d8c">Tuesday · 3 of 4 done</text>
      {/* progress ring */}
      <circle cx="276" cy="56" r="15" fill="none" stroke="#FBE4EE" strokeWidth="5" />
      <circle cx="276" cy="56" r="15" fill="none" stroke="#E07AA8" strokeWidth="5" strokeDasharray="71 95" strokeLinecap="round" transform="rotate(-90 276 56)" />
      <text x="276" y="59" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="8" fontWeight="700" fill="#C8588B">75%</text>
      {tasks.map((t, i) => {
        const done = i < 3
        const y = 84 + i * 32
        return (
          <g key={t}>
            <rect x="118" y={y} width="172" height="24" rx="9" fill={done ? '#FFF4F8' : '#FDE7F0'} />
            <rect x="126" y={y + 6} width="12" height="12" rx="4" fill={done ? `url(#${id('pink')})` : '#fff'} stroke="#EFA6C8" strokeWidth="1.5" />
            {done && <path className="cv-check" style={{ animationDelay: `${i * 0.4}s` }} d={`M129 ${y + 12} l3 3 l5 -6`} fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
            <text x="146" y={y + 15.5} fontFamily="Poppins, sans-serif" fontSize="8" fill={done ? '#a0919f' : '#382B35'} textDecoration={done ? 'line-through' : ''}>
              {t}
            </text>
          </g>
        )
      })}
      <rect x="118" y="214" width="172" height="12" rx="6" fill="#FFF4F8" />
      <rect className="cv-grow-x" x="118" y="214" width="129" height="12" rx="6" fill={`url(#${id('pink')})`} />
      {/* confetti */}
      {['#E07AA8', '#D96C9D', '#FFD66E', '#7CC59A', '#EFA6C8'].map((c, i) => (
        <rect key={c} className="cv-confetti" style={{ animationDelay: `${i * 0.5}s` }} x={300 + i * 12} y="30" width="5" height="8" rx="1.5" fill={c} />
      ))}
      <Sparkle x={86} y={210} s={1.1} />
    </svg>
  )
}

const COVERS = { 'ai-chat': AIChat, 'ai-vision': AIVision, portfolio: Portfolio, students: Students, calculator: Calculator, todo: Todo }

function Cover({ type }) {
  const C = COVERS[type] || Portfolio
  return <C />
}

export default memo(Cover)
