import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ExerciseList from './pages/ExerciseList'
import ExerciseDetail from './pages/ExerciseDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<ExerciseList />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
    </div>
  )
}
