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
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setLoggedIn(true);
        setFullName(
          (user.user_metadata?.full_name as string) || null
        );
      } else {
        setLoggedIn(false);
        setFullName(null);
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function logout() {
    await supabase.auth.signOut();
    setLoggedIn(false);
    setFullName(null);
    router.push("/");
    router.refresh();
  }

  return (
    <html lang="no">
      <body style={{ background: "#f8f9fb", margin: 0 }}>
        {/* HEADER */}
        <header
          style={{
            background: "white",
            borderBottom: "1px solid #e6e8ec",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "1.25rem 1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* LOGO */}
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/A670EAF8-1A82-42CD-9CB9-687EA383339E.png"
                alt="CV-Proffen"
                width={140}
                height={32}
                priority
              />
            </Link>

            {/* NAV */}
            {loggedIn === true && (
              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                {fullName && (
                  <span
                    style={{
                      fontWeight: 500,
                      color: "#444",
                    }}
                  >
                    God dag, {fullName}
                  </span>
                )}

                <Link
                  href="/cv"
                  style={{
                    textDecoration: "none",
                    color: "#111",
                    fontWeight: 500,
                  }}
                >
                  Gå til CV
                </Link>

                <button
                  onClick={logout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#b00020",
                    fontWeight: 500,
                    padding: 0,
                  }}
                >
                  Logg ut
                </button>
              </nav>
            )}

            {loggedIn === false && (
              <nav style={{ display: "flex", gap: "1rem" }}>
                <Link
                  href="/login"
                  style={{
                    textDecoration: "none",
                    color: "#111",
                    fontWeight: 500,
                  }}
                >
                  Logg inn
                </Link>

                <Link
                  href="/register"
                  style={{
                    textDecoration: "none",
                    background: "#111",
                    color: "white",
                    padding: "0.45rem 0.9rem",
                    borderRadius: "6px",
                    fontWeight: 600,
                  }}
                >
                  Registrer deg
                </Link>
              </nav>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: "4rem",
            padding: "3rem 1rem",
            background: "#f1f3f7",
            borderTop: "1px solid #e6e8ec",
            fontSize: "0.9rem",
            color: "#444",
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
              <strong style={{ fontSize: "1rem" }}>CV-Proffen</strong>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.6 }}>
                Profesjonell CV og jobbsøknad på norsk.
                <br />
                Basert kun på dine egne opplysninger.
              </p>
            </div>

            <div>
              <p>
                <Link href="/lage-cv">Hvordan lage CV</Link>
              </p>
              <p>
                <Link href="/jobbsoknad">Hvordan skrive jobbsøknad</Link>
              </p>
              <p>
                <Link href="/cv-offentlig-sektor">
                  CV i offentlig sektor
                </Link>
              </p>
            </div>
          </div>

          <div
            style={{
              maxWidth: "1200px",
              margin: "2rem auto 0",
              paddingTop: "1rem",
              borderTop: "1px solid #ddd",
              fontSize: "0.8rem",
              color: "#666",
            }}
          >
            © {new Date().getFullYear()} CV-Proffen
          </div>
        </footer>
      </body>
    </html>
  );
}