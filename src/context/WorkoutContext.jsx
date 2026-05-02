import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const WorkoutContext = createContext(null)

export function WorkoutProvider({ children }) {
  // List of exercise objects selected by the user
  const [queue, setQueue] = useState([])

  const addExercise = useCallback((exercise) => {
    setQueue((prev) => {
      if (prev.find((e) => e.exerciseId === exercise.exerciseId)) return prev
      return [...prev, exercise]
    })
  }, [])

  const removeExercise = useCallback((exerciseId) => {
    setQueue((prev) => prev.filter((e) => e.exerciseId !== exerciseId))
  }, [])

  const clearQueue = useCallback(() => setQueue([]), [])

  const moveUp = useCallback((exerciseId) => {
    setQueue((prev) => {
      const idx = prev.findIndex((e) => e.exerciseId === exerciseId)
      if (idx <= 0) return prev
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return next
    })
  }, [])

  const moveDown = useCallback((exerciseId) => {
    setQueue((prev) => {
      const idx = prev.findIndex((e) => e.exerciseId === exerciseId)
      if (idx === -1 || idx >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
      return next
    })
  }, [])

  return (
    <WorkoutContext.Provider value={{ queue, addExercise, removeExercise, clearQueue, moveUp, moveDown }}>
      {children}
    </WorkoutContext.Provider>
  )
}

WorkoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Exported separately so react-refresh can handle this file correctly.
// eslint-disable-next-line react-refresh/only-export-components
export function useWorkoutQueue() {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkoutQueue must be used inside WorkoutProvider')
  return ctx
}
