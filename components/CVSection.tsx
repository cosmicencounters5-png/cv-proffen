"use client"

import { useState } from "react"

export default function CVSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="bg-white rounded-xl shadow-sm border mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 font-semibold text-left"
      >
        {title}
        <span className="text-gray-400">{open ? "–" : "+"}</span>
      </button>

      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}