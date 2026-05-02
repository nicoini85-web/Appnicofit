import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Shows a 2-frame animation by alternating between frame0 and frame1.
 * Preloads both frames so the animation starts smooth.
 */
export default function AnimatedExercise({ frames, alt, className, fps = 1.5 }) {
  const [frame, setFrame]       = useState(0)
  const [ready, setReady]       = useState(false)
  const [error, setError]       = useState(false)
  const loadedRef               = useRef([false, false])
  const intervalRef             = useRef(null)

  useEffect(() => {
    // Reset when frames change
    setFrame(0)
    setReady(false)
    setError(false)
    loadedRef.current = [false, false]
    clearInterval(intervalRef.current)
  }, [frames[0], frames[1]])  // eslint-disable-line react-hooks/exhaustive-deps

  function markLoaded(idx) {
    loadedRef.current[idx] = true
    if (loadedRef.current[0] && loadedRef.current[1]) {
      setReady(true)
      intervalRef.current = setInterval(() => {
        setFrame(f => (f === 0 ? 1 : 0))
      }, 1000 / fps)
    }
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-800 text-gray-600 gap-2 ${className}`}>
        <span className="text-4xl">🏋️</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-gray-800 ${className}`}>
      {/* Spinner while loading */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
      )}

      {/* Preload both frames; show current one */}
      {frames.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={idx === 0 ? alt : ''}
          loading="lazy"
          onLoad={() => markLoaded(idx)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
            ready && frame === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}

AnimatedExercise.propTypes = {
  frames:    PropTypes.arrayOf(PropTypes.string).isRequired,
  alt:       PropTypes.string.isRequired,
  className: PropTypes.string,
  fps:       PropTypes.number,
}

AnimatedExercise.defaultProps = {
  className: '',
  fps: 1.5,
}
