import { requireAdminSession } from "@/lib/auth";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  console.log("");
  console.log("--------------------");
  console.log("se ejecuta layout/dashboard");
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-zinc-200 bg-zinc-100 p-5 text-sm text-zinc-600">
          Cargando contenido del dashboard...
        </div>
      }
    >
      <LayoutAdmin>
        <CachedComponent>{children}</CachedComponent>
      </LayoutAdmin>
    </Suspense>
  );
}
async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  await requireAdminSession();
  console.log("se ejecuta layout/dashboard/admin");
  return <>{children}</>;
}
async function CachedComponent({ children }: { children: React.ReactNode }) {
  "use cache: remote";
  cacheLife("max");

  console.log("se ejecuta layout/dashboard/cached");
  return (
    <main className="flex flex-1 justify-center bg-zinc-50 p-6">
      <div className="flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Dashboard POC
          </p>
          <h1 className="text-2xl font-semibold text-zinc-950">
            Proxy + lectura server-side + bloque cacheado
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            El proxy corta temprano. Cada page vuelve a verificar del lado del
            servidor. Lo cacheado vive separado y no lee cookies.
          </p>
        </header>
        {children}
      </div>
    </main>
  );
}
