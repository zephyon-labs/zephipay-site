"use client";

import { useEffect, useState } from "react";
import type { IdentitySuccess } from "@/lib/identity/contract";

type State = "loading" | "configured" | "incomplete" | "unavailable";

export function PaymentIdentityStatus() {
  const [state, setState] = useState<State>("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/account/identity", { cache: "no-store", credentials: "same-origin", signal: controller.signal })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => undefined);
        if (!response.ok || !isSuccess(body)) return setState("unavailable");
        setState(body.identity ? "configured" : "incomplete");
      })
      .catch(() => { if (!controller.signal.aborted) setState("unavailable"); });
    return () => controller.abort();
  }, []);

  const copy = state === "configured" ? "Payment Identity set up" : state === "incomplete" ? "Payment Identity not set up" : state === "unavailable" ? "Payment Identity status unavailable" : "Checking Payment Identity…";
  return <section className="mb-7 flex flex-col gap-4 rounded-2xl border border-border-subtle bg-background/55 p-5 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
    <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">Payment Identity</p><p className="mt-2 font-medium">{copy}</p>{state === "incomplete" ? <p className="mt-2 text-sm text-foreground-secondary">Sending is still available. Set up a username when you want people to find and pay you on ZephiPay.</p> : null}</div>
    {state === "incomplete" || state === "configured" ? <a className="text-sm font-medium text-brand-secondary underline" href="/personal/identity">{state === "configured" ? "Manage" : "Set up"}</a> : null}
  </section>;
}

function isSuccess(value: unknown): value is IdentitySuccess {
  return typeof value === "object" && value !== null && "ok" in value && value.ok === true && "identity" in value;
}
