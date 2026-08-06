
import type { Metadata } from "next";

import {
SecurityStudioPageShell,
VerifiedReceiptsWorkspace,
} from "@/components/marketing/security-studio";

export const metadata:Metadata={
title:"Verified Receipts | ZephiPay Security",
description:"Preserve Runtime evidence, settlement records, identifiers, and payment integrity."
};

export default function Page(){

return(

<SecurityStudioPageShell
title="Verified Receipts"
description="Preserve trustworthy payment evidence across Runtime decisions, settlement, and verification."
>

<VerifiedReceiptsWorkspace/>

<section className="mt-14 grid gap-5 lg:grid-cols-3">

{[
[
"Evidence preservation",
"Verified receipts preserve identifiers, Runtime context, and settlement together."
],
[
"Integrity",
"Receipts can be independently verified rather than only displayed."
],
[
"Transparency",
"Participants understand not only what happened, but why it happened."
]
].map(([title,body])=>(

<article
key={title}
className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)]">

<p className="text-xs uppercase tracking-[0.18em] text-brand-secondary">

{title}

</p>

<p className="mt-4 leading-7 text-foreground-secondary">

{body}

</p>

</article>

))}

</section>

</SecurityStudioPageShell>

);

}
