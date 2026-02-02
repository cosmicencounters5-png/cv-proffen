// app/login/page.tsx

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default function LoginPage() {
  async function signIn(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return;
    }

    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return;
    }

    redirect("/pricing");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        action={signIn}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem" }}>Logg inn</h1>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          E-post
          <input
            name="email"
            type="email"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1.5rem" }}>
          Passord
          <input
            name="password"
            type="password"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logg inn
        </button>
      </form>
    </main>
  );
}
