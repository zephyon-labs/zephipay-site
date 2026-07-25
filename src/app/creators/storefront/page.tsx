import {
  CreatorEmptyState,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

export const metadata = {
  title: "Creator Storefront | ZephiPay",
  description:
    "Configure and preview the public creator storefront supporters will experience.",
};

export default function CreatorStorefrontPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Storefront"
      description="Shape the public experience where supporters discover memberships, products, services, and ways to support your work."
    >
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <section className="rounded-[1.8rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Storefront settings
          </p>

          <div className="mt-6 grid gap-5">
            {[
              "Creator name",
              "Public bio",
              "Profile image",
              "Featured offer",
              "Support button",
              "Storefront theme",
            ].map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-foreground-secondary">
                  {field}
                </label>

                <div className="mt-2 h-11 rounded-xl border border-border-default bg-background/45" />
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled
            className="mt-7 rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-sm text-foreground-muted"
          >
            Sign in to customize
          </button>
        </section>

        <section className="rounded-[2rem] border border-border-default bg-surface-glass p-5 shadow-[var(--shadow-medium)] backdrop-blur-xl sm:p-7">
          <div className="rounded-[1.6rem] border border-border-subtle bg-background/55 p-7 sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-border-default bg-surface-secondary text-xl font-semibold">
              Z
            </div>

            <p className="mt-6 text-center text-2xl font-semibold tracking-[-0.035em]">
              Your creator storefront
            </p>

            <p className="mx-auto mt-3 max-w-md text-center leading-7 text-foreground-secondary">
              Your public creator identity, offers, products, memberships, and support options will appear here.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Support this creator", "Explore memberships"].map(
                (label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border-default bg-surface-secondary px-5 py-4 text-center text-sm font-medium text-foreground-secondary"
                  >
                    {label}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6">
        <CreatorEmptyState
          eyebrow="Preview state"
          title="Your storefront is not published"
          description="This preview intentionally contains no invented creator identity, products, pricing, or supporter activity."
        />
      </div>
    </CreatorStudioPageShell>
  );
}
