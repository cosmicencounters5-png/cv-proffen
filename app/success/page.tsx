export default function SuccessPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Betaling fullført 🎉
      </h1>

      <p className="text-gray-600 mb-8">
        Takk for kjøpet! Du har nå full tilgang til tjenesten.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <p className="text-sm">
          ✅ Tilgang aktiv i <strong>3 dager</strong><br />
          ✅ Lag og rediger CV (og søknad hvis valgt)<br />
          ✅ Last ned PDF
        </p>
      </div>

      <a
        href="/cv"
        className="inline-block bg-black text-white px-6 py-3 rounded"
      >
        Gå til CV-en min
      </a>
    </div>
  )
}