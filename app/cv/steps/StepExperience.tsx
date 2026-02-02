export default function StepExperience({
  value,
  onChange,
  onBack,
  onNext,
}: any) {
  return (
    <>
      <h2>Arbeidserfaring</h2>

      <textarea
        rows={6}
        placeholder="Beskriv relevant arbeidserfaring"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onBack}>Tilbake</button>
        <button onClick={onNext}>Neste</button>
      </div>
    </>
  );
}