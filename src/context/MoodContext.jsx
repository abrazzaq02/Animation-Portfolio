import { createContext, useCallback, useContext, useRef, useState } from 'react'

/**
 * Shared "mood" for the animated character(s).
 * Buttons call react('excited') on hover; sections set a speech-bubble message on scroll.
 */
const MoodContext = createContext(null)

export function MoodProvider({ children }) {
  const [mood, setMood] = useState('idle') // idle | happy | excited | wave
  const [message, setMessage] = useState('Hi! Welcome to my little corner of the internet ✨')
  const timer = useRef()

  const react = useCallback((next = 'excited', duration = 1600) => {
    clearTimeout(timer.current)
    setMood(next)
    timer.current = setTimeout(() => setMood('idle'), duration)
  }, [])

  return (
    <MoodContext.Provider value={{ mood, setMood, react, message, setMessage }}>
      {children}
    </MoodContext.Provider>
  )
}

export const useMood = () => useContext(MoodContext)

/** Spread onto any interactive element to make the character react on hover/focus. */
export function useReactive(mood = 'excited') {
  const { react } = useMood()
  return {
    onMouseEnter: () => react(mood),
    onFocus: () => react(mood),
  }
}
