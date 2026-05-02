import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MisDiccionario from './pages/MisDiccionario'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<MisDiccionario />} />
        <Route path="*"  element={<MisDiccionario />} />
      </Routes>
    </div>
  )
}
