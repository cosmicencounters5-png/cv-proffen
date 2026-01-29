"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center space-y-6">
      <div className="text-5xl">🎉</div>

      <h1 className="text-3xl font-bold">
        Betaling fullført!
      </h1>

      <p className="text-gray-700 text-lg">
        Takk for kjøpet. Du har nå fått tilgang til CV-tjenesten.
      </p>

      <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
        <p>
          ✅ Tilgangen er aktiv i <strong>3 dager</strong>
        </p>
        <p>
          📄 Du kan redigere, forbedre og generere CV med AI
        </p>
        <p>
          💬 Eventuelle endringer lagres automatisk
        </p>
      </div>

      {sessionId && (
        <p className="text-xs text-gray-400">
          Referanse: {sessionId}
        </p>
      )}

      <div className="pt-6">
        <Link
          href="/cv"
          className="inline-block bg-black text-white px-6 py-3 rounded text-sm"
        >
          Gå til min CV
        </Link>
      </div>

      <p className="text-xs text-gray-400 pt-8">
        Har du spørsmål? Kontakt oss på support@cv-proffen.no
      </p>
    </div>
  )
}