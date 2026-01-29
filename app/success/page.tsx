import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-sm p-8 text-center">
        {/* Icon */}
        <div className="text-4xl mb-4">🎉</div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">
          Betaling fullført
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Takk for kjøpet! Du har nå tilgang til å redigere CV-en din.
        </p>

        {/* Info box */}
        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-6">
          <p>
            ✔ Tilgangen varer i <strong>3 dager</strong>
          </p>
          <p>
            ✔ Du kan redigere og forbedre CV-en så mye du vil
          </p>
          <p>
            ✔ Klar for nedlasting som PDF
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/cv"
          className="inline-block bg-black text-white px-6 py-3 rounded text-sm"
        >
          Gå til CV-editor
        </Link>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          Kvittering er sendt til e-posten din
        </p>
      </div>
    </div>
  )
}