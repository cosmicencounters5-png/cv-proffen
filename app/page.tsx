export default function HomePage() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>CV-Proffen</h1>
      <p style={styles.subtitle}>
        Profesjonelle CV-er og jobbsøknader
      </p>

      <div style={styles.card}>
        <p style={styles.text}>
          Vi jobber med noe skikkelig bra 🚀
        </p>
        <p style={styles.muted}>
          Tjenesten lanseres snart.
        </p>
      </div>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} CV-Proffen
      </footer>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
    padding: "2rem",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "3rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "2rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    maxWidth: "420px",
  },
  text: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  muted: {
    color: "#777",
  },
  footer: {
    marginTop: "3rem",
    fontSize: "0.9rem",
    color: "#999",
  },
};