import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

/* ───────────── Calculator ───────────── */

const OPS = { '+': (a, b) => a + b, '−': (a, b) => a - b, '×': (a, b) => a * b, '÷': (a, b) => (b === 0 ? NaN : a / b) }
const fmt = (n) => (Number.isFinite(n) ? String(+n.toPrecision(12)) : 'Oops ♥')

export function CalculatorDemo() {
  const [display, setDisplay] = useState('0')
  const [acc, setAcc] = useState(null)
  const [op, setOp] = useState(null)
  const [fresh, setFresh] = useState(true)
  const [expr, setExpr] = useState('')

  const input = (k) => {
    if (/[0-9]/.test(k)) {
      setDisplay((d) => (fresh || d === '0' ? k : d.length < 14 ? d + k : d))
      setFresh(false)
    } else if (k === '.') {
      setDisplay((d) => (fresh ? '0.' : d.includes('.') ? d : d + '.'))
      setFresh(false)
    } else if (k === 'C') {
      setDisplay('0')
      setAcc(null)
      setOp(null)
      setFresh(true)
      setExpr('')
    } else if (k === '⌫') {
      setDisplay((d) => (fresh || d.length <= 1 ? '0' : d.slice(0, -1)))
    } else if (k === '%') {
      setDisplay((d) => fmt(parseFloat(d) / 100))
    } else if (OPS[k]) {
      const cur = parseFloat(display)
      const next = acc !== null && op && !fresh ? OPS[op](acc, cur) : cur
      setAcc(next)
      setDisplay(fmt(next))
      setOp(k)
      setFresh(true)
      setExpr(`${fmt(next)} ${k}`)
    } else if (k === '=') {
      if (acc === null || !op) return
      const cur = parseFloat(display)
      const res = OPS[op](acc, cur)
      setExpr(`${fmt(acc)} ${op} ${fmt(cur)} =`)
      setDisplay(fmt(res))
      setAcc(null)
      setOp(null)
      setFresh(true)
    }
  }

  useEffect(() => {
    const map = { '+': '+', '-': '−', '*': '×', '/': '÷', Enter: '=', '=': '=', Backspace: '⌫', Escape: 'C', '.': '.', '%': '%' }
    const onKey = (e) => {
      const k = /^[0-9]$/.test(e.key) ? e.key : map[e.key]
      if (k && e.key !== 'Escape') {
        e.preventDefault()
        input(k)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const keys = ['C', '⌫', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '=']
  return (
    <div className="calc">
      <div className="calc__screen">
        <small>{expr || ' '}</small>
        <motion.span key={display} initial={{ y: 6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }}>
          {display}
        </motion.span>
      </div>
      <div className="calc__keys">
        {keys.map((k) => (
          <motion.button
            key={k}
            whileTap={{ scale: 0.88 }}
            onClick={() => input(k)}
            className={`calc__key ${OPS[k] || k === '=' ? 'is-op' : ''} ${k === '0' ? 'is-wide' : ''} ${['C', '⌫', '%'].includes(k) ? 'is-fn' : ''}`}
          >
            {k}
          </motion.button>
        ))}
      </div>
      <p className="demo-hint">Tip: your keyboard works too ⌨️</p>
    </div>
  )
}

/* ───────────── To-Do ───────────── */

const TODO_KEY = 'pinkfolio-todos'
const defaultTodos = [
  { id: 1, text: 'Finish DSA assignment', done: true },
  { id: 2, text: 'Push portfolio to GitHub', done: false },
  { id: 3, text: 'Sketch a new UI idea 🎨', done: false },
]

export function TodoDemo() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TODO_KEY)) || defaultTodos
    } catch {
      return defaultTodos
    }
  })
  const [text, setText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(TODO_KEY, JSON.stringify(todos))
    } catch {
      /* storage unavailable — keep in memory */
    }
  }, [todos])

  const add = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setTodos((t) => [...t, { id: Date.now(), text: text.trim(), done: false }])
    setText('')
  }
  const done = todos.filter((t) => t.done).length
  const pct = todos.length ? Math.round((done / todos.length) * 100) : 0

  return (
    <div className="todo">
      <div className="todo__progress">
        <span>
          {done}/{todos.length} done
        </span>
        <div className="todo__bar">
          <motion.i animate={{ width: `${pct}%` }} />
        </div>
        <b>{pct}%</b>
      </div>
      <form onSubmit={add} className="todo__form">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a new task…" aria-label="New task" />
        <button type="submit">Add ♥</button>
      </form>
      <ul className="todo__list">
        <AnimatePresence initial={false}>
          {todos.map((t) => (
            <motion.li key={t.id} layout initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40, height: 0 }}>
              <label className={t.done ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => setTodos((all) => all.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
                />
                <span className="todo__box">✓</span>
                {t.text}
              </label>
              <button onClick={() => setTodos((all) => all.filter((x) => x.id !== t.id))} aria-label={`Delete ${t.text}`}>
                ×
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {!todos.length && <p className="demo-hint">All clear! Time for a coffee break ☕</p>}
    </div>
  )
}

/* ───────────── Student Management ───────────── */

const seed = [
  { id: 1, name: 'Aisha Khan', roll: 'CS-101', grade: 'A', att: 96 },
  { id: 2, name: 'Bilal Ahmed', roll: 'CS-102', grade: 'B+', att: 88 },
  { id: 3, name: 'Sara Ali', roll: 'CS-103', grade: 'A+', att: 99 },
  { id: 4, name: 'Omar Farooq', roll: 'CS-104', grade: 'B', att: 82 },
]

export function StudentsDemo() {
  const [rows, setRows] = useState(seed)
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ name: '', roll: '', grade: 'A' })

  const shown = useMemo(
    () => rows.filter((r) => `${r.name} ${r.roll}`.toLowerCase().includes(q.toLowerCase())),
    [rows, q],
  )
  const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.att, 0) / rows.length) : 0

  const add = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.roll.trim()) return
    setRows((r) => [...r, { id: Date.now(), ...form, name: form.name.trim(), roll: form.roll.trim(), att: 90 + Math.floor(Math.random() * 10) }])
    setForm({ name: '', roll: '', grade: 'A' })
  }

  return (
    <div className="sms">
      <div className="sms__stats">
        <div>
          <b>{rows.length}</b> Students
        </div>
        <div>
          <b>{avg}%</b> Avg attendance
        </div>
      </div>
      <input className="sms__search" placeholder="Search by name or roll no…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search students" />
      <div className="sms__table" role="table">
        <div className="sms__row sms__row--head" role="row">
          <span>Name</span>
          <span>Roll</span>
          <span>Grade</span>
          <span />
        </div>
        <AnimatePresence initial={false}>
          {shown.map((r) => (
            <motion.div className="sms__row" role="row" key={r.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span>{r.name}</span>
              <span>{r.roll}</span>
              <span className="sms__grade">{r.grade}</span>
              <button onClick={() => setRows((all) => all.filter((x) => x.id !== r.id))} aria-label={`Remove ${r.name}`}>
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form className="sms__form" onSubmit={add}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Student name" />
        <input placeholder="Roll no" value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} aria-label="Roll number" />
        <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} aria-label="Grade">
          {['A+', 'A', 'A-', 'B+', 'B', 'C'].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
