import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireAdminSession = cache(async () => {
  const isAdmin = (await cookies()).get("admin")?.value === "1";

  if (!isAdmin) {
    redirect("/login");
  }

  return { isAdmin: true as const };
});
