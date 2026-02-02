// app/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV-Proffen",
  description: "Profesjonell CV og søknad – raskt og enkelt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#f8f9fb",
          color: "#111",
        }}
      >
        {children}
      </body>
    </html>
  );
}
