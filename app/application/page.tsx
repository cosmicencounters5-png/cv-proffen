"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import ApplicationEditor from "@/components/ApplicationEditor"

export default function ApplicationPage() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // 1️⃣ Sjekk innlogging
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const userId = session.user.id

      // 2️⃣ Sjekk aktiv pakke (MÅ være cv_and_application)
      const { data: entitlement } = await supabase
        .from("entitlements")
        .select("package")
        .eq("user_id", userId)
        .eq("package", "cv_and_application")
        .gt("expires_at", new Date().toISOString())
        .maybeSingle()

      if (!entitlement) {
        router.push("/pricing")
        return
      }

      // 3️⃣ Last søknad
      const res = await fetch("/api/application", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      const json = await res.json()
      if (json?.data?.content) {
        setContent(json.data.content)
      }

      setLoading(false)
    }

    load()
  }, [router])

  const saveApplication = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) return

    await fetch("/api/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ content }),
    })
  }

  if (loading) {
    return <p className="p-8">Laster søknad…</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <ApplicationEditor value={content} onChange={setContent} />

      <button
        onClick={saveApplication}
        className="bg-black text-white px-4 py-2 rounded text-sm"
      >
        Lagre søknad
      </button>
    </div>
  )
}