import type { Metadata, Viewport } from "next";
import { InstallNexus } from "./install-nexus";
import { PwaRegister } from "./pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS · Tu espacio de IA",
  description: "Un espacio de trabajo tranquilo para pensar, escribir y crear con IA.",
  applicationName: "NEXUS AI",
  manifest: "./manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NEXUS",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "./icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "./icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "./icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#6756df",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <PwaRegister />
        {children}
        <InstallNexus />
      </body>
    </html>
  );
}
