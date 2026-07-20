import { ExperienceCanvas } from "./ExperienceCanvas";
import { PaymentPreview } from "./PaymentPreview";
import { ReceiptPreview } from "./ReceiptPreview";
import { RuntimeTimeline } from "./RuntimeTimeline";
import type {
  PaymentField,
  PaymentStep,
  ReceiptField,
} from "./types";

type PaymentExperienceProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  paymentEyebrow?: string;
  paymentTitle?: string;
  paymentFields?: PaymentField[];
  statusLabel?: string;
  timelineEyebrow?: string;
  steps?: PaymentStep[];
  receiptTitle?: string;
  receiptFields?: ReceiptField[];
  receiptId?: string;
  receiptStatusLabel?: string;
  receiptActions?: string[];
};

const defaultPaymentFields: PaymentField[] = [
  {
    label: "To",
    value: "Sarah Johnson",
  },
  {
    label: "Amount",
    value: "$24.50",
  },
  {
    label: "Purpose",
    value: "Dinner",
  },
];

const defaultSteps: PaymentStep[] = [
  {
    label: "Intent",
    description: "The payment purpose and participants are confirmed.",
  },
  {
    label: "Identity",
    description: "The recipient and account signals are checked.",
  },
  {
    label: "Policy",
    description: "Payment permissions and safeguards are evaluated.",
  },
  {
    label: "Settlement",
    description: "The transaction completes through the best available rail.",
  },
  {
    label: "Receipt",
    description: "A verifiable record is preserved for later.",
  },
];

const defaultReceiptFields: ReceiptField[] = [
  {
    label: "Status",
    value: "Completed",
  },
  {
    label: "Recipient",
    value: "Sarah Johnson",
  },
  {
    label: "Purpose",
    value: "Dinner",
  },
  {
    label: "Completed",
    value: "8:42 PM",
  },
];

export function PaymentExperience({
  eyebrow = "Experience ZephiPay",
  title = "From payment intent to verified receipt.",
  description = "A simple payment on the surface. Identity, policy, settlement, and verification working quietly underneath.",
  actionLabel = "Continue",
  paymentEyebrow = "Personal payment",
  paymentTitle = "Send money",
  paymentFields = defaultPaymentFields,
  statusLabel = "Verified recipient",
  timelineEyebrow = "What happens underneath",
  steps = defaultSteps,
  receiptTitle = "Verified receipt",
  receiptFields = defaultReceiptFields,
  receiptId = "ZP-24A8-7F31",
  receiptStatusLabel = "Settlement verified",
  receiptActions = ["View", "Share", "Verify"],
}: PaymentExperienceProps) {
  return (
    <div>
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.18em] text-brand-secondary">
          {eyebrow}
        </p>

        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          {title}
        </h2>

        <p className="mt-6 text-lg leading-8 text-foreground-secondary">
          {description}
        </p>
      </div>

      <ExperienceCanvas
        left={
          <PaymentPreview
            eyebrow={paymentEyebrow}
            title={paymentTitle}
            fields={paymentFields}
            statusLabel={statusLabel}
            actionLabel={actionLabel}
          />
        }
        center={
          <RuntimeTimeline
            eyebrow={timelineEyebrow}
            steps={steps}
          />
        }
        right={
          <ReceiptPreview
            title={receiptTitle}
            fields={receiptFields}
            receiptId={receiptId}
            statusLabel={receiptStatusLabel}
            actions={receiptActions}
          />
        }
      />
    </div>
  );
}
