import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Smooth 2-frame animation using cross-fade opacity transitions.
 * Each frame stays visible for `holdMs` ms, then fades to the next over `fadeMs` ms.
 */
export default function AnimatedExercise({ frames, alt, className, holdMs = 2600, fadeMs = 400 }) {
  const [frame, setFrame]   = useState(0)   // which frame is "current"
  const [fading, setFading] = useState(false) // true during the cross-fade
  const [ready, setReady]   = useState(false)
  const [error, setError]   = useState(false)
  const loadedRef           = useRef([false, false])
  const timerRef            = useRef(null)

  // Reset when frames change
  useEffect(() => {
    setFrame(0)
    setFading(false)
    setReady(false)
    setError(false)
    loadedRef.current = [false, false]
    clearTimeout(timerRef.current)
  }, [frames[0], frames[1]])  // eslint-disable-line react-hooks/exhaustive-deps

  function markLoaded(idx) {
    loadedRef.current[idx] = true
    if (loadedRef.current[0] && loadedRef.current[1]) {
      setReady(true)
      scheduleNext(0)
    }
  }

  function scheduleNext(currentFrame) {
    timerRef.current = setTimeout(() => {
      // Start fade-out of current / fade-in of next
      setFading(true)
      timerRef.current = setTimeout(() => {
        const next = currentFrame === 0 ? 1 : 0
        setFrame(next)
        setFading(false)
        scheduleNext(next)
      }, fadeMs)
    }, holdMs)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-800 text-gray-600 ${className}`}>
        <span className="text-4xl">🏋️</span>
      </div>
    )
  }

  // Opacity values:
  // - frame 0 visible, no fade: frame0=1, frame1=0
  // - fading from 0 to 1:       frame0=0, frame1=1   (cross-fade)
  // - frame 1 visible, no fade: frame0=0, frame1=1
  // - fading from 1 to 0:       frame0=1, frame1=0   (cross-fade)
  const opacities = ready
    ? frame === 0
      ? [fading ? 0 : 1, fading ? 1 : 0]
      : [fading ? 1 : 0, fading ? 0 : 1]
    : [0, 0]

  return (
    <div className={`relative overflow-hidden bg-gray-800 ${className}`}>
      {/* Spinner */}
      {!ready && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
      )}

      {frames.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={idx === 0 ? alt : ''}
          loading="lazy"
          onLoad={() => markLoaded(idx)}
          onError={() => setError(true)}
          style={{
            opacity: opacities[idx],
            transition: fading ? `opacity ${fadeMs}ms ease-in-out` : 'none',
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
    </div>
  )
}

AnimatedExercise.propTypes = {
  frames:    PropTypes.arrayOf(PropTypes.string).isRequired,
  alt:       PropTypes.string.isRequired,
  className: PropTypes.string,
  holdMs:    PropTypes.number,
  fadeMs:    PropTypes.number,
}

AnimatedExercise.defaultProps = {
  className: '',
  holdMs: 2600,
  fadeMs: 400,
}
