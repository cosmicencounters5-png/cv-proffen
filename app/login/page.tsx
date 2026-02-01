"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabaseBrowser"

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    // 🔑 viktig for App Router
    router.refresh()
    router.push("/cv")
  }

  return (
    <form onSubmit={signIn} style={{ padding: 24 }}>
      <h1>Logg inn</h1>

      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
        required
      />

      <input
        type="password"
        placeholder="Passord"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logger inn…" : "Logg inn"}
      </button>
    </form>
  )
}