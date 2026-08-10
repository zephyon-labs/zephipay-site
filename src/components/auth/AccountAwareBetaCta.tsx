"use client";

import Link from "next/link";
import { type ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { betaCtaState, type BetaCtaState } from "@/lib/betaCtaState";
import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";

type LinkButtonProps = Extract<ButtonProps, { href: string }>;
type Props = Omit<LinkButtonProps, "children" | "external" | "href"> & Readonly<{
  appearance?: "button" | "footer-link" | "custom-link";
  rightIcon?: ReactNode;
}>;

const SIGN_UP_HREF = "/auth/login?screen_hint=signup&returnTo=%2Fpersonal%2Fidentity";
const BETA_HREF = "/personal/send";

export function AccountAwareBetaCta({
  appearance = "button",
  ...buttonProps
}: Props) {
  const { status } = useAccountHydration();
  const state: BetaCtaState = betaCtaState(status === "authenticated" ? 200 : status === "error" ? 502 : 401);

  const signedIn = state === "signed-in";
  const label = signedIn ? "Open ZephiPay Beta" : "Join beta";
  const href = signedIn ? BETA_HREF : SIGN_UP_HREF;

  if (appearance === "footer-link") {
    const className = "text-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground";
    return <Link className={className} href={href}>{label}</Link>;
  }

  if (appearance === "custom-link") {
    return <Link className={buttonProps.className} href={href}>{label}{buttonProps.rightIcon}</Link>;
  }

  return <Button {...buttonProps} href={href}>{label}</Button>;
}
