import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/utils/cn";

type SectionSpacing = "none" | "sm" | "md" | "lg";

const spacingClasses: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  spacing = "md",
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        "relative isolate",
        spacingClasses[spacing],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}