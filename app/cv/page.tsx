import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CvWizard from "./CvWizard";
import LogoutButton from "@/components/LogoutButton";

export default async function CvPage({
  searchParams,
}: {
  searchParams: { paid?: string };
}) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
        setAll: () => {},
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");
  if (searchParams.paid !== "true") redirect("/pricing");

  return (
    <div className="container">
      <h1>Lag din CV</h1>
      <CvWizard />
    </div>
  );
}