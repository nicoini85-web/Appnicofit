const BASE_URL = 'https://oss.exercisedb.dev/api/v1'

async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`ExerciseDB API error: ${res.status}`)
  }
  return res.json()
}

/**
 * Fetch a paginated list of exercises.
 * @param {Object} opts
 * @param {number} opts.limit  - max items per page (default 20)
 * @param {string} opts.cursor - pagination cursor
 */
export async function getExercises({ limit = 20, cursor } = {}) {
  const params = new URLSearchParams({ limit })
  if (cursor) params.set('cursor', cursor)
  const json = await apiFetch(`/exercises?${params}`)
  return json // { success, meta: { total, hasNextPage, nextCursor, ... }, data: [...] }
}

/**
 * Get a single exercise by its ID.
 * @param {string} id
 */
export async function getExerciseById(id) {
  const json = await apiFetch(`/exercises/${id}`)
  return json.data
}

/**
 * Derive unique lists of body-parts, equipment and target muscles
 * from the first page of exercises (used for filter chips).
 * We load a larger page once and cache the result.
 */
let _metaCache = null

export async function getFilterOptions() {
  if (_metaCache) return _metaCache

  // Load 100 exercises to get a representative set of filter values
  const json = await apiFetch('/exercises?limit=100')
  const exercises = json.data ?? []

  const bodyParts = [...new Set(exercises.flatMap((e) => e.bodyParts))].sort()
  const equipments = [...new Set(exercises.flatMap((e) => e.equipments))].sort()
  const targetMuscles = [...new Set(exercises.flatMap((e) => e.targetMuscles))].sort()

  _metaCache = { bodyParts, equipments, targetMuscles }
  return _metaCache
}
