import { Suspense } from "react";

import { CachedBoundaryProbe } from "./_components/cached-boundary-probe";
import { RequestScopedProbe } from "./_components/request-scoped-probe";
import { cacheLife, updateTag } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
const revalidateAction = async () => {
  "use server";
  console.log("se ejecuta action/revalidate");
  updateTag("shared");
};
const ClientButton = () => {
  "use client";
  return <button onClick={revalidateAction}> Revalidar getSHaredPRobe</button>;
};
export default async function Page() {
  await requireAdminSession();
  console.log("se ejecuta page/dashboard");
  return (
    <>
      <h1>ESTO LO PUEDEN VER PORQUE ESTA FUERA DEL CACHE</h1>
      <CachedComponets />;
    </>
  );
}

async function CachedComponets() {
  "use cache: remote";
  cacheLife("max");
  console.log("me renderizo CachedComponets despues de admin session");
  return (
    <div className="grid gap-4">
      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700">
        <p>
          Esta page hace la verificacion real antes de renderizar. Despues
          muestra un bloque request-time y otro cacheado para estudiar el
          boundary.
        </p>
      </section>

      {/* <Suspense
        fallback={
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm text-sky-700">
            Leyendo auth server-side...
          </div>
        }
      >
        <RequestScopedProbe />
      </Suspense> */}

      <Suspense
        fallback={
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
            Resolviendo bloque cacheado...
          </div>
        }
      >
        <CachedBoundaryProbe />
      </Suspense>
      <ClientButton />
    </div>
  );
}
