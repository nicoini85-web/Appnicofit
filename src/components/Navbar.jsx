import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
          <span className="text-2xl">💪</span>
          <span className="text-white">Appnico<span className="text-brand-400">fit</span></span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Link
            to="/"
            className={`px-4 py-2 rounded-xl transition-colors ${
              pathname === '/' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Ejercicios
          </Link>
        </div>
      </nav>
    </header>
  )
}
