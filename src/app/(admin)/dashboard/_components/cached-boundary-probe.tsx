import { requireAdminSession } from "@/lib/auth";
import { cacheLife, cacheTag } from "next/cache";

type SharedProbe = {
  builtAt: string;
  marker: string;
};

async function getSharedProbe(): Promise<SharedProbe> {
  "use cache: remote";

  cacheLife("max");
  cacheTag("shared");
  console.log("se ejecuta componente getSharedProbe");
  return {
    builtAt: new Date().toISOString(),
    marker: crypto.randomUUID().slice(0, 8),
  };
}

export async function CachedBoundaryProbe() {
  // await requireAdminSession();

  const probe = await getSharedProbe();
  console.log(" se ejecuta componente CachedBoundaryProbe");

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-950">
      <h2 className="text-base font-semibold">Bloque cacheado compartido</h2>
      <p className="mt-2">
        Este bloque se resuelve con <code>use cache</code> y no toca cookies.
      </p>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="font-medium">builtAt</dt>
          <dd className="font-mono">{probe.builtAt}</dd>
        </div>
        <div>
          <dt className="font-medium">marker</dt>
          <dd className="font-mono">{probe.marker}</dd>
        </div>
      </dl>
      <p className="mt-4 text-emerald-900/80">
        Si estos valores se repiten entre requests o usuarios, es esperable: el
        cache es compartido, pero este scope no leyo auth request-time.
      </p>
    </section>
  );
}
