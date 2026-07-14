import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";

type LegalPageProps = {
  title: string;
  description: string;
};

export function LegalPage({
  title,
  description,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <Container>
        <article className="mx-auto max-w-3xl pb-24 pt-40">
          <p className="text-sm uppercase tracking-[0.16em] text-brand-secondary">
            ZephiPay legal
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
            {title}
          </h1>

          <p className="mt-8 text-lg leading-8 text-foreground-secondary">
            {description}
          </p>

          <div className="mt-12 rounded-3xl border border-border-default bg-surface-glass p-8">
            <p className="text-sm leading-7 text-foreground-secondary">
              This document is currently a pre-launch placeholder. A complete,
              jurisdictionally reviewed version will be published before
              ZephiPay handles production customer activity.
            </p>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex text-sm font-medium text-brand-primary"
          >
            ← Return to ZephiPay
          </Link>
        </article>
      </Container>
    </main>
  );
}
