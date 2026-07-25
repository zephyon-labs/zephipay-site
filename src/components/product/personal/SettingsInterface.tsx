"use client";

import { useState } from "react";

type SettingsTab =
  | "Profile"
  | "Preferences"
  | "Notifications"
  | "Accessibility"
  | "Connected Apps"
  | "Labs";

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

const tabs: SettingsTab[] = [
  "Profile",
  "Preferences",
  "Notifications",
  "Accessibility",
  "Connected Apps",
  "Labs",
];

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 rounded-full border transition ${
        checked
          ? "border-brand-primary/45 bg-brand-primary"
          : "border-border-default bg-surface-elevated"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingRow({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border-subtle py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-xl">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs leading-6 text-foreground-secondary">
          {description}
        </p>
      </div>

      <div className="shrink-0">{control}</div>
    </div>
  );
}

function ProfilePanel() {
  return (
    <div>
      <div className="rounded-2xl border border-border-subtle bg-background/55 p-5">
        <p className="text-sm font-medium">Account not connected</p>
        <p className="mt-2 text-xs leading-6 text-foreground-secondary">
          Profile details will become editable after an authenticated ZephiPay
          account is available.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border-subtle bg-background/55">
        {[
          ["Display name", "—"],
          ["Username", "—"],
          ["Email", "—"],
          ["Profile photo", "Not configured"],
        ].map(([label, value], index, items) => (
          <div
            key={label}
            className={`flex items-center justify-between gap-4 px-5 py-4 ${
              index !== items.length - 1
                ? "border-b border-border-subtle"
                : ""
            }`}
          >
            <span className="text-sm text-foreground-secondary">{label}</span>
            <span className="text-sm font-medium text-foreground-muted">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreferencesPanel() {
  const [theme, setTheme] = useState("System");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [region, setRegion] = useState("United States");
  const [timezone, setTimezone] = useState("Automatic");

  const themes = ["Morning", "Day", "Sunset", "Night", "System"];

  return (
    <div>
      <div>
        <p className="text-sm font-medium">Atmosphere</p>
        <p className="mt-1 text-xs leading-6 text-foreground-secondary">
          Choose how ZephiPay presents its adaptive visual environment.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {themes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTheme(option)}
              className={`rounded-2xl border px-4 py-4 text-sm transition ${
                theme === option
                  ? "border-brand-primary/40 bg-brand-primary/[0.09] text-foreground"
                  : "border-border-default bg-background/55 text-foreground-secondary hover:border-border-strong"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-border-subtle bg-background/55 px-5">
        <SettingRow
          title="Language"
          description="Choose the language used throughout ZephiPay."
          control={
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="h-10 rounded-xl border border-border-default bg-background px-3 text-sm outline-none focus:border-brand-primary/45"
            >
              <option>English</option>
            </select>
          }
        />

        <SettingRow
          title="Currency"
          description="Choose the default fiat display currency."
          control={
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="h-10 rounded-xl border border-border-default bg-background px-3 text-sm outline-none focus:border-brand-primary/45"
            >
              <option>USD</option>
            </select>
          }
        />

        <SettingRow
          title="Region"
          description="Used for regional formats and future product availability."
          control={
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="h-10 rounded-xl border border-border-default bg-background px-3 text-sm outline-none focus:border-brand-primary/45"
            >
              <option>United States</option>
            </select>
          }
        />

        <SettingRow
          title="Timezone"
          description="Controls how transaction and receipt timestamps appear."
          control={
            <select
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              className="h-10 rounded-xl border border-border-default bg-background px-3 text-sm outline-none focus:border-brand-primary/45"
            >
              <option>Automatic</option>
              <option>Central Time</option>
              <option>Eastern Time</option>
              <option>Mountain Time</option>
              <option>Pacific Time</option>
            </select>
          }
        />
      </div>
    </div>
  );
}

function NotificationsPanel() {
  const [settings, setSettings] = useState({
    payments: true,
    receipts: true,
    transfers: true,
    identity: true,
    product: false,
    marketing: false,
  });

  const rows = [
    {
      key: "payments",
      title: "Payments",
      description: "Receive updates about sent and received payments.",
    },
    {
      key: "receipts",
      title: "Verified receipts",
      description: "Receive notices when new payment records are available.",
    },
    {
      key: "transfers",
      title: "Transfers",
      description: "Receive settlement and transfer-status updates.",
    },
    {
      key: "identity",
      title: "Identity",
      description: "Receive verification and account-identity notices.",
    },
    {
      key: "product",
      title: "Product updates",
      description: "Hear about meaningful ZephiPay product improvements.",
    },
    {
      key: "marketing",
      title: "Marketing",
      description: "Receive occasional ecosystem news and announcements.",
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-border-subtle bg-background/55 px-5">
      {rows.map((row) => (
        <SettingRow
          key={row.key}
          title={row.title}
          description={row.description}
          control={
            <Toggle
              label={row.title}
              checked={settings[row.key]}
              onChange={() =>
                setSettings((current) => ({
                  ...current,
                  [row.key]: !current[row.key],
                }))
              }
            />
          }
        />
      ))}
    </div>
  );
}

function AccessibilityPanel() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [textSize, setTextSize] = useState("Default");

  return (
    <div className="rounded-2xl border border-border-subtle bg-background/55 px-5">
      <SettingRow
        title="Reduced motion"
        description="Minimize animation and movement throughout the interface."
        control={
          <Toggle
            label="Reduced motion"
            checked={reducedMotion}
            onChange={() => setReducedMotion((value) => !value)}
          />
        }
      />

      <SettingRow
        title="High contrast"
        description="Increase visual separation between interface elements."
        control={
          <Toggle
            label="High contrast"
            checked={highContrast}
            onChange={() => setHighContrast((value) => !value)}
          />
        }
      />

      <SettingRow
        title="Screen-reader enhancements"
        description="Enable additional descriptive interface guidance."
        control={
          <Toggle
            label="Screen-reader enhancements"
            checked={screenReader}
            onChange={() => setScreenReader((value) => !value)}
          />
        }
      />

      <SettingRow
        title="Text size"
        description="Adjust the preferred interface text scale."
        control={
          <select
            value={textSize}
            onChange={(event) => setTextSize(event.target.value)}
            className="h-10 rounded-xl border border-border-default bg-background px-3 text-sm outline-none focus:border-brand-primary/45"
          >
            <option>Default</option>
            <option>Large</option>
            <option>Extra large</option>
          </select>
        }
      />
    </div>
  );
}

function ConnectedAppsPanel() {
  return (
    <div className="flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-border-default bg-background/55 px-6 py-12 text-center">
      <div className="max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-xl text-brand-secondary">
          +
        </div>

        <h4 className="mt-6 text-xl font-semibold">No connected apps</h4>

        <p className="mt-3 text-sm leading-7 text-foreground-secondary">
          Authorized integrations, services, and connected applications will
          appear here after account connectivity becomes available.
        </p>

        <button
          type="button"
          disabled
          className="mt-6 cursor-not-allowed rounded-full border border-border-default px-5 py-3 text-sm text-foreground-muted opacity-70"
        >
          Connect application
        </button>
      </div>
    </div>
  );
}

function LabsPanel() {
  const [developerPreview, setDeveloperPreview] = useState(false);
  const [experimentalFeatures, setExperimentalFeatures] = useState(false);
  const [agentFeatures, setAgentFeatures] = useState(false);

  return (
    <div>
      <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/[0.07] p-5">
        <p className="text-sm font-medium">Experimental area</p>
        <p className="mt-2 text-xs leading-6 text-foreground-secondary">
          Labs features may change, behave unexpectedly, or be removed before
          general availability.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-border-subtle bg-background/55 px-5">
        <SettingRow
          title="Developer preview"
          description="Preview future developer-facing product capabilities."
          control={
            <Toggle
              label="Developer preview"
              checked={developerPreview}
              onChange={() => setDeveloperPreview((value) => !value)}
            />
          }
        />

        <SettingRow
          title="Experimental features"
          description="Enable early ZephiPay interface experiments."
          control={
            <Toggle
              label="Experimental features"
              checked={experimentalFeatures}
              onChange={() => setExperimentalFeatures((value) => !value)}
            />
          }
        />

        <SettingRow
          title="Intelligent-agent features"
          description="Preview future AI commerce and agent-control experiences."
          control={
            <Toggle
              label="Intelligent-agent features"
              checked={agentFeatures}
              onChange={() => setAgentFeatures((value) => !value)}
            />
          }
        />
      </div>
    </div>
  );
}

export function SettingsInterface() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background shadow-[var(--shadow-medium)]">
      <div className="border-b border-border-subtle px-6 py-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
          Product interface
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
          Personal settings
        </h3>
      </div>

      <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
        <aside className="border-b border-border-subtle bg-surface-glass p-4 lg:border-b-0 lg:border-r sm:p-6">
          <nav className="flex gap-2 overflow-x-auto lg:grid">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm transition ${
                  activeTab === tab
                    ? "bg-brand-primary/[0.1] font-medium text-foreground"
                    : "text-foreground-secondary hover:bg-background/60 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-h-[34rem] p-6 sm:p-8">
          <div className="mb-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
              Settings
            </p>

            <h4 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
              {activeTab}
            </h4>
          </div>

          {activeTab === "Profile" && <ProfilePanel />}
          {activeTab === "Preferences" && <PreferencesPanel />}
          {activeTab === "Notifications" && <NotificationsPanel />}
          {activeTab === "Accessibility" && <AccessibilityPanel />}
          {activeTab === "Connected Apps" && <ConnectedAppsPanel />}
          {activeTab === "Labs" && <LabsPanel />}
        </section>
      </div>
    </div>
  );
}
