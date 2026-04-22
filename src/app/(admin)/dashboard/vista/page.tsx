import { cacheLife } from "next/cache";
import Link from "next/link";

export default async function Page() {
  console.log("se ejecuta page/dashboard/vista");
  return (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700">
      <CachedComponent />
      <p>
        Esta subruta tambien exige verificacion server-side real y depende del
        mismo guard que <code>/dashboard</code>.
      </p>
      <p className="mt-3">
        <Link className="text-blue-700 underline" href="/dashboard">
          Volver a la POC principal
        </Link>
      </p>
    </section>
  );
}
async function CachedComponent() {
  "use cache: remote";
  cacheLife("max");
  console.log("me renderizo CachedComponent en vista");
  return <h1>ESTO esta cacheado</h1>;
}
