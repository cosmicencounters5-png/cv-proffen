"use client"

type Props = {
  packageType: "cv_only" | "cv_and_application"
}

export default function BuyButton({ packageType }: Props) {
  const handleBuy = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageType }),
      })

      // 👇 NYTT: hvis API feiler, vis faktisk feil
      if (!res.ok) {
        const text = await res.text()
        console.error("Checkout API feilet:", text)
        alert("Klarte ikke å starte betaling (API-feil)")
        return
      }

      const data = await res.json()

      if (!data?.url) {
        console.error("Ingen Stripe URL:", data)
        alert("Stripe returnerte ingen betalingslenke")
        return
      }

      // ✅ GÅR TIL STRIPE
      window.location.href = data.url
    } catch (err) {
      console.error("Checkout klikk-feil:", err)
      alert("Uventet feil ved betaling")
    }
  }

  return (
    <button
      onClick={handleBuy}
      className="bg-black text-white px-6 py-3 rounded text-sm"
    >
      Kjøp nå
    </button>
  )
}