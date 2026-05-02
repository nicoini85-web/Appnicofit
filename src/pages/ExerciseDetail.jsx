import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getExerciseById } from '../services/exercisedb'

export default function ExerciseDetail() {
  const { id } = useParams()
  const [exercise, setExercise] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [gifLoaded, setGifLoaded] = useState(false)
  const [gifError, setGifError]   = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setGifLoaded(false)
    setGifError(false)
    getExerciseById(id)
      .then(setExercise)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (error || !exercise) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">😢</p>
        <p className="text-gray-400 mb-6">{error || 'Ejercicio no encontrado.'}</p>
        <Link to="/" className="btn-primary">Volver a la lista</Link>
      </div>
    )
  }

  const {
    name,
    gifUrl,
    bodyParts,
    equipments,
    targetMuscles,
    secondaryMuscles,
    instructions,
  } = exercise

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Todos los ejercicios
      </Link>

      <div className="lg:grid lg:grid-cols-[400px_1fr] gap-10">
        {/* GIF */}
        <div className="flex flex-col gap-4">
          <div className="card aspect-square flex items-center justify-center overflow-hidden bg-gray-900">
            {!gifLoaded && !gifError && (
              <div className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
            )}
            {!gifError ? (
              <img
                src={gifUrl}
                alt={name}
                onLoad={() => setGifLoaded(true)}
                onError={() => setGifError(true)}
                className={`w-full h-full object-contain transition-opacity duration-300 ${gifLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <span className="text-5xl">🏋️</span>
                <span className="text-sm">GIF no disponible</span>
              </div>
            )}
          </div>

          {/* Meta tags */}
          <div className="space-y-3">
            <TagRow label="Parte del cuerpo" items={bodyParts} />
            <TagRow label="Músculo objetivo" items={targetMuscles} variant="green" />
            {secondaryMuscles?.length > 0 && (
              <TagRow label="Músculos secundarios" items={secondaryMuscles} />
            )}
            <TagRow label="Equipamiento" items={equipments} />
          </div>

          {/* Attribution */}
          <p className="text-xs text-gray-600">
            Datos por{' '}
            <a href="https://ascendapi.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              AscendAPI / ExerciseDB
            </a>
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white capitalize mb-6">{name}</h1>

          {instructions?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-brand-400 mb-4">Instrucciones</h2>
              <ol className="space-y-3">
                {instructions.map((step, i) => {
                  const text = step.replace(/^Step:\d+\s*/i, '')
                  return (
                    <li key={i} className="flex gap-4">
                      <span className="flex-none w-7 h-7 rounded-full bg-brand-900 border border-brand-700 text-brand-300 text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-gray-300 text-sm leading-relaxed pt-0.5">{text}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function TagRow({ label, items, variant }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className={variant === 'green' ? 'badge badge-green capitalize' : 'badge capitalize'}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

TagRow.propTypes = {
  label:   PropTypes.string.isRequired,
  items:   PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
}

TagRow.defaultProps = {
  variant: '',
}
