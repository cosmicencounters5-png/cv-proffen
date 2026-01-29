"use client"

import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto p-10 text-center space-y-6">
      <h1 className="text-3xl font-bold">🎉 Betaling fullført</h1>
      <p>
        Takk for kjøpet! Du har nå full tilgang i 3 dager.
      </p>

      <Link
        href="/cv"
        className="inline-block bg-black text-white px-6 py-3 rounded"
      >
        Gå til CV-en min
      </Link>
    </div>
  )
}