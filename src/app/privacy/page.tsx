import type { Metadata } from "next";

import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Privacy | ZephiPay",
  description:
    "Review ZephiPay's pre-launch privacy framework, intended data practices, retention principles, and user controls.",
};

const sections = [
  {
    number: "01",
    title: "Scope",
    body:
      "This page describes ZephiPay's current pre-launch privacy direction. It is not a final privacy policy and may change as the company, product, providers, and legal obligations are established.",
  },
  {
    number: "02",
    title: "Information that may be collected",
    body:
      "Depending on the service used, ZephiPay may need account information, contact details, identity-verification records, business information, payment instructions, transaction records, device data, security events, and support communications.",
  },
  {
    number: "03",
    title: "Why information may be used",
    body:
      "Information may be used to create and protect accounts, provide payment services, verify participants, coordinate compliance, evaluate risk, enforce policy, execute settlement, produce receipts, prevent abuse, provide support, and improve reliability.",
  },
  {
    number: "04",
    title: "Verification and compliance providers",
    body:
      "Identity, business verification, sanctions screening, transaction monitoring, banking, card, blockchain, and settlement providers may process information when required to provide a requested service.",
  },
  {
    number: "05",
    title: "Payment and economic-event records",
    body:
      "ZephiPay is designed to preserve structured records including payment identifiers, Runtime decisions, policy outcomes, settlement details, receipts, timestamps, and technical evidence required for reliability, support, reconciliation, and security.",
  },
  {
    number: "06",
    title: "Sharing",
    body:
      "Information should be shared only when necessary to provide the service, comply with law, protect users or the platform, investigate abuse, complete settlement, or support authorized business operations.",
  },
  {
    number: "07",
    title: "Retention",
    body:
      "Retention periods will depend on the type of information, operational needs, security requirements, contractual duties, dispute handling, and applicable legal or regulatory obligations.",
  },
  {
    number: "08",
    title: "Security",
    body:
      "ZephiPay is being designed around access controls, authentication, device and session visibility, policy enforcement, auditability, secure infrastructure, provider oversight, and incident-response procedures.",
  },
  {
    number: "09",
    title: "User controls",
    body:
      "Planned controls include account settings, communication preferences, connected-service management, data export, correction, and deletion requests where legally and operationally permitted.",
  },
  {
    number: "10",
    title: "Blockchain records",
    body:
      "Transactions submitted to a public blockchain may become permanently visible and cannot generally be altered or deleted by ZephiPay. Public addresses and transaction details should not be treated as private.",
  },
  {
    number: "11",
    title: "Children",
    body:
      "ZephiPay is not intended for children. Final eligibility and age requirements will be defined before public production use.",
  },
  {
    number: "12",
    title: "Changes and contact",
    body:
      "This framework will be updated as ZephiPay approaches launch. A formal privacy contact, effective date, company identity, jurisdictional disclosures, and request process will be published before production availability.",
  },
];

export default function PrivacyPage() {
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
              Privacy
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
              ZephiPay is being designed around transparent data use,
              limited collection, secure handling, and meaningful user control.
            </p>

            <div className="mt-8 inline-flex rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-xs font-medium text-foreground-muted">
              Pre-launch draft • Legal review required before production
            </div>
          </header>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
            <aside className="h-fit rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl lg:sticky lg:top-28">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                Important notice
              </p>

              <p className="mt-4 text-sm leading-6 text-foreground-secondary">
                This page is a product and policy framework. It is not a
                final attorney-reviewed privacy policy and does not yet
                identify the final operating company, effective date,
                providers, jurisdictions, or statutory request procedures.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  ["Status", "Draft"],
                  ["Effective date", "Not established"],
                  ["Legal review", "Required"],
                  ["Production use", "Not yet available"],
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
