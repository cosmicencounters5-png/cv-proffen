"use client"

type Props = {
  packageType: "cv_only" | "cv_and_application"
}

export default function BuyButton({ packageType }: Props) {
  const handleBuy = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ packageType }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Noe gikk galt med betalingen")
    }
  }

  return (
    <button
      onClick={handleBuy}
      className="bg-black text-white px-6 py-3 rounded text-sm w-full"
    >
      Kjøp nå
    </button>
  )
}