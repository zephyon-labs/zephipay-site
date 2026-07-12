import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/cn";

type BrandMarkProps = {
  className?: string;
  href?: string;
};

export function BrandMark({
  className,
  href = "/",
}: BrandMarkProps) {
  return (
    <Link
      href={href}
      aria-label="ZephiPay home"
      className={cn(
        "group inline-flex items-center gap-3",
        "rounded-xl",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-brand-primary/50",
        "focus-visible:ring-offset-4",
        "focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative flex h-10 w-14 items-center justify-center",
          "overflow-hidden rounded-xl",
          "border border-border-default",
          "bg-surface-glass px-1.5",
          "shadow-[var(--shadow-soft)]",
          "backdrop-blur-xl",
          "transition-all duration-200",
          "group-hover:border-border-strong",
          "group-hover:shadow-[0_8px_24px_var(--glow-primary)]",
        )}
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-0",
            "bg-[radial-gradient(circle_at_30%_20%,var(--glow-primary),transparent_62%)]",
            "opacity-70 transition-opacity duration-200",
            "group-hover:opacity-100",
          )}
        />

        <Image
          src="/brand/logo-z.svg"
          alt=""
          width={137}
          height={69}
          priority
          className={cn(
            "relative h-auto w-[115%] max-w-none",
            "transition-[filter,transform] duration-200",
            "group-hover:scale-[1.04]",
            "group-hover:drop-shadow-[0_0_8px_var(--glow-primary)]",
          )}
        />
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-[0.14em] text-foreground">
          ZEPHIPAY
        </span>

        <span className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-foreground-muted">
          Powered by Zephyon
        </span>
      </span>
    </Link>
  );
}
