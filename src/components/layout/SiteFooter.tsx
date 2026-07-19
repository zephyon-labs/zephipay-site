import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Personal", href: "/#personal" },
      { label: "Creators", href: "/#creators" },
      { label: "Business", href: "/#business" },
      {
        label: "Intelligent commerce",
        href: "/#intelligent-commerce",
      },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "ZERA", href: "/zera" },
      { label: "Zephyon Runtime", href: "/runtime" },
      { label: "Telemetry", href: "/#network" },
      { label: "Security", href: "/#security" },
      { label: "Design system", href: "/design" },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "Join beta",
        href: siteConfig.betaUrl,
        external: true,
      },
      {
        label: "Contact",
        href: "mailto:hello@zephipay.com",
        external: true,
      },
      {
        label: "Status",
        href: "/#network",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.11c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.09 1.15A10.77 10.77 0 0 1 12 6.2c.96 0 1.93.13 2.83.38 2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.04.76 2.1v3.05c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M18.9 2.25h3.68l-8.04 9.19L24 21.75h-7.4l-5.8-7.58-6.63 7.58H.48l8.61-9.84L0 2.25h7.59l5.24 6.93 6.07-6.93Zm-1.29 17.68h2.04L6.48 3.97H4.3l13.31 15.96Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr] lg:py-20">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-4"
              aria-label="ZephiPay home"
            >
              <span className="flex h-12 w-16 items-center justify-center rounded-2xl border border-border-default bg-surface-glass px-2">
                <Image
                  src="/brand/logo-z.svg"
                  alt=""
                  width={137}
                  height={69}
                  className="h-auto w-full"
                />
              </span>

              <span>
                <span className="block text-base font-semibold uppercase tracking-[0.12em]">
                  ZephiPay
                </span>

                <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.18em] text-foreground-muted">
                  Powered by Zephyon
                </span>
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-foreground-secondary">
              Modern payments. Without the complexity.
              Built for tomorrow. Useful today.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Open ZephiPay on GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-surface-secondary text-foreground-secondary transition-all duration-200 hover:border-border-strong hover:text-foreground"
              >
                <GitHubIcon />
              </a>

              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noreferrer"
                aria-label="Open ZephiPay on X"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-surface-secondary text-foreground-secondary transition-all duration-200 hover:border-border-strong hover:text-foreground"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                  {group.title}
                </p>

                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={
                          "external" in link && link.external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          "external" in link && link.external
                            ? "noreferrer"
                            : undefined
                        }
                        className="text-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-subtle py-6 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Zephyon Labs. All rights reserved.</p>

          <p>Fast · Secure · Borderless</p>
        </div>
      </Container>
    </footer>
  );
}
