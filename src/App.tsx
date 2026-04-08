import { useState, useEffect } from 'react'
import './App.css'
import {
  Brain, Sparkles, Zap, Image, Code, Languages, FileText, Music, Video,
  Camera, User, MessageSquare, PenTool, BarChart3, TrendingUp, Mail,
  Bot, FolderSearch, Wand2, Search, Palette, Mic, Volume2, Shield,
  Star, Eye, Lock, Bell, Settings, ChevronDown, ChevronRight,
  Cpu, Globe,
  RefreshCw,
  Monitor, Type, Share2,
  Stethoscope, DollarSign, ClipboardList, Megaphone, Subtitles,
  Bug, X, Menu, Check, Rocket,
  Heart,
  Workflow, Target
} from 'lucide-react'

// ==================== DATA ====================

const functionalities = [
  { id: 1, name: 'Chat con IA', desc: 'Conversaciones inteligentes con múltiples modelos de IA', icon: MessageSquare, category: 'Comunicación' },
  { id: 2, name: 'Generación de Imágenes', desc: 'Crea imágenes únicas con IA generativa avanzada', icon: Image, category: 'Creatividad' },
  { id: 3, name: 'Generación de Código', desc: 'Genera código en cualquier lenguaje de programación', icon: Code, category: 'Desarrollo' },
  { id: 4, name: 'Traducción Automática', desc: 'Traduce textos entre más de 100 idiomas al instante', icon: Languages, category: 'Comunicación' },
  { id: 5, name: 'Resumen de Textos', desc: 'Resume documentos extensos en segundos', icon: FileText, category: 'Productividad' },
  { id: 6, name: 'Análisis de Sentimientos', desc: 'Detecta emociones y tono en cualquier texto', icon: Heart, category: 'Análisis' },
  { id: 7, name: 'Transcripción de Audio', desc: 'Convierte audio a texto con alta precisión', icon: Mic, category: 'Audio' },
  { id: 8, name: 'Generación de Música', desc: 'Compone música original con inteligencia artificial', icon: Music, category: 'Creatividad' },
  { id: 9, name: 'Edición de Fotos', desc: 'Mejora y transforma fotos con IA avanzada', icon: Camera, category: 'Creatividad' },
  { id: 10, name: 'Generación de Videos', desc: 'Crea videos a partir de texto o imágenes', icon: Video, category: 'Creatividad' },
  { id: 11, name: 'Detección de Objetos', desc: 'Identifica y clasifica objetos en imágenes y videos', icon: Eye, category: 'Visión' },
  { id: 12, name: 'Reconocimiento Facial', desc: 'Detecta y analiza rostros en tiempo real', icon: User, category: 'Visión' },
  { id: 13, name: 'Asistente Virtual', desc: 'Asistente personalizado para tareas diarias', icon: Bot, category: 'Productividad' },
  { id: 14, name: 'Corrección Gramatical', desc: 'Corrige errores ortográficos y gramaticales', icon: PenTool, category: 'Escritura' },
  { id: 15, name: 'Generación de Presentaciones', desc: 'Crea presentaciones profesionales automáticamente', icon: Monitor, category: 'Productividad' },
  { id: 16, name: 'Análisis de Datos', desc: 'Analiza grandes volúmenes de datos con IA', icon: BarChart3, category: 'Análisis' },
  { id: 17, name: 'Predicción de Tendencias', desc: 'Anticipa tendencias del mercado y comportamiento', icon: TrendingUp, category: 'Análisis' },
  { id: 18, name: 'Automatización de Tareas', desc: 'Automatiza flujos de trabajo repetitivos', icon: Workflow, category: 'Productividad' },
  { id: 19, name: 'Generación de Emails', desc: 'Redacta emails profesionales automáticamente', icon: Mail, category: 'Comunicación' },
  { id: 20, name: 'Chatbot Personalizado', desc: 'Crea chatbots adaptados a tus necesidades', icon: Bot, category: 'Desarrollo' },
  { id: 21, name: 'Clasificación de Documentos', desc: 'Organiza y clasifica documentos automáticamente', icon: FolderSearch, category: 'Productividad' },
  { id: 22, name: 'Extracción de Información', desc: 'Extrae datos clave de documentos y textos', icon: Search, category: 'Análisis' },
  { id: 23, name: 'Textos Creativos', desc: 'Genera historias, poemas y contenido creativo', icon: Wand2, category: 'Escritura' },
  { id: 24, name: 'Optimización SEO', desc: 'Mejora el posicionamiento web con IA', icon: Search, category: 'Marketing' },
  { id: 25, name: 'Análisis de Competencia', desc: 'Analiza la competencia y genera insights', icon: Target, category: 'Marketing' },
  { id: 26, name: 'Generación de Logos', desc: 'Diseña logos únicos con inteligencia artificial', icon: Palette, category: 'Creatividad' },
  { id: 27, name: 'Voz a Texto', desc: 'Convierte voz en texto escrito en tiempo real', icon: Mic, category: 'Audio' },
  { id: 28, name: 'Texto a Voz', desc: 'Genera voz natural a partir de cualquier texto', icon: Volume2, category: 'Audio' },
  { id: 29, name: 'Imágenes Médicas', desc: 'Análisis avanzado de imágenes médicas con IA', icon: Stethoscope, category: 'Salud' },
  { id: 30, name: 'Detección de Plagio', desc: 'Detecta contenido duplicado y plagio', icon: Shield, category: 'Escritura' },
  { id: 31, name: 'Recomendaciones', desc: 'Genera recomendaciones personalizadas inteligentes', icon: Star, category: 'Personalización' },
  { id: 32, name: 'Moderación de Contenido', desc: 'Modera contenido automáticamente con IA', icon: Shield, category: 'Seguridad' },
  { id: 33, name: 'Análisis Financiero', desc: 'Análisis inteligente de datos financieros', icon: DollarSign, category: 'Finanzas' },
  { id: 34, name: 'Generación de Reportes', desc: 'Crea reportes detallados automáticamente', icon: ClipboardList, category: 'Productividad' },
  { id: 35, name: 'Marketing Automation', desc: 'Automatiza campañas de marketing digital', icon: Megaphone, category: 'Marketing' },
  { id: 36, name: 'Asistente de Escritura', desc: 'Mejora tu escritura con sugerencias de IA', icon: Type, category: 'Escritura' },
  { id: 37, name: 'Generación de Subtítulos', desc: 'Genera subtítulos automáticos para videos', icon: Subtitles, category: 'Audio' },
  { id: 38, name: 'Análisis de Redes Sociales', desc: 'Analiza métricas y tendencias en redes sociales', icon: Share2, category: 'Marketing' },
  { id: 39, name: 'Depuración de Código', desc: 'Encuentra y corrige errores en tu código', icon: Bug, category: 'Desarrollo' },
]

const aiModels = [
  { id: 1, name: 'GPT-4o', provider: 'OpenAI', type: 'Multimodal', desc: 'Modelo multimodal más avanzado de OpenAI', tier: 'premium' },
  { id: 2, name: 'GPT-4 Turbo', provider: 'OpenAI', type: 'Texto', desc: 'Versión optimizada de GPT-4 con mayor velocidad', tier: 'premium' },
  { id: 3, name: 'GPT-3.5 Turbo', provider: 'OpenAI', type: 'Texto', desc: 'Modelo rápido y eficiente para tareas generales', tier: 'free' },
  { id: 4, name: 'Claude 3.5 Sonnet', provider: 'Anthropic', type: 'Texto', desc: 'Modelo avanzado con razonamiento superior', tier: 'premium' },
  { id: 5, name: 'Claude 3 Opus', provider: 'Anthropic', type: 'Texto', desc: 'El modelo más capaz de Anthropic', tier: 'premium' },
  { id: 6, name: 'Claude 3 Haiku', provider: 'Anthropic', type: 'Texto', desc: 'Modelo rápido y económico de Anthropic', tier: 'free' },
  { id: 7, name: 'Gemini 2.0 Flash', provider: 'Google', type: 'Multimodal', desc: 'Última generación multimodal de Google', tier: 'premium' },
  { id: 8, name: 'Gemini 1.5 Pro', provider: 'Google', type: 'Multimodal', desc: 'Modelo con ventana de contexto masiva', tier: 'premium' },
  { id: 9, name: 'Gemini 1.5 Flash', provider: 'Google', type: 'Multimodal', desc: 'Versión rápida y eficiente de Gemini', tier: 'free' },
  { id: 10, name: 'Llama 3.1 405B', provider: 'Meta', type: 'Texto', desc: 'El modelo open-source más grande de Meta', tier: 'premium' },
  { id: 11, name: 'Llama 3.1 70B', provider: 'Meta', type: 'Texto', desc: 'Modelo potente y balanceado de Meta', tier: 'standard' },
  { id: 12, name: 'Llama 3.1 8B', provider: 'Meta', type: 'Texto', desc: 'Modelo ligero y rápido de Meta', tier: 'free' },
  { id: 13, name: 'Mistral Large', provider: 'Mistral AI', type: 'Texto', desc: 'Modelo flagship de Mistral AI', tier: 'premium' },
  { id: 14, name: 'Mistral Medium', provider: 'Mistral AI', type: 'Texto', desc: 'Balance perfecto entre rendimiento y velocidad', tier: 'standard' },
  { id: 15, name: 'Mistral Small', provider: 'Mistral AI', type: 'Texto', desc: 'Modelo eficiente para tareas rápidas', tier: 'free' },
  { id: 16, name: 'Mixtral 8x22B', provider: 'Mistral AI', type: 'Texto', desc: 'Modelo MoE con rendimiento excepcional', tier: 'premium' },
  { id: 17, name: 'DALL-E 3', provider: 'OpenAI', type: 'Imagen', desc: 'Generación de imágenes de alta calidad', tier: 'premium' },
  { id: 18, name: 'Stable Diffusion XL', provider: 'Stability AI', type: 'Imagen', desc: 'Modelo open-source líder en generación de imágenes', tier: 'standard' },
  { id: 19, name: 'Midjourney v6', provider: 'Midjourney', type: 'Imagen', desc: 'Imágenes artísticas de calidad profesional', tier: 'premium' },
  { id: 20, name: 'Whisper Large v3', provider: 'OpenAI', type: 'Audio', desc: 'Transcripción de audio multilingüe precisa', tier: 'standard' },
  { id: 21, name: 'Codex', provider: 'OpenAI', type: 'Código', desc: 'Modelo especializado en generación de código', tier: 'premium' },
  { id: 22, name: 'Command R+', provider: 'Cohere', type: 'Texto', desc: 'Modelo optimizado para RAG y empresas', tier: 'premium' },
  { id: 23, name: 'Command R', provider: 'Cohere', type: 'Texto', desc: 'Modelo eficiente de Cohere para producción', tier: 'standard' },
  { id: 24, name: 'Jamba 1.5 Large', provider: 'AI21 Labs', type: 'Texto', desc: 'Arquitectura híbrida Mamba-Transformer', tier: 'premium' },
  { id: 25, name: 'Phi-3 Medium', provider: 'Microsoft', type: 'Texto', desc: 'Modelo pequeño con rendimiento sorprendente', tier: 'standard' },
  { id: 26, name: 'Phi-3 Mini', provider: 'Microsoft', type: 'Texto', desc: 'Ultra-eficiente para dispositivos edge', tier: 'free' },
  { id: 27, name: 'Qwen 2.5 72B', provider: 'Alibaba', type: 'Texto', desc: 'Modelo multilingüe avanzado de Alibaba', tier: 'premium' },
  { id: 28, name: 'Qwen 2.5 7B', provider: 'Alibaba', type: 'Texto', desc: 'Versión compacta y eficiente de Qwen', tier: 'free' },
  { id: 29, name: 'DeepSeek V3', provider: 'DeepSeek', type: 'Texto', desc: 'Modelo chino de alto rendimiento', tier: 'premium' },
  { id: 30, name: 'DeepSeek Coder', provider: 'DeepSeek', type: 'Código', desc: 'Especialista en programación de DeepSeek', tier: 'standard' },
  { id: 31, name: 'Yi-Large', provider: '01.AI', type: 'Texto', desc: 'Modelo avanzado con capacidades bilingües', tier: 'premium' },
  { id: 32, name: 'Falcon 180B', provider: 'TII', type: 'Texto', desc: 'Modelo open-source de 180 mil millones de parámetros', tier: 'premium' },
  { id: 33, name: 'PaLM 2', provider: 'Google', type: 'Texto', desc: 'Modelo con razonamiento mejorado de Google', tier: 'standard' },
  { id: 34, name: 'Imagen 3', provider: 'Google', type: 'Imagen', desc: 'Generación de imágenes fotorrealistas', tier: 'premium' },
  { id: 35, name: 'Sora', provider: 'OpenAI', type: 'Video', desc: 'Generación de videos de alta calidad', tier: 'premium' },
  { id: 36, name: 'Emu Video', provider: 'Meta', type: 'Video', desc: 'Generación de videos cortos con IA', tier: 'standard' },
  { id: 37, name: 'MusicGen', provider: 'Meta', type: 'Audio', desc: 'Generación de música a partir de texto', tier: 'standard' },
  { id: 38, name: 'AudioCraft', provider: 'Meta', type: 'Audio', desc: 'Suite completa de generación de audio', tier: 'premium' },
  { id: 39, name: 'SAM 2', provider: 'Meta', type: 'Visión', desc: 'Segmentación de cualquier objeto en imágenes', tier: 'standard' },
  { id: 40, name: 'DINOv2', provider: 'Meta', type: 'Visión', desc: 'Comprensión visual auto-supervisada', tier: 'standard' },
  { id: 41, name: 'BioMistral', provider: 'Community', type: 'Especializado', desc: 'Modelo especializado en biomedicina', tier: 'standard' },
  { id: 42, name: 'Med-PaLM 2', provider: 'Google', type: 'Especializado', desc: 'IA médica con precisión clínica', tier: 'premium' },
  { id: 43, name: 'FinGPT', provider: 'Community', type: 'Especializado', desc: 'Modelo financiero open-source', tier: 'standard' },
  { id: 44, name: 'BloombergGPT', provider: 'Bloomberg', type: 'Especializado', desc: 'IA entrenada en datos financieros', tier: 'premium' },
  { id: 45, name: 'StarCoder 2', provider: 'BigCode', type: 'Código', desc: 'Modelo open-source para programación', tier: 'standard' },
  { id: 46, name: 'CodeLlama 70B', provider: 'Meta', type: 'Código', desc: 'Modelo de código basado en Llama', tier: 'premium' },
  { id: 47, name: 'Gemma 2 27B', provider: 'Google', type: 'Texto', desc: 'Modelo abierto y eficiente de Google', tier: 'standard' },
  { id: 48, name: 'Gemma 2 9B', provider: 'Google', type: 'Texto', desc: 'Versión compacta de Gemma para edge', tier: 'free' },
  { id: 49, name: 'Grok 2', provider: 'xAI', type: 'Multimodal', desc: 'Modelo multimodal de xAI con humor', tier: 'premium' },
  { id: 50, name: 'FLUX.1 Pro', provider: 'Black Forest Labs', type: 'Imagen', desc: 'Generación de imágenes de última generación', tier: 'premium' },
  { id: 51, name: 'Runway Gen-3', provider: 'Runway', type: 'Video', desc: 'Generación y edición de video con IA', tier: 'premium' },
]

const autoUpdates = [
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

interface ProfileSetting {
  id: number
  name: string
  desc: string
  type: 'toggle' | 'select' | 'input' | 'slider'
  value: string | boolean | number
  options?: string[]
}

interface ProfileCategory {
  name: string
  icon: React.ElementType
  settings: ProfileSetting[]
}

const profileCategories: ProfileCategory[] = [
  {
    name: 'Información Personal',
    icon: User,
    settings: [
      { id: 1, name: 'Nombre de usuario', desc: 'Tu nombre visible en la plataforma', type: 'input', value: 'Usuario_Nexus' },
      { id: 2, name: 'Avatar', desc: 'Imagen de perfil personalizada', type: 'select', value: 'default', options: ['default', 'robot', 'astronauta', 'ninja', 'hacker'] },
      { id: 3, name: 'Biografía', desc: 'Describe quién eres en pocas palabras', type: 'input', value: 'Entusiasta de la IA' },
      { id: 4, name: 'Ubicación', desc: 'Tu ubicación geográfica', type: 'input', value: 'España' },
      { id: 5, name: 'Idioma preferido', desc: 'Idioma principal de la interfaz', type: 'select', value: 'Español', options: ['Español', 'English', 'Français', 'Deutsch', 'Português'] },
    ]
  },
  {
    name: 'Privacidad',
    icon: Lock,
    settings: [
      { id: 6, name: 'Perfil visible', desc: 'Permitir que otros vean tu perfil', type: 'toggle', value: true },
      { id: 7, name: 'Estado de actividad', desc: 'Mostrar cuándo estás en línea', type: 'toggle', value: false },
      { id: 8, name: 'Compartir datos de uso', desc: 'Ayuda a mejorar Nexus AI con datos anónimos', type: 'toggle', value: true },
      { id: 9, name: 'Visibilidad en búsqueda', desc: 'Aparecer en resultados de búsqueda', type: 'toggle', value: true },
      { id: 10, name: 'Autenticación 2FA', desc: 'Protege tu cuenta con verificación en dos pasos', type: 'toggle', value: false },
    ]
  },
  {
    name: 'Notificaciones',
    icon: Bell,
    settings: [
      { id: 11, name: 'Notificaciones por email', desc: 'Recibir actualizaciones por correo electrónico', type: 'toggle', value: true },
      { id: 12, name: 'Notificaciones push', desc: 'Alertas en tiempo real en tu navegador', type: 'toggle', value: true },
      { id: 13, name: 'Alertas de actualización', desc: 'Notificar sobre nuevas versiones y mejoras', type: 'toggle', value: true },
      { id: 14, name: 'Newsletter semanal', desc: 'Resumen semanal de novedades de IA', type: 'toggle', value: false },
      { id: 15, name: 'Sonidos de notificación', desc: 'Reproducir sonidos con las notificaciones', type: 'toggle', value: true },
    ]
  },
  {
    name: 'Apariencia',
    icon: Palette,
    settings: [
      { id: 16, name: 'Tema', desc: 'Selecciona el tema visual de la interfaz', type: 'select', value: 'Oscuro', options: ['Oscuro', 'Claro', 'Sistema', 'Medianoche', 'Aurora'] },
      { id: 17, name: 'Tamaño de fuente', desc: 'Ajusta el tamaño del texto', type: 'select', value: 'Mediano', options: ['Pequeño', 'Mediano', 'Grande', 'Extra grande'] },
      { id: 18, name: 'Color de acento', desc: 'Color principal de la interfaz', type: 'select', value: 'Violeta', options: ['Violeta', 'Azul', 'Verde', 'Rojo', 'Naranja'] },
      { id: 19, name: 'Densidad del layout', desc: 'Espaciado entre elementos de la interfaz', type: 'select', value: 'Normal', options: ['Compacto', 'Normal', 'Amplio'] },
      { id: 20, name: 'Animaciones', desc: 'Activar animaciones y transiciones', type: 'toggle', value: true },
    ]
  },
  {
    name: 'Cuenta',
    icon: Settings,
    settings: [
      { id: 21, name: 'Email de cuenta', desc: 'Correo electrónico asociado a tu cuenta', type: 'input', value: 'usuario@nexusai.com' },
      { id: 22, name: 'Cambiar contraseña', desc: 'Actualiza tu contraseña de acceso', type: 'input', value: '••••••••' },
      { id: 23, name: 'Cuentas conectadas', desc: 'Vincula Google, GitHub u otras cuentas', type: 'select', value: 'Google', options: ['Google', 'GitHub', 'Microsoft', 'Apple'] },
      { id: 24, name: 'Plan de suscripción', desc: 'Tu plan actual y opciones de upgrade', type: 'select', value: 'Pro', options: ['Free', 'Pro', 'Enterprise', 'Ultimate'] },
      { id: 25, name: 'Eliminar cuenta', desc: 'Elimina permanentemente tu cuenta y datos', type: 'toggle', value: false },
    ]
  },
]

interface AdvancedSetting {
  id: number
  name: string
  desc: string
  type: 'slider' | 'toggle' | 'select' | 'input'
  value: string | boolean | number
  options?: string[]
  min?: number
  max?: number
  step?: number
}

interface AdvancedCategory {
  name: string
  icon: React.ElementType
  settings: AdvancedSetting[]
}

const advancedCategories: AdvancedCategory[] = [
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

// ==================== COMPONENTS ====================

function Navbar({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (s: string) => void }) {
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

function HeroSection() {
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

function FeaturesSection() {
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

function ModelsSection() {
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

function UpdatesSection() {
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

function ProfileSettingsSection() {
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

function AdvancedSettingsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [settings, setSettings] = useState(advancedCategories)

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
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-sm mb-4">
            <Settings className="w-4 h-4" />
            <span>30 Ajustes Avanzados &middot; 3 Categorías</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Ajustes Avanzados</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Control total sobre la configuración de IA, rendimiento del sistema e integraciones API.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 space-y-1">
              {settings.map((cat, i) => {
                const CatIcon = cat.icon
                return (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === i
                        ? 'bg-orange-500/20 text-orange-300'
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
                {(() => { const CatIcon = currentCat.icon; return <CatIcon className="w-5 h-5 text-orange-400" /> })()}
                {currentCat.name}
                <span className="text-xs text-gray-500 font-normal ml-2">({currentCat.settings.length} ajustes)</span>
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
                            setting.value ? 'bg-orange-500' : 'bg-gray-700'
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
                          className="bg-gray-800 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-orange-500"
                        >
                          {setting.options?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      )}
                      {setting.type === 'input' && (
                        <input
                          type="text"
                          value={setting.value as string}
                          onChange={e => updateSetting(activeCategory, setting.id, e.target.value)}
                          className="bg-gray-800 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 w-56 focus:outline-none focus:border-orange-500"
                        />
                      )}
                      {setting.type === 'slider' && (
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={setting.min}
                            max={setting.max}
                            step={setting.step}
                            value={setting.value as number}
                            onChange={e => updateSetting(activeCategory, setting.id, parseFloat(e.target.value))}
                            className="w-32 accent-orange-500"
                          />
                          <span className="text-white text-sm w-10 text-right">{setting.value}</span>
                        </div>
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

function Footer() {
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

// ==================== APP ====================

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const sections = ['home', 'features', 'models', 'updates', 'profile-settings', 'advanced-settings']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar activeSection={activeSection} setActiveSection={scrollToSection} />

      <div id="home">
        <HeroSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="models">
        <ModelsSection />
      </div>
      <div id="updates">
        <UpdatesSection />
      </div>
      <div id="profile-settings">
        <ProfileSettingsSection />
      </div>
      <div id="advanced-settings">
        <AdvancedSettingsSection />
      </div>

      <Footer />
    </div>
  )
}

export default App
