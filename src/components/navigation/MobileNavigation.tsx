"use client";

import Link from "next/link";
import { useState } from "react";

import {
  navigationSections,
  type NavigationSection,
} from "@/components/navigation/navigation-data";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

function MobileSection({
  section,
  expanded,
  onToggle,
  onNavigate,
}: {
  section: NavigationSection;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = `mobile-navigation-${section.label
    .toLowerCase()
    .replaceAll(" ", "-")}`;

  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-4",
          "rounded-xl px-3 py-4 text-left",
          "text-sm font-medium text-foreground",
          "transition-colors hover:bg-surface-secondary",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-brand-primary/45",
        )}
      >
        {section.label}

        <span
          aria-hidden="true"
          className={cn(
            "text-lg font-light text-foreground-muted",
            "transition-transform duration-200",
            expanded && "rotate-45",
          )}
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          "grid overflow-hidden",
          "transition-[grid-template-rows] duration-300",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <div className="px-3 pb-5">
            <p className="max-w-md text-sm leading-6 text-foreground-secondary">
              {section.supportingText}
            </p>

            <Link
              href={section.href}
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-secondary"
            >
              Explore {section.label}
              <span aria-hidden="true">→</span>
            </Link>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {section.groups.map((group) => (
                <div key={group.heading}>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                    {group.heading}
                  </p>

                  <div className="mt-2 grid gap-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onNavigate}
                        className="rounded-xl py-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
                      >
                        <span className="flex items-center gap-2">
                          {link.label}

                          {link.badge ? (
                            <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.12em] text-brand-secondary">
                              {link.badge}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expandedLabel, setExpandedLabel] = useState<string | null>(
    null,
  );

  return (
    <div
      className={cn(
        "grid overflow-hidden transition-[grid-template-rows] duration-300",
        "lg:hidden",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0">
        <div className="border-t border-border-subtle px-4 pb-4 pt-2">
          <nav aria-label="Mobile navigation">
            {navigationSections.map((section) => (
              <MobileSection
                key={section.label}
                section={section}
                expanded={expandedLabel === section.label}
                onToggle={() =>
                  setExpandedLabel((current) =>
                    current === section.label
                      ? null
                      : section.label,
                  )
                }
                onNavigate={onClose}
              />
            ))}
          </nav>

          <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
            <p className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
              Appearance
            </p>

            <ThemeToggle />
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
  );
}
