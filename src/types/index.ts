// Tipos para funcionalidades
export interface Functionality {
  id: number
  name: string
  desc: string
  icon: React.ElementType
  category: string
}

// Tipos para modelos de IA
export interface AIModel {
  id: number
  name: string
  provider: string
  type: string
  desc: string
  tier: 'free' | 'standard' | 'premium'
}

// Tipos para actualizaciones automáticas
export interface AutoUpdate {
  id: number
  title: string
  version: string
  date: string
  desc: string
  changes: string[]
}

// Tipos para configuración de perfil
export interface ProfileSetting {
  id: number
  name: string
  desc: string
  type: 'toggle' | 'select' | 'input' | 'slider'
  value: string | boolean | number
  options?: string[]
}

export interface ProfileCategory {
  name: string
  icon: React.ElementType
  settings: ProfileSetting[]
}

// Tipos para configuración avanzada
export interface AdvancedSetting {
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

export interface AdvancedCategory {
  name: string
  icon: React.ElementType
  settings: AdvancedSetting[]
}
