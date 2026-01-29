import BuyButton from "@/components/BuyButton"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl font-bold">
            Velg pakken som passer deg
          </h1>
          <p className="text-gray-600 mt-3">
            Betal én gang – få profesjonell CV (og søknad)
          </p>
        </div>

        {/* Pakker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CV ONLY */}
          <div className="bg-white border rounded-xl p-8 shadow-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Kun CV</h2>
            <p className="text-gray-600 mb-6">
              Perfekt hvis du kun trenger en profesjonell CV.
            </p>

            <div className="text-3xl font-bold mb-6">199 kr</div>

            <ul className="text-sm text-gray-700 space-y-2 mb-8">
              <li>✔ AI-forbedret CV</li>
              <li>✔ Rediger i 3 dager</li>
              <li>✔ Klar for PDF</li>
            </ul>

            <div className="mt-auto">
              <BuyButton packageType="cv_only" />
            </div>
          </div>

          {/* CV + SØKNAD */}
          <div className="bg-white border-2 border-black rounded-xl p-8 shadow-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-2">
              CV + Søknad
            </h2>
            <p className="text-gray-600 mb-6">
              Komplett pakke for jobbsøknader.
            </p>

            <div className="text-3xl font-bold mb-6">299 kr</div>

            <ul className="text-sm text-gray-700 space-y-2 mb-8">
              <li>✔ AI-forbedret CV</li>
              <li>✔ AI-generert søknad</li>
              <li>✔ Rediger i 3 dager</li>
              <li>✔ Klar for PDF</li>
            </ul>

            <div className="mt-auto">
              <BuyButton packageType="cv_and_application" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-10">
          Sikker betaling med Stripe • Testmodus aktiv
        </p>
      </div>
    </div>
  )
}