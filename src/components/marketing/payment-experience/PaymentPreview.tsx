import { ArrowIcon, CheckIcon } from "./ExperienceIcons";
import type { PaymentField } from "./types";

type PaymentPreviewProps = {
  eyebrow?: string;
  title: string;
  fields: PaymentField[];
  statusLabel: string;
  actionLabel: string;
  disclaimer?: string;
};

export function PaymentPreview({
  eyebrow = "Personal payment",
  title,
  fields,
  statusLabel,
  actionLabel,
  disclaimer = "Illustrative product preview. No live payment is being created.",
}: PaymentPreviewProps) {
  return (
    <article className="payment-preview-enter overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-border-subtle px-7 py-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            {eyebrow}
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
            {title}
          </h3>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
          <ArrowIcon />
        </span>
      </div>

      <div className="p-7">
        <div className="grid gap-4">
          {fields.map((field) => (
            <div
              key={field.label}
              className="payment-field-preview rounded-[1.25rem] border border-border-subtle bg-background/55 px-5 py-4 transition-all duration-200 ease-out"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-foreground-muted">
                {field.label}
              </p>

              <p className="mt-2 text-lg font-medium text-foreground">
                {field.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-[1.25rem] border border-brand-primary/20 bg-brand-primary/[0.07] px-5 py-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/15 text-brand-secondary">
            <CheckIcon />
          </span>

          <span className="text-sm font-medium text-foreground-secondary">
            {statusLabel}
          </span>
        </div>

        <div className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full border border-brand-secondary/30 bg-brand-primary font-medium text-brand-contrast shadow-[0_10px_30px_rgba(101,184,255,0.18)]">
          <span>{actionLabel}</span>
          <ArrowIcon />
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-foreground-muted">
          {disclaimer}
        </p>
      </div>
    </article>
  );
}
