"use client";

import { useEffect, useState } from "react";

import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div
        className={cn(
          "relative mx-auto max-w-7xl",
          "rounded-[1.4rem]",
          "border border-border-default",
          "bg-surface-glass",
          "shadow-[var(--shadow-medium)]",
          "backdrop-blur-2xl",
        )}
      >
        <div className="flex h-16 items-center gap-4 px-4 sm:px-5">
          <BrandMark />

          <DesktopNavigation />

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle showAdaptiveLabel={false} />

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
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
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
            <MenuIcon open={mobileMenuOpen} />
          </button>
        </div>

        <MobileNavigation
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
