import { useState } from 'react'
import { User } from 'lucide-react'
import { profileCategories } from '../../data/profileCategories'

export function ProfileSettingsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [settings, setSettings] = useState(profileCategories)
  
  const updateSetting = (catIdx: number, settingId: number, newValue: string | boolean | number) => {
    setSettings(prev => prev.map((cat, ci) => {
      if (ci !== catIdx) return cat
      return {
        ...cat,
        settings: cat.settings.map(s => s.id === settingId ? { ...s, value: newValue } : s)
      }
    }))
  }
  
  const currentCat = settings[activeCategory]
  
  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-4">
            <User className="w-4 h-4" />
            <span>25 Ajustes de Perfil &middot; 5 Categorías</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Ajustes de Perfil</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Personaliza tu experiencia con 25 ajustes organizados en 5 categorías.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 space-y-1">
              {settings.map((cat, i) => {
                const CatIcon = cat.icon
                return (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === i
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CatIcon className="w-4 h-4" />
                    <span>{cat.name}</span>
                    <span className="ml-auto text-xs text-gray-600">{cat.settings.length}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                {(() => { const CatIcon = currentCat.icon; return <CatIcon className="w-5 h-5 text-emerald-400" /> })()}
                {currentCat.name}
              </h3>
              <div className="space-y-5">
                {currentCat.settings.map(setting => (
                  <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/5 last:border-0 last:pb-0">
                    <div>
                      <p className="text-white font-medium text-sm">{setting.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{setting.desc}</p>
                    </div>
                    <div className="shrink-0">
                      {setting.type === 'toggle' && (
                        <button
                          onClick={() => updateSetting(activeCategory, setting.id, !setting.value)}
                          className={`relative w-12 h-6 rounded-full transition-all ${
                            setting.value ? 'bg-emerald-500' : 'bg-gray-700'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow ${
                              setting.value ? 'left-6' : 'left-0.5'
                            }`}
                          />
                        </button>
                      )}
                      {setting.type === 'select' && (
                        <select
                          value={setting.value as string}
                          onChange={e => updateSetting(activeCategory, setting.id, e.target.value)}
                          className="bg-gray-800 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                        >
                          {setting.options?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      )}
                      {setting.type === 'input' && (
                        <input
                          type="text"
                          value={setting.value as string}
                          onChange={e => updateSetting(activeCategory, setting.id, e.target.value)}
                          className="bg-gray-800 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 w-48 focus:outline-none focus:border-emerald-500"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
