export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#f7f7f7",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          CV-Proffen
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#555" }}>
          Kommer snart 🚀
        </p>
      </div>
    </main>
  );
}