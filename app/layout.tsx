import "./globals.css";

export const metadata = {
  title: "CV-Proffen",
  description: "Kommer snart",
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