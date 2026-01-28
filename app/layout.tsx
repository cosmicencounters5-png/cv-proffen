"use client"

import { useEffect } from "react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.onerror = function (msg, url, line, col, error) {
      alert("JS ERROR: " + msg)
    }
  }, [])

  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  )
}
import "./globals.css";

export const metadata = {
  title: "CV-Proffen",
  description: "Profesjonelle CV-er og jobbsøknader",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}