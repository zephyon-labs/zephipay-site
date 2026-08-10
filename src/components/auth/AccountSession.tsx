"use client";

import { usePathname } from "next/navigation";

import { authenticatedAccountCta } from "@/lib/accountSessionCta";
import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";

export function AccountSession({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const { account, status, clear } = useAccountHydration();

  if (account) {
    const cta = authenticatedAccountCta(pathname);
    return (
      <div className={`flex items-center gap-2 text-xs ${mobile ? "w-full justify-between" : ""}`} aria-label="Signed-in account">
        <span className="hidden text-foreground-secondary xl:inline">Signed in · Beta account · Verification pending</span>
        <a className="rounded-full bg-brand-primary px-3 py-2 text-sm text-white" href={cta.href}>{cta.label}</a>
        <form action="/api/auth/logout" method="post" onSubmit={clear}><button className="rounded-full border border-border-default px-3 py-2 hover:bg-surface-elevated" type="submit">Log out</button></form>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-2 ${mobile ? "w-full justify-between" : ""}`} aria-busy={status === "loading"}>
      <a className="text-sm text-foreground hover:underline" href="/auth/login">Sign in</a>
      <a className="rounded-full bg-brand-primary px-3 py-2 text-sm text-white" href="/auth/login?screen_hint=signup&returnTo=%2Fpersonal%2Fidentity">Create account</a>
    </div>
  );
}
