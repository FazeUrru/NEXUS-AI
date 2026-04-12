import { useState } from 'react'
import { RefreshCw, Zap, Brain, Settings, ChevronDown, ChevronRight, Check } from 'lucide-react'
import { autoUpdates } from '../../data/autoUpdates'

export function UpdatesSection() {
  const [expandedUpdate, setExpandedUpdate] = useState<number | null>(1)
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-4">
            <RefreshCw className="w-4 h-4" />
            <span>3 Actualizaciones Automáticas</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Actualizaciones Automáticas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Nexus AI se mejora constantemente con actualizaciones automáticas para funciones, modelos y ajustes.
          </p>
        </div>

        <div className="space-y-4">
          {autoUpdates.map(update => (
            <div
              key={update.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all"
            >
              <button
                className="w-full p-6 flex items-center justify-between text-left"
                onClick={() => setExpandedUpdate(expandedUpdate === update.id ? null : update.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    {update.id === 1 && <Zap className="w-6 h-6 text-blue-400" />}
                    {update.id === 2 && <Brain className="w-6 h-6 text-fuchsia-400" />}
                    {update.id === 3 && <Settings className="w-6 h-6 text-violet-400" />}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{update.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{update.version}</span>
                      <span className="text-xs text-gray-500">{update.date}</span>
                    </div>
                  </div>
                </div>
                {expandedUpdate === update.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedUpdate === update.id && (
                <div className="px-6 pb-6 border-t border-white/5 pt-4">
                  <p className="text-gray-400 mb-4">{update.desc}</p>
                  <ul className="space-y-2">
                    {update.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                        <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
