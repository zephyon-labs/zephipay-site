"use client";

import type { ReactNode } from "react";

import {
  type ThemePreference,
  useTheme,
} from "@/components/providers/ThemeProvider";
import { cn } from "@/utils/cn";

type ThemeOption = {
  value: ThemePreference;
  label: string;
  icon: ReactNode;
};

const iconClasses = "h-4 w-4";

const options: ThemeOption[] = [
  {
    value: "light",
    label: "Day theme",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={iconClasses}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3 3.9 3.9M20.1 20.1l-1.4-1.4M18.7 5.3l1.4-1.4M3.9 20.1l1.4-1.4" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Night theme",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={iconClasses}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20.2 15.4A8.2 8.2 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "Use system theme",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={iconClasses}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    value: "adaptive",
    label: "Adapt to local time",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={iconClasses}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2M4.5 12h15" />
      </svg>
    ),
  },
];

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({
  className,
}: ThemeToggleProps) {
  const {
    preference,
    dayPeriod,
    setPreference,
  } = useTheme();

  return (
    <div className={cn("flex flex-col items-end gap-2", className)}>
      <div
        className={cn(
          "inline-flex items-center rounded-full",
          "border border-border-default",
          "bg-surface-glass p-1",
          "shadow-[var(--shadow-soft)]",
          "backdrop-blur-xl",
        )}
        aria-label="Theme preference"
      >
        {options.map((option) => {
          const isActive = preference === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setPreference(option.value)}
              aria-label={option.label}
              aria-pressed={isActive}
              title={option.label}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center",
                "rounded-full transition-all duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/50",
                isActive
                  ? "bg-brand-primary text-brand-contrast shadow-[0_6px_18px_var(--glow-primary)]"
                  : "text-foreground-muted hover:bg-surface-secondary hover:text-foreground",
              )}
            >
              {option.icon}
            </button>
          );
        })}
      </div>

      {preference === "adaptive" && (
        <span className="pr-2 text-xs capitalize text-foreground-muted">
          Local atmosphere: {dayPeriod}
        </span>
      )}
    </div>
  );
}
