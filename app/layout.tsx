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