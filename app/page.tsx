"use client";

import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    // Kun UI – ingen backend
    setSubmitted(true);
    setEmail("");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          CV-Proffen
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Profesjonelle CV-er og jobbsøknader – laget med AI
        </p>

        <div className="mt-8 rounded-xl bg-slate-50 p-6">
          <p className="text-lg font-medium text-slate-900">
            Vi lanserer snart 🚀
          </p>
          <p className="mt-2 text-slate-600">
            Vil du få beskjed når vi åpner?
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Din e-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />

              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-6 py-2 text-white font-medium hover:bg-slate-800 transition"
              >
                Gi meg beskjed
              </button>
            </form>
          ) : (
            <p className="mt-4 text-green-600 font-medium">
              Takk! Du får beskjed ved lansering 🎉
            </p>
          )}
        </div>

        <footer className="mt-10 text-sm text-slate-400">
          © 2026 CV-Proffen
        </footer>
      </div>
    </main>
  );
}