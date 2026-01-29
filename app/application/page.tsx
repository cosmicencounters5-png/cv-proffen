"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { CV } from "@/types/cv"

export default function ApplicationPage() {
  const router = useRouter()

  const [cv, setCv] = useState<CV | null>(null)
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [jobAd, setJobAd] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const userId = session.user.id

      // Sjekk aktiv pakke
      const { data: purchase } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", userId)
        .gt("expires_at", new Date().toISOString())
        .maybeSingle()

      if (!purchase) {
        router.push("/pricing")
        return
      }

      // Last CV
      const res = await fetch("/api/cv", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const json = await res.json()
      setCv(json.data)
    }

    init()
  }, [router])

  const generate = async () => {
    if (!cv || !jobTitle || !company) {
      alert("Fyll inn stilling og arbeidsgiver")
      return
    }

    setLoading(true)
    setResult("")

    const res = await fetch("/api/ai/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cv,
        jobTitle,
        company,
        jobAd,
      }),
    })

    const json = await res.json()
    setResult(json.text)
    setLoading(false)
  }

  if (!cv) {
    return <p className="p-8">Laster…</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Generer jobbsøknad
      </h1>

      <input
        className="w-full border p-3 rounded"
        placeholder="Stilling (f.eks. Frontend-utvikler)"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <input
        className="w-full border p-3 rounded"
        placeholder="Arbeidsgiver"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <textarea
        className="w-full border p-3 rounded min-h-[120px]"
        placeholder="Stillingsannonse (valgfritt)"
        value={jobAd}
        onChange={(e) => setJobAd(e.target.value)}
      />

      <button
        onClick={generate}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Genererer…" : "Generer søknad"}
      </button>

      {result && (
        <div className="border rounded p-4 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  )
}