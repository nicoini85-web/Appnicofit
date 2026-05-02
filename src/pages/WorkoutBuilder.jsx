import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkoutQueue } from '../context/WorkoutContext'
import { useExercises } from '../hooks/useExercises'
import FilterBar from '../components/FilterBar'
import LoadMore from '../components/LoadMore'

export default function WorkoutBuilder() {
  const navigate = useNavigate()
  const { queue, addExercise, removeExercise, clearQueue, moveUp, moveDown } = useWorkoutQueue()

  const [search, setSearch]       = useState('')
  const [bodyPart, setBodyPart]   = useState('')
  const [equipment, setEquipment] = useState('')

  const { exercises, loading, error, hasMore, loadMore } =
    useExercises({ search, bodyPart, equipment })

  const inQueue = (id) => queue.some((e) => e.exerciseId === id)

  function handleStart() {
    if (queue.length === 0) return
    navigate('/workout/session')
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Arma tu <span className="text-brand-400">Entrenamiento</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Selecciona ejercicios de la biblioteca y comienza la sesión con GIFs animados.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr_320px] gap-8">
        {/* Filters */}
        <aside className="mb-6 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <FilterBar
              search={search}
              onSearch={setSearch}
              bodyPart={bodyPart}
              onBodyPart={setBodyPart}
              equipment={equipment}
              onEquipment={setEquipment}
            />
          </div>
        </aside>

        {/* Exercise picker */}
        <section>
          {error && (
            <div className="bg-red-950 border border-red-800 rounded-xl p-4 mb-4 text-red-300 text-sm">
              Error al cargar ejercicios: {error}
            </div>
          )}

          <div className="space-y-2">
            {exercises.map((ex) => (
              <ExercisePickerRow
                key={ex.exerciseId}
                exercise={ex}
                added={inQueue(ex.exerciseId)}
                onAdd={() => addExercise(ex)}
                onRemove={() => removeExercise(ex.exerciseId)}
              />
            ))}
          </div>

          {exercises.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-3">
              <span className="text-4xl">🔍</span>
              <p className="text-sm">No se encontraron ejercicios.</p>
            </div>
          )}

          <LoadMore onIntersect={loadMore} hasMore={hasMore} loading={loading} />
        </section>

        {/* Queue */}
        <aside className="mt-6 lg:mt-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white">
                Cola{' '}
                <span className="text-brand-400">({queue.length})</span>
              </h2>
              {queue.length > 0 && (
                <button
                  onClick={clearQueue}
                  className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>

            {queue.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center text-gray-500 text-sm">
                <span className="text-3xl block mb-2">➕</span>
                Agrega ejercicios desde la lista
              </div>
            ) : (
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {queue.map((ex, i) => (
                  <QueueItem
                    key={ex.exerciseId}
                    exercise={ex}
                    index={i}
                    total={queue.length}
                    onRemove={() => removeExercise(ex.exerciseId)}
                    onMoveUp={() => moveUp(ex.exerciseId)}
                    onMoveDown={() => moveDown(ex.exerciseId)}
                  />
                ))}
              </div>
            )}

            <button
              onClick={handleStart}
              disabled={queue.length === 0}
              className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Comenzar entrenamiento
            </button>
          </div>
        </aside>
      </div>
    </main>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ExercisePickerRow({ exercise, added, onAdd, onRemove }) {
  const { name, gifUrl, bodyParts, targetMuscles } = exercise
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
      added ? 'bg-brand-950 border-brand-800' : 'bg-gray-900 border-gray-800 hover:border-gray-700'
    }`}>
      <img
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="w-12 h-12 rounded-lg object-cover bg-gray-800 flex-none"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white capitalize truncate">{name}</p>
        <div className="flex gap-1 mt-0.5 flex-wrap">
          {bodyParts.slice(0, 2).map((bp) => (
            <span key={bp} className="badge text-xs capitalize">{bp}</span>
          ))}
          {targetMuscles.slice(0, 1).map((m) => (
            <span key={m} className="badge badge-green text-xs capitalize">{m}</span>
          ))}
        </div>
      </div>
      <button
        onClick={added ? onRemove : onAdd}
        className={`flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
          added
            ? 'bg-red-950 text-red-400 hover:bg-red-900 border border-red-800'
            : 'bg-brand-900 text-brand-300 hover:bg-brand-800 border border-brand-700'
        }`}
      >
        {added ? 'Quitar' : '+ Agregar'}
      </button>
    </div>
  )
}

import PropTypes from 'prop-types'

ExercisePickerRow.propTypes = {
  exercise: PropTypes.object.isRequired,
  added:    PropTypes.bool.isRequired,
  onAdd:    PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

function QueueItem({ exercise, index, total, onRemove, onMoveUp, onMoveDown }) {
  return (
    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl p-2">
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-10 h-10 rounded-lg object-cover bg-gray-800 flex-none"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-white capitalize truncate leading-tight">
          <span className="text-gray-500 mr-1">{index + 1}.</span>
          {exercise.name}
        </p>
      </div>
      <div className="flex items-center gap-1 flex-none">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-1 rounded text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-1 rounded text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button
          onClick={onRemove}
          className="p-1 rounded text-gray-500 hover:text-red-400 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

QueueItem.propTypes = {
  exercise:   PropTypes.object.isRequired,
  index:      PropTypes.number.isRequired,
  total:      PropTypes.number.isRequired,
  onRemove:   PropTypes.func.isRequired,
  onMoveUp:   PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
}
