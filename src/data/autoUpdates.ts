import type { AutoUpdate } from '../types'

export const autoUpdates: AutoUpdate[] = [
  {
    id: 1,
    title: 'Actualización de Funciones',
    version: 'v3.2.0',
    date: '2026-04-01',
    desc: 'Mejoras automáticas en las 39 funcionalidades del sistema',
    changes: [
      'Velocidad de procesamiento mejorada un 40%',
      'Nuevos filtros de edición de fotos con IA',
      'Mejora en la precisión de traducción automática',
      'Detección de objetos actualizada con modelos YOLO v9',
      'Optimización del asistente virtual con memoria contextual',
    ]
  },
  {
    id: 2,
    title: 'Actualización de Modelos',
    version: 'v3.1.0',
    date: '2026-03-15',
    desc: 'Integración de los últimos modelos de IA disponibles',
    changes: [
      'Añadido GPT-4o con capacidades multimodales',
      'Integración de DeepSeek V3 y Grok 2',
      'Actualización de Gemini a versión 2.0 Flash',
      'Nuevos modelos especializados: BioMistral, FinGPT',
      'Mejora de rendimiento en modelos de generación de video',
    ]
  },
  {
    id: 3,
    title: 'Actualización de Ajustes',
    version: 'v3.0.5',
    date: '2026-03-01',
    desc: 'Nuevos ajustes avanzados y mejoras en la personalización',
    changes: [
      'Nuevos ajustes avanzados de configuración de IA',
      'Panel de ajustes de perfil rediseñado',
      'Sistema de temas personalizables mejorado',
      'Ajustes de rendimiento y caché optimizados',
      'Nuevas opciones de exportación e integración API',
    ]
  },
]
