<div align="center">

# 🧠 NEXUS-AI

### La plataforma de IA multimodal más completa — ilimitada y gratuita

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/FazeUrru/NEXUS-AI)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## ✨ ¿Qué es NEXUS-AI?

**NEXUS-AI** es una plataforma web de inteligencia artificial multimodal que integra los mejores modelos de IA del mundo en una sola interfaz. Diseñada para ser rápida, potente y accesible — sin límites, sin complicaciones.

---

## 🚀 Features (28 herramientas de IA)

| Categoría | Herramientas |
|-----------|-------------|
| 💬 **Chat & Asistente** | Chat IA, Chat Privado, Asistente de Código |
| ✍️ **Escritura & Contenido** | Escritura Creativa, Generación de Contenido, Corrección Gramatical, Generador de Títulos, Historias |
| 🔍 **Análisis & Research** | Deep Research, Búsqueda Web, Análisis de Sentimientos, Análisis de Datos, Análisis de Texto |
| 🖼️ **Visual & Diseño** | Generación de Imágenes, Magic Design, UI Designer |
| 💻 **Desarrollo** | Generación de Código, Fullstack Apps, Generador de Apps, Web Pages |
| 📄 **Documentos** | Resumen de Documentos, Resumir Texto, Explicar Conceptos |
| 🎨 **Creatividad** | Ideas, Presentaciones, Juegos, Traducción, Emails |

---

## 🤖 Modelos de IA disponibles

- **OpenAI:** GPT-5.4, GPT-5.2, GPT-5, GPT-4o
- **Anthropic:** Claude Opus 4, Claude Sonnet 4
- **Google:** Gemini 3 Pro, Gemini 3 Flash
- **xAI:** Grok 4.20
- **Meta:** Llama 4 405B

---

## 🛠️ Stack tecnológico

```
Frontend:    Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4
UI:          Radix UI · shadcn/ui · Lucide Icons · Recharts
State:       Zustand · React Query · React Hook Form
Backend:     Next.js API Routes · Prisma ORM · SQLite
Auth:        NextAuth.js
Runtime:     Bun
```

---

## ⚡ Instalación y uso

### Requisitos
- [Bun](https://bun.sh) >= 1.0
- Node.js >= 20

### Setup rápido

```bash
# Clonar el repo
git clone https://github.com/FazeUrru/NEXUS-AI.git
cd NEXUS-AI

# Instalar dependencias
bun install

# Configurar base de datos
bun run db:push

# Variables de entorno
cp .env.example .env
# Edita .env con tus API keys

# Iniciar en desarrollo
bun run dev
```

La app estará disponible en `http://localhost:3000`

### Producción

```bash
bun run build
bun run start
```

---

## 🔧 Variables de entorno

```env
# Base de datos
DATABASE_URL="file:./db/custom.db"

# NextAuth
NEXTAUTH_SECRET="tu-secreto-aqui"
NEXTAUTH_URL="http://localhost:3000"

# APIs de IA (añade las que uses)
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GOOGLE_AI_API_KEY=""
```

---

## 📁 Estructura del proyecto

```
nexus-ai/
├── src/
│   ├── app/
│   │   ├── api/ai/          # 28 endpoints de IA
│   │   ├── page.tsx          # App principal
│   │   └── layout.tsx
│   ├── components/
│   │   ├── features/         # 28 componentes de features
│   │   ├── layout/           # Sidebar, navegación
│   │   ├── modals/           # Settings, Profile
│   │   └── ui/               # Componentes shadcn/ui
│   ├── store/                # Estado global (Zustand)
│   ├── hooks/                # Custom hooks
│   └── lib/                  # Utilidades, DB client
├── prisma/
│   └── schema.prisma         # Modelos de DB
└── public/                   # Assets estáticos
```

---

## 🎯 Características principales

- ✅ **28 herramientas de IA** en una sola plataforma
- ✅ **10 modelos de IA** de los mejores proveedores
- ✅ **Autenticación completa** con NextAuth.js
- ✅ **Historial de conversaciones** persistente
- ✅ **Tema claro/oscuro** con soporte automático
- ✅ **Diseño responsive** — funciona en móvil y desktop
- ✅ **17 configuraciones de perfil** personalizables
- ✅ **17 configuraciones generales** del sistema
- ✅ **Rendimiento optimizado** — sin animaciones pesadas
- ✅ **Sistema estable** — v2.1.0 sin errores

---

## 📊 Versiones

| Versión | Cambios |
|---------|---------|
| **v2.1.0** | Bug fixes, optimización de rendimiento, scroll inteligente en chat |
| **v2.0.0** | Actualización a 2026, 10 nuevos modelos de IA (GPT-5, Claude 4, Grok 4...) |
| **v1.0.0** | Lanzamiento inicial — 15 features de IA, auth, base de datos |

---

## 📄 Licencia

MIT © 2026 [FazeUrru](https://github.com/FazeUrru)

---

<div align="center">
  <strong>NEXUS-AI — IA ilimitada, sin límites 🚀</strong>
</div>
