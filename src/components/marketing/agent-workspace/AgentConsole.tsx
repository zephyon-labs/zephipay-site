"use client";

import {
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/utils/cn";

import { AgentWorkspace } from "./AgentWorkspace";

type AgentConsoleModule =
  | "setup"
  | "wallet"
  | "identity"
  | "permissions"
  | "spending"
  | "activity"
  | "receipts";

interface NavigationItem {
  id: AgentConsoleModule;
  label: string;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "setup",
    label: "Setup",
    description: "Configure an assistant",
  },
  {
    id: "wallet",
    label: "Wallet",
    description: "Funding and assets",
  },
  {
    id: "identity",
    label: "Identity",
    description: "Agent verification",
  },
  {
    id: "permissions",
    label: "Permissions",
    description: "Access and authority",
  },
  {
    id: "spending",
    label: "Spending",
    description: "Limits and policy",
  },
  {
    id: "activity",
    label: "Activity",
    description: "Requests and outcomes",
  },
  {
    id: "receipts",
    label: "Receipts",
    description: "Verified records",
  },
];

const moduleContent: Record<
  Exclude<AgentConsoleModule, "setup">,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  wallet: {
    eyebrow: "Agent wallet",
    title: "Give an agent a controlled way to participate.",
    description:
      "Agent wallets will coordinate funding, approved assets, settlement networks, spending availability, and account ownership through one protected interface.",
  },
  identity: {
    eyebrow: "Agent identity",
    title: "Know which intelligent system is acting.",
    description:
      "Agent identity connects an assistant, application, service, owner, and permission set before it may request or complete an economic action.",
  },
  permissions: {
    eyebrow: "Permissions",
    title: "Grant only the authority an agent needs.",
    description:
      "Separate viewing information, preparing actions, requesting payments, sending value, and changing financial policy into distinct permissions.",
  },
  spending: {
    eyebrow: "Spending controls",
    title: "Turn financial boundaries into enforceable policy.",
    description:
      "Define per-payment limits, daily budgets, approval thresholds, allowed vendors, asset restrictions, and future organizational rules.",
  },
  activity: {
    eyebrow: "Agent activity",
    title: "Observe every request, decision, and outcome.",
    description:
      "Activity will show what the agent attempted, what the Runtime evaluated, which actions required approval, and what ultimately completed.",
  },
  receipts: {
    eyebrow: "Verified receipts",
    title: "Preserve evidence for every completed payment.",
    description:
      "Receipts connect the original intent, participant identity, Runtime decisions, settlement result, timing, and final verification state.",
  },
};

type WalletFundingSource =
  | "account"
  | "dedicated"
  | "allowance";

type WalletNetwork =
  | "solana"
  | "ach"
  | "automatic";

type WalletAsset =
  | "USDC"
  | "SOL"
  | "ZERA";

const fundingSources: Array<{
  id: WalletFundingSource;
  label: string;
  description: string;
}> = [
  {
    id: "account",
    label: "Connected account",
    description:
      "Use an approved account while enforcing agent-specific limits.",
  },
  {
    id: "dedicated",
    label: "Dedicated wallet",
    description:
      "Separate agent funds from your primary account and other assistants.",
  },
  {
    id: "allowance",
    label: "Funded allowance",
    description:
      "Provide only a fixed amount that the agent may use.",
  },
];

const walletNetworks: Array<{
  id: WalletNetwork;
  label: string;
  description: string;
}> = [
  {
    id: "automatic",
    label: "Automatic",
    description:
      "Let Zephyon choose an approved settlement path.",
  },
  {
    id: "solana",
    label: "Solana",
    description:
      "Use an approved blockchain settlement path.",
  },
  {
    id: "ach",
    label: "Bank transfer",
    description:
      "Use an eligible traditional account connection.",
  },
];

const walletAssets: WalletAsset[] = [
  "USDC",
  "SOL",
  "ZERA",
];

type AgentIdentityType =
  | "personal"
  | "business"
  | "creator"
  | "research"
  | "custom";

type OwnerRelationship =
  | "individual"
  | "business"
  | "application"
  | "organization";

const identityTypes: Array<{
  id: AgentIdentityType;
  label: string;
  description: string;
}> = [
  {
    id: "personal",
    label: "Personal assistant",
    description:
      "Acts on behalf of one person for approved financial tasks.",
  },
  {
    id: "business",
    label: "Business agent",
    description:
      "Supports merchant, operations, accounting, or vendor workflows.",
  },
  {
    id: "creator",
    label: "Creator agent",
    description:
      "Coordinates creator income, collaborators, subscriptions, and records.",
  },
  {
    id: "research",
    label: "Research agent",
    description:
      "Purchases approved data, APIs, reports, and digital resources.",
  },
  {
    id: "custom",
    label: "Custom agent",
    description:
      "Represents a purpose-built workflow with narrowly defined authority.",
  },
];

const ownerRelationships: Array<{
  id: OwnerRelationship;
  label: string;
  description: string;
}> = [
  {
    id: "individual",
    label: "Individual owner",
    description:
      "The agent acts under one verified person’s account and authority.",
  },
  {
    id: "business",
    label: "Business owner",
    description:
      "The agent belongs to a verified merchant or business account.",
  },
  {
    id: "application",
    label: "Application owner",
    description:
      "The agent is registered to a software product or service.",
  },
  {
    id: "organization",
    label: "Organization owner",
    description:
      "The agent operates under shared organizational policy.",
  },
];

type PermissionRisk =
  | "Low"
  | "Moderate"
  | "Elevated";

type PermissionApproval =
  | "Not required"
  | "Policy controlled"
  | "Always required";

interface AgentPermissionCapability {
  id: string;
  group: "Observe" | "Prepare" | "Execute" | "Administer";
  label: string;
  description: string;
  risk: PermissionRisk;
  approval: PermissionApproval;
  safeDefault?: boolean;
}

const permissionCapabilities: AgentPermissionCapability[] = [
  {
    id: "view-balance",
    group: "Observe",
    label: "View balances",
    description:
      "Read available balances without moving or reserving funds.",
    risk: "Low",
    approval: "Not required",
    safeDefault: true,
  },
  {
    id: "view-receipts",
    group: "Observe",
    label: "View verified receipts",
    description:
      "Review completed economic events and settlement records.",
    risk: "Low",
    approval: "Not required",
    safeDefault: true,
  },
  {
    id: "view-subscriptions",
    group: "Observe",
    label: "View subscriptions",
    description:
      "Inspect recurring services and upcoming obligations.",
    risk: "Low",
    approval: "Not required",
    safeDefault: true,
  },
  {
    id: "view-activity",
    group: "Observe",
    label: "View account activity",
    description:
      "Review previous requests, approvals, payments, and failures.",
    risk: "Low",
    approval: "Not required",
    safeDefault: true,
  },
  {
    id: "create-drafts",
    group: "Prepare",
    label: "Create payment drafts",
    description:
      "Prepare a payment for human review without moving value.",
    risk: "Low",
    approval: "Not required",
    safeDefault: true,
  },
  {
    id: "request-payments",
    group: "Prepare",
    label: "Request payments",
    description:
      "Create payment requests for approved people or organizations.",
    risk: "Moderate",
    approval: "Policy controlled",
  },
  {
    id: "prepare-subscriptions",
    group: "Prepare",
    label: "Prepare subscriptions",
    description:
      "Draft a recurring payment arrangement before approval.",
    risk: "Moderate",
    approval: "Policy controlled",
  },
  {
    id: "send-payments",
    group: "Execute",
    label: "Send approved payments",
    description:
      "Move value only after identity, limits, and policy are satisfied.",
    risk: "Elevated",
    approval: "Always required",
  },
  {
    id: "purchase-resources",
    group: "Execute",
    label: "Purchase digital resources",
    description:
      "Pay approved providers for data, APIs, compute, or services.",
    risk: "Elevated",
    approval: "Policy controlled",
  },
  {
    id: "transfer-accounts",
    group: "Execute",
    label: "Transfer between owned accounts",
    description:
      "Move approved assets among accounts controlled by the same owner.",
    risk: "Elevated",
    approval: "Always required",
  },
  {
    id: "modify-limits",
    group: "Administer",
    label: "Modify spending limits",
    description:
      "Change the financial boundaries governing the agent.",
    risk: "Elevated",
    approval: "Always required",
  },
  {
    id: "change-policy",
    group: "Administer",
    label: "Change payment policy",
    description:
      "Alter approval, vendor, category, or settlement rules.",
    risk: "Elevated",
    approval: "Always required",
  },
  {
    id: "grant-permissions",
    group: "Administer",
    label: "Grant permissions",
    description:
      "Give itself or another agent additional authority.",
    risk: "Elevated",
    approval: "Always required",
  },
];

const permissionGroupDescriptions = {
  Observe:
    "Read information without preparing or executing financial actions.",
  Prepare:
    "Create drafts and requests while keeping value movement under review.",
  Execute:
    "Complete approved economic actions under enforced limits and policy.",
  Administer:
    "Change the rules governing authority, limits, and future behavior.",
} satisfies Record<AgentPermissionCapability["group"], string>;

type VendorPolicyMode =
  | "allowlist"
  | "trusted"
  | "open";

type AgentActivityStatus =
  | "approved"
  | "pending"
  | "verified"
  | "blocked";

type ReceiptStatus =
  | "verified"
  | "pending";

interface AgentActivityItem {
  id: string;
  time: string;
  agent: string;
  title: string;
  detail: string;
  amount?: string;
  status: AgentActivityStatus;
  receiptId?: string;
}

interface AgentReceiptItem {
  id: string;
  title: string;
  counterparty: string;
  amount: string;
  asset: string;
  date: string;
  status: ReceiptStatus;
  policy: string;
  settlement: string;
  runtimeId: string;
}

const blockedCategoryOptions = [
  "Gambling",
  "Adult content",
  "High-risk assets",
  "Unverified vendors",
  "International transfers",
  "Recurring subscriptions",
];

const vendorPolicyOptions: Array<{
  id: VendorPolicyMode;
  label: string;
  description: string;
}> = [
  {
    id: "allowlist",
    label: "Allowlist only",
    description:
      "The agent may pay only vendors you explicitly approve.",
  },
  {
    id: "trusted",
    label: "Trusted vendors",
    description:
      "Approved and previously verified vendors may proceed under policy.",
  },
  {
    id: "open",
    label: "Open discovery",
    description:
      "The agent may discover new vendors, but payment still requires approval.",
  },
];

const activityItems: AgentActivityItem[] = [];

const receiptItems: AgentReceiptItem[] = [];

function Icon({
  type,
}: {
  type: AgentConsoleModule;
}) {
  const paths: Record<AgentConsoleModule, ReactNode> = {
    setup: <path d="M5 7h14M8 12h8M10 17h4" />,
    wallet: (
      <>
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <path d="M15 10h5.5v4H15a2 2 0 0 1 0-4Z" />
      </>
    ),
    identity: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5.5 19c.8-4 3-6 6.5-6s5.7 2 6.5 6" />
      </>
    ),
    permissions: (
      <>
        <circle cx="8" cy="12" r="3" />
        <path d="M11 12h9M17 12v3M14 12v2" />
      </>
    ),
    spending: (
      <>
        <path d="M12 3v18M16 7.5c0-1.4-1.8-2.5-4-2.5S8 6.1 8 7.5s1.8 2.5 4 2.5 4 1.1 4 2.5S14.2 15 12 15s-4-1.1-4-2.5" />
      </>
    ),
    activity: <path d="M4 12h3l2-5 4 10 2-5h5" />,
    receipts: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6M9 12h6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[type]}
    </svg>
  );
}

function StatusDot({
  active = false,
}: {
  active?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "h-2 w-2 rounded-full",
        active
          ? "bg-brand-secondary"
          : "bg-foreground-muted/55",
      )}
    />
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border-subtle bg-background/45 p-6">
      <p className="font-semibold text-foreground">
        {title}
      </p>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
        {description}
      </p>
    </div>
  );
}

function DataGrid({
  fields,
}: {
  fields: string[][];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-default bg-border-subtle sm:grid-cols-2">
      {fields.map(([label, value]) => (
        <article
          key={label}
          className="bg-background/65 p-5"
        >
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
            {label}
          </p>

          <p className="mt-3 font-semibold text-foreground">
            {value}
          </p>
        </article>
      ))}
    </div>
  );
}

function WalletToggle({
  enabled,
}: {
  enabled: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 rounded-full border transition-colors",
        enabled
          ? "border-brand-primary/40 bg-brand-primary/25"
          : "border-border-default bg-background/65",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-[1.125rem] w-[1.125rem] rounded-full transition-transform",
          enabled
            ? "translate-x-[1.35rem] bg-brand-secondary"
            : "translate-x-0.5 bg-foreground-muted",
        )}
      />
    </span>
  );
}

function WalletModule() {
  const [fundingSource, setFundingSource] =
    useState<WalletFundingSource>("allowance");
  const [network, setNetwork] =
    useState<WalletNetwork>("automatic");
  const [assets, setAssets] =
    useState<WalletAsset[]>(["USDC"]);
  const [agentAccessEnabled, setAgentAccessEnabled] =
    useState(false);
  const [connected, setConnected] = useState(false);

  function toggleAsset(asset: WalletAsset) {
    setAssets((current) =>
      current.includes(asset)
        ? current.filter((item) => item !== asset)
        : [...current, asset],
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Owner", "Account holder"],
          [
            "Wallet status",
            connected ? "Connected preview" : "Not connected",
          ],
          [
            "Approved assets",
            assets.length
              ? assets.join(", ")
              : "None selected",
          ],
          [
            "Agent access",
            agentAccessEnabled ? "Enabled" : "Paused",
          ],
        ].map(([label, value]) => (
          <article
            key={label}
            className="bg-background/65 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
              {label}
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
          <p className="text-sm font-semibold text-foreground">
            Choose a funding model
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Decide where the agent’s approved spending capacity
            should come from.
          </p>

          <div className="mt-5 space-y-3">
            {fundingSources.map((source) => {
              const selected =
                fundingSource === source.id;

              return (
                <button
                  key={source.id}
                  type="button"
                  onClick={() =>
                    setFundingSource(source.id)
                  }
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-colors",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-primary/45",
                    selected
                      ? "border-brand-primary/40 bg-brand-primary/10"
                      : "border-border-subtle bg-background/45 hover:border-border-default",
                  )}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">
                      {source.label}
                    </span>

                    <span
                      className={cn(
                        "h-3 w-3 rounded-full border",
                        selected
                          ? "border-brand-secondary bg-brand-secondary"
                          : "border-border-strong",
                      )}
                    />
                  </span>

                  <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                    {source.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
          <p className="text-sm font-semibold text-foreground">
            Approved assets
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            An agent may use only the assets you explicitly allow.
          </p>

          <div className="mt-5 space-y-3">
            {walletAssets.map((asset) => {
              const enabled = assets.includes(asset);

              return (
                <button
                  key={asset}
                  type="button"
                  aria-pressed={enabled}
                  onClick={() => toggleAsset(asset)}
                  className="flex w-full items-center justify-between gap-5 rounded-xl border border-border-subtle bg-background/45 px-4 py-3.5 text-left transition-colors hover:border-border-default"
                >
                  <span>
                    <span className="block text-sm font-medium">
                      {asset}
                    </span>

                    <span className="mt-1 block text-xs text-foreground-muted">
                      {asset === "USDC"
                        ? "Stable-value payments"
                        : asset === "SOL"
                          ? "Network and settlement utility"
                          : "Zephyon ecosystem utility"}
                    </span>
                  </span>

                  <WalletToggle enabled={enabled} />
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
        <p className="text-sm font-semibold text-foreground">
          Settlement preference
        </p>

        <p className="mt-2 text-sm leading-6 text-foreground-secondary">
          Select an eligible settlement path or allow the Runtime
          to coordinate one automatically.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {walletNetworks.map((option) => {
            const selected = network === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setNetwork(option.id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  selected
                    ? "border-brand-primary/40 bg-brand-primary/10"
                    : "border-border-subtle bg-background/45 hover:border-border-default",
                )}
              >
                <span className="block text-sm font-medium">
                  {option.label}
                </span>

                <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
              Wallet access
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {agentAccessEnabled
                ? "Agent access enabled"
                : "Agent access paused"}
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Pausing access stops new agent-initiated wallet
              actions without deleting the wallet, policies, or
              previous records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setConnected((current) => !current)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-default px-5 text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
            >
              {connected
                ? "Disconnect preview"
                : "Connect account preview"}
            </button>

            <button
              type="button"
              onClick={() =>
                setAgentAccessEnabled((current) => !current)
              }
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-full px-5",
                "text-sm font-semibold transition-colors",
                agentAccessEnabled
                  ? "border border-border-default bg-background/55 text-foreground-secondary hover:text-foreground"
                  : "bg-foreground text-background hover:opacity-90",
              )}
            >
              {agentAccessEnabled
                ? "Pause agent access"
                : "Enable agent access"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IdentityModule() {
  const [agentName, setAgentName] =
    useState("Personal Assistant");
  const [identityType, setIdentityType] =
    useState<AgentIdentityType>("personal");
  const [ownerRelationship, setOwnerRelationship] =
    useState<OwnerRelationship>("individual");
  const [purpose, setPurpose] = useState(
    "Help prepare and manage approved everyday payments.",
  );
  const [registered, setRegistered] = useState(false);
  const [verified, setVerified] = useState(false);
  const [suspended, setSuspended] = useState(false);

  const identityStatus = suspended
    ? "Suspended"
    : verified
      ? "Verified"
      : registered
        ? "Registration pending"
        : "Not registered";

  function registerIdentity() {
    setRegistered(true);
    setVerified(false);
    setSuspended(false);
  }

  function verifyIdentity() {
    setRegistered(true);
    setVerified(true);
    setSuspended(false);
  }

  function toggleSuspension() {
    setSuspended((current) => !current);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Agent name", agentName || "Unnamed agent"],
          ["Identity status", identityStatus],
          [
            "Owner relationship",
            ownerRelationships.find(
              (relationship) =>
                relationship.id === ownerRelationship,
            )?.label ?? "Not selected",
          ],
          [
            "Runtime actor",
            registered ? "Registered preview" : "Not registered",
          ],
        ].map(([label, value]) => (
          <article
            key={label}
            className="bg-background/65 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
              {label}
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
          <p className="text-sm font-semibold text-foreground">
            Define the agent
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Give the assistant a clear name and purpose before
            registering it with the Runtime.
          </p>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-foreground">
              Agent name
            </span>

            <input
              type="text"
              value={agentName}
              onChange={(event) => {
                setAgentName(event.target.value);
                setVerified(false);
              }}
              placeholder="Name your agent"
              className={cn(
                "mt-2 w-full rounded-xl border border-border-default",
                "bg-background/65 px-4 py-3 text-sm text-foreground",
                "placeholder:text-foreground-muted",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
              )}
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-foreground">
              Declared purpose
            </span>

            <textarea
              value={purpose}
              onChange={(event) => {
                setPurpose(event.target.value);
                setVerified(false);
              }}
              rows={4}
              placeholder="Describe what the agent is allowed to help with."
              className={cn(
                "mt-2 w-full resize-none rounded-xl",
                "border border-border-default bg-background/65",
                "px-4 py-3 text-sm leading-6 text-foreground",
                "placeholder:text-foreground-muted",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
              )}
            />
          </label>
        </section>

        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
          <p className="text-sm font-semibold text-foreground">
            Choose an identity type
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Identity type helps define the context and expected
            behavior of the assistant.
          </p>

          <div className="mt-5 space-y-3">
            {identityTypes.map((type) => {
              const selected =
                identityType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setIdentityType(type.id);
                    setVerified(false);
                  }}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-colors",
                    selected
                      ? "border-brand-primary/40 bg-brand-primary/10"
                      : "border-border-subtle bg-background/45 hover:border-border-default",
                  )}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">
                      {type.label}
                    </span>

                    <span
                      className={cn(
                        "h-3 w-3 rounded-full border",
                        selected
                          ? "border-brand-secondary bg-brand-secondary"
                          : "border-border-strong",
                      )}
                    />
                  </span>

                  <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                    {type.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
        <p className="text-sm font-semibold text-foreground">
          Establish ownership
        </p>

        <p className="mt-2 text-sm leading-6 text-foreground-secondary">
          Connect the agent to the person, business, application,
          or organization responsible for its actions.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {ownerRelationships.map((relationship) => {
            const selected =
              ownerRelationship === relationship.id;

            return (
              <button
                key={relationship.id}
                type="button"
                onClick={() => {
                  setOwnerRelationship(relationship.id);
                  setVerified(false);
                }}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  selected
                    ? "border-brand-primary/40 bg-brand-primary/10"
                    : "border-border-subtle bg-background/45 hover:border-border-default",
                )}
              >
                <span className="block text-sm font-medium">
                  {relationship.label}
                </span>

                <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                  {relationship.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
              Runtime identity
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {identityStatus}
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Agent identity connects the assistant, its owner,
              declared purpose, and future permissions before it
              participates in an economic event.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!registered ? (
              <button
                type="button"
                onClick={registerIdentity}
                disabled={!agentName.trim() || !purpose.trim()}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-full px-5",
                  "text-sm font-semibold transition-all",
                  !agentName.trim() || !purpose.trim()
                    ? "cursor-not-allowed border border-border-subtle text-foreground-muted opacity-50"
                    : "border border-border-default text-foreground-secondary hover:text-foreground",
                )}
              >
                Register identity preview
              </button>
            ) : null}

            {registered && !verified ? (
              <button
                type="button"
                onClick={verifyIdentity}
                disabled={suspended}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-full px-5",
                  "text-sm font-semibold transition-all",
                  suspended
                    ? "cursor-not-allowed border border-border-subtle text-foreground-muted opacity-50"
                    : "bg-foreground text-background hover:opacity-90",
                )}
              >
                Verify identity preview
              </button>
            ) : null}

            {registered ? (
              <button
                type="button"
                onClick={toggleSuspension}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-full border px-5",
                  "text-sm font-medium transition-colors",
                  suspended
                    ? "border-brand-primary/30 bg-brand-primary/10 text-brand-secondary"
                    : "border-border-default text-foreground-secondary hover:text-foreground",
                )}
              >
                {suspended
                  ? "Reactivate identity"
                  : "Suspend identity"}
              </button>
            ) : null}
          </div>
        </div>

        {verified ? (
          <div className="mt-5 border-t border-brand-primary/15 pt-5">
            <p className="text-sm font-medium text-brand-secondary">
              Identity preview verified
            </p>

            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              No Runtime actor was created. This preview demonstrates
              the identity and ownership flow only.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PermissionsModule() {
  const safeDefaults = permissionCapabilities
    .filter((permission) => permission.safeDefault)
    .map((permission) => permission.id);

  const [enabledPermissions, setEnabledPermissions] =
    useState<string[]>(safeDefaults);
  const [saved, setSaved] = useState(false);

  const groups: AgentPermissionCapability["group"][] = [
    "Observe",
    "Prepare",
    "Execute",
    "Administer",
  ];

  const enabledCapabilities =
    permissionCapabilities.filter((permission) =>
      enabledPermissions.includes(permission.id),
    );

  const elevatedCount = enabledCapabilities.filter(
    (permission) => permission.risk === "Elevated",
  ).length;

  const approvalCount = enabledCapabilities.filter(
    (permission) =>
      permission.approval === "Always required",
  ).length;

  function togglePermission(permissionId: string) {
    setEnabledPermissions((current) =>
      current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId],
    );
    setSaved(false);
  }

  function enableSafeDefaults() {
    setEnabledPermissions(safeDefaults);
    setSaved(false);
  }

  function revokeAll() {
    setEnabledPermissions([]);
    setSaved(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
        {[
          [
            "Enabled",
            `${enabledPermissions.length} of ${permissionCapabilities.length}`,
          ],
          ["Elevated", String(elevatedCount)],
          ["Always require approval", String(approvalCount)],
          [
            "Permission state",
            saved ? "Preview saved" : "Unsaved changes",
          ],
        ].map(([label, value]) => (
          <article
            key={label}
            className="bg-background/65 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
              {label}
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {value}
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-border-default bg-background/55 p-5">
        <div>
          <p className="font-semibold text-foreground">
            Start with the least authority necessary
          </p>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Viewing information and creating drafts are safer starting
            points. Add execution authority only when the agent has a
            clear purpose and enforceable limits.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={enableSafeDefaults}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-default px-5 text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
          >
            Select safe defaults
          </button>

          <button
            type="button"
            onClick={revokeAll}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-default px-5 text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
          >
            Revoke all
          </button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {groups.map((group) => {
          const capabilities =
            permissionCapabilities.filter(
              (permission) => permission.group === group,
            );

          const enabledInGroup = capabilities.filter(
            (permission) =>
              enabledPermissions.includes(permission.id),
          ).length;

          return (
            <section
              key={group}
              className="min-w-0 rounded-[1.5rem] border border-border-default bg-background/55 p-6"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                    {group}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                    {permissionGroupDescriptions[group]}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
                  {enabledInGroup}/{capabilities.length}
                </span>
              </div>

              <div className="mt-5 divide-y divide-border-subtle">
                {capabilities.map((permission) => {
                  const enabled =
                    enabledPermissions.includes(permission.id);

                  return (
                    <button
                      key={permission.id}
                      type="button"
                      aria-pressed={enabled}
                      onClick={() =>
                        togglePermission(permission.id)
                      }
                      className="flex w-full items-start justify-between gap-5 py-5 text-left first:pt-0 last:pb-0 focus-visible:outline-none"
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {permission.label}
                          </span>

                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5",
                              "text-[0.6rem] font-medium uppercase tracking-[0.12em]",
                              permission.risk === "Elevated"
                                ? "border-amber-400/25 bg-amber-400/10 text-amber-200"
                                : permission.risk === "Moderate"
                                  ? "border-border-default bg-background/55 text-foreground-secondary"
                                  : "border-brand-primary/20 bg-brand-primary/[0.06] text-brand-secondary",
                            )}
                          >
                            {permission.risk}
                          </span>
                        </span>

                        <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                          {permission.description}
                        </span>

                        <span className="mt-3 block text-[0.68rem] font-medium text-foreground-secondary">
                          Approval: {permission.approval}
                        </span>
                      </span>

                      <WalletToggle enabled={enabled} />
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
              Permission policy
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {enabledPermissions.length
                ? `${enabledPermissions.length} capabilities selected`
                : "No authority granted"}
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Permissions define what the agent may attempt. Runtime
              identity, spending limits, risk evaluation, and approval
              policy still apply before an economic action completes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSaved(true)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {saved
              ? "Permission preview saved"
              : "Save permission preview"}
          </button>
        </div>

        {saved ? (
          <div className="mt-5 border-t border-brand-primary/15 pt-5">
            <p className="text-sm leading-6 text-foreground-secondary">
              No permissions were written to an account or Runtime
              identity. This interface demonstrates the intended
              authority model only.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function SpendingModule() {
  const [perPaymentLimit, setPerPaymentLimit] =
    useState(50);
  const [dailyLimit, setDailyLimit] =
    useState(250);
  const [monthlyBudget, setMonthlyBudget] =
    useState(3000);
  const [approvalThreshold, setApprovalThreshold] =
    useState(25);
  const [recurringPayments, setRecurringPayments] =
    useState(false);
  const [emergencySpending, setEmergencySpending] =
    useState(false);
  const [vendorPolicy, setVendorPolicy] =
    useState<VendorPolicyMode>("allowlist");
  const [blockedCategories, setBlockedCategories] =
    useState<string[]>([
      "Gambling",
      "Adult content",
      "High-risk assets",
    ]);
  const [saved, setSaved] = useState(false);

  function toggleBlockedCategory(category: string) {
    setBlockedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
    setSaved(false);
  }

  function markChanged() {
    setSaved(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Per payment", formatCurrency(perPaymentLimit)],
          ["Daily limit", formatCurrency(dailyLimit)],
          ["Monthly budget", formatCurrency(monthlyBudget)],
          [
            "Approval above",
            formatCurrency(approvalThreshold),
          ],
        ].map(([label, value]) => (
          <article
            key={label}
            className="bg-background/65 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
              {label}
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {value}
            </p>
          </article>
        ))}
      </div>

      <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-foreground">
            Financial boundaries
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Define the maximum value an agent may request before
            additional approval or policy review is required.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            {
              label: "Per-payment limit",
              value: perPaymentLimit,
              max: 1000,
              step: 25,
              setter: setPerPaymentLimit,
            },
            {
              label: "Daily spending limit",
              value: dailyLimit,
              max: 5000,
              step: 50,
              setter: setDailyLimit,
            },
            {
              label: "Monthly budget",
              value: monthlyBudget,
              max: 25000,
              step: 250,
              setter: setMonthlyBudget,
            },
            {
              label: "Require approval above",
              value: approvalThreshold,
              max: Math.max(perPaymentLimit, 25),
              step: 25,
              setter: setApprovalThreshold,
            },
          ].map((control) => (
            <label
              key={control.label}
              className="rounded-[1.25rem] border border-border-subtle bg-background/45 p-5"
            >
              <span className="flex items-center justify-between gap-4 text-sm font-medium">
                {control.label}

                <span className="text-brand-secondary">
                  {formatCurrency(control.value)}
                </span>
              </span>

              <input
                type="range"
                min="0"
                max={control.max}
                step={control.step}
                value={control.value}
                onChange={(event) => {
                  control.setter(Number(event.target.value));
                  markChanged();
                }}
                className="mt-5 block w-full min-w-0 accent-[var(--brand-primary)]"
              />
            </label>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
          <p className="text-sm font-semibold text-foreground">
            Vendor policy
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Control whether an agent may use only approved vendors
            or discover new providers under review.
          </p>

          <div className="mt-5 space-y-3">
            {vendorPolicyOptions.map((option) => {
              const selected = vendorPolicy === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setVendorPolicy(option.id);
                    markChanged();
                  }}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-colors",
                    selected
                      ? "border-brand-primary/40 bg-brand-primary/10"
                      : "border-border-subtle bg-background/45 hover:border-border-default",
                  )}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">
                      {option.label}
                    </span>

                    <span
                      className={cn(
                        "h-3 w-3 rounded-full border",
                        selected
                          ? "border-brand-secondary bg-brand-secondary"
                          : "border-border-strong",
                      )}
                    />
                  </span>

                  <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
          <p className="text-sm font-semibold text-foreground">
            Restricted categories
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Block categories the agent should never transact with
            unless policy is changed by an authorized person.
          </p>

          <div className="mt-5 space-y-3">
            {blockedCategoryOptions.map((category) => {
              const blocked =
                blockedCategories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={blocked}
                  onClick={() =>
                    toggleBlockedCategory(category)
                  }
                  className="flex w-full items-center justify-between gap-5 rounded-xl border border-border-subtle bg-background/45 px-4 py-3.5 text-left transition-colors hover:border-border-default"
                >
                  <span className="text-sm text-foreground-secondary">
                    {category}
                  </span>

                  <WalletToggle enabled={blocked} />
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
        <p className="text-sm font-semibold text-foreground">
          Special spending rules
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            {
              label: "Recurring payments",
              description:
                "Allow approved recurring obligations under established policy.",
              enabled: recurringPayments,
              setter: setRecurringPayments,
            },
            {
              label: "Emergency spending",
              description:
                "Permit a separately governed emergency allowance.",
              enabled: emergencySpending,
              setter: setEmergencySpending,
            },
          ].map((rule) => (
            <button
              key={rule.label}
              type="button"
              aria-pressed={rule.enabled}
              onClick={() => {
                rule.setter((current) => !current);
                markChanged();
              }}
              className="flex items-start justify-between gap-5 rounded-[1.25rem] border border-border-subtle bg-background/45 p-5 text-left transition-colors hover:border-border-default"
            >
              <span>
                <span className="block text-sm font-semibold">
                  {rule.label}
                </span>

                <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                  {rule.description}
                </span>
              </span>

              <WalletToggle enabled={rule.enabled} />
            </button>
          ))}
        </div>
      </section>

      <div className="rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
              Spending policy
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {saved
                ? "Policy preview saved"
                : "Unsaved policy changes"}
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
              These boundaries would be evaluated alongside agent
              identity, permissions, risk signals, vendor rules,
              and human approval requirements.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSaved(true)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {saved
              ? "Spending preview saved"
              : "Save spending preview"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityModule() {
  const [filter, setFilter] = useState<
    "all" | AgentActivityStatus
  >("all");

  const filteredItems =
    filter === "all"
      ? activityItems
      : activityItems.filter(
          (item) => item.status === filter,
        );

  const statusStyles: Record<
    AgentActivityStatus,
    string
  > = {
    approved:
      "border-brand-primary/20 bg-brand-primary/[0.07] text-brand-secondary",
    pending:
      "border-border-default bg-background/55 text-foreground-secondary",
    verified:
      "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary",
    blocked:
      "border-amber-400/25 bg-amber-400/10 text-amber-200",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-default bg-border-subtle sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total events", String(activityItems.length)],
          [
            "Verified",
            String(
              activityItems.filter(
                (item) => item.status === "verified",
              ).length,
            ),
          ],
          [
            "Awaiting action",
            String(
              activityItems.filter(
                (item) => item.status === "pending",
              ).length,
            ),
          ],
          [
            "Blocked",
            String(
              activityItems.filter(
                (item) => item.status === "blocked",
              ).length,
            ),
          ],
        ].map(([label, value]) => (
          <article
            key={label}
            className="bg-background/65 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
              {label}
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {value}
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-border-default bg-background/55 p-5">
        <div>
          <p className="font-semibold text-foreground">
            Economic activity timeline
          </p>

          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Follow agent requests, Runtime decisions, approvals,
            settlements, failures, and verified outcomes.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "all",
            "verified",
            "approved",
            "pending",
            "blocked",
          ].map((status) => {
            const selected = filter === status;

            return (
              <button
                key={status}
                type="button"
                onClick={() =>
                  setFilter(
                    status as
                      | "all"
                      | AgentActivityStatus,
                  )
                }
                className={cn(
                  "rounded-full border px-3.5 py-2 text-xs font-medium capitalize transition-colors",
                  selected
                    ? "border-brand-primary/35 bg-brand-primary/10 text-brand-secondary"
                    : "border-border-subtle bg-background/45 text-foreground-muted hover:text-foreground",
                )}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-border-default bg-background/45">
        {filteredItems.length ? (
          filteredItems.map((item, index) => (
            <article
              key={item.id}
              className="relative grid gap-5 border-b border-border-subtle p-5 last:border-b-0 sm:grid-cols-[5rem_minmax(0,1fr)_auto]"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.time}
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  Today
                </p>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold text-foreground">
                    {item.title}
                  </p>

                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.12em]",
                      statusStyles[item.status],
                    )}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-foreground-secondary">
                  {item.agent}
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground-muted">
                  {item.detail}
                </p>

                {item.receiptId ? (
                  <p className="mt-3 text-xs font-medium text-brand-secondary">
                    Receipt {item.receiptId}
                  </p>
                ) : null}
              </div>

              <div className="sm:text-right">
                <p className="font-semibold text-foreground">
                  {item.amount ?? "—"}
                </p>

                <p className="mt-2 text-xs text-foreground-muted">
                  Event {String(index + 1).padStart(2, "0")}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="font-semibold">
              No matching activity
            </p>

            <p className="mt-2 text-sm text-foreground-muted">
              Choose another filter to view preview events.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
          Preview timeline
        </p>

        <p className="mt-3 text-sm leading-6 text-foreground-secondary">
          These examples illustrate how agent actions and Runtime
          outcomes may appear. They are not connected to a live
          account.
        </p>
      </div>
    </div>
  );
}

function ReceiptsModule() {
  const [query, setQuery] = useState("");
  const [selectedReceiptId, setSelectedReceiptId] =
    useState(receiptItems[0]?.id ?? "");

  const filteredReceipts = receiptItems.filter(
    (receipt) => {
      const haystack = [
        receipt.id,
        receipt.title,
        receipt.counterparty,
        receipt.asset,
        receipt.status,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query.toLowerCase());
    },
  );

  const selectedReceipt =
    receiptItems.find(
      (receipt) => receipt.id === selectedReceiptId,
    ) ?? filteredReceipts[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border-default bg-border-subtle sm:grid-cols-3">
        {[
          ["Receipts", String(receiptItems.length)],
          [
            "Verified",
            String(
              receiptItems.filter(
                (receipt) =>
                  receipt.status === "verified",
              ).length,
            ),
          ],
          [
            "Pending",
            String(
              receiptItems.filter(
                (receipt) =>
                  receipt.status === "pending",
              ).length,
            ),
          ],
        ].map(([label, value]) => (
          <article
            key={label}
            className="bg-background/65 p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
              {label}
            </p>

            <p className="mt-3 font-semibold text-foreground">
              {value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-5">
          <label className="block">
            <span className="text-sm font-semibold">
              Search receipts
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search by ID, vendor, asset, or status"
              className={cn(
                "mt-3 w-full rounded-xl border border-border-default",
                "bg-background/65 px-4 py-3 text-sm text-foreground",
                "placeholder:text-foreground-muted",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
              )}
            />
          </label>

          <div className="mt-5 space-y-3">
            {filteredReceipts.length ? (
              filteredReceipts.map((receipt) => {
                const selected =
                  selectedReceipt?.id === receipt.id;

                return (
                  <button
                    key={receipt.id}
                    type="button"
                    onClick={() =>
                      setSelectedReceiptId(receipt.id)
                    }
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition-colors",
                      selected
                        ? "border-brand-primary/40 bg-brand-primary/10"
                        : "border-border-subtle bg-background/45 hover:border-border-default",
                    )}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block text-sm font-semibold">
                          {receipt.title}
                        </span>

                        <span className="mt-1 block text-xs text-foreground-muted">
                          {receipt.counterparty} · {receipt.id}
                        </span>
                      </span>

                      <span className="font-semibold">
                        {receipt.amount}
                      </span>
                    </span>

                    <span className="mt-3 flex items-center justify-between gap-4 text-xs text-foreground-muted">
                      <span>{receipt.date}</span>
                      <span className="capitalize">
                        {receipt.status}
                      </span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="rounded-xl border border-border-subtle bg-background/45 p-5">
                <p className="text-sm font-semibold">
                  No receipts found
                </p>

                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  Try another search term.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
          {selectedReceipt ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-5 border-b border-border-subtle pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                    Verified receipt
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                    {selectedReceipt.title}
                  </h3>

                  <p className="mt-2 text-sm text-foreground-muted">
                    {selectedReceipt.id}
                  </p>
                </div>

                <span
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium capitalize",
                    selectedReceipt.status === "verified"
                      ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary"
                      : "border-border-default bg-background/55 text-foreground-secondary",
                  )}
                >
                  {selectedReceipt.status}
                </span>
              </div>

              <div className="mt-6 grid gap-px overflow-hidden rounded-[1.25rem] border border-border-default bg-border-subtle sm:grid-cols-2">
                {[
                  ["Counterparty", selectedReceipt.counterparty],
                  [
                    "Amount",
                    `${selectedReceipt.amount} ${selectedReceipt.asset}`,
                  ],
                  ["Policy", selectedReceipt.policy],
                  ["Settlement", selectedReceipt.settlement],
                  ["Date", selectedReceipt.date],
                  ["Runtime ID", selectedReceipt.runtimeId],
                ].map(([label, value]) => (
                  <article
                    key={label}
                    className="bg-background/65 p-5"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
                      {label}
                    </p>

                    <p className="mt-3 break-words text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[1.25rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                  Economic event evidence
                </p>

                <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                  A full receipt can preserve the original intent,
                  participant identity, policy decision, settlement
                  reference, execution timeline, and verification
                  result.
                </p>
              </div>
            </>
          ) : (
            <EmptyState
              title="Select a receipt"
              description="Choose a record from the list to inspect its economic-event details."
            />
          )}
        </section>
      </div>

      <div className="rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
          Preview ledger
        </p>

        <p className="mt-3 text-sm leading-6 text-foreground-secondary">
          These receipt records are illustrative examples. They do
          not represent live settlements or account history.
        </p>
      </div>
    </div>
  );
}

function ModulePreview({
  module,
}: {
  module: Exclude<AgentConsoleModule, "setup">;
}) {
  const content = moduleContent[module];

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          {content.title}
        </h2>

        <p className="mt-4 text-lg leading-8 text-foreground-secondary">
          {content.description}
        </p>
      </div>

      <div className="mt-9">
        {module === "wallet" ? (
          <WalletModule />
        ) : null}

        {module === "identity" ? (
          <IdentityModule />
        ) : null}

        {module === "permissions" ? (
          <PermissionsModule />
        ) : null}

        {module === "spending" ? (
          <SpendingModule />
        ) : null}

        {module === "activity" ? (
          <ActivityModule />
        ) : null}

        {module === "receipts" ? (
          <ReceiptsModule />
        ) : null}
      </div>

      <div className="mt-7 rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
          Preview state
        </p>

        <p className="mt-3 text-sm leading-6 text-foreground-secondary">
          This module demonstrates the planned control experience.
          No account data is connected and no settings are being
          stored.
        </p>
      </div>
    </div>
  );
}

export function AgentConsole() {
  const [activeModule, setActiveModule] =
    useState<AgentConsoleModule>("setup");

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-border-subtle bg-background/70 px-6 py-5 sm:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Agent Control Center
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
            Manage your intelligent financial assistants
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium text-brand-secondary">
            <StatusDot active />
            Runtime ready
          </span>

          <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
            Preview mode
          </span>
        </div>
      </header>

      <div className="grid xl:grid-cols-[15rem_minmax(0,1fr)_17rem]">
        <aside className="border-b border-border-subtle bg-background/55 p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="rounded-[1.35rem] border border-border-default bg-background/55 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/30 bg-brand-primary/10 text-sm font-semibold text-brand-secondary">
                PA
              </span>

              <div className="min-w-0">
                <p className="truncate font-semibold">
                  Personal Assistant
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  Not connected
                </p>
              </div>
            </div>
          </div>

          <nav
            aria-label="Agent control modules"
            className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1"
          >
            {navigationItems.map((item) => {
              const active = activeModule === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveModule(item.id)
                  }
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left",
                    "transition-colors",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-primary/45",
                    active
                      ? "border-brand-primary/35 bg-brand-primary/10"
                      : "border-transparent text-foreground-secondary hover:border-border-subtle hover:bg-background/45",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                      active
                        ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary"
                        : "border-border-subtle bg-background/45 text-foreground-muted",
                    )}
                  >
                    <Icon type={item.id} />
                  </span>

                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-sm font-medium",
                        active && "text-foreground",
                      )}
                    >
                      {item.label}
                    </span>

                    <span className="mt-0.5 block truncate text-[0.68rem] text-foreground-muted">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 overflow-hidden">
          {activeModule === "setup" ? (
            <div className="min-w-0 p-3 sm:p-5">
              <AgentWorkspace />
            </div>
          ) : (
            <ModulePreview module={activeModule} />
          )}
        </section>

        <aside className="border-t border-border-subtle bg-background/50 p-5 sm:p-6 xl:border-l xl:border-t-0">
          <p className="text-xs font-medium uppercase tracking-[0.17em] text-foreground-muted">
            Runtime status
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Identity", "Required", false],
              ["Permissions", "Not saved", false],
              ["Policy", "Preview", true],
              ["Risk", "Monitoring", true],
              ["Settlement", "Disconnected", false],
              ["Receipts", "Ready", true],
            ].map(([label, status, active]) => (
              <div
                key={String(label)}
                className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-background/45 px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <StatusDot active={Boolean(active)} />

                  <p className="text-sm text-foreground-secondary">
                    {label}
                  </p>
                </div>

                <p className="text-xs text-foreground-muted">
                  {status}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.35rem] border border-brand-primary/20 bg-brand-primary/[0.06] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-secondary">
              Account state
            </p>

            <p className="mt-3 text-sm font-medium text-foreground">
              No wallet connected
            </p>

            <p className="mt-2 text-xs leading-5 text-foreground-muted">
              Live balances, limits, activity, and receipts will
              appear after account connection.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
