import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Stopwatch timer for a workout session.
 * Returns elapsed seconds and controls.
 */
export function useSessionTimer(autoStart = false) {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(autoStart)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const start  = useCallback(() => setRunning(true), [])
  const pause  = useCallback(() => setRunning(false), [])
  const reset  = useCallback(() => { setRunning(false); setSeconds(0) }, [])
  const toggle = useCallback(() => setRunning((r) => !r), [])

  const formatted = [
    String(Math.floor(seconds / 3600)).padStart(2, '0'),
    String(Math.floor((seconds % 3600) / 60)).padStart(2, '0'),
    String(seconds % 60).padStart(2, '0'),
  ].join(':')

  return { seconds, formatted, running, start, pause, reset, toggle }
}
