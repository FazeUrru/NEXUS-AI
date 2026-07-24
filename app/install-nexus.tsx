"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function DownloadIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg>;
}

function CloseIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

/** Shows the browser installation flow on desktop/Android and iOS-specific guidance on Safari. */
export function InstallNexus() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    const detectInstalled = () => setIsInstalled(standalone.matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true);
    const receivePrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };
    const installed = () => {
      setIsInstalled(true);
      setPromptEvent(null);
      setShowIosHelp(false);
    };

    window.addEventListener("beforeinstallprompt", receivePrompt);
    window.addEventListener("appinstalled", installed);
    standalone.addEventListener("change", detectInstalled);
    const statusTimer = window.setTimeout(() => {
      setIsIos(/iPad|iPhone|iPod/.test(window.navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream);
      detectInstalled();
    }, 0);
    return () => {
      window.clearTimeout(statusTimer);
      window.removeEventListener("beforeinstallprompt", receivePrompt);
      window.removeEventListener("appinstalled", installed);
      standalone.removeEventListener("change", detectInstalled);
    };
  }, []);

  async function install() {
    if (promptEvent) {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome !== "accepted") setPromptEvent(null);
      return;
    }
    if (isIos) setShowIosHelp(true);
  }

  if (isInstalled || (!promptEvent && !isIos)) return null;

  return (
    <>
      <button className="install-app-button" type="button" onClick={() => void install()} aria-label="Instalar NEXUS como aplicación">
        <DownloadIcon />
        <span>Instalar app</span>
      </button>
      {showIosHelp && (
        <div className="ios-install-popover" role="dialog" aria-modal="true" aria-labelledby="ios-install-title">
          <button className="ios-install-close" type="button" aria-label="Cerrar instrucciones" onClick={() => setShowIosHelp(false)}><CloseIcon /></button>
          <div className="ios-install-mark">N</div>
          <h2 id="ios-install-title">Instala NEXUS</h2>
          <p>En Safari, toca <strong>Compartir</strong> y después <strong>“Añadir a pantalla de inicio”</strong>. Se abrirá como una app independiente.</p>
          <button className="ios-install-done" type="button" onClick={() => setShowIosHelp(false)}>Entendido</button>
        </div>
      )}
    </>
  );
}
