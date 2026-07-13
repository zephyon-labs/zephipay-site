"use client";

import Link from "next/link";
import { useState } from "react";

import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  primaryNavigation,
  utilityNavigation,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
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
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M18.9 2.25h3.68l-8.04 9.19L24 21.75h-7.4l-5.8-7.58-6.63 7.58H.48l8.61-9.84L0 2.25h7.59l5.24 6.93 6.07-6.93Zm-1.29 17.68h2.04L6.48 3.97H4.3l13.31 15.96Z" />
    </svg>
  );
}

function MenuIcon({
  open,
}: {
  open: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-5 w-5"
    >
      <span
        className={cn(
          "absolute left-0 top-1.5 h-px w-5 bg-current",
          "transition-transform duration-200",
          open && "translate-y-1 rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-3.5 h-px w-5 bg-current",
          "transition-transform duration-200",
          open && "-translate-y-1 -rotate-45",
        )}
      />
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div
        className={cn(
          "mx-auto max-w-7xl",
          "rounded-[1.4rem]",
          "border border-border-default",
          "bg-surface-glass",
          "shadow-[var(--shadow-medium)]",
          "backdrop-blur-2xl",
        )}
      >
        <div className="flex h-16 items-center gap-4 px-4 sm:px-5">
          <BrandMark />

          <nav
            aria-label="Primary navigation"
            className="ml-auto hidden items-center gap-1 lg:flex"
          >
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2",
                  "text-sm text-foreground-secondary",
                  "transition-colors duration-200",
                  "hover:bg-surface-secondary",
                  "hover:text-foreground",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-primary/45",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Button
              href={siteConfig.social.github}
              external
              variant="ghost"
              size="icon"
              aria-label="Open ZephiPay on GitHub"
            >
              <GitHubIcon />
            </Button>

            <Button
              href={siteConfig.social.x}
              external
              variant="ghost"
              size="icon"
              aria-label="Open ZephiPay on X"
            >
              <XIcon />
            </Button>

            <ThemeToggle />

            <Button
              href={siteConfig.betaUrl}
              external
              size="sm"
            >
              Join beta
            </Button>
          </div>

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "ml-auto inline-flex h-10 w-10 items-center justify-center",
              "rounded-full border border-border-default",
              "bg-surface-secondary text-foreground",
              "transition-colors duration-200",
              "hover:bg-surface-elevated",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-brand-primary/45",
              "lg:hidden",
            )}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-300",
            "lg:hidden",
            menuOpen
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <div className="border-t border-border-subtle px-4 pb-4 pt-3">
              <nav
                aria-label="Mobile navigation"
                className="grid gap-1"
              >
                {[...primaryNavigation, ...utilityNavigation].map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-3",
                        "text-sm text-foreground-secondary",
                        "transition-colors duration-200",
                        "hover:bg-surface-secondary",
                        "hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border-subtle pt-4">
                <Button
                  href={siteConfig.social.github}
                  external
                  variant="glass"
                  size="icon"
                  aria-label="Open ZephiPay on GitHub"
                >
                  <GitHubIcon />
                </Button>

                <Button
                  href={siteConfig.social.x}
                  external
                  variant="glass"
                  size="icon"
                  aria-label="Open ZephiPay on X"
                >
                  <XIcon />
                </Button>

                <ThemeToggle className="ml-auto" />
              </div>

              <Button
                href={siteConfig.betaUrl}
                external
                className="mt-4 w-full"
              >
                Join the ZephiPay beta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
