"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { betaCtaState, type BetaCtaState } from "@/lib/betaCtaState";

type LinkButtonProps = Extract<ButtonProps, { href: string }>;
type Props = Omit<LinkButtonProps, "children" | "external" | "href"> & Readonly<{
  signedOutHref: string;
  signedOutExternal?: boolean;
  appearance?: "button" | "footer-link";
  rightIcon?: ReactNode;
}>;

export function AccountAwareBetaCta({
  signedOutHref,
  signedOutExternal = false,
  appearance = "button",
  ...buttonProps
}: Props) {
  const [state, setState] = useState<BetaCtaState>("signed-out");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/account", { cache: "no-store", credentials: "same-origin", signal: controller.signal })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => undefined);
        if (!controller.signal.aborted) setState(betaCtaState(response.status, body));
      })
      .catch(() => { if (!controller.signal.aborted) setState("request-access"); });
    return () => controller.abort();
  }, []);

  const enabled = state === "enabled";
  const label = enabled ? "Open ZephiPay" : state === "request-access" ? "Request beta access" : "Join beta";
  const href = enabled ? "/personal/send" : signedOutHref;
  const external = !enabled && signedOutExternal;

  if (appearance === "footer-link") {
    const className = "text-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground";
    return external
      ? <a className={className} href={href} target="_blank" rel="noreferrer">{label}</a>
      : <Link className={className} href={href}>{label}</Link>;
  }

  return <Button {...buttonProps} href={href} external={external}>{label}</Button>;
}
