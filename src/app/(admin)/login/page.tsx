import Link from "next/link";
import { login, logout } from "../actions/auth.cookie";

export default function Page() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 p-6">
      <section className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-950">Cookie POC</h1>

        <div className="flex gap-3">
          <form action={login}>
            <button
              type="submit"
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white"
            >
              Login
            </button>
          </form>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900"
            >
              Logout
            </button>
          </form>
        </div>

        {/* <div className="flex gap-3 text-sm text-blue-700 underline">
          <Link href="/dashboard">Ir a /dashboard</Link>
          <Link href="/dashboard/vista">Ir a /dashboard/vista</Link>
        </div> */}
      </section>
    </main>
  );
}
