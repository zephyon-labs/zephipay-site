"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { authenticatedAuthority, authenticatedRequestWasInvalidated } from "@/lib/auth/authenticatedRequests";
import { validateRuntimeResult, type ControlledRuntimeAction, type ControlledRuntimeResult } from "@/lib/controlledConfirmation/runtimeContract";

const labels: Record<ControlledRuntimeResult["state"], string> = {
  NOT_EVALUATED: "Payment confirmed",
  APPROVED: "Approved to continue",
  REJECTED: "Unable to proceed",
  EXPIRED: "Policy approval expired",
  NO_LONGER_CURRENT: "Policy approval no longer current",
  UNAVAILABLE: "Policy status unavailable",
};
const descriptions: Record<ControlledRuntimeResult["state"], string> = {
  NOT_EVALUATED: "Your consent is recorded. Check payment policy when you are ready.",
  APPROVED: "Zephyon policy currently permits this confirmed payment to proceed to the next execution-preparation stage.",
  REJECTED: "This confirmed payment did not meet payment policy requirements. It cannot continue.",
  EXPIRED: "This payment must be reviewed again before it can continue.",
  NO_LONGER_CURRENT: "This payment is no longer eligible to continue under its earlier approval.",
  UNAVAILABLE: "Current policy approval could not be verified. Recover policy status before continuing.",
};

/** Displays Backend observations; no policy, evidence qualification or execution capability. */
export function ControlledRuntime({ paymentId, confirmed }: { paymentId: string; confirmed: boolean }) {
  const [result, setResult] = useState<ControlledRuntimeResult>();
  const [busy, setBusy] = useState(true);
  const pending = useRef(false), generation = useRef(0);
  const act = useCallback(async (action: ControlledRuntimeAction) => {
    if (pending.current || (action === "runtime-evaluate" && !confirmed)) return;
    pending.current = true;
    const current = ++generation.current, authority = authenticatedAuthority();
    setBusy(true);
    setResult(undefined); // Never retain a current-approval claim across a new observation.
    try {
      const response = await authority.json(`/api/payment-intents/${paymentId}/controlled-confirmation`, {
        method: "POST", credentials: "same-origin", cache: "no-store", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      response.apply(({ response, body }) => {
        if (!response.ok) throw new Error("Policy status unavailable.");
        const value = validateRuntimeResult(body);
        if (value.paymentId !== paymentId) throw new Error("Policy reference changed.");
        // The browser clock may only withhold a claim; Backend remains the expiry authority.
        if (value.currentApproval && Date.parse(value.expiresAt!) <= Date.now()) throw new Error("Fresh observation required.");
        if (generation.current === current) setResult(value);
      });
    } catch (error) {
      if (generation.current === current && !authenticatedRequestWasInvalidated(error)) setResult(undefined);
    } finally {
      if (generation.current === current) { pending.current = false; setBusy(false); }
    }
  }, [paymentId, confirmed]);

  useEffect(() => {
    void act("runtime-recover"); // Mount/reload/reconstruction never creates a first decision.
    const fence = () => { generation.current++; pending.current = false; };
    const invalidate = () => { fence(); setResult(undefined); setBusy(false); };
    const recover = () => { invalidate(); void act("runtime-recover"); };
    const restore = (event: PageTransitionEvent) => { if (event.persisted) recover(); };
    const visibility = () => { if (document.visibilityState === "hidden") invalidate(); else recover(); };
    if (typeof window !== "undefined") window.addEventListener("pagehide", invalidate);
    if (typeof window !== "undefined") window.addEventListener("pageshow", restore);
    if (typeof window !== "undefined") window.addEventListener("focus", recover);
    if (typeof document !== "undefined") document.addEventListener("visibilitychange", visibility);
    return () => {
      fence();
      if (typeof window !== "undefined") window.removeEventListener("pagehide", invalidate);
      if (typeof window !== "undefined") window.removeEventListener("pageshow", restore);
      if (typeof window !== "undefined") window.removeEventListener("focus", recover);
      if (typeof document !== "undefined") document.removeEventListener("visibilitychange", visibility);
    };
  }, [act]);

  useEffect(() => {
    if (!result?.currentApproval) return;
    // This timer invalidates presentation and asks Backend again; it cannot extend authority.
    const timer = setTimeout(() => { void act("runtime-recover"); }, Math.min(2147483647, Math.max(0, Date.parse(result.expiresAt!) - Date.now())));
    return () => clearTimeout(timer);
  }, [act, result]);

  const state = result?.state ?? "UNAVAILABLE";
  return <section className="mt-5 rounded-2xl border border-border-default p-6" aria-label="Payment policy">
    <h3 className="text-2xl font-semibold" role="status">{busy ? "Checking payment policy" : labels[state]}</h3>
    <p className="mt-4">{busy ? "Recovering the current policy result for this payment." : descriptions[state]}</p>
    {result?.historicalStatus === "APPROVED" && !result.currentApproval ? <p className="mt-4">An earlier approval is recorded. It is not current permission to continue.</p> : null}
    <p className="mt-4">This is a non-value check. Execution has not occurred and no funds have moved.</p>
    <div className="mt-5 flex flex-wrap gap-3">
      {confirmed && result?.state === "NOT_EVALUATED" ? <Button onClick={() => void act("runtime-evaluate")} disabled={busy}>Check payment policy</Button> : null}
      <Button variant="outline" onClick={() => void act("runtime-recover")} disabled={busy}>Recover policy status</Button>
    </div>
  </section>;
}
