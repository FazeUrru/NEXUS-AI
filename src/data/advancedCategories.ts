import { Brain, Cpu, Globe } from 'lucide-react'
import type { AdvancedCategory } from '../types'

export const advancedCategories: AdvancedCategory[] = [
  {
    name: 'Configuración de IA',
    icon: Brain,
    settings: [
      { id: 1, name: 'Temperatura', desc: 'Controla la creatividad de las respuestas (0 = preciso, 2 = creativo)', type: 'slider', value: 0.7, min: 0, max: 2, step: 0.1 },
      { id: 2, name: 'Máximo de tokens', desc: 'Límite máximo de tokens por respuesta', type: 'select', value: '4096', options: ['1024', '2048', '4096', '8192', '16384', '32768'] },
      { id: 3, name: 'Top P', desc: 'Nucleus sampling para diversidad de respuestas', type: 'slider', value: 0.9, min: 0, max: 1, step: 0.05 },
      { id: 4, name: 'Penalización de frecuencia', desc: 'Reduce repetición de palabras frecuentes', type: 'slider', value: 0, min: -2, max: 2, step: 0.1 },
      { id: 5, name: 'Penalización de presencia', desc: 'Fomenta la exploración de nuevos temas', type: 'slider', value: 0, min: -2, max: 2, step: 0.1 },
      { id: 6, name: 'Formato de respuesta', desc: 'Formato predeterminado de las respuestas', type: 'select', value: 'Texto', options: ['Texto', 'JSON', 'Markdown', 'HTML', 'XML'] },
      { id: 7, name: 'Streaming', desc: 'Mostrar respuestas en tiempo real token por token', type: 'toggle', value: true },
      { id: 8, name: 'Ventana de contexto', desc: 'Tamaño del contexto para conversaciones', type: 'select', value: '128K', options: ['4K', '8K', '16K', '32K', '64K', '128K', '200K'] },
      { id: 9, name: 'System prompt', desc: 'Instrucciones base para el comportamiento del modelo', type: 'input', value: 'Eres un asistente útil y preciso.' },
      { id: 10, name: 'Secuencias de parada', desc: 'Tokens que detienen la generación', type: 'input', value: '\\n\\n, [END], ###' },
    ]
  },
  {
    name: 'Rendimiento y Sistema',
    icon: Cpu,
    settings: [
      { id: 11, name: 'Caché de respuestas', desc: 'Almacenar respuestas para consultas repetidas', type: 'toggle', value: true },
      { id: 12, name: 'Aceleración GPU', desc: 'Utilizar GPU para procesamiento más rápido', type: 'toggle', value: true },
      { id: 13, name: 'Procesamiento por lotes', desc: 'Agrupar solicitudes para mayor eficiencia', type: 'toggle', value: false },
      { id: 14, name: 'Límite de velocidad', desc: 'Solicitudes máximas por minuto', type: 'select', value: '60', options: ['10', '30', '60', '120', 'Ilimitado'] },
      { id: 15, name: 'Timeout de solicitud', desc: 'Tiempo máximo de espera por respuesta', type: 'select', value: '30s', options: ['10s', '30s', '60s', '120s', '300s'] },
      { id: 16, name: 'Límite de memoria', desc: 'Memoria máxima asignada por sesión', type: 'select', value: '4 GB', options: ['1 GB', '2 GB', '4 GB', '8 GB', '16 GB'] },
      { id: 17, name: 'Nivel de logs', desc: 'Detalle de los registros del sistema', type: 'select', value: 'Info', options: ['Error', 'Warn', 'Info', 'Debug', 'Verbose'] },
      { id: 18, name: 'Autoguardado', desc: 'Intervalo de autoguardado de conversaciones', type: 'select', value: '5 min', options: ['1 min', '2 min', '5 min', '10 min', '30 min'] },
      { id: 19, name: 'Solicitudes concurrentes', desc: 'Número máximo de solicitudes simultáneas', type: 'select', value: '5', options: ['1', '3', '5', '10', '20'] },
      { id: 20, name: 'Compresión de datos', desc: 'Comprimir datos para reducir ancho de banda', type: 'toggle', value: true },
    ]
  },
  {
    name: 'API e Integraciones',
    icon: Globe,
    settings: [
      { id: 21, name: 'Gestión de API Keys', desc: 'Administra tus claves de acceso a la API', type: 'input', value: 'nxai_****_****_7f3k' },
      { id: 22, name: 'Webhooks', desc: 'Configura webhooks para eventos del sistema', type: 'toggle', value: false },
      { id: 23, name: 'Endpoints personalizados', desc: 'Define endpoints de API personalizados', type: 'input', value: 'https://api.nexusai.com/v3' },
      { id: 24, name: 'Configuración OAuth', desc: 'Configura proveedores de autenticación OAuth', type: 'select', value: 'Google', options: ['Google', 'GitHub', 'Microsoft', 'Auth0', 'Custom'] },
      { id: 25, name: 'Formato de exportación', desc: 'Formato predeterminado para exportar datos', type: 'select', value: 'JSON', options: ['JSON', 'CSV', 'XML', 'PDF', 'Excel'] },
      { id: 26, name: 'Fuentes de importación', desc: 'Orígenes de datos permitidos para importación', type: 'select', value: 'Todos', options: ['Todos', 'Solo API', 'Solo archivos', 'Solo URL'] },
      { id: 27, name: 'Sistema de plugins', desc: 'Habilitar sistema de extensiones y plugins', type: 'toggle', value: true },
      { id: 28, name: 'Configuración SDK', desc: 'Versión y configuración del SDK', type: 'select', value: 'v3.2', options: ['v2.0', 'v2.5', 'v3.0', 'v3.1', 'v3.2'] },
      { id: 29, name: 'Monitorización', desc: 'Dashboard de monitorización en tiempo real', type: 'toggle', value: true },
      { id: 30, name: 'Backup y restauración', desc: 'Copias de seguridad automáticas de datos', type: 'select', value: 'Diario', options: ['Cada hora', 'Diario', 'Semanal', 'Mensual', 'Manual'] },
    ]
  },
]
