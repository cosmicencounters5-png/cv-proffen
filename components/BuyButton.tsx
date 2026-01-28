"use client"

export default function BuyButton() {
  const handleBuy = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
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
      className="bg-black text-white px-6 py-3 rounded text-sm"
    >
      Kjøp CV (test)
    </button>
  )
}