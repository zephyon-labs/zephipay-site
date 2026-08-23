"use client";

import { usePathname } from "next/navigation";

import { authenticatedAccountCta } from "@/lib/accountSessionCta";
import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";
import { startLogoutTransport } from "@/lib/auth/logoutTransport";

export function AccountSession({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const { account, status, beginLogout } = useAccountHydration();
  const submitLogout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLogoutTransport(beginLogout);
  };

  if (account) {
    const cta = authenticatedAccountCta(pathname);
    return (
      <div className={`flex items-center gap-2 text-xs ${mobile ? "w-full justify-between" : "shrink-0"}`} aria-label="Signed-in account">
        <a className="shrink-0 whitespace-nowrap rounded-full bg-brand-primary px-3 py-2 text-sm text-white" href={cta.href}>{cta.label}</a>
        <form className="shrink-0" action="/api/auth/logout" method="post" onSubmit={submitLogout}><button className="whitespace-nowrap rounded-full border border-border-default px-3 py-2 hover:bg-surface-elevated" type="submit">Log out</button></form>
      </div>
    );
  }
  if (status === "loading") return <div className={`flex items-center gap-2 text-sm text-foreground-secondary ${mobile ? "w-full" : ""}`} aria-busy="true" aria-label="Checking sign-in status">Checking sign-in…</div>;
  if (status === "signing-out") return <div className={`flex items-center gap-2 text-sm text-foreground-secondary ${mobile ? "w-full" : ""}`} aria-live="polite">Signing out…</div>;
  if (status === "reauthentication-required") return <div className={`flex items-center gap-2 ${mobile ? "w-full justify-between" : ""}`} aria-label="Session expired">
    <span className="text-sm text-foreground-secondary">Session expired</span>
    <a className="rounded-full bg-brand-primary px-3 py-2 text-sm text-white" href="/auth/login">Sign in again</a>
  </div>;
  if (status === "authenticated-unavailable") {
    const cta = authenticatedAccountCta(pathname);
    return <div className={`flex items-center gap-2 text-xs ${mobile ? "w-full justify-between" : "shrink-0"}`} aria-label="Signed-in session; account details unavailable">
      <a className="shrink-0 whitespace-nowrap rounded-full bg-brand-primary px-3 py-2 text-sm text-white" href={cta.href}>{cta.label}</a>
      <form className="shrink-0" action="/api/auth/logout" method="post" onSubmit={submitLogout}><button className="whitespace-nowrap rounded-full border border-border-default px-3 py-2 hover:bg-surface-elevated" type="submit">Log out</button></form>
    </div>;
  }
  if (status === "error") return <div className={`text-sm text-foreground-secondary ${mobile ? "w-full" : ""}`}>Sign-in status unavailable</div>;
  return (
    <div className={`flex items-center gap-2 ${mobile ? "w-full justify-between" : ""}`}>
      <a className="text-sm text-foreground hover:underline" href="/auth/login">Sign in</a>
      <a className="rounded-full bg-brand-primary px-3 py-2 text-sm text-white" href="/auth/login?screen_hint=signup&returnTo=%2Fpersonal%2Fidentity">Create account</a>
    </div>
  );
}
