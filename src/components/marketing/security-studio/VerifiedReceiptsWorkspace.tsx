
"use client";

import { useMemo, useState } from "react";

type ReceiptView =
  | "all"
  | "verified"
  | "pending"
  | "failed"
  | "refunded"
  | "disputed";

const tabs = [
  {
    id: "all",
    label: "All receipts",
    title: "No verified receipts yet",
    description:
      "Verified receipts will appear after economic events complete through Zephyon Runtime.",
  },
  {
    id: "verified",
    label: "Verified",
    title: "No verified receipts",
    description:
      "Receipts become verified after Runtime evaluation and settlement complete.",
  },
  {
    id: "pending",
    label: "Pending",
    title: "No pending receipts",
    description:
      "Receipts awaiting settlement or verification will appear here.",
    },
  {
    id: "failed",
    label: "Failed",
    title: "No failed receipts",
    description:
      "Failed payment evidence is preserved rather than discarded.",
  },
  {
    id: "refunded",
    label: "Refunded",
    title: "No refunded receipts",
    description:
      "Refund evidence is linked to the originating receipt.",
  },
  {
    id: "disputed",
    label: "Disputed",
    title: "No disputed receipts",
    description:
      "Disputed economic events remain traceable.",
  },
] as const;

export function VerifiedReceiptsWorkspace() {
  const [active,setActive]=useState<ReceiptView>("all");

  const current=useMemo(
    ()=>tabs.find(t=>t.id===active)!,
    [active]
  );

  const inspector=[
    ["Receipt ID","—"],
    ["Payment ID","—"],
    ["Runtime ID","—"],
    ["Settlement","—"],
    ["Decision","—"],
    ["Integrity","Not verified"],
    ["Network","Not connected"],
    ["Timestamp","—"],
  ];

  return(
<section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">

<header className="border-b border-border-subtle px-6 py-6">

<p className="text-xs uppercase tracking-[0.18em] text-brand-secondary font-medium">
Verified receipts workspace
</p>

<h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
Preserve trustworthy payment evidence
</h2>

<p className="mt-3 max-w-3xl text-sm leading-6 text-foreground-secondary">
Every completed economic event can preserve Runtime decisions,
settlement information, identifiers, and integrity signals as one
verifiable receipt.
</p>

<div className="mt-6 flex flex-wrap gap-2">

{tabs.map(tab=>{

const activeTab=tab.id===active;

return(

<button
key={tab.id}
type="button"
onClick={()=>setActive(tab.id)}
className={[
"rounded-full border px-4 py-2 text-sm transition",
activeTab
?"border-foreground bg-foreground text-background"
:"border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated"
].join(" ")}
>

{tab.label}

</button>

);

})}

</div>

</header>

<div className="grid xl:grid-cols-[1.3fr_0.7fr]">

<div className="border-r border-border-subtle p-6">

<div className="grid gap-4 sm:grid-cols-4">

{[
["Receipts","—"],
["Verified","—"],
["Settlement","—"],
["Exports","—"],
].map(([label,value])=>(

<div
key={label}
className="rounded-2xl border border-border-default bg-surface-elevated/40 p-4">

<p className="text-xs text-foreground-muted">{label}</p>

<p className="mt-3 text-2xl font-semibold">{value}</p>

</div>

))}

</div>

<div className="mt-6 rounded-[1.75rem] border border-border-default bg-background/40">

<div className="border-b border-border-subtle p-5">

<div className="flex items-center justify-between">

<div>

<h3 className="font-semibold">{current.title}</h3>

<p className="mt-2 text-sm text-foreground-secondary">
{current.description}
</p>

</div>

<span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1 text-xs">
No receipt history
</span>

</div>

</div>

<div className="flex min-h-[23rem] flex-col items-center justify-center p-10 text-center">

<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">

🧾

</div>

<h3 className="mt-6 text-xl font-semibold">

{current.title}

</h3>

<p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">

Receipts become available after verified Runtime execution,
settlement confirmation, and evidence preservation.

</p>

<div className="mt-6 flex flex-wrap justify-center gap-2">

{[
"Receipt ID",
"Runtime ID",
"Settlement",
"Integrity",
"Decision",
"Signature"
].map(item=>(

<span
key={item}
className="rounded-full border border-border-default bg-surface-secondary px-3 py-1 text-xs">

{item}

</span>

))}

</div>

</div>

</div>

</div>

<aside className="p-6">

<p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">

Receipt inspector

</p>

<h3 className="mt-3 text-xl font-semibold">

Awaiting verified receipt

</h3>

<p className="mt-3 text-sm leading-6 text-foreground-secondary">

Select a receipt to inspect Runtime evidence,
settlement information, identifiers, and integrity.

</p>

<div className="mt-6 space-y-3">

{inspector.map(([label,value])=>(

<div
key={label}
className="flex items-center justify-between rounded-xl border border-border-default bg-surface-glass px-4 py-3">

<span>{label}</span>

<span className="text-xs text-foreground-muted">
{value}
</span>

</div>

))}

</div>

<div className="mt-6 rounded-2xl border border-border-default bg-surface-glass p-5">

<h4 className="font-medium">

Evidence chain

</h4>

<p className="mt-3 text-sm leading-6 text-foreground-secondary">

Verified receipts preserve payment identifiers,
Runtime decisions, settlement references,
and integrity metadata as one connected record.

</p>

</div>

</aside>

</div>

</section>

);

}
