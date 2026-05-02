import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { EJERCICIOS, GRUPOS } from '../data/ejercicios'
import AnimatedExercise from '../components/AnimatedExercise'

export default function MisDiccionario() {
  const [grupoActivo, setGrupoActivo] = useState(GRUPOS[0])
  const [busqueda, setBusqueda]       = useState('')
  const [detalleIdx, setDetalleIdx]   = useState(null) // index in ejerciciosFiltrados

  const ejerciciosFiltrados = EJERCICIOS.filter(ej => {
    if (busqueda) return ej.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return ej.grupo === grupoActivo
  })

  const cerrar = useCallback(() => setDetalleIdx(null), [])

  // Close with hardware back / Escape
  useEffect(() => {
    if (detalleIdx === null) return
    const handler = (e) => { if (e.key === 'Escape') cerrar() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [detalleIdx, cerrar])

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Diccionario de <span className="text-brand-400">Ejercicios</span>
          </h1>
          <p className="text-gray-400 text-sm">
            {EJERCICIOS.length} ejercicios · tocá cualquiera para ver el detalle
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            value={busqueda}
            onChange={e => { setBusqueda(e.target.value); setDetalleIdx(null) }}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
            >
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
                onClick={() => { setGrupoActivo(g); setDetalleIdx(null) }}
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

        {/* No results */}
        {ejerciciosFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-sm">No se encontraron ejercicios.</p>
            <button onClick={() => setBusqueda('')} className="btn-ghost text-sm">Limpiar búsqueda</button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ejerciciosFiltrados.map((ej, idx) => (
            <EjercicioCard
              key={ej.id}
              ejercicio={ej}
              onClick={() => setDetalleIdx(idx)}
            />
          ))}
        </div>
      </main>

      {/* Detail modal — rendered outside main, at root level */}
      {detalleIdx !== null && ejerciciosFiltrados[detalleIdx] && (
        <DetalleModal
          ejercicio={ejerciciosFiltrados[detalleIdx]}
          indice={detalleIdx}
          total={ejerciciosFiltrados.length}
          onClose={cerrar}
          onPrev={() => setDetalleIdx(i => Math.max(0, i - 1))}
          onNext={() => setDetalleIdx(i => Math.min(ejerciciosFiltrados.length - 1, i + 1))}
        />
      )}
    </>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────

function EjercicioCard({ ejercicio, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      className="card flex flex-col cursor-pointer active:scale-95 transition-transform duration-100"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <AnimatedExercise
        frames={ejercicio.frames}
        alt={ejercicio.nombre}
        className="aspect-square rounded-t-2xl"
        fps={1.5}
      />
      <div className="p-2.5 flex flex-col gap-1">
        <p className="text-xs font-semibold text-white leading-tight">{ejercicio.nombre}</p>
        <span className="badge text-xs w-fit">{ejercicio.equipamiento}</span>
      </div>
    </div>
  )
}

EjercicioCard.propTypes = {
  ejercicio: PropTypes.shape({
    id:           PropTypes.string.isRequired,
    nombre:       PropTypes.string.isRequired,
    frames:       PropTypes.arrayOf(PropTypes.string).isRequired,
    equipamiento: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

// ── Detail Modal ──────────────────────────────────────────────────────────────

function DetalleModal({ ejercicio, indice, total, onClose, onPrev, onNext }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop — tap to close */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative z-10 w-full sm:max-w-lg bg-gray-900 rounded-t-3xl sm:rounded-2xl border border-gray-700 shadow-2xl">

        {/* Drag handle (visual only) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-600" />
        </div>

        {/* Animated image */}
        <div className="relative w-full" style={{ aspectRatio: '1/1', maxHeight: '55vw' }}>
          <AnimatedExercise
            frames={ejercicio.frames}
            alt={ejercicio.nombre}
            className="w-full h-full"
            fps={1.5}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-950/80 flex items-center justify-center text-gray-300 active:scale-90 transition-transform"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Group badge */}
          <div className="absolute top-3 left-3">
            <span className="badge badge-green text-xs">{ejercicio.grupo}</span>
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 bg-gray-950/70 rounded-full px-2.5 py-0.5 text-xs text-gray-300">
            {indice + 1} / {total}
          </div>
        </div>

        {/* Info */}
        <div className="px-5 pt-4 pb-5 space-y-4">
          <h2 className="text-xl font-extrabold text-white">{ejercicio.nombre}</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Equipamiento</p>
              <p className="text-sm text-white">{ejercicio.equipamiento}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Músculos</p>
              <div className="flex flex-wrap gap-1">
                {ejercicio.musculos.map(m => (
                  <span key={m} className="badge badge-green text-xs">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="flex gap-3">
            <button
              onClick={onPrev}
              disabled={indice === 0}
              className="btn-ghost flex-1 flex items-center justify-center gap-1.5 disabled:opacity-30 py-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>
            <button
              onClick={onNext}
              disabled={indice === total - 1}
              className="btn-ghost flex-1 flex items-center justify-center gap-1.5 disabled:opacity-30 py-3"
            >
              Siguiente
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

DetalleModal.propTypes = {
  ejercicio: PropTypes.object.isRequired,
  indice:    PropTypes.number.isRequired,
  total:     PropTypes.number.isRequired,
  onClose:   PropTypes.func.isRequired,
  onPrev:    PropTypes.func.isRequired,
  onNext:    PropTypes.func.isRequired,
}
