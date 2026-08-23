import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { authLoginHref, type ProtectedReturnTo } from "@/lib/auth/navigation";

export function SignedOutGate({ returnTo, title = "Sign in to continue", description = "This account-only surface stays closed until you deliberately start authentication." }: Readonly<{
  returnTo: ProtectedReturnTo;
  title?: string;
  description?: string;
}>) {
  return <section className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] sm:p-10" aria-labelledby="signed-out-gate-title">
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">SUPERTEAM CONTROLLED BETA</p>
    <h1 id="signed-out-gate-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h1>
    <p className="mt-4 max-w-2xl leading-7 text-foreground-secondary">{description}</p>
    <a className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-secondary/30 bg-brand-primary px-5 text-sm font-medium text-brand-contrast" href={authLoginHref(returnTo)}>Sign in to continue</a>
  </section>;
}

export function SignedOutProtectedPage({ returnTo, title }: Readonly<{ returnTo: ProtectedReturnTo; title?: string }>) {
  return <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
    <SiteHeader /><AmbientBackground />
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-36 sm:px-6 sm:pt-40"><SignedOutGate returnTo={returnTo} title={title} /></div>
  </main>;
}
