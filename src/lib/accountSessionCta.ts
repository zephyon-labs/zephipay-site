export type AuthenticatedAccountCta = Readonly<{ label: string; href: string }>;

export function authenticatedAccountCta(pathname: string): AuthenticatedAccountCta {
  return pathname === "/personal/send"
    ? { label: "Personal Home", href: "/personal" }
    : { label: "Open ZephiPay Beta", href: "/personal/send" };
}
