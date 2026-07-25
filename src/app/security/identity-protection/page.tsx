import type { Metadata } from "next";

import {
  IdentityProtectionWorkspace,
  SecurityStudioPageShell,
} from "@/components/marketing/security-studio";

export const metadata: Metadata = {
  title: "Identity Protection | ZephiPay Security",
  description:
    "Manage authentication, trusted devices, sessions, recovery, access history, and account-security alerts.",
};

export default function IdentityProtectionPage() {
  return (
    <SecurityStudioPageShell
      title="Identity Protection"
      description="Protect account access through authentication, trusted devices, session controls, recovery methods, and visible security history."
    >
      <IdentityProtectionWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Strong authentication
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Protect access before activity begins.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Passwords, passkeys, multifactor authentication, and sign-in
            requirements can work together to reduce unauthorized access.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Visible access
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Know where the account is active.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Devices, sessions, sign-ins, and security events should remain
            visible so suspicious access can be identified and revoked.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Recovery readiness
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Prepare before access is lost.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Recovery methods should be configured intentionally and
            protected with the same care as primary authentication.
          </p>
        </article>
      </section>
    </SecurityStudioPageShell>
  );
}
