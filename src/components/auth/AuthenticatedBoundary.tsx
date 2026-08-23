"use client";

import { Fragment, type ReactNode } from "react";

import { SignedOutGate } from "@/components/auth/SignedOutGate";
import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";
import type { ProtectedReturnTo } from "@/lib/auth/navigation";

export function AuthenticatedBoundary({ children, fallback = null }: Readonly<{ children: ReactNode; fallback?: ReactNode }>) {
  const { boundaryKey } = useAccountHydration();
  return boundaryKey ? <Fragment key={boundaryKey}>{children}</Fragment> : fallback;
}

export function ProtectedAccountBoundary({ children, returnTo }: Readonly<{
  children: ReactNode;
  returnTo: ProtectedReturnTo;
}>) {
  const { boundaryKey, status, refresh } = useAccountHydration();
  if (boundaryKey) return <Fragment key={boundaryKey}>{children}</Fragment>;
  if (status === "loading") return <BoundaryNotice message="Checking your account session…" />;
  if (status === "signing-out") return <BoundaryNotice message="Signing out and clearing account state…" />;
  if (status === "reauthentication-required") return <SignedOutGate returnTo={returnTo} title="Your session expired" description="Sign in deliberately to establish a new application session. No account data is being shown." />;
  if (status === "authenticated-unavailable" || status === "error") return <BoundaryNotice message="Your account session could not be verified. No account data is being shown." action={() => void refresh()} />;
  return <SignedOutGate returnTo={returnTo} />;
}

function BoundaryNotice({ message, action }: Readonly<{ message: string; action?: () => void }>) {
  return <section className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)]" role="status">
    <p className="text-foreground-secondary">{message}</p>
    {action ? <button type="button" className="mt-5 min-h-11 rounded-full border border-border-default px-5 text-sm font-medium" onClick={action}>Try again</button> : null}
  </section>;
}
