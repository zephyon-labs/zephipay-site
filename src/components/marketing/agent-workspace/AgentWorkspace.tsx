"use client";

import { useMemo, useState } from "react";

import { cn } from "@/utils/cn";

import type {
  AgentApprovalMode,
  AgentPermission,
  AgentPermissionId,
  AgentPreset,
  AgentPresetId,
} from "./types";

const presets: AgentPreset[] = [
  {
    id: "personal",
    name: "Personal assistant",
    description:
      "Help manage bills, payment drafts, receipts, and everyday financial tasks.",
    initials: "PA",
    suggestedPermissions: [
      "view-balance",
      "view-receipts",
      "view-subscriptions",
      "create-payment-drafts",
    ],
    suggestedDailyLimit: 50,
    suggestedPaymentLimit: 25,
  },
  {
    id: "shopping",
    name: "Shopping assistant",
    description:
      "Compare options, prepare purchases, and stay within a defined budget.",
    initials: "SA",
    suggestedPermissions: [
      "view-balance",
      "create-payment-drafts",
      "send-payments",
    ],
    suggestedDailyLimit: 100,
    suggestedPaymentLimit: 50,
  },
  {
    id: "business",
    name: "Business assistant",
    description:
      "Review invoices, prepare vendor payments, and organize verified records.",
    initials: "BA",
    suggestedPermissions: [
      "view-balance",
      "view-receipts",
      "create-payment-drafts",
      "request-payments",
    ],
    suggestedDailyLimit: 500,
    suggestedPaymentLimit: 250,
  },
  {
    id: "creator",
    name: "Creator assistant",
    description:
      "Coordinate subscriptions, collaborator payments, and income records.",
    initials: "CA",
    suggestedPermissions: [
      "view-balance",
      "view-receipts",
      "view-subscriptions",
      "create-payment-drafts",
      "request-payments",
    ],
    suggestedDailyLimit: 250,
    suggestedPaymentLimit: 100,
  },
  {
    id: "research",
    name: "Research assistant",
    description:
      "Purchase approved datasets, reports, APIs, and premium information.",
    initials: "RA",
    suggestedPermissions: [
      "view-balance",
      "create-payment-drafts",
      "send-payments",
    ],
    suggestedDailyLimit: 75,
    suggestedPaymentLimit: 35,
  },
  {
    id: "custom",
    name: "Custom agent",
    description:
      "Build a permission set and spending policy around a specific workflow.",
    initials: "AI",
    suggestedPermissions: [
      "view-balance",
      "create-payment-drafts",
    ],
    suggestedDailyLimit: 50,
    suggestedPaymentLimit: 25,
  },
];

const permissions: AgentPermission[] = [
  {
    id: "view-balance",
    label: "View balance",
    description:
      "Allow the agent to understand available funds before suggesting an action.",
  },
  {
    id: "view-receipts",
    label: "View verified receipts",
    description:
      "Let the agent review completed payments and settlement records.",
  },
  {
    id: "view-subscriptions",
    label: "View subscriptions",
    description:
      "Allow the agent to identify recurring services and upcoming obligations.",
  },
  {
    id: "create-payment-drafts",
    label: "Create payment drafts",
    description:
      "Prepare a payment for you to inspect without moving money.",
  },
  {
    id: "request-payments",
    label: "Request payments",
    description:
      "Create payment requests for approved people, customers, or organizations.",
  },
  {
    id: "send-payments",
    label: "Send payments",
    description:
      "Permit payments only when approval and policy requirements are satisfied.",
    elevated: true,
  },
  {
    id: "modify-limits",
    label: "Modify spending limits",
    description:
      "Allow the agent to change its own financial boundaries.",
    elevated: true,
  },
];

const approvalModes: Array<{
  id: AgentApprovalMode;
  label: string;
  description: string;
}> = [
  {
    id: "always",
    label: "Always ask",
    description:
      "Every payment requires your approval before value moves.",
  },
  {
    id: "above-limit",
    label: "Ask above limit",
    description:
      "Routine payments may proceed, but larger payments require approval.",
  },
  {
    id: "policy",
    label: "Trusted policy",
    description:
      "Approved vendors and actions may proceed under established rules.",
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 5 6v5c0 4.8 2.8 8.2 7 10 4.2-1.8 7-5.2 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.6-4" />
    </svg>
  );
}

function Toggle({
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
          "absolute top-0.5 h-4.5 w-4.5 rounded-full transition-transform",
          enabled
            ? "translate-x-[1.35rem] bg-brand-secondary"
            : "translate-x-0.5 bg-foreground-muted",
        )}
      />
    </span>
  );
}

export function AgentWorkspace() {
  const [selectedPresetId, setSelectedPresetId] =
    useState<AgentPresetId>("personal");
  const [selectedPermissions, setSelectedPermissions] =
    useState<AgentPermissionId[]>(
      presets[0].suggestedPermissions,
    );
  const [dailyLimit, setDailyLimit] = useState(
    presets[0].suggestedDailyLimit,
  );
  const [paymentLimit, setPaymentLimit] = useState(
    presets[0].suggestedPaymentLimit,
  );
  const [approvalMode, setApprovalMode] =
    useState<AgentApprovalMode>("always");
  const [created, setCreated] = useState(false);

  const selectedPreset = useMemo(
    () =>
      presets.find(
        (preset) => preset.id === selectedPresetId,
      ) ?? presets[0],
    [selectedPresetId],
  );

  const enabledPermissions = useMemo(
    () =>
      permissions.filter((permission) =>
        selectedPermissions.includes(permission.id),
      ),
    [selectedPermissions],
  );

  const canSendPayments =
    selectedPermissions.includes("send-payments");

  function selectPreset(preset: AgentPreset) {
    setSelectedPresetId(preset.id);
    setSelectedPermissions(preset.suggestedPermissions);
    setDailyLimit(preset.suggestedDailyLimit);
    setPaymentLimit(preset.suggestedPaymentLimit);
    setApprovalMode("always");
    setCreated(false);
  }

  function togglePermission(permissionId: AgentPermissionId) {
    setSelectedPermissions((current) =>
      current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId],
    );
    setCreated(false);
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">

      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border-subtle bg-background/70 px-6 py-5 backdrop-blur-xl sm:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            AI Agent Workspace
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
            Configure a protected financial assistant
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Identity, permissions, spending limits, approval policies,
            and runtime protection—all in one guided workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary">
            Preview mode
          </span>

          <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
            No wallet connected
          </span>
        </div>
      </div>

      <div className="grid gap-px border-b border-border-subtle bg-border-subtle md:grid-cols-3">
        <div className="bg-background/75 px-6 py-5 sm:px-7 sm:py-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Agent identity
          </p>
          <p className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Verification required
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Every agent must be identifiable before it may participate.
          </p>
        </div>

        <div className="bg-background/75 px-6 py-5 sm:px-7 sm:py-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Approval policy
          </p>
          <p className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            {approvalModes.find(
              (mode) => mode.id === approvalMode,
            )?.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            You decide when human approval is required.
          </p>
        </div>

        <div className="bg-background/75 px-6 py-5 sm:px-7 sm:py-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Runtime status
          </p>
          <p className="mt-4 flex items-center gap-2 text-xl font-semibold tracking-[-0.03em] text-brand-secondary">
            <ShieldIcon />
            Protected
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground-secondary">
            Identity, limits, policy, and receipts remain observable.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Agent setup
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Create a protected AI assistant
          </h2>

          <p className="mt-4 text-lg leading-8 text-foreground-secondary">
            Choose what your agent can help with, define exactly
            what it may access, and establish the financial limits
            it must obey.
          </p>
        </div>

        <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-2">
          <section className="min-w-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">
                  Choose an assistant
                </p>
                <p className="mt-1 text-xs text-foreground-muted">
                  Start with a familiar role.
                </p>
              </div>

              <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
                Step 1
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {presets.map((preset) => {
                const selected =
                  selectedPresetId === preset.id;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectPreset(preset)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-2xl border p-4 text-left",
                      "transition-colors",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-brand-primary/45",
                      selected
                        ? "border-brand-primary/45 bg-brand-primary/10"
                        : "border-border-subtle bg-background/45 hover:border-border-default",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold",
                        selected
                          ? "border-brand-primary/35 bg-brand-primary/15 text-brand-secondary"
                          : "border-border-default bg-surface-secondary text-foreground-secondary",
                      )}
                    >
                      {preset.initials}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {preset.name}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                        {preset.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="min-w-0 rounded-[1.5rem] border border-border-default bg-background/45 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">
                  Choose permissions
                </p>
                <p className="mt-1 text-xs text-foreground-muted">
                  Nothing is granted automatically.
                </p>
              </div>

              <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
                Step 2
              </span>
            </div>

            <div className="mt-5 divide-y divide-border-subtle">
              {permissions.map((permission) => {
                const enabled =
                  selectedPermissions.includes(permission.id);

                return (
                  <button
                    key={permission.id}
                    type="button"
                    aria-pressed={enabled}
                    onClick={() =>
                      togglePermission(permission.id)
                    }
                    className="flex w-full items-start justify-between gap-5 py-4 text-left first:pt-0 last:pb-0 focus-visible:outline-none"
                  >
                    <span>
                      <span className="flex items-center gap-2 text-sm font-medium">
                        {permission.label}

                        {permission.elevated ? (
                          <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-amber-200">
                            Elevated
                          </span>
                        ) : null}
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                        {permission.description}
                      </span>
                    </span>

                    <Toggle enabled={enabled} />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid min-w-0 gap-5 sm:grid-cols-2 lg:col-span-2">
            <div className="rounded-[1.5rem] border border-border-default bg-background/45 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">
                    Set boundaries
                  </p>
                  <p className="mt-1 text-xs text-foreground-muted">
                    Limits remain enforceable.
                  </p>
                </div>

                <span className="rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
                  Step 3
                </span>
              </div>

              <label className="mt-6 block">
                <span className="flex items-center justify-between gap-4 text-sm font-medium">
                  Daily spending limit
                  <span className="text-brand-secondary">
                    {formatCurrency(dailyLimit)}
                  </span>
                </span>

                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={dailyLimit}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setDailyLimit(value);
                    setPaymentLimit((current) =>
                      Math.min(current, value),
                    );
                    setCreated(false);
                  }}
                  className="mt-4 block w-full min-w-0 accent-[var(--brand-primary)]"
                />
              </label>

              <label className="mt-6 block">
                <span className="flex items-center justify-between gap-4 text-sm font-medium">
                  Per-payment limit
                  <span className="text-brand-secondary">
                    {formatCurrency(paymentLimit)}
                  </span>
                </span>

                <input
                  type="range"
                  min="0"
                  max={Math.max(dailyLimit, 25)}
                  step="25"
                  value={paymentLimit}
                  onChange={(event) => {
                    setPaymentLimit(
                      Number(event.target.value),
                    );
                    setCreated(false);
                  }}
                  className="mt-4 block w-full min-w-0 accent-[var(--brand-primary)]"
                />
              </label>
            </div>

            <div className="rounded-[1.5rem] border border-border-default bg-background/45 p-5 sm:p-6">
              <p className="text-sm font-semibold">
                Choose approval
              </p>
              <p className="mt-1 text-xs text-foreground-muted">
                Decide when your confirmation is required.
              </p>

              <div className="mt-5 space-y-3">
                {approvalModes.map((mode) => {
                  const selected =
                    approvalMode === mode.id;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setApprovalMode(mode.id);
                        setCreated(false);
                      }}
                      className={cn(
                        "w-full rounded-xl border p-3.5 text-left transition-colors",
                        selected
                          ? "border-brand-primary/40 bg-brand-primary/10"
                          : "border-border-subtle bg-background/45 hover:border-border-default",
                      )}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium">
                          {mode.label}
                        </span>

                        {selected ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary/15 text-brand-secondary">
                            <CheckIcon />
                          </span>
                        ) : null}
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                        {mode.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-brand-primary/20 bg-brand-primary/[0.07] p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/30 bg-brand-primary/10 text-sm font-semibold text-brand-secondary">
                  {selectedPreset.initials}
                </span>

                <div>
                  <p className="font-semibold">
                    {selectedPreset.name}
                  </p>
                  <p className="mt-1 text-xs text-foreground-muted">
                    {enabledPermissions.length} permissions ·{" "}
                    {formatCurrency(dailyLimit)} daily limit
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-border-subtle bg-background/50 px-3 py-1.5 text-xs text-foreground-secondary">
                  Human-controlled
                </span>

                <span className="rounded-full border border-border-subtle bg-background/50 px-3 py-1.5 text-xs text-foreground-secondary">
                  Runtime monitored
                </span>

                <span className="rounded-full border border-border-subtle bg-background/50 px-3 py-1.5 text-xs text-foreground-secondary">
                  Verified receipts
                </span>

                <span className="rounded-full border border-border-subtle bg-background/50 px-3 py-1.5 text-xs text-foreground-secondary">
                  {canSendPayments
                    ? "Payment authority enabled"
                    : "Draft-only payments"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCreated(true)}
              className={cn(
                "inline-flex min-h-12 items-center justify-center rounded-full px-6",
                "text-sm font-semibold transition-all duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
                created
                  ? "border border-brand-primary/30 bg-brand-primary/10 text-brand-secondary"
                  : "bg-foreground text-background hover:opacity-90",
              )}
            >
              {created
                ? "Protected setup ready"
                : "Preview protected setup"}
            </button>
          </div>

          {created ? (
            <div
              role="status"
              className="mt-5 flex items-start gap-3 border-t border-brand-primary/15 pt-5"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-secondary">
                <CheckIcon />
              </span>

              <p className="text-sm leading-6 text-foreground-secondary">
                This preview shows how an agent would be configured.
                No account was connected and no permissions were
                saved.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
