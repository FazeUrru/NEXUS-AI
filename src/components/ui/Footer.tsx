import { Brain } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Nexus AI</span>
            </div>
            <p className="text-gray-500 text-sm">
              La plataforma de IA más completa y avanzada del mundo.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Producto</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="hover:text-gray-300 cursor-pointer">Funcionalidades</li>
              <li className="hover:text-gray-300 cursor-pointer">Modelos IA</li>
              <li className="hover:text-gray-300 cursor-pointer">Precios</li>
              <li className="hover:text-gray-300 cursor-pointer">API</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Empresa</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="hover:text-gray-300 cursor-pointer">Sobre nosotros</li>
              <li className="hover:text-gray-300 cursor-pointer">Blog</li>
              <li className="hover:text-gray-300 cursor-pointer">Contacto</li>
              <li className="hover:text-gray-300 cursor-pointer">Empleo</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="hover:text-gray-300 cursor-pointer">Privacidad</li>
              <li className="hover:text-gray-300 cursor-pointer">Términos</li>
              <li className="hover:text-gray-300 cursor-pointer">Cookies</li>
              <li className="hover:text-gray-300 cursor-pointer">Licencias</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-gray-600 text-sm">
          &copy; 2026 Nexus AI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
