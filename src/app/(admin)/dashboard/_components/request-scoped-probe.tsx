import { cookies } from "next/headers";

export async function RequestScopedProbe() {
  const adminCookie = (await cookies()).get("admin")?.value ?? "missing";

  return (
    <section className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm text-sky-950">
      <h2 className="text-base font-semibold">Chequeo real server-side</h2>
      <p className="mt-2">
        Este bloque vuelve a leer la cookie en request-time, fuera del scope
        cacheado.
      </p>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="font-medium">admin cookie</dt>
          <dd className="font-mono">{adminCookie}</dd>
        </div>
        <div>
          <dt className="font-medium">source</dt>
          <dd className="font-mono">cookies() in Server Component</dd>
        </div>
      </dl>
    </section>
  );
}
