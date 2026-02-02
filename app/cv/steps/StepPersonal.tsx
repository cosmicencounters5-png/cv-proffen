export default function StepPersonal({
  value,
  onChange,
  onNext,
}: any) {
  return (
    <>
      <h2>Personlig informasjon</h2>

      <input
        placeholder="Fullt navn"
        onChange={(e) =>
          onChange({ ...value, navn: e.target.value })
        }
      />
      <input
        placeholder="E-post"
        onChange={(e) =>
          onChange({ ...value, epost: e.target.value })
        }
      />
      <input
        placeholder="Telefon"
        onChange={(e) =>
          onChange({ ...value, telefon: e.target.value })
        }
      />

      <button onClick={onNext}>Neste</button>
    </>
  );
}