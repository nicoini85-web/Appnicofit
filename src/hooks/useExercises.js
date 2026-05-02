import { useState, useEffect, useCallback, useRef } from 'react'
import { getExercises } from '../services/exercisedb'

const PAGE_SIZE = 24

/**
 * Fetches a paginated list of exercises.  Supports infinite scroll: call
 * `loadMore()` to append the next page.  `search` and `bodyPart` are applied
 * client-side because the free V1 API only supports cursor pagination.
 */
export function useExercises({ search = '', bodyPart = '', equipment = '' } = {}) {
  const [allData, setAllData]     = useState([])
  const [cursor, setCursor]       = useState(null)
  const [hasMore, setHasMore]     = useState(true)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const loadingRef                = useRef(false)

  // Reset whenever filters change
  useEffect(() => {
    setAllData([])
    setCursor(null)
    setHasMore(true)
  }, [search, bodyPart, equipment])

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const json = await getExercises({ limit: PAGE_SIZE, cursor })
      const items = json.data ?? []
      setAllData((prev) => {
        const ids = new Set(prev.map((e) => e.exerciseId))
        return [...prev, ...items.filter((e) => !ids.has(e.exerciseId))]
      })
      setCursor(json.meta?.nextCursor ?? null)
      setHasMore(json.meta?.hasNextPage ?? false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [cursor, hasMore])

  // Initial load
  useEffect(() => {
    if (allData.length === 0 && hasMore) {
      loadMore()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, bodyPart, equipment])

  // Client-side filtering
  const filtered = allData.filter((ex) => {
    const matchSearch = !search || ex.name.toLowerCase().includes(search.toLowerCase())
    const matchBodyPart = !bodyPart || ex.bodyParts.includes(bodyPart)
    const matchEquipment = !equipment || ex.equipments.includes(equipment)
    return matchSearch && matchBodyPart && matchEquipment
  })

  return { exercises: filtered, allLoaded: allData.length, loading, error, hasMore, loadMore }
}
