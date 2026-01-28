"use client"

export default function DownloadPdfButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print-hidden mb-6 bg-black text-white px-4 py-2 rounded-lg"
    >
      Last ned PDF
    </button>
  )
}