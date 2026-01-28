"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Bruker opprettet! Logg inn.")
    router.push("/login")
  }

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto p-8 space-y-4"
    >
      <h1 className="text-2xl font-bold">Opprett konto</h1>

      <input
        className="w-full border p-2"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2"
        placeholder="Passord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-2"
      >
        {loading ? "Oppretter…" : "Registrer"}
      </button>
    </form>
  )
}