"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // valgfritt: redirect etter 3 sek
    const t = setTimeout(() => {
      router.push("/cv")
    }, 3000)

    return () => clearTimeout(t)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">🎉 Betaling fullført</h1>
        <p>Takk for kjøpet! Du sendes videre…</p>
      </div>
    </div>
  )
}