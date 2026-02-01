import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabaseServer"

export const dynamic = "force-dynamic"

export default async function CvLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  // 1️⃣ Hent innlogget bruker
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // 2️⃣ Hent entitlement
  const { data: entitlement, error } = await supabase
    .from("user_entitlements")
    .select("has_cv")
    .single()

  if (error) {
    console.error("Entitlement fetch error:", error)
    redirect("/pricing")
  }

  // 3️⃣ Feature gate
  if (!entitlement?.has_cv) {
    redirect("/pricing")
  }

  return <>{children}</>
}