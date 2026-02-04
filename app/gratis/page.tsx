import Link from "next/link";

export const metadata = {
  title: "Gratis CV i 24 timer | CV-Proffen",
  description:
    "Test CV-Proffen gratis i 24 timer. Ingen betaling. Ingen binding.",
};

export default function GratisLanding() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#f8f9fb",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          background: "white",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h1>Gratis CV i 24 timer</h1>

        <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>
          Test CV-Proffen helt gratis i 24 timer.
          <br />
          Ingen betaling. Ingen kort. Ingen binding.
        </p>

        <ul
          style={{
            textAlign: "left",
            marginTop: "1.5rem",
            paddingLeft: "1.2rem",
          }}
        >
          <li>Profesjonell CV på norsk</li>
          <li>Basert kun på dine egne opplysninger</li>
          <li>PDF klar til bruk</li>
          <li>24 timers gratis tilgang</li>
        </ul>

        <Link
          href="/gratis/aktiver"
          style={{
            display: "block",
            marginTop: "2rem",
            background: "#111",
            color: "white",
            padding: "0.75rem",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Aktiver gratis tilgang
        </Link>
      </div>
    </main>
  );
}