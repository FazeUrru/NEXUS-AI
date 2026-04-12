import { User, Lock, Bell, Palette, Settings } from 'lucide-react'
import type { ProfileCategory } from '../types'

export const profileCategories: ProfileCategory[] = [
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
