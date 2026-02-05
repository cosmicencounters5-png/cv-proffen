"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [greetingName, setGreetingName] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoggedIn(false);
        setGreetingName(null);
        setTimeLeft(null);
        return;
      }

      setLoggedIn(true);

      const name =
        (user.user_metadata?.full_name as string) ||
        (user.user_metadata?.name as string) ||
        null;

      setGreetingName(name);

      const { data: entitlement } = await supabase
        .from("user_entitlements")
        .select("expires_at")
        .eq("user_id", user.id)
        .single();

      if (!entitlement?.expires_at) return;

      const expires = new Date(entitlement.expires_at);
      const now = new Date();
      const diffMs = expires.getTime() - now.getTime();

      if (diffMs <= 0) return;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);

      if (days >= 1) {
        setTimeLeft(`${days} dag${days > 1 ? "er" : ""} igjen`);
      } else {
        setTimeLeft(`${hours} time${hours !== 1 ? "r" : ""} igjen`);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function logout() {
    await supabase.auth.signOut();
    setLoggedIn(false);
    router.push("/");
    router.refresh();
  }

  return (
    <html lang="no">
      <body>

        {/* ================= HEADER ================= */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.8)",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0.9rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* LOGO */}
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/A670EAF8-1A82-42CD-9CB9-687EA383339E.png"
                alt="CV-Proffen"
                width={240}
                height={64}
                priority
                style={{
                  height: "42px",
                  width: "auto",
                }}
              />
            </Link>

            {/* NAV */}
            {loggedIn === true && (
              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  fontSize: "0.95rem",
                }}
              >
                <span style={{ color: "#64748b" }}>
                  God dag{greetingName ? `, ${greetingName}` : ""}
                  {timeLeft ? ` · ${timeLeft}` : ""}
                </span>

                <Link href="/cv">CV</Link>

                <button
                  onClick={logout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#ef4444",
                  }}
                >
                  Logg ut
                </button>
              </nav>
            )}

            {loggedIn === false && (
              <nav style={{ display: "flex", gap: "0.75rem" }}>
                <Link href="/login">Logg inn</Link>

                <Link
                  href="/register"
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "0.45rem 1rem",
                    borderRadius: "999px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Kom i gang
                </Link>
              </nav>
            )}
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main>{children}</main>

        {/* ================= FOOTER ================= */}
        <footer
          style={{
            marginTop: "4rem",
            padding: "3rem 1rem",
            background: "#f1f5f9",
            borderTop: "1px solid #e5e7eb",
            fontSize: "0.9rem",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            <div>
              <strong>CV-Proffen</strong>
              <p>
                Profesjonell CV og jobbsøknad på norsk.
                Basert kun på dine egne opplysninger.
              </p>
            </div>

            <div>
              <p><Link href="/personvern">Personvern</Link></p>
              <p><Link href="/lage-cv">Hvordan lage CV</Link></p>
              <p><Link href="/jobbsoknad">Hvordan skrive jobbsøknad</Link></p>
              <p><Link href="/cv-offentlig-sektor">CV i offentlig sektor</Link></p>
            </div>
          </div>

          <div
            style={{
              maxWidth: "1200px",
              margin: "2rem auto 0",
              paddingTop: "1rem",
              borderTop: "1px solid #e5e7eb",
              fontSize: "0.8rem",
              color: "#64748b",
            }}
          >
            © {new Date().getFullYear()} CV-Proffen
          </div>
        </footer>

      </body>
    </html>
  );
}