import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/utils/cn";

type ContainerWidth = "narrow" | "content" | "wide" | "full";

const widthClasses: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  width = "wide",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widthClasses[width],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}