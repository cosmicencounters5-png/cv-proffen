"use client"

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function ApplicationEditor({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">Søknad</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={14}
        className="w-full border rounded p-3 text-sm"
        placeholder="Skriv jobbsøknaden din her…"
      />
    </div>
  )
}