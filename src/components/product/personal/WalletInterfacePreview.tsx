"use client";

import Link from "next/link";

const walletActions = [
  {
    label: "Send",
    href: "/personal#personal-workspace",
    description: "Start a payment",
  },
  {
    label: "Request",
    href: "/personal#personal-workspace",
    description: "Create a request",
  },
  {
    label: "Transfer",
    href: "/personal#personal-workspace",
    description: "Move between accounts",
  },
  {
    label: "Fund",
    href: "/personal#personal-workspace",
    description: "Add a funding source",
  },
];

const supportedAssets = [
  {
    symbol: "USDC",
    name: "USD Coin",
    availability: "Devnet supported",
  },
  {
    symbol: "SOL",
    name: "Solana",
    availability: "Network asset",
  },
  {
    symbol: "ZERA",
    name: "Zephyon",
    availability: "Future utility",
  },
];

function WalletIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M4 8h13.5A2.5 2.5 0 0 1 20 10.5v4A2.5 2.5 0 0 1 17.5 17H4" />
      <path d="M16.5 12h.01" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function WalletInterfacePreview() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background shadow-[var(--shadow-medium)]">
      <div className="border-b border-border-subtle px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Product interface
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Personal wallet
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand-primary/25 bg-brand-primary/[0.08] px-3 py-1.5 text-xs font-medium text-brand-secondary">
              Solana Devnet
            </span>

            <span className="rounded-full border border-border-default bg-surface-glass px-3 py-1.5 text-xs text-foreground-secondary">
              Test funds only
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="border-b border-border-subtle bg-surface-glass p-6 lg:border-b-0 lg:border-r sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
            <WalletIcon />
          </div>

          <p className="mt-7 text-sm text-foreground-muted">
            Available balance
          </p>

          <p className="mt-3 text-5xl font-semibold tracking-[-0.055em]">
            —
          </p>

          <p className="mt-4 max-w-sm text-sm leading-7 text-foreground-secondary">
            Connect or open your ZephiPay account to view actual balances and
            supported funding sources.
          </p>

          <a
            href="https://beta.zephipay.com"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary px-6 py-3 text-sm font-medium text-brand-contrast transition hover:brightness-105"
          >
            Open ZephiPay
            <ArrowIcon />
          </a>

          <div className="mt-8 rounded-2xl border border-border-subtle bg-background/55 p-5">
            <p className="text-sm font-medium">Account not connected</p>

            <p className="mt-2 text-xs leading-6 text-foreground-muted">
              Live balances will appear only after authentication and account
              connection.
            </p>
          </div>
        </aside>

        <div className="p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-lg font-semibold">Move money</h4>

              <span className="text-xs text-foreground-muted">
                One shared flow
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {walletActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="rounded-2xl border border-border-default bg-surface-glass p-5 transition hover:-translate-y-0.5 hover:border-brand-primary/35 hover:bg-brand-primary/[0.06]"
                >
                  <span className="font-medium">{action.label}</span>

                  <span className="mt-2 block text-xs leading-6 text-foreground-muted">
                    {action.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-9">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-lg font-semibold">Supported assets</h4>

              <span className="text-xs text-foreground-muted">
                Availability varies
              </span>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-border-subtle">
              {supportedAssets.map((asset, index) => (
                <div
                  key={asset.symbol}
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-surface-glass px-5 py-4 ${
                    index !== supportedAssets.length - 1
                      ? "border-b border-border-subtle"
                      : ""
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-default bg-background text-xs font-semibold text-brand-secondary">
                    {asset.symbol.slice(0, 2)}
                  </span>

                  <span>
                    <span className="block font-medium">{asset.name}</span>
                    <span className="mt-1 block text-xs text-foreground-muted">
                      {asset.symbol}
                    </span>
                  </span>

                  <span className="text-right text-xs text-foreground-secondary">
                    {asset.availability}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-9 rounded-2xl border border-dashed border-border-default bg-surface-glass p-7 text-center">
            <p className="font-medium">No wallet activity to display</p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-foreground-secondary">
              Real payments, transfers, funding events, and verified receipts
              will appear here after the account is connected.
            </p>

            <Link
              href="/personal/activity"
              className="mt-5 inline-flex text-sm font-medium text-brand-secondary hover:text-brand-primary"
            >
              View activity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
