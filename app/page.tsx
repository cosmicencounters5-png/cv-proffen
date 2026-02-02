import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>CV-Proffen</h1>
        <p>Lag profesjonell CV og søknad med AI – basert på dine ekte data.</p>

        <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/login">
            <button>Logg inn</button>
          </Link>

          <Link href="/register">
            <button style={{ background: "#16a34a" }}>
              Registrer deg
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}