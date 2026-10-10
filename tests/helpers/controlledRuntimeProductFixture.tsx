import assert from "node:assert/strict";
import { act, create, type ReactTestRenderer } from "react-test-renderer";
import { ControlledConfirmation } from "../../src/components/product/personal/ControlledConfirmation";
import { authenticatedRequests } from "../../src/lib/auth/authenticatedRequests";

/** Used by the bounded cross-repository PostgreSQL run. Browser transport and fault
 * injection only; Backend, Protocol, SDK consent and durable storage remain real. */
export async function exerciseRuntimeProduct(paymentId: string, browserFetch: typeof fetch, ports: {
  afterDecision: () => Promise<void>;
  reconstruct: () => Promise<void>;
  revoke: () => Promise<void>;
}) {
  const previous = globalThis.fetch, actions: string[] = [];
  let view: ReactTestRenderer | undefined;
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), `/api/payment-intents/${paymentId}/controlled-confirmation`);
    const action = JSON.parse(String(init?.body)).action; actions.push(action);
    const response = await browserFetch(input, init);
    if (action === "runtime-evaluate") {
      assert.equal(response.status, 200);
      await ports.afterDecision();
      throw new Error("Offline fault: first committed Runtime response lost");
    }
    return response;
  };
  const text = () => JSON.stringify(view!.toJSON());
  const button = (name: string) => view!.root.findAllByType("button").find(b => b.findAllByType("span").some(s => s.props.children === name));
  const until = async (predicate: () => boolean) => {
    for (let n = 0; n < 1500; n++) {
      await act(async () => { await new Promise(resolve => setTimeout(resolve, 10)); });
      if (predicate()) return;
    }
    assert.fail("Bounded Runtime product observation expired: " + text());
  };
  const mount = async () => { await act(async () => { view = create(<ControlledConfirmation paymentId={paymentId} eligible/>); }); };
  const unmount = async () => { await act(async () => view!.unmount()); view = undefined; };
  try {
    await mount(); await until(() => Boolean(button("Confirm payment")) && !button("Confirm payment")!.props.disabled);
    assert(!actions.includes("runtime-evaluate"));
    await act(async () => { button("Confirm payment")!.props.onClick(); button("Confirm payment")!.props.onClick(); });
    await until(() => Boolean(button("Check payment policy")) && !button("Check payment policy")!.props.disabled);
    assert.match(text(), /Payment confirmed/); assert(!actions.includes("runtime-evaluate"));
    await act(async () => { button("Check payment policy")!.props.onClick(); button("Check payment policy")!.props.onClick(); });
    await until(() => text().includes("Policy status unavailable"));
    assert(!text().includes("Approved to continue"));
    await ports.reconstruct();
    await act(async () => { button("Recover policy status")!.props.onClick(); });
    await until(() => text().includes("Approved to continue"));
    await unmount(); await ports.reconstruct(); await mount();
    await until(() => text().includes("Approved to continue"));
    await ports.revoke(); await unmount(); await mount();
    await until(() => text().includes("Policy approval no longer current"));
    assert.match(text(), /An earlier approval is recorded/); assert(!text().includes("Approved to continue"));
    assert(!button("Check payment policy"));
    assert.equal(actions.filter(a => a === "confirm").length, 1);
    assert.equal(actions.filter(a => a === "runtime-evaluate").length, 1);
    assert(actions.filter(a => a === "runtime-recover").length >= 4);
    assert.doesNotMatch(text(), /Sent|Paid|Settled|Completed|Transaction authorized/);
    return { actions, state: "NO_LONGER_CURRENT" };
  } finally {
    if (view) await unmount(); globalThis.fetch = previous; authenticatedRequests.invalidate();
  }
}
