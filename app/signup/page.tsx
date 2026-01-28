"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/cv")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm border p-6 rounded-xl space-y-4">
        <h1 className="text-xl font-bold text-center">Opprett konto</h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Oppretter…" : "Opprett konto"}
        </button>

        <p className="text-sm text-center">
          Har du allerede konto?{" "}
          <a href="/login" className="underline">
            Logg inn
          </a>
        </p>
      </div>
    </div>
  )
}