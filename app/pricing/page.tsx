"use client"

import BuyButton from "@/components/BuyButton"

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        Velg pakken som passer deg
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Du får full tilgang i 3 dager. Lag, juster og last ned CV (og søknad).
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* CV ONLY */}
        <div className="border rounded-xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Kun CV</h2>
          <p className="text-gray-600 mb-4">
            Perfekt for deg som kun trenger en profesjonell CV.
          </p>

          <ul className="text-sm mb-6 space-y-2">
            <li>✅ Profesjonell CV</li>
            <li>✅ AI-forbedringer</li>
            <li>✅ PDF-nedlasting</li>
            <li>⏳ 3 dagers tilgang</li>
          </ul>

          <div className="mt-auto">
            <p className="text-2xl font-bold mb-4">199 kr</p>
            <BuyButton packageType="cv_only" />
          </div>
        </div>

        {/* CV + APPLICATION */}
        <div className="border rounded-xl p-6 flex flex-col bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">
            CV + Søknad (AI)
          </h2>
          <p className="text-gray-600 mb-4">
            Full pakke – CV + skreddersydd jobbsøknad med AI.
          </p>

          <ul className="text-sm mb-6 space-y-2">
            <li>✅ Profesjonell CV</li>
            <li>✅ AI-generert søknad</li>
            <li>✅ Rediger begge</li>
            <li>✅ PDF-nedlasting</li>
            <li>⏳ 3 dagers tilgang</li>
          </ul>

          <div className="mt-auto">
            <p className="text-2xl font-bold mb-4">299 kr</p>
            <BuyButton packageType="cv_and_application" />
          </div>
        </div>
      </div>
    </div>
  )
}