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

      const data = await res.json()
      console.log("STRIPE RESPONSE:", data)

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Noe gikk galt med betalingen")
      }
    } catch (err) {
      console.error("Stripe error:", err)
      alert("Noe gikk galt med betalingen")
    }
  }

  return (
    <button
      onClick={handleBuy}
      className="bg-black text-white px-6 py-3 rounded text-sm"
    >
      Kjøp CV
    </button>
  )
}