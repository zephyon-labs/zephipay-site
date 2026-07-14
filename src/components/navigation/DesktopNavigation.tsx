"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  navigationSections,
  type NavigationSection,
} from "@/components/navigation/navigation-data";
import { cn } from "@/utils/cn";

function MegaMenu({
  section,
  onNavigate,
}: {
  section: NavigationSection;
  onNavigate: () => void;
}) {
  return (
    <div
      id={`navigation-panel-${section.label
        .toLowerCase()
        .replaceAll(" ", "-")}`}
      className={cn(
        "zephipay-mega-menu",
        "absolute left-1/2 top-[calc(100%+1rem)] z-50",
        "w-[min(72rem,calc(100vw-3rem))]",
        "isolate overflow-hidden rounded-[1.75rem]",
        "border border-border-default",
        "bg-background",
        "shadow-[0_32px_90px_rgba(0,0,0,0.48)]",
        "backdrop-blur-3xl",
      )}
    >
      <div className="grid lg:grid-cols-[0.68fr_2fr]">
        <div className="border-b border-border-subtle bg-surface-secondary/35 p-7 lg:border-b-0 lg:border-r">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            {section.eyebrow}
          </p>

          <p className="mt-5 text-xl font-semibold leading-tight tracking-[-0.035em] text-foreground">
            {section.tagline}
          </p>

          <p className="mt-4 max-w-sm text-sm leading-6 text-foreground-secondary">
            {section.supportingText}
          </p>

          <Link
            href={section.href}
            onClick={onNavigate}
            className={cn(
              "mt-7 inline-flex items-center gap-2",
              "text-sm font-medium text-foreground",
              "transition-colors hover:text-brand-primary",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-brand-primary/45",
            )}
          >
            Explore {section.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-7 p-7 md:grid-cols-3">
          {section.groups.map((group) => (
            <div key={group.heading}>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                {group.heading}
              </p>

              <div className="mt-3 grid gap-1">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    className={cn(
                      "group rounded-2xl px-3 py-3",
                      "transition-colors duration-200",
                      "hover:bg-surface-secondary",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-brand-primary/45",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {link.label}
                      </span>

                      {link.badge ? (
                        <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-brand-secondary">
                          {link.badge}
                        </span>
                      ) : null}
                    </span>

                    {link.description ? (
                      <span className="mt-1 block text-xs leading-5 text-foreground-muted transition-colors group-hover:text-foreground-secondary">
                        {link.description}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-border-subtle px-7 py-4">
        <p className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
          Powered by Zephyon
        </p>

        <p className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
          Fast • Secure • Borderless
        </p>
      </div>
    </div>
  );
}

export function DesktopNavigation() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  function cancelScheduledClose() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    cancelScheduledClose();

    closeTimerRef.current = setTimeout(() => {
      setActiveLabel(null);
      closeTimerRef.current = null;
    }, 180);
  }

  function openSection(label: string) {
    cancelScheduledClose();
    setActiveLabel(label);
  }

  const activeSection =
    navigationSections.find(
      (section) => section.label === activeLabel,
    ) ?? null;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      ) {
        setActiveLabel(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveLabel(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={navigationRef}
      className="relative ml-auto hidden lg:block"
      onMouseEnter={cancelScheduledClose}
      onMouseLeave={scheduleClose}
    >
      <nav
        aria-label="Primary navigation"
        className="flex items-center gap-1"
      >
        {navigationSections.map((section) => {
          const active = activeLabel === section.label;
          const panelId = `navigation-panel-${section.label
            .toLowerCase()
            .replaceAll(" ", "-")}`;

          return (
            <button
              key={section.label}
              type="button"
              aria-expanded={active}
              aria-controls={panelId}
              onMouseEnter={() => openSection(section.label)}
              onFocus={() => openSection(section.label)}
              onClick={() =>
                setActiveLabel((current) =>
                  current === section.label
                    ? null
                    : section.label,
                )
              }
              className={cn(
                "rounded-full px-3 py-2",
                "text-sm transition-colors duration-200",
                active
                  ? "bg-surface-secondary text-foreground"
                  : "text-foreground-secondary hover:bg-surface-secondary hover:text-foreground",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
              )}
            >
              {section.label}
            </button>
          );
        })}
      </nav>

      {activeSection ? (
        <MegaMenu
          section={activeSection}
          onNavigate={() => setActiveLabel(null)}
        />
      ) : null}
    </div>
  );
}
