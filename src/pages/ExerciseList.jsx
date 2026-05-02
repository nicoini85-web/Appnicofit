import { useState } from 'react'
import ExerciseCard from '../components/ExerciseCard'
import FilterBar from '../components/FilterBar'
import LoadMore from '../components/LoadMore'
import { useExercises } from '../hooks/useExercises'

export default function ExerciseList() {
  const [search, setSearch]       = useState('')
  const [bodyPart, setBodyPart]   = useState('')
  const [equipment, setEquipment] = useState('')

  const { exercises, allLoaded, loading, error, hasMore, loadMore } =
    useExercises({ search, bodyPart, equipment })

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Biblioteca de <span className="text-brand-400">Ejercicios</span>
        </h1>
        <p className="text-gray-400 text-sm">
          1,500+ ejercicios con animaciones GIF • Músculos • Instrucciones •{' '}
          <a
            href="https://ascendapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:underline"
          >
            Datos por AscendAPI
          </a>
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar filters */}
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

        {/* Results */}
        <section>
          {/* Stats bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">
              {exercises.length > 0
                ? `${exercises.length} resultado${exercises.length !== 1 ? 's' : ''}${allLoaded < 1500 ? ` (${allLoaded} cargados de 1,500)` : ''}`
                : loading ? 'Cargando…' : ''}
            </p>
            {(search || bodyPart || equipment) && (
              <button
                onClick={() => { setSearch(''); setBodyPart(''); setEquipment('') }}
                className="text-xs text-brand-400 hover:text-brand-300 underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-950 border border-red-800 rounded-xl p-4 mb-6 text-red-300 text-sm">
              Error al cargar ejercicios: {error}
            </div>
          )}

          {/* Grid */}
          {exercises.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {exercises.map((ex) => (
                <ExerciseCard key={ex.exerciseId} exercise={ex} />
              ))}
            </div>
          ) : !loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-3">
              <span className="text-5xl">🔍</span>
              <p className="text-sm">No se encontraron ejercicios con esos filtros.</p>
              <button
                onClick={() => { setSearch(''); setBodyPart(''); setEquipment('') }}
                className="btn-ghost text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          ) : null}

          {/* Infinite scroll trigger */}
          <LoadMore onIntersect={loadMore} hasMore={hasMore} loading={loading} />
        </section>
      </div>
    </main>
  )
}
