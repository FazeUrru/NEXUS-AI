import { useState } from 'react'
import { Zap } from 'lucide-react'
import { functionalities } from '../../data/functionalities'

export function FeaturesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')
  const categories = ['Todas', ...Array.from(new Set(functionalities.map(f => f.category)))]
  const filtered = selectedCategory === 'Todas' ? functionalities : functionalities.filter(f => f.category === selectedCategory)
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-4">
            <Zap className="w-4 h-4" />
            <span>39 Funcionalidades</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades Avanzadas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Desde generación de contenido hasta análisis de datos, Nexus AI cubre todas tus necesidades.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === c
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(f => {
            const Icon = f.icon
            return (
              <div
                key={f.id}
                className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-violet-500/10 hover:border-violet-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 transition-all shrink-0">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{f.name}</h3>
                    <p className="text-gray-400 text-sm">{f.desc}</p>
                    <span className="inline-block mt-2 text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                      {f.category}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
