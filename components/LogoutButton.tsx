"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-500 hover:text-black"
    >
      Logg ut
    </button>
  )
}