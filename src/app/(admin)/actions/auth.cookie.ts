'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login() {
  const cookieStore = await cookies();

  cookieStore.set("admin", "1", { path: "/" });

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("admin");

  redirect("/login");
}
