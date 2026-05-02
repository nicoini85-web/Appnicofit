import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useWorkoutQueue } from '../context/WorkoutContext'

export default function ExerciseCard({ exercise }) {
  const [gifError, setGifError] = useState(false)
  const [gifLoaded, setGifLoaded] = useState(false)

  const { addExercise, removeExercise, queue } = useWorkoutQueue()
  const inQueue = queue.some((e) => e.exerciseId === exercise.exerciseId)

  const { exerciseId, name, gifUrl, bodyParts, equipments, targetMuscles } = exercise

  function handleQueueToggle(e) {
    e.preventDefault()
    e.stopPropagation()
    if (inQueue) {
      removeExercise(exerciseId)
    } else {
      addExercise(exercise)
    }
  }

  return (
    <Link to={`/exercise/${exerciseId}`} className="card group block hover:shadow-xl hover:shadow-brand-900/20 hover:-translate-y-0.5 transition-all duration-200">
      {/* GIF */}
      <div className="relative aspect-square bg-gray-800 overflow-hidden">
        {!gifLoaded && !gifError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
          </div>
        )}
        {!gifError ? (
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            onLoad={() => setGifLoaded(true)}
            onError={() => setGifError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${gifLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-2">
            <span className="text-4xl">🏋️</span>
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        {/* Muscle hover label */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-gray-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-brand-300 font-medium capitalize">{targetMuscles[0]}</span>
        </div>

        {/* Add to workout button */}
        <button
          onClick={handleQueueToggle}
          title={inQueue ? 'Quitar del entrenamiento' : 'Agregar al entrenamiento'}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100 ${
            inQueue
              ? 'bg-brand-500 text-white hover:bg-red-500'
              : 'bg-gray-950/80 text-gray-300 hover:bg-brand-600 hover:text-white'
          }`}
        >
          {inQueue ? (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm text-white leading-tight line-clamp-2 capitalize group-hover:text-brand-300 transition-colors">
          {name}
        </h3>
        <div className="flex flex-wrap gap-1">
          {bodyParts.map((bp) => (
            <span key={bp} className="badge capitalize">{bp}</span>
          ))}
          {equipments.slice(0, 1).map((eq) => (
            <span key={eq} className="badge badge-green capitalize">{eq}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    exerciseId:      PropTypes.string.isRequired,
    name:            PropTypes.string.isRequired,
    gifUrl:          PropTypes.string.isRequired,
    bodyParts:       PropTypes.arrayOf(PropTypes.string).isRequired,
    equipments:      PropTypes.arrayOf(PropTypes.string).isRequired,
    targetMuscles:   PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}
