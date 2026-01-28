"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabaseClient.auth.getUser()

      if (!data.user) {
        router.push("/login")
        return
      }

      setEmail(data.user.email ?? null)
    }

    loadUser()
  }, [router])

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {email && (
        <p className="mt-2 text-gray-600">
          Innlogget som <strong>{email}</strong>
        </p>
      )}

      <button
        className="mt-6 bg-black text-white px-4 py-2 rounded"
        onClick={async () => {
          await supabaseClient.auth.signOut()
          router.push("/login")
        }}
      >
        Logg ut
      </button>
    </div>
  )
}