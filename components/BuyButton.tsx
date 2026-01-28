"use client"

export default function BuyButton({
  packageType,
}: {
  packageType: "cv_only" | "cv_and_application"
}) {
  const handleBuy = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ package: packageType }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Noe gikk galt med betaling")
    }
  }

  return (
    <button
      onClick={handleBuy}
      className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
    >
      Kjøp og fullfør
    </button>
  )
}