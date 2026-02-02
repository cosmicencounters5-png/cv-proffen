// app/layout.tsx

"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
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
    router.push("/");
    router.refresh();
  }

  return (
    <html lang="no">
      <body>
        {/* HEADER */}
        <header
          style={{
            width: "100%",
            padding: "1rem",
            borderBottom: "1px solid #eee",
            background: "white",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{
                fontWeight: 600,
                textDecoration: "none",
                color: "#111",
              }}
            >
              CV-Proffen
            </Link>

            {loggedIn && (
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                  href="/cv"
                  style={{
                    textDecoration: "none",
                    color: "#111",
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
                    color: "#c00",
                    fontWeight: 500,
                  }}
                >
                  Logg ut
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        {children}
      </body>
    </html>
  );
}
