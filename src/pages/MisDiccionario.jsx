import { useState } from 'react'
import { useWorkoutQueue } from '../context/WorkoutContext'
import { EJERCICIOS, GRUPOS } from '../data/ejercicios'

export default function MisDiccionario() {
  const [grupoActivo, setGrupoActivo] = useState(GRUPOS[0])
  const [busqueda, setBusqueda]       = useState('')
  const { addExercise, removeExercise, queue } = useWorkoutQueue()

  const inQueue = (id) => queue.some((e) => e.exerciseId === id)

  function toggleQueue(ej) {
    if (inQueue(ej.id)) {
      removeExercise(ej.id)
    } else {
      addExercise({
        exerciseId:    ej.id,
        name:          ej.nombre,
        gifUrl:        ej.imgUrl,
        bodyParts:     [ej.grupo.toLowerCase()],
        equipments:    [ej.equipamiento.toLowerCase()],
        targetMuscles: ej.musculos.map(m => m.toLowerCase()),
        instructions:  [],
      })
    }
  }

  const ejerciciosFiltrados = EJERCICIOS.filter(ej => {
    const matchGrupo    = !busqueda && ej.grupo === grupoActivo
    const matchBusqueda = busqueda  && ej.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return matchGrupo || matchBusqueda
  })

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Mi <span className="text-brand-400">Diccionario</span>
        </h1>
        <p className="text-gray-400 text-sm">
          130 ejercicios organizados por grupo muscular · con imagen de referencia
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar en todos los grupos..."
          value={busqueda}
          onChange={e => { setBusqueda(e.target.value) }}
          className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
        />
        {busqueda && (
          <button onClick={() => setBusqueda('')} className="absolute inset-y-0 left-64 ml-10 pr-4 flex items-center text-gray-500 hover:text-gray-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Group tabs */}
      {!busqueda && (
        <div className="flex flex-wrap gap-2 mb-8">
          {GRUPOS.map(g => (
            <button
              key={g}
              onClick={() => setGrupoActivo(g)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                grupoActivo === g
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {g}
              <span className="ml-1.5 text-xs opacity-60">
                ({EJERCICIOS.filter(e => e.grupo === g).length})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Exercise grid */}
      {busqueda && ejerciciosFiltrados.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
          <span className="text-5xl">🔍</span>
          <p className="text-sm">No se encontraron ejercicios con ese nombre.</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {ejerciciosFiltrados.map(ej => (
          <EjercicioCard
            key={ej.id}
            ejercicio={ej}
            inQueue={inQueue(ej.id)}
            onToggle={() => toggleQueue(ej)}
          />
        ))}
      </div>
    </main>
  )
}

function EjercicioCard({ ejercicio, inQueue, onToggle }) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className={`card group flex flex-col hover:shadow-xl hover:shadow-brand-900/20 hover:-translate-y-0.5 transition-all duration-200 ${
      inQueue ? 'border-brand-600' : ''
    }`}>
      {/* Image */}
      <div className="relative aspect-square bg-gray-800 overflow-hidden">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
          </div>
        )}
        {!imgError ? (
          <img
            src={ejercicio.imgUrl}
            alt={ejercicio.nombre}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-1">
            <span className="text-3xl">🏋️</span>
          </div>
        )}

        {/* Add button */}
        <button
          onClick={onToggle}
          title={inQueue ? 'Quitar del entrenamiento' : 'Agregar al entrenamiento'}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-150 ${
            inQueue
              ? 'bg-brand-500 text-white opacity-100'
              : 'bg-gray-950/80 text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-brand-600 hover:text-white'
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
      <div className="p-2.5 flex-1 flex flex-col gap-1">
        <p className="text-xs font-semibold text-white leading-tight line-clamp-2 group-hover:text-brand-300 transition-colors">
          {ejercicio.nombre}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
          <span className="badge text-xs">{ejercicio.equipamiento}</span>
        </div>
      </div>
    </div>
  )
}

import PropTypes from 'prop-types'

EjercicioCard.propTypes = {
  ejercicio: PropTypes.shape({
    id:           PropTypes.string.isRequired,
    nombre:       PropTypes.string.isRequired,
    grupo:        PropTypes.string.isRequired,
    imgUrl:       PropTypes.string.isRequired,
    equipamiento: PropTypes.string.isRequired,
    musculos:     PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  inQueue:  PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}
