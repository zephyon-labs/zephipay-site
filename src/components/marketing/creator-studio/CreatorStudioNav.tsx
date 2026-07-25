"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { creatorStudioRoutes } from "./config";
import { cn } from "@/utils/cn";

export function CreatorStudioNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Creator Studio"
      className="overflow-x-auto"
    >
      <div className="flex min-w-max gap-2 rounded-[1.4rem] border border-border-default bg-surface-glass p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        {creatorStudioRoutes.map((route) => {
          const active =
            route.href === "/creators"
              ? pathname === route.href
              : pathname.startsWith(route.href);

          return (
            <Link
              key={route.href}
              href={route.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-2xl px-4 py-2.5 text-sm font-medium",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
                active
                  ? "bg-foreground text-background shadow-sm"
                  : "text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
              )}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
