import { supabase } from "@/lib/supabaseClient"

export async function getActivePackage(userId: string) {
  const { data, error } = await supabase
    .from("purchases")
    .select("package_type, expires_at")
    .eq("user_id", userId)
    .gt("expires_at", new Date().toISOString())
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("ENTITLEMENT ERROR:", error)
    return null
  }

  return data?.package_type ?? null
}