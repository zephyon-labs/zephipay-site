import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";

type SecurityStudioPageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function SecurityStudioPageShell({
  title,
  description,
  children,
  actions,
}: SecurityStudioPageShellProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section className="pb-20 pt-28 sm:pt-32 lg:pb-28">
        <Container>
          <header className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-secondary">
                Security
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary">
                {description}
              </p>
            </div>

            {actions ? (
              <div className="flex shrink-0 flex-wrap gap-3">
                {actions}
              </div>
            ) : null}
          </header>

          {children}
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
