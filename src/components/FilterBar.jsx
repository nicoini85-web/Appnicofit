import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getFilterOptions } from '../services/exercisedb'

const BODY_PARTS = [
  'back', 'cardio', 'chest', 'lower arms', 'lower legs',
  'neck', 'shoulders', 'upper arms', 'upper legs', 'waist',
]

const EQUIPMENT = [
  'assisted', 'band', 'barbell', 'body weight', 'bosu ball',
  'cable', 'dumbbell', 'elliptical machine', 'ez barbell',
  'hammer', 'kettlebell', 'leverage machine', 'medicine ball',
  'olympic barbell', 'resistance band', 'roller', 'rope',
  'skierg machine', 'sled machine', 'smith machine',
  'stability ball', 'stationary bike', 'stepmill machine',
  'tire', 'trap bar', 'upper body ergometer', 'weighted',
  'wheel roller',
]

export default function FilterBar({ search, onSearch, bodyPart, onBodyPart, equipment, onEquipment }) {
  const [dynamicBodyParts, setDynamicBodyParts] = useState(BODY_PARTS)
  const [dynamicEquipment, setDynamicEquipment] = useState(EQUIPMENT)

  useEffect(() => {
    getFilterOptions()
      .then(({ bodyParts, equipments }) => {
        if (bodyParts.length) setDynamicBodyParts(bodyParts)
        if (equipments.length) setDynamicEquipment(equipments)
      })
      .catch(() => {/* fallback to static lists */})
  }, [])

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar ejercicio..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Body-part chips */}
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Parte del cuerpo</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onBodyPart('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              bodyPart === '' ? 'bg-brand-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Todos
          </button>
          {dynamicBodyParts.map((bp) => (
            <button
              key={bp}
              onClick={() => onBodyPart(bp === bodyPart ? '' : bp)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                bodyPart === bp ? 'bg-brand-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {bp}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment select */}
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Equipamiento</p>
        <select
          value={equipment}
          onChange={(e) => onEquipment(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors capitalize"
        >
          <option value="">Cualquier equipamiento</option>
          {dynamicEquipment.map((eq) => (
            <option key={eq} value={eq} className="capitalize">{eq}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

FilterBar.propTypes = {
  search:      PropTypes.string.isRequired,
  onSearch:    PropTypes.func.isRequired,
  bodyPart:    PropTypes.string.isRequired,
  onBodyPart:  PropTypes.func.isRequired,
  equipment:   PropTypes.string.isRequired,
  onEquipment: PropTypes.func.isRequired,
}
