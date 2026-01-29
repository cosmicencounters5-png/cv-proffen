"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  return (
    <div className="max-w-xl mx-auto py-16 text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Betaling fullført!
      </h1>

      <p className="text-gray-700">
        Takk for kjøpet! Du har nå tilgang til pakken din.
      </p>

      {sessionId && (
        <p className="text-sm text-gray-500">
          Ordre-ID: <span className="font-mono">{sessionId}</span>
        </p>
      )}

      <div className="pt-6">
        <Link
          href="/cv"
          className="inline-block bg-black text-white px-6 py-3 rounded"
        >
          Gå til CV-en min
        </Link>
      </div>

      <p className="text-xs text-gray-400 pt-6">
        Du kan bruke tjenesten i 3 dager fra kjøpstidspunktet.
      </p>
    </div>
  )
}