import type { Metadata } from "next";

import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Terms | ZephiPay",
  description:
    "Review ZephiPay's pre-launch terms framework covering access, accounts, payments, acceptable use, risks, and service limitations.",
};

const sections = [
  {
    number: "01",
    title: "Draft status",
    body:
      "These terms are a pre-launch framework only. They are not final, do not create production service availability, and must be reviewed and approved by qualified legal counsel before public use.",
  },
  {
    number: "02",
    title: "Eligibility",
    body:
      "Final terms will define age, location, identity, business, authority, and other eligibility requirements for individuals, organizations, developers, and autonomous systems.",
  },
  {
    number: "03",
    title: "Accounts and credentials",
    body:
      "Users will be responsible for accurate account information, protecting credentials and recovery methods, controlling authorized devices and sessions, and promptly reporting suspected unauthorized access.",
  },
  {
    number: "04",
    title: "Verification",
    body:
      "Access to certain features may require identity verification, business verification, sanctions screening, source-of-funds information, transaction review, or additional documentation.",
  },
  {
    number: "05",
    title: "Payments and settlement",
    body:
      "Payment availability, timing, reversibility, settlement, fees, limits, supported assets, networks, banking providers, card providers, and blockchain rails will depend on the applicable service and provider conditions.",
  },
  {
    number: "06",
    title: "Digital assets and blockchain risks",
    body:
      "Digital-asset transactions may involve volatility, network congestion, irreversible transfers, smart-contract risk, wallet compromise, provider failure, regulatory uncertainty, and loss caused by incorrect addresses or unsupported assets.",
  },
  {
    number: "07",
    title: "Acceptable use",
    body:
      "Users may not use ZephiPay for unlawful activity, fraud, deception, sanctions evasion, abuse, unauthorized access, harmful automation, intellectual-property violations, prohibited goods or services, or activity that threatens the platform or its participants.",
  },
  {
    number: "08",
    title: "AI agents and automated activity",
    body:
      "Users deploying agents or automated systems will be responsible for permissions, budgets, counterparties, tools, credentials, policy configuration, supervision, and the economic actions performed by those systems.",
  },
  {
    number: "09",
    title: "Policies, holds, and reviews",
    body:
      "ZephiPay may apply transaction limits, approval requirements, risk controls, compliance checks, settlement holds, account restrictions, or manual review when required for security, law, provider obligations, or platform integrity.",
  },
  {
    number: "10",
    title: "Fees",
    body:
      "Applicable platform, processing, network, settlement, conversion, withdrawal, subscription, or third-party fees will be disclosed before the relevant service is offered or transaction is submitted.",
  },
  {
    number: "11",
    title: "Service availability",
    body:
      "Features may be modified, suspended, delayed, limited, or unavailable because of maintenance, providers, networks, law, security concerns, testing, technical failure, or events outside ZephiPay's control.",
  },
  {
    number: "12",
    title: "Suspension and termination",
    body:
      "Final terms will define when access may be restricted or terminated, including suspected abuse, legal requirements, unpaid obligations, security threats, unsupported activity, or violations of platform rules.",
  },
  {
    number: "13",
    title: "Intellectual property",
    body:
      "ZephiPay, Zephyon Runtime, software, interfaces, documentation, branding, and related materials will remain protected by applicable intellectual-property rights, subject to any published licenses.",
  },
  {
    number: "14",
    title: "Disclaimers and liability",
    body:
      "Final attorney-reviewed terms will define warranties, disclaimers, limitations of liability, indemnification, provider responsibilities, dispute procedures, governing law, and any mandatory consumer protections.",
  },
  {
    number: "15",
    title: "Changes and contact",
    body:
      "These terms will be revised before launch to identify the operating company, effective date, governing law, contact information, dispute process, service-specific terms, and legally required notices.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />

      <Section className="pb-20 pt-28 sm:pt-32 lg:pb-28">
        <Container>
          <header className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-secondary">
              Legal
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Terms
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
              This pre-launch framework outlines the responsibilities,
              risks, restrictions, and service limitations expected to
              govern future ZephiPay access.
            </p>

            <div className="mt-8 inline-flex rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-xs font-medium text-foreground-muted">
              Pre-launch draft • Not final terms of service
            </div>
          </header>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
            <aside className="h-fit rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl lg:sticky lg:top-28">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Important notice
              </p>

              <p className="mt-4 text-sm leading-6 text-foreground-secondary">
                These sections are planning language, not final legal
                terms. They should not be used as production terms until
                the company structure, services, jurisdictions, providers,
                consumer obligations, and counsel review are complete.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  ["Status", "Draft"],
                  ["Binding effect", "None intended"],
                  ["Effective date", "Not established"],
                  ["Legal review", "Required"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border-subtle bg-background/45 p-4"
                  >
                    <p className="text-xs text-foreground-muted">
                      {label}
                    </p>

                    <p className="mt-2 text-sm font-medium text-foreground">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="space-y-5">
              {sections.map((section) => (
                <article
                  key={section.number}
                  className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-7"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                    {section.number}
                  </p>

                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                    {section.title}
                  </h2>

                  <p className="mt-4 leading-7 text-foreground-secondary">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
