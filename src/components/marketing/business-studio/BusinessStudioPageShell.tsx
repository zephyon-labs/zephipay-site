import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";

type BusinessStudioPageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function BusinessStudioPageShell({
  eyebrow = "Business",
  title,
  description,
  actions,
  children,
}: BusinessStudioPageShellProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section
        spacing="lg"
        className="relative pt-36 sm:pt-40"
      >
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
              {eyebrow}
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary sm:text-xl">
              {description}
            </p>

            {actions ? (
              <div className="mt-9 flex flex-wrap gap-3">
                {actions}
              </div>
            ) : null}
          </div>

          <div className="mt-12">
            {children}
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
