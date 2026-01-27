export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          CV-Proffen
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Profesjonelle CV-er og jobbsøknader
        </p>

        <div className="mt-8 rounded-xl bg-slate-50 p-6">
          <p className="text-lg font-medium text-slate-900">
            Vi jobber med noe skikkelig bra 🚀
          </p>
          <p className="mt-2 text-slate-600">
            Tjenesten lanseres snart.
          </p>
        </div>

        <footer className="mt-10 text-sm text-slate-400">
          © 2026 CV-Proffen
        </footer>
      </div>
    </main>
  );
}