"use client"

import { supabase } from "@/lib/supabaseClient"

type Props = {
  packageType: "cv_only" | "cv_and_application"
}

export default function BuyButton({ packageType }: Props) {
  const handleBuy = async () => {
    // 1️⃣ Hent session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert("Du må være innlogget for å kjøpe")
      return
    }

    // 2️⃣ Start checkout med token
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`, // ← KRITISK
      },
      body: JSON.stringify({ packageType }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Klarte ikke å starte betaling (API-feil)")
    }
  }

  return (
    <button
      onClick={handleBuy}
      className="bg-black text-white px-6 py-3 rounded"
    >
      Kjøp nå
    </button>
  )
}