import { useState } from 'react'
import { Brain, X, Menu } from 'lucide-react'

interface NavbarProps {
  activeSection: string
  setActiveSection: (s: string) => void
}

export function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sections = [
    { id: 'home', label: 'Inicio' },
    { id: 'features', label: 'Funcionalidades' },
    { id: 'models', label: 'Modelos IA' },
    { id: 'updates', label: 'Actualizaciones' },
    { id: 'profile-settings', label: 'Perfil' },
    { id: 'advanced-settings', label: 'Avanzado' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-violet-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Nexus AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-violet-500/20">
          <div className="px-4 py-3 space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setMobileMenuOpen(false) }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
