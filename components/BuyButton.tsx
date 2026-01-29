"use client"

import { supabase } from "@/lib/supabaseClient"

type Props = {
  packageType: "cv_only" | "cv_and_application"
}

export default function BuyButton({ packageType }: Props) {
  const handleBuy = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert("Du må være logget inn")
      return
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageType,
        userId: session.user.id,
      }),
    })

    const data = await res.json()

    if (data?.url) {
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