"use client";

import { useEffect } from "react";

/** Registers the offline shell. It uses relative paths so it also works under GitHub Pages. */
export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !window.isSecureContext) return;

    const register = () => {
      const path = window.location.pathname.endsWith("/") ? window.location.pathname : `${window.location.pathname}/`;
      void navigator.serviceWorker.register(`${path}sw.js`, { scope: path }).catch((error: unknown) => {
        // Registration failing must never prevent the workspace from loading.
        console.warn("NEXUS service worker could not be registered", error);
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
