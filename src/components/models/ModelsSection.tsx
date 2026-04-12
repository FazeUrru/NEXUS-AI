import { useState } from 'react'
import { Brain } from 'lucide-react'
import { aiModels } from '../../data/aiModels'

export function ModelsSection() {
  const [selectedType, setSelectedType] = useState<string>('Todos')
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const types = ['Todos', ...Array.from(new Set(aiModels.map(m => m.type)))]
  const filtered = aiModels
    .filter(m => selectedType === 'Todos' || m.type === selectedType)
    .filter(m => selectedTier === 'all' || m.tier === selectedTier)
  
  const tierColors: Record<string, string> = {
    free: 'bg-green-500/10 text-green-400 border-green-500/20',
    standard: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    premium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }
  
  const tierLabels: Record<string, string> = {
    free: 'Gratis',
    standard: 'Estándar',
    premium: 'Premium',
  }
  
  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-sm mb-4">
            <Brain className="w-4 h-4" />
            <span>51 Modelos IA</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Modelos de Inteligencia Artificial</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Accede a los 51 mejores modelos de IA del mundo, desde texto hasta video y audio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === t
                    ? 'bg-fuchsia-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {(['all', 'free', 'standard', 'premium'] as const).map(t => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTier === t
                    ? 'bg-violet-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {t === 'all' ? 'Todos' : tierLabels[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => (
            <div
              key={m.id}
              className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-fuchsia-500/5 hover:border-fuchsia-500/20 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{m.name}</h3>
                  <p className="text-gray-500 text-xs">{m.provider}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${tierColors[m.tier]}`}>
                  {tierLabels[m.tier]}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{m.desc}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-full">
                  {m.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Mostrando {filtered.length} de 51 modelos
        </div>
      </div>
    </section>
  )
}
