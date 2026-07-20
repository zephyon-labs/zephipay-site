import { CheckIcon, ReceiptIcon } from "./ExperienceIcons";
import type { ReceiptField } from "./types";

type ReceiptPreviewProps = {
  title: string;
  fields: ReceiptField[];
  receiptId: string;
  statusLabel?: string;
  description?: string;
  actions?: string[];
};

export function ReceiptPreview({
  title,
  fields,
  receiptId,
  statusLabel = "Settlement verified",
  description = "The amount, purpose, participants, completion status, and settlement evidence remain connected in one dependable record.",
  actions = ["View", "Share", "Verify"],
}: ReceiptPreviewProps) {
  return (
    <article className="payment-receipt-enter overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <div className="border-b border-border-subtle px-7 py-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              Payment record
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              {title}
            </h3>
          </div>

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
            <ReceiptIcon />
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-[1.25rem] border border-brand-primary/20 bg-brand-primary/[0.07] px-4 py-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/15 text-brand-secondary">
            <CheckIcon />
          </span>

          <span className="text-sm font-medium text-foreground-secondary">
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-border-subtle">
        {fields.map((field) => (
          <div
            key={field.label}
            className="border-b border-r border-border-subtle px-5 py-5 odd:last:border-b-0 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-foreground-muted">
              {field.label}
            </p>

            <p className="mt-2 text-sm font-medium text-foreground">
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <div className="px-7 py-6">
        <p className="text-xs uppercase tracking-[0.15em] text-foreground-muted">
          Receipt ID
        </p>

        <p className="mt-2 font-mono text-sm text-foreground-secondary">
          {receiptId}
        </p>

        <p className="mt-5 text-sm leading-6 text-foreground-secondary">
          {description}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {actions.map((action) => (
            <div
              key={action}
              className="receipt-action flex h-10 items-center justify-center rounded-full border border-border-default bg-background/45 text-xs font-medium text-foreground-secondary transition-all duration-200 ease-out"
            >
              {action}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
