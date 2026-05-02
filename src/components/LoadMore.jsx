import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Invisible sentinel element – when it enters the viewport, triggers `onIntersect`.
 */
export default function LoadMore({ onIntersect, hasMore, loading }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!hasMore || loading) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect()
      },
      { rootMargin: '300px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect, hasMore, loading])

  if (!hasMore) return null

  return (
    <div ref={ref} className="flex justify-center py-8">
      {loading && (
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="w-5 h-5 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
          Cargando más ejercicios…
        </div>
      )}
    </div>
  )
}

LoadMore.propTypes = {
  onIntersect: PropTypes.func.isRequired,
  hasMore:     PropTypes.bool.isRequired,
  loading:     PropTypes.bool.isRequired,
}
