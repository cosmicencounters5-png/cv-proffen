export default function StepEducation({
  value,
  onChange,
  onBack,
  onGenerate,
  loading,
}: any) {
  return (
    <>
      <h2>Utdanning (valgfritt)</h2>

      <textarea
        rows={5}
        placeholder="Utdanning, kurs, sertifikater (valgfritt)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onBack}>Tilbake</button>
        <button onClick={onGenerate} disabled={loading}>
          {loading ? "Genererer..." : "Generer CV"}
        </button>
      </div>
    </>
  );
}