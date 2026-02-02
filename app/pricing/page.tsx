"use client";

export default function PricingPage() {
  async function checkout(product: "cv" | "cv_plus") {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="container">
      <h1>Priser</h1>

      <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
        {/* CV */}
        <div className="card">
          <h2>Profesjonell CV</h2>
          <p>AI-generert CV basert kun på dine ekte data</p>
          <h3>299 kr</h3>

          <button onClick={() => checkout("cv")}>
            Kjøp CV
          </button>
        </div>

        {/* CV + Søknad */}
        <div className="card">
          <h2>CV + Søknad</h2>
          <p>Komplett pakke: CV + målrettet søknad</p>
          <h3>499 kr</h3>

          <button onClick={() => checkout("cv_plus")}>
            Kjøp CV + Søknad
          </button>
        </div>
      </div>
    </div>
  );
}