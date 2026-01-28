"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [cvs, setCvs] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch("/api/cv")
      .then((res) => res.json())
      .then(setCvs)
  }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Mine CV-er</h1>

      <button
        onClick={() => router.push("/cv")}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Ny CV
      </button>

      <ul className="mt-6 space-y-4">
        {cvs.map((cv) => (
          <li
            key={cv.id}
            className="border p-4 rounded cursor-pointer hover:bg-gray-50"
            onClick={() => router.push("/cv")}
          >
            Lagret CV – {new Date(cv.created_at).toLocaleString()}
          </li>
        ))}
      </ul>

      <button
        className="mt-10 text-sm underline"
        onClick={async () => {
          await supabase.auth.signOut()
          router.push("/login")
        }}
      >
        Logg ut
      </button>
    </div>
  )
}