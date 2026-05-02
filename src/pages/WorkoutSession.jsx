import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkoutQueue } from '../context/WorkoutContext'
import { useSessionTimer } from '../hooks/useSessionTimer'

export default function WorkoutSession() {
  const { queue, clearQueue } = useWorkoutQueue()
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted]       = useState([])
  const [gifLoaded, setGifLoaded]       = useState(false)
  const [gifError, setGifError]         = useState(false)
  const [finished, setFinished]         = useState(false)

  const timer = useSessionTimer(true)

  // If no exercises queued, redirect to builder
  useEffect(() => {
    if (queue.length === 0) navigate('/workout')
  }, [queue, navigate])

  const exercise = queue[currentIndex]

  // Reset GIF state when exercise changes
  useEffect(() => {
    setGifLoaded(false)
    setGifError(false)
  }, [currentIndex])

  function markDone() {
    setCompleted((prev) => [...prev, exercise.exerciseId])
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      timer.pause()
      setFinished(true)
    }
  }

  function goNext() {
    if (currentIndex < queue.length - 1) setCurrentIndex((i) => i + 1)
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  function handleFinishEarly() {
    timer.pause()
    setFinished(true)
  }

  function handleRestart() {
    setCurrentIndex(0)
    setCompleted([])
    setFinished(false)
    timer.reset()
    timer.start()
  }

  function handleExit() {
    clearQueue()
    navigate('/')
  }

  if (!exercise) return null

  // ── Finished screen ──────────────────────────────────────────────────────────
  if (finished) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-7xl">🏆</div>
          <h1 className="text-3xl font-extrabold text-white">
            ¡Entrenamiento <span className="text-brand-400">completado!</span>
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Tiempo" value={timer.formatted} />
            <Stat label="Ejercicios" value={`${completed.length}/${queue.length}`} />
            <Stat label="Completados" value={`${Math.round((completed.length / queue.length) * 100)}%`} />
          </div>
          <div className="space-y-3">
            {queue.map((ex, i) => (
              <div
                key={ex.exerciseId}
                className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${
                  completed.includes(ex.exerciseId)
                    ? 'bg-brand-950 border-brand-800 text-brand-300'
                    : 'bg-gray-900 border-gray-800 text-gray-500'
                }`}
              >
                <span className="font-bold text-xs w-5 text-center">{i + 1}</span>
                {completed.includes(ex.exerciseId) ? (
                  <svg className="w-4 h-4 text-brand-400 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="w-4 h-4 rounded-full border border-gray-600 flex-none" />
                )}
                <span className="capitalize truncate">{ex.name}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={handleRestart} className="btn-ghost flex-1">Repetir</button>
            <button onClick={handleExit} className="btn-primary flex-1">Finalizar</button>
          </div>
        </div>
      </main>
    )
  }

  // ── Session screen ────────────────────────────────────────────────────────────
  const progressPct = Math.round((completed.length / queue.length) * 100)

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Top bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {/* Progress */}
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>{completed.length}/{queue.length} ejercicios</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-white tabular-nums">{timer.formatted}</span>
            <button
              onClick={timer.toggle}
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              title={timer.running ? 'Pausar' : 'Reanudar'}
            >
              {timer.running ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Exit */}
          <button
            onClick={handleFinishEarly}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors"
          >
            Terminar
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl space-y-6">

          {/* Exercise counter */}
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1">
              Ejercicio {currentIndex + 1} de {queue.length}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white capitalize">
              {exercise.name}
            </h1>
          </div>

          {/* GIF card */}
          <div className="relative mx-auto w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl shadow-black/40">
            {!gifLoaded && !gifError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
              </div>
            )}
            {!gifError ? (
              <img
                key={exercise.exerciseId}
                src={exercise.gifUrl}
                alt={exercise.name}
                onLoad={() => setGifLoaded(true)}
                onError={() => setGifError(true)}
                className={`w-full h-full object-contain transition-opacity duration-300 ${gifLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-500">
                <span className="text-6xl">🏋️</span>
                <span className="text-sm">GIF no disponible</span>
              </div>
            )}

            {/* Completed badge */}
            {completed.includes(exercise.exerciseId) && (
              <div className="absolute inset-0 bg-brand-950/80 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-brand-300">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-bold text-lg">Completado</span>
                </div>
              </div>
            )}
          </div>

          {/* Muscle / Equipment badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {exercise.targetMuscles.map((m) => (
              <span key={m} className="badge badge-green capitalize">{m}</span>
            ))}
            {exercise.bodyParts.map((bp) => (
              <span key={bp} className="badge capitalize">{bp}</span>
            ))}
            {exercise.equipments.map((eq) => (
              <span key={eq} className="badge capitalize">{eq}</span>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="btn-ghost px-5 disabled:opacity-30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={markDone}
              className="btn-primary px-8 py-3 text-base"
            >
              {completed.includes(exercise.exerciseId)
                ? 'Siguiente'
                : currentIndex === queue.length - 1
                  ? 'Finalizar'
                  : 'Listo ✓'}
            </button>

            <button
              onClick={goNext}
              disabled={currentIndex === queue.length - 1}
              className="btn-ghost px-5 disabled:opacity-30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Exercise list strip */}
          <div className="flex gap-2 justify-center flex-wrap">
            {queue.map((ex, i) => (
              <button
                key={ex.exerciseId}
                onClick={() => setCurrentIndex(i)}
                title={ex.name}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  i === currentIndex
                    ? 'bg-brand-600 text-white scale-110 shadow-lg shadow-brand-900/50'
                    : completed.includes(ex.exerciseId)
                      ? 'bg-brand-900 text-brand-400 border border-brand-700'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
      <p className="text-2xl font-extrabold text-brand-400">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  )
}

Stat.propTypes = {
  label: (props, propName) => {
    if (typeof props[propName] !== 'string') return new Error('Expected string')
    return null
  },
  value: (props, propName) => {
    if (typeof props[propName] !== 'string' && typeof props[propName] !== 'number')
      return new Error('Expected string or number')
    return null
  },
}
