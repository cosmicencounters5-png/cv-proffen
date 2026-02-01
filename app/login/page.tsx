"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabaseBrowser"

export default function LoginForm() {
  const supabase = createClient()
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    // 🔑 VIKTIG I APP ROUTER
    router.refresh()
    router.push("/cv")
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const form = e.currentTarget
        signIn(
          (form.elements.namedItem("email") as HTMLInputElement).value,
          (form.elements.namedItem("password") as HTMLInputElement).value
        )
      }}
    >
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Logg inn</button>
    </form>
  )
}