import { useState } from 'react'
import PropTypes from 'prop-types'
import { EJERCICIOS, GRUPOS } from '../data/ejercicios'

export default function MisDiccionario() {
  const [grupoActivo, setGrupoActivo] = useState(GRUPOS[0])
  const [busqueda, setBusqueda]       = useState('')

  const ejerciciosFiltrados = EJERCICIOS.filter(ej => {
    if (busqueda) return ej.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return ej.grupo === grupoActivo
  })

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Diccionario de <span className="text-brand-400">Ejercicios</span>
        </h1>
        <p className="text-gray-400 text-sm">
          {EJERCICIOS.length} ejercicios organizados por grupo muscular
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
          onChange={e => setBusqueda(e.target.value)}
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

      {/* Group tabs — only visible when not searching */}
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
        {ejerciciosFiltrados.map(ej => (
          <EjercicioCard key={ej.id} ejercicio={ej} />
        ))}
      </div>
    </main>
  )
}

function EjercicioCard({ ejercicio }) {
  const [imgError, setImgError]   = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="card flex flex-col">
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
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-white leading-tight">
          {ejercicio.nombre}
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="badge text-xs">{ejercicio.equipamiento}</span>
        </div>
      </div>
    </div>
  )
}

EjercicioCard.propTypes = {
  ejercicio: PropTypes.shape({
    id:           PropTypes.string.isRequired,
    nombre:       PropTypes.string.isRequired,
    grupo:        PropTypes.string.isRequired,
    imgUrl:       PropTypes.string.isRequired,
    equipamiento: PropTypes.string.isRequired,
  }).isRequired,
}
