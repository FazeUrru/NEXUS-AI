"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; content: string; createdAt: string; mode?: "demo" | "connected" };
type Model = { id: string; name: string; company: string; badge: string; tone: string };
type Tool = { id: string; icon: string; title: string; description: string; starter: string; color: string };
type IconName =
  | "plus"
  | "search"
  | "grid"
  | "spark"
  | "clock"
  | "chevron"
  | "dots"
  | "panel"
  | "share"
  | "settings"
  | "send"
  | "paperclip"
  | "mic"
  | "copy"
  | "check"
  | "close"
  | "menu"
  | "sun"
  | "moon"
  | "trash"
  | "sliders"
  | "arrow"
  | "command";

const MODELS: Model[] = [
  { id: "gpt-4o", name: "GPT-4o", company: "OpenAI", badge: "Versátil", tone: "violet" },
  { id: "gpt-5", name: "GPT-5", company: "OpenAI", badge: "Avanzado", tone: "blue" },
  { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", company: "Anthropic", badge: "Escritura", tone: "orange" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", company: "Google", badge: "Análisis", tone: "teal" },
  { id: "grok-4", name: "Grok 4", company: "xAI", badge: "Actualidad", tone: "pink" },
];

const TOOLS: Tool[] = [
  {
    id: "write",
    icon: "✦",
    title: "Escribir",
    description: "Convierte una idea en un texto claro y memorable.",
    starter: "Ayúdame a redactar un texto sobre ",
    color: "lavender",
  },
  {
    id: "research",
    icon: "⌁",
    title: "Investigar",
    description: "Ordena preguntas, fuentes y hallazgos clave.",
    starter: "Crea un plan de investigación sobre ",
    color: "sky",
  },
  {
    id: "code",
    icon: "⌘",
    title: "Crear código",
    description: "Diseña, explica y mejora soluciones técnicas.",
    starter: "Quiero crear una aplicación que ",
    color: "peach",
  },
  {
    id: "image",
    icon: "◌",
    title: "Idear visuales",
    description: "Define una dirección creativa lista para producir.",
    starter: "Dame una dirección visual para ",
    color: "mint",
  },
];

const PROMPTS = [
  "Haz un plan de lanzamiento para mi producto",
  "Explícame un concepto con un ejemplo sencillo",
  "Convierte estas notas en una propuesta clara",
];

const RECENT_CHATS = [
  { title: "Estrategia de contenido", meta: "Hoy" },
  { title: "Ideas para producto", meta: "Ayer" },
  { title: "Plan de aprendizaje", meta: "Esta semana" },
];

// GitHub Pages is a static host: its public PWA intentionally uses this local mode.
// Full provider calls remain available from the standard Next.js server build.
const IS_STATIC_DEMO = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";

function clientDemoReply(prompt: string, tool?: string) {
  const subject = prompt.replace(/\s+/g, " ").trim();
  const context = tool ? `He aplicado el enfoque **${tool}** a esta primera propuesta.` : "He preparado un punto de partida que puedes adaptar.";
  return `### Ya tenemos un buen punto de partida\n\n${context}\n\nTu objetivo parece ser: **“${subject.slice(0, 180)}${subject.length > 180 ? "…" : ""}”**.\n\n**Siguiente paso recomendado**\n1. Define el resultado concreto que quieres obtener.\n2. Añade quién va a usarlo y qué restricciones existen.\n3. Pide una primera versión y mejórala por iteraciones.\n\n> Estás usando la edición instalable de NEXUS en modo demo. Tus mensajes se guardan en este dispositivo.\n\nCuéntame el formato final que necesitas y lo desarrollamos juntos.`;
}

function Icon({ name, size = 18, stroke = 1.8 }: { name: IconName; size?: number; stroke?: number }) {
  const shared = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    spark: <><path d="m12 3 1.55 5.45L19 10l-5.45 1.55L12 17l-1.55-5.45L5 10l5.45-1.55L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    dots: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    panel: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M15 4v16" /></>,
    share: <><circle cx="18" cy="5" r="2.2" /><circle cx="6" cy="12" r="2.2" /><circle cx="18" cy="19" r="2.2" /><path d="m8 11 7.8-4.8M8 13l7.8 4.8" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.62 2.62-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V21h-3.7v-.08A1.7 1.7 0 0 0 9.46 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.62-2.62.06-.06A1.7 1.7 0 0 0 5.3 15.2a1.7 1.7 0 0 0-1.56-1.04H3.7v-3.7h.08A1.7 1.7 0 0 0 5.3 9.42a1.7 1.7 0 0 0-.34-1.88L4.9 7.48 7.52 4.9l.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56V3.7h3.7v.08a1.7 1.7 0 0 0 1.04 1.52 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.62 2.62-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.04h.08v3.7h-.08A1.7 1.7 0 0 0 19.4 15Z" /></>,
    send: <><path d="m21 3-7.6 18-3.4-7.4L3 10.2 21 3Z" /><path d="m10 13.5 4-4" /></>,
    paperclip: <path d="m20.5 11.5-8.8 8.8a5 5 0 0 1-7.1-7.1l9.5-9.5a3.4 3.4 0 0 1 4.8 4.8l-9.6 9.6a1.8 1.8 0 0 1-2.5-2.5l8.8-8.8" />,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" /></>,
    copy: <><rect x="9" y="9" width="10" height="11" rx="2" /><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.4 8.4 0 1 0 20.2 15.4Z" />,
    trash: <><path d="M4 7h16M10 11v5M14 11v5M6.5 7l.8 13h9.4l.8-13M9 7V4h6v3" /></>,
    sliders: <><path d="M4 7h10M18 7h2M4 17h3M11 17h9" /><circle cx="16" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    command: <><path d="M9 9V6a3 3 0 1 0-3 3h12a3 3 0 1 1-3 3V9a3 3 0 1 0 3 3H6a3 3 0 1 1 3-3Z" /></>,
  };
  return <svg {...shared}>{paths[name]}</svg>;
}

function formatInline(line: string) {
  const fragments = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return fragments.map((fragment, index) => {
    if (fragment.startsWith("**") && fragment.endsWith("**")) return <strong key={index}>{fragment.slice(2, -2)}</strong>;
    if (fragment.startsWith("`") && fragment.endsWith("`")) return <code key={index}>{fragment.slice(1, -1)}</code>;
    return fragment;
  });
}

function RichText({ content }: { content: string }) {
  const chunks = content.split("\n\n");
  return (
    <div className="rich-text">
      {chunks.map((chunk, index) => {
        if (chunk.startsWith("### ")) return <h3 key={index}>{formatInline(chunk.slice(4))}</h3>;
        if (chunk.startsWith("> ")) return <blockquote key={index}>{formatInline(chunk.slice(2))}</blockquote>;
        const lines = chunk.split("\n");
        if (lines.every((line) => /^\d+\. /.test(line))) {
          return <ol key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{formatInline(line.replace(/^\d+\. /, ""))}</li>)}</ol>;
        }
        if (lines.every((line) => /^[-•] /.test(line))) {
          return <ul key={index}>{lines.map((line, lineIndex) => <li key={lineIndex}>{formatInline(line.replace(/^[-•] /, ""))}</li>)}</ul>;
        }
        return <p key={index}>{lines.map((line, lineIndex) => <span key={lineIndex}>{formatInline(line)}{lineIndex < lines.length - 1 && <br />}</span>)}</p>;
      })}
    </div>
  );
}

function Avatar({ small = false }: { small?: boolean }) {
  return <div className={`avatar ${small ? "avatar-small" : ""}`} aria-hidden="true"><span>n</span></div>;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState(MODELS[0].id);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const selectedModel = MODELS.find((item) => item.id === model) ?? MODELS[0];
  const activeToolLabel = TOOLS.find((tool) => tool.id === activeTool)?.title;

  useEffect(() => {
    // Defer hydration so the server and first client render stay identical.
    const hydrationTimer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem("nexus-workspace-v1");
        if (saved) {
          const parsed = JSON.parse(saved) as { messages?: Message[]; model?: string; darkMode?: boolean; activeTool?: string | null };
          if (Array.isArray(parsed.messages)) setMessages(parsed.messages);
          if (typeof parsed.model === "string" && MODELS.some((item) => item.id === parsed.model)) setModel(parsed.model);
          if (typeof parsed.darkMode === "boolean") setDarkMode(parsed.darkMode);
          if (typeof parsed.activeTool === "string" || parsed.activeTool === null) setActiveTool(parsed.activeTool);
        }
      } catch {
        // A damaged local preference should never block the workspace.
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("nexus-workspace-v1", JSON.stringify({ messages, model, darkMode, activeTool }));
  }, [messages, model, darkMode, activeTool, hydrated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: messages.length > 1 ? "smooth" : "auto", block: "end" });
  }, [messages, isSending]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function focusComposer() {
    window.setTimeout(() => textareaRef.current?.focus(), 30);
  }

  function chooseTool(tool: Tool) {
    setActiveTool(tool.id);
    setDraft(tool.starter);
    setSidebarOpen(false);
    setToast(`Modo ${tool.title.toLowerCase()} listo`);
    focusComposer();
  }

  function startNewChat() {
    if (messages.length) setMessages([]);
    setDraft("");
    setActiveTool(null);
    setError("");
    setSidebarOpen(false);
    setToast("Nuevo espacio creado");
    focusComposer();
  }

  async function submitMessage(event?: FormEvent) {
    event?.preventDefault();
    const content = draft.trim();
    if (!content || isSending) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content, createdAt: new Date().toISOString() };
    const pendingMessages = [...messages, userMessage];
    setMessages(pendingMessages);
    setDraft("");
    setError("");
    setIsSending(true);

    try {
      if (IS_STATIC_DEMO) {
        // Keep the installable GitHub Pages edition fully usable without a server.
        await new Promise((resolve) => window.setTimeout(resolve, 420));
        setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: clientDemoReply(content, activeToolLabel), createdAt: new Date().toISOString(), mode: "demo" }]);
        return;
      }

      const response = await fetch("./api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: pendingMessages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
          model,
          tool: activeToolLabel,
        }),
      });
      const result = (await response.json()) as { content?: string; mode?: "demo" | "connected"; error?: string };
      if (!response.ok || !result.content) throw new Error(result.error || "No pudimos generar una respuesta.");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: result.content!, createdAt: new Date().toISOString(), mode: result.mode }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No pudimos conectar con NEXUS.");
    } finally {
      setIsSending(false);
      focusComposer();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage();
    }
  }

  async function copyText(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToast("Copiado al portapapeles");
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setToast("No se pudo copiar el texto");
    }
  }

  async function shareConversation() {
    const text = messages.map((message) => `${message.role === "user" ? "Tú" : "NEXUS"}: ${message.content}`).join("\n\n");
    if (!text) {
      setToast("Escribe algo antes de compartir");
      return;
    }
    await copyText(text, "conversation");
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`} aria-label="Navegación principal">
        <div className="sidebar-top">
          <div className="brand"><Avatar small /><span>NEXUS</span><i>AI</i></div>
          <button className="mobile-close icon-button" type="button" onClick={() => setSidebarOpen(false)} aria-label="Cerrar navegación"><Icon name="close" /></button>
        </div>

        <button className="new-chat" type="button" onClick={startNewChat}><Icon name="plus" size={17} /><span>Nuevo espacio</span><kbd>⌘ K</kbd></button>

        <nav className="primary-nav" aria-label="Secciones">
          <button type="button" className="nav-item active"><Icon name="spark" /><span>Espacio de trabajo</span></button>
          <button type="button" className="nav-item" onClick={() => { setToast("Tus herramientas están a la derecha"); focusComposer(); }}><Icon name="grid" /><span>Herramientas</span></button>
          <button type="button" className="nav-item" onClick={() => setToast("La búsqueda estará disponible muy pronto")}><Icon name="search" /><span>Buscar</span><kbd>⌘ /</kbd></button>
        </nav>

        <div className="side-section">
          <div className="side-section-heading"><span>RECIENTES</span><button type="button" aria-label="Ver todos los recientes" onClick={() => setToast("Los espacios recientes se guardan en este dispositivo")}><Icon name="dots" size={16} /></button></div>
          <div className="recent-list">
            {RECENT_CHATS.map((chat) => <button key={chat.title} type="button" className="recent-item" onClick={() => { setDraft(`Quiero retomar ${chat.title.toLowerCase()}. `); focusComposer(); setSidebarOpen(false); }}><Icon name="clock" size={15} /><span>{chat.title}</span><em>{chat.meta}</em></button>)}
          </div>
        </div>

        <div className="side-spacer" />
        <div className="sidebar-footer">
          <button type="button" className="upgrade-card" onClick={() => setToast("El plan personal ya incluye todas las funciones de este prototipo")}><span className="upgrade-icon"><Icon name="spark" size={15} /></span><span><b>Desbloquea más con NEXUS</b><small>Explora espacios sin límites</small></span><Icon name="chevron" size={15} /></button>
          <button className="account" type="button" onClick={() => setSettingsOpen(true)}><div className="account-avatar">FA</div><span><b>Faze Urru</b><small>Espacio personal</small></span><Icon name="dots" size={18} /></button>
        </div>
      </aside>

      {sidebarOpen && <button className="scrim" type="button" aria-label="Cerrar navegación" onClick={() => setSidebarOpen(false)} />}

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu icon-button" type="button" aria-label="Abrir navegación" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button>
            <div className="crumb"><span>Espacio de trabajo</span><Icon name="chevron" size={14} /><strong>{messages.length ? "Conversación" : "Sin título"}</strong></div>
          </div>
          <div className="top-actions">
            <button className="top-action hide-small" type="button" onClick={() => setToast("Panel de contexto preparado")}><Icon name="panel" size={17} /><span>Panel</span></button>
            <button className="top-action hide-small" type="button" onClick={() => void shareConversation()}><Icon name="share" size={17} /><span>Compartir</span></button>
            <button className="icon-button" type="button" aria-label="Abrir ajustes" onClick={() => setSettingsOpen(true)}><Icon name="settings" size={18} /></button>
          </div>
        </header>

        <div className={`conversation ${messages.length ? "has-messages" : ""}`}>
          {!messages.length ? (
            <div className="welcome">
              <div className="welcome-mark"><Icon name="spark" size={24} stroke={1.5} /></div>
              <p className="eyebrow">TU ESPACIO, A TU MANERA</p>
              <h1>¿Qué vamos a <em>hacer</em> hoy?</h1>
              <p className="welcome-copy">Piensa en grande. NEXUS te ayuda a pasar de la primera idea a un trabajo que puedes compartir.</p>
              <div className="prompt-grid">
                {PROMPTS.map((prompt, index) => <button key={prompt} type="button" className="prompt-card" onClick={() => { setDraft(prompt); focusComposer(); }}><span className={`prompt-icon p${index}`}><Icon name={index === 0 ? "arrow" : index === 1 ? "spark" : "sliders"} size={17} /></span><span>{prompt}</span><Icon name="arrow" size={16} /></button>)}
              </div>
              <div className="quick-tools-label"><span />EMPIEZA CON UNA HERRAMIENTA<span /></div>
              <div className="tool-grid">
                {TOOLS.map((tool) => <button key={tool.id} type="button" className="tool-card" onClick={() => chooseTool(tool)}><span className={`tool-icon ${tool.color}`}>{tool.icon}</span><span><b>{tool.title}</b><small>{tool.description}</small></span><Icon name="chevron" size={16} /></button>)}
              </div>
            </div>
          ) : (
            <div className="messages" aria-live="polite">
              {messages.map((message) => (
                <article className={`message ${message.role}`} key={message.id}>
                  {message.role === "assistant" && <Avatar />}
                  <div className="message-body">
                    <div className="message-meta"><b>{message.role === "user" ? "Tú" : "NEXUS"}</b>{message.mode === "demo" && <span className="mode-badge">Modo demo</span>}</div>
                    <RichText content={message.content} />
                    {message.role === "assistant" && <div className="message-tools"><button type="button" onClick={() => void copyText(message.content, message.id)} aria-label="Copiar respuesta">{copiedId === message.id ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />} {copiedId === message.id ? "Copiado" : "Copiar"}</button><button type="button" onClick={() => setDraft("Me gustaría profundizar en la parte de ")}><Icon name="arrow" size={15} /> Profundizar</button></div>}
                  </div>
                </article>
              ))}
              {isSending && <article className="message assistant thinking"><Avatar /><div className="message-body"><div className="message-meta"><b>NEXUS</b></div><div className="typing"><i /><i /><i /></div></div></article>}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="composer-wrap">
          {activeTool && <div className="active-tool"><span className={`tool-icon ${TOOLS.find((tool) => tool.id === activeTool)?.color}`}>{TOOLS.find((tool) => tool.id === activeTool)?.icon}</span><span>Modo <b>{activeToolLabel}</b></span><button type="button" aria-label="Desactivar modo" onClick={() => setActiveTool(null)}><Icon name="close" size={14} /></button></div>}
          {error && <div className="composer-error"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Cerrar error"><Icon name="close" size={14} /></button></div>}
          <form className="composer" onSubmit={(event) => void submitMessage(event)}>
            <textarea ref={textareaRef} rows={1} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleKeyDown} placeholder="Pregunta, crea o explora..." aria-label="Mensaje para NEXUS" />
            <div className="composer-bottom">
              <div className="composer-options">
                <div className="model-selector">
                  <button type="button" className="model-button" onClick={() => setShowModels((visible) => !visible)} aria-expanded={showModels}><span className={`model-dot ${selectedModel.tone}`} />{selectedModel.name}<Icon name="chevron" size={14} /></button>
                  {showModels && <div className="model-menu" role="menu">{MODELS.map((item) => <button type="button" role="menuitem" key={item.id} onClick={() => { setModel(item.id); setShowModels(false); setToast(`${item.name} seleccionado`); }}><span className={`model-dot ${item.tone}`} /><span><b>{item.name}</b><small>{item.company} · {item.badge}</small></span>{model === item.id && <Icon name="check" size={16} />}</button>)}</div>}
                </div>
                <button className="composer-icon hide-phone" type="button" aria-label="Adjuntar archivo" onClick={() => setToast("La carga de archivos llegará en una próxima iteración")}><Icon name="paperclip" size={18} /></button>
                <button className="composer-icon hide-phone" type="button" aria-label="Dictar mensaje" onClick={() => setToast("La entrada por voz no está disponible todavía")}><Icon name="mic" size={18} /></button>
              </div>
              <button className={`send-button ${draft.trim() ? "ready" : ""}`} type="submit" disabled={!draft.trim() || isSending} aria-label="Enviar mensaje"><Icon name="send" size={18} /></button>
            </div>
          </form>
          <p className="composer-disclaimer">NEXUS puede cometer errores. Verifica la información importante.</p>
        </div>
      </section>

      <aside className="context-rail" aria-label="Herramientas y contexto">
        <div className="rail-header"><span>EN ESTE ESPACIO</span><button type="button" aria-label="Más opciones" onClick={() => setToast("No hay más opciones por ahora")}><Icon name="dots" size={17} /></button></div>
        <section className="model-card">
          <div className="model-card-top"><span className={`model-orb ${selectedModel.tone}`}><Icon name="spark" size={18} /></span><span><b>{selectedModel.name}</b><small>{selectedModel.company}</small></span><button type="button" onClick={() => setShowModels((visible) => !visible)} aria-label="Cambiar modelo"><Icon name="sliders" size={16} /></button></div>
          <p>Un compañero equilibrado para pensar, escribir y resolver.</p>
          <div className="model-pills"><span>Texto</span><span>Razonamiento</span>{selectedModel.id === "gpt-4o" && <span>Visión</span>}</div>
        </section>
        <div className="rail-section-title"><span>HERRAMIENTAS</span><button type="button" onClick={() => { setActiveTool(null); setToast("Elige una herramienta para empezar"); }}><Icon name="grid" size={15} /></button></div>
        <div className="rail-tools">
          {TOOLS.map((tool) => <button key={tool.id} type="button" className={`rail-tool ${activeTool === tool.id ? "selected" : ""}`} onClick={() => chooseTool(tool)}><span className={`tool-icon ${tool.color}`}>{tool.icon}</span><span><b>{tool.title}</b><small>{tool.description}</small></span><Icon name="chevron" size={15} /></button>)}
        </div>
        <div className="rail-spacer" />
        <section className="tip-card"><span className="tip-label"><Icon name="spark" size={14} /> CONSEJO</span><p>Los buenos resultados empiezan con contexto. Dile a NEXUS para quién es y qué debe conseguir.</p><button type="button" onClick={() => { setDraft("El contexto de mi proyecto es: "); focusComposer(); }}>Ver ejemplos <Icon name="arrow" size={14} /></button></section>
      </aside>

      {settingsOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSettingsOpen(false)}><section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">PREFERENCIAS</p><h2 id="settings-title">Hazlo tuyo</h2></div><button className="icon-button" type="button" aria-label="Cerrar ajustes" onClick={() => setSettingsOpen(false)}><Icon name="close" /></button></div><div className="setting-row"><div><b>Apariencia</b><small>Elige cómo quieres ver NEXUS.</small></div><div className="theme-toggle"><button type="button" className={!darkMode ? "selected" : ""} onClick={() => setDarkMode(false)}><Icon name="sun" size={15} /> Claro</button><button type="button" className={darkMode ? "selected" : ""} onClick={() => setDarkMode(true)}><Icon name="moon" size={15} /> Oscuro</button></div></div><div className="setting-row"><div><b>Memoria local</b><small>Tus mensajes y preferencias se guardan solo en este navegador.</small></div><span className="status-on">Activa</span></div><div className="setting-row destructive"><div><b>Reiniciar espacio</b><small>Elimina la conversación actual de este dispositivo.</small></div><button type="button" onClick={() => { setMessages([]); setActiveTool(null); setSettingsOpen(false); setToast("Espacio reiniciado"); }}><Icon name="trash" size={15} /> Limpiar</button></div><div className="modal-footer"><span><Icon name="command" size={14} /> NEXUS v2.2</span><button type="button" className="done-button" onClick={() => setSettingsOpen(false)}>Listo</button></div></section></div>}
      {toast && <div className="toast" role="status"><Icon name="check" size={16} /> {toast}</div>}
    </main>
  );
}
