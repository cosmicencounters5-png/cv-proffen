"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")

  useEffect(() => {
    if (!sessionId) {
      setStatus("error")
      return
    }

    const verify = async () => {
      try {
        const res = await fetch("/api/stripe/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        })

        if (!res.ok) throw new Error("Verify failed")

        setStatus("ok")
      } catch (err) {
        console.error(err)
        setStatus("error")
      }
    }

    verify()
  }, [sessionId])

  if (status === "loading") {
    return <p className="p-8">Bekrefter betaling…</p>
  }

  if (status === "error") {
    return <p className="p-8 text-red-600">Noe gikk galt 😕</p>
  }

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 Betaling fullført</h1>
      <p>Du har nå tilgang til pakken din.</p>
    </div>
  )
}