<div align="center">

# ✦ NEXUS AI

### Un espacio de trabajo sereno para pensar, escribir y crear con IA

[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## Qué incluye esta versión

NEXUS AI v2.2 es un MVP funcional de un workspace conversacional. Prioriza una interfaz clara y una integración de proveedores que funciona con claves propias.

- **Chat con IA conectado o modo demo.** Sin una clave configurada, el endpoint responde con una guía útil de demostración; con una clave, envía la conversación al proveedor seleccionado.
- **Cinco modelos seleccionables.** GPT-4o/GPT-5, Claude Sonnet, Gemini Pro y Grok, con selección persistente.
- **Cuatro modos de inicio.** Escribir, investigar, crear código e idear visuales preparan el contexto del mensaje.
- **Persistencia local y privacidad por defecto.** La conversación, el modelo, el tema y el modo activo se guardan únicamente en `localStorage` del navegador.
- **Experiencia responsive.** Navegación móvil, tema claro/oscuro, ajustes, copiar respuestas, compartir la transcripción y estados de carga/error accesibles.
- **PWA instalable.** Manifest, iconos, service worker, caché offline y botón de instalación para Android, escritorio y Safari en iPhone/iPad.
- **API protegida.** El servidor valida el formato y el tamaño de los mensajes; las claves nunca se exponen al cliente.

> El diseño de la interfaz no promete búsquedas web, carga de archivos, voz ni memoria remota: sus controles muestran claramente que esas extensiones todavía no están disponibles.

## Versión web instalable

La URL prevista para la edición PWA publicada en GitHub Pages es:

**https://fazeurru.github.io/NEXUS-AI/**

En Chrome, Edge y Android aparecerá el botón **“Instalar app”** cuando el navegador considere que la PWA es instalable. En iPhone/iPad, el botón muestra la ruta de Safari: **Compartir → Añadir a pantalla de inicio**. La edición estática de GitHub Pages funciona sin servidor en **modo demo local** y conserva la conversación en el dispositivo. Para respuestas con claves de IA, usa el despliegue estándar de Next.js descrito abajo.

> El build estático listo para Pages se versiona en `docs/`. Para publicar esa URL hay que activar GitHub Pages una vez desde **Settings → Pages** y elegir la rama `arena/019f94cf-nexus-ai`, carpeta `/docs`. La automatización de GitHub Actions requiere permiso de `workflows` en la conexión de GitHub.

## Stack

- **App:** Next.js 16 (App Router), React 19 y TypeScript estricto
- **Estilos:** CSS nativo con tokens de tema y diseño responsive
- **IA:** rutas `fetch` para OpenAI, Anthropic, Google Gemini y xAI
- **Calidad:** ESLint 9 + configuración `eslint-config-next/core-web-vitals`

## Inicio rápido

### Requisitos

- Node.js 20.9 o posterior (se recomienda Node 22)
- Una clave de proveedor de IA opcional

```bash
# Instala las dependencias
npm install

# Copia las variables de entorno y añade las claves que quieras usar
cp .env.example .env

# Inicia el entorno de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Comandos

```bash
npm run dev     # Desarrollo
npm run lint    # Reglas de calidad
npm run build   # Build de producción
npm run start   # Ejecuta el build de producción
```

## Variables de entorno

Copia `.env.example` a `.env`. No es necesario configurar todos los proveedores: el selector usará el modo demo cuando no encuentre la clave del modelo elegido.

```env
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GOOGLE_AI_API_KEY=""
XAI_API_KEY=""
```

Las variables `DATABASE_URL` y `NEXTAUTH_*` continúan en el archivo de ejemplo para una futura capa de cuentas y persistencia remota; el MVP actual no las consume.

| Selector de NEXUS | Variable | Integración |
| --- | --- | --- |
| GPT-4o, GPT-5 | `OPENAI_API_KEY` | Chat Completions de OpenAI |
| Claude Sonnet 4 | `ANTHROPIC_API_KEY` | Messages API de Anthropic |
| Gemini 2.5 Pro | `GOOGLE_AI_API_KEY` | Generative Language API de Google |
| Grok 4 | `XAI_API_KEY` | API compatible con OpenAI de xAI |

> Comprueba que el identificador de modelo esté habilitado para tu cuenta. Los proveedores pueden cambiar los nombres o el acceso a sus modelos; en ese caso actualiza el `id` correspondiente en `app/page.tsx`.

## Estructura

```text
app/
├── api/
│   ├── chat/route.ts      # Validación, fallback demo y adaptadores de IA
│   └── health/route.ts    # Health check
├── globals.css            # Tokens, temas y layout responsive
├── layout.tsx             # Metadatos y shell global
└── page.tsx               # Workspace y estado de interacción
```

## Próximos pasos sugeridos

1. Añadir autenticación y persistencia por usuario antes de sincronizar conversaciones entre dispositivos.
2. Convertir la respuesta de chat a streaming para tiempos de espera más agradables.
3. Implementar carga/lectura de documentos y búsqueda web con sus estados y fuentes verificables.
4. Separar el gran componente de workspace en componentes y hooks reutilizables al ampliar herramientas.

## Licencia

MIT © 2026 FazeUrru
