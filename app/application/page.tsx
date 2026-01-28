"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function ApplicationPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const res = await fetch("/api/access", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const json = await res.json()

      if (json.active && json.package === "cv_and_application") {
        setHasAccess(true)
      }

      setLoading(false)
    }

    checkAccess()
  }, [router])

  if (loading) {
    return <p className="p-8">Laster…</p>
  }

  if (!hasAccess) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center space-y-4">
        <h1 className="text-xl font-bold">Søknad låst 🔒</h1>
        <p>Dette er kun tilgjengelig i pakken:</p>
        <p className="font-semibold">CV + Søknad</p>

        <a
          href="/cv"
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          Oppgrader
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-4">
      <h1 className="text-xl font-bold">Jobbsøknad</h1>

      <textarea
        className="w-full min-h-[300px] border rounded p-3 text-sm"
        placeholder="Skriv jobbsøknaden din her…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p className="text-xs text-gray-500">
        (Lagring kommer i neste steg)
      </p>
    </div>
  )
}