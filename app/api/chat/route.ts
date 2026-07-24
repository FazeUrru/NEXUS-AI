import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
  model?: string;
  tool?: string;
};

const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 4_000;

function cleanMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .slice(-MAX_MESSAGES)
    .flatMap((message): ChatMessage[] => {
      if (!message || typeof message !== "object") return [];
      const candidate = message as { role?: unknown; content?: unknown };
      if ((candidate.role !== "user" && candidate.role !== "assistant") || typeof candidate.content !== "string") {
        return [];
      }
      const content = candidate.content.trim().slice(0, MAX_CHARS_PER_MESSAGE);
      return content ? [{ role: candidate.role, content }] : [];
    });
}

function configuredProvider(model: string) {
  if (model.startsWith("gpt")) return process.env.OPENAI_API_KEY ? "openai" : null;
  if (model.startsWith("claude")) return process.env.ANTHROPIC_API_KEY ? "anthropic" : null;
  if (model.startsWith("gemini")) return process.env.GOOGLE_AI_API_KEY ? "google" : null;
  if (model.startsWith("grok")) return process.env.XAI_API_KEY ? "xai" : null;
  return null;
}

const SYSTEM_PROMPT = `Eres NEXUS, un asistente de IA claro, útil y honesto. Responde siempre en español salvo que la persona pida otro idioma. Estructura las respuestas para que sean fáciles de escanear, usa Markdown ligero y no inventes datos, fuentes ni acciones que no hayas realizado. Si la petición es ambigua, da una propuesta concreta y pregunta solo lo imprescindible.`;

async function callOpenAI(messages: ChatMessage[], model: string, apiKey: string, baseUrl = "https://api.openai.com/v1") {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(45_000),
  });

  if (!response.ok) throw new Error(`El proveedor respondió con ${response.status}.`);
  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content?.trim() || "No recibí contenido en la respuesta.";
}

async function callAnthropic(messages: ChatMessage[], model: string, apiKey: string) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model, max_tokens: 1200, system: SYSTEM_PROMPT, messages }),
    signal: AbortSignal.timeout(45_000),
  });

  if (!response.ok) throw new Error(`El proveedor respondió con ${response.status}.`);
  const data = (await response.json()) as { content?: Array<{ type?: string; text?: string }> };
  return data.content?.find((block) => block.type === "text")?.text?.trim() || "No recibí contenido en la respuesta.";
}

async function callGemini(messages: ChatMessage[], model: string, apiKey: string) {
  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
    }),
    signal: AbortSignal.timeout(45_000),
  });

  if (!response.ok) throw new Error(`El proveedor respondió con ${response.status}.`);
  const data = (await response.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "No recibí contenido en la respuesta.";
}

function demoReply(prompt: string, tool?: string) {
  const subject = prompt.replace(/\s+/g, " ").trim();
  const toolLine = tool ? `He activado el enfoque **${tool}** para organizar la respuesta.` : "Puedo ayudarte a convertir esa idea en un resultado accionable.";

  return `### Empecemos con claridad

${toolLine}

Entiendo que quieres trabajar sobre: **“${subject.slice(0, 180)}${subject.length > 180 ? "…" : ""}”**.

**Propuesta de siguiente paso**
1. Define el resultado final y para quién lo estás creando.
2. Reúne los datos, restricciones o referencias que no pueden cambiar.
3. Crea una primera versión breve, revísala y después amplíala.

> Estás usando el modo de demostración. Añade una clave de OpenAI, Anthropic, Google o xAI en tu archivo **.env** para obtener respuestas de tu modelo conectado.

Si me dices el formato que necesitas —por ejemplo, un plan, un email, código o una presentación— preparo una versión lista para usar.`;
}

export async function POST(request: Request) {
  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "El cuerpo de la petición no es válido." }, { status: 400 });
  }

  const messages = cleanMessages(body.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Envía al menos un mensaje de usuario." }, { status: 400 });
  }

  const model = typeof body.model === "string" ? body.model : "gpt-4o";
  const tool = typeof body.tool === "string" ? body.tool.slice(0, 80) : undefined;
  const provider = configuredProvider(model);

  if (!provider) {
    return NextResponse.json({ content: demoReply(messages.at(-1)!.content, tool), mode: "demo" });
  }

  try {
    let content: string;
    if (provider === "openai") content = await callOpenAI(messages, model, process.env.OPENAI_API_KEY!);
    else if (provider === "anthropic") content = await callAnthropic(messages, model, process.env.ANTHROPIC_API_KEY!);
    else if (provider === "google") content = await callGemini(messages, model, process.env.GOOGLE_AI_API_KEY!);
    else content = await callOpenAI(messages, model, process.env.XAI_API_KEY!, "https://api.x.ai/v1");

    return NextResponse.json({ content, mode: "connected" });
  } catch (error) {
    console.error("NEXUS provider error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo contactar con el proveedor de IA." },
      { status: 502 },
    );
  }
}
