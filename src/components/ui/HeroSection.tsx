import { Sparkles, Rocket, Eye, Zap, Brain, RefreshCw, Settings } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-gray-950 to-gray-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Plataforma IA Multimodal de Nueva Generación</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
            Nexus AI
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
          La plataforma de inteligencia artificial más completa del mundo.
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          39 funcionalidades avanzadas, 51 modelos IA y actualizaciones automáticas para una experiencia sin límites.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25">
            <Rocket className="w-5 h-5" />
            Comenzar Gratis
          </button>
          <button className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2">
            <Eye className="w-5 h-5" />
            Ver Demo
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { num: '39', label: 'Funcionalidades', icon: Zap },
            { num: '51', label: 'Modelos IA', icon: Brain },
            { num: '3', label: 'Auto-Updates', icon: RefreshCw },
            { num: '55', label: 'Ajustes Total', icon: Settings },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <s.icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{s.num}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
