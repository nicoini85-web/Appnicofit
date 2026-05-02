import { Routes, Route } from 'react-router-dom'
import { WorkoutProvider } from './context/WorkoutContext'
import Navbar from './components/Navbar'
import ExerciseList from './pages/ExerciseList'
import ExerciseDetail from './pages/ExerciseDetail'
import WorkoutBuilder from './pages/WorkoutBuilder'
import WorkoutSession from './pages/WorkoutSession'
import MisDiccionario from './pages/MisDiccionario'

export default function App() {
  return (
    <WorkoutProvider>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <Routes>
          <Route path="/"                  element={<MisDiccionario />} />
          <Route path="/biblioteca"        element={<ExerciseList />} />
          <Route path="/exercise/:id"      element={<ExerciseDetail />} />
          <Route path="/workout"           element={<WorkoutBuilder />} />
          <Route path="/workout/session"   element={<WorkoutSession />} />
        </Routes>
      </div>
    </WorkoutProvider>
  )
}
