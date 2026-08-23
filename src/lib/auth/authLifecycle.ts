export type AuthLifecycleStatus = "loading" | "authenticated" | "authenticated-unavailable" | "signing-out" | "signed-out" | "reauthentication-required" | "error";

export type AuthLifecycleState = Readonly<{
  status: AuthLifecycleStatus;
  accountId?: string;
  generation: number;
}>;

export const initialAuthLifecycle: AuthLifecycleState = { status: "loading", generation: 0 };

export type AuthLifecycleEvent =
  | Readonly<{ type: "loading" }>
  | Readonly<{ type: "authenticated"; accountId: string }>
  | Readonly<{ type: "authenticated-unavailable" | "transient-error" | "logout" | "signed-out" | "reauthentication-required" }>;

export function transitionAuthLifecycle(state: AuthLifecycleState, event: AuthLifecycleEvent): AuthLifecycleState {
  if (event.type === "loading") {
    return { ...state, status: "loading", generation: state.generation + (state.status === "authenticated" ? 1 : 0) };
  }
  if (event.type === "authenticated") {
    const principalChanged = state.accountId !== event.accountId;
    return { status: "authenticated", accountId: event.accountId, generation: state.generation + (principalChanged ? 1 : 0) };
  }
  const status = event.type === "transient-error" ? "error" : event.type === "logout" ? "signing-out" : event.type;
  return { status, generation: state.generation + 1 };
}

export function canRenderAuthenticatedState(state: AuthLifecycleState): boolean {
  return state.status === "authenticated" && Boolean(state.accountId);
}

export function authenticatedBoundaryKey(state: AuthLifecycleState): string | undefined {
  return canRenderAuthenticatedState(state) ? `${state.generation}:${state.accountId}` : undefined;
}

export type CrossTabAuthMessage =
  | Readonly<{ type: "logout" }>
  | Readonly<{ type: "reauthentication-required" }>
  | Readonly<{ type: "principal"; accountId: string }>;

export function crossTabAuthAction(state: AuthLifecycleState, message: CrossTabAuthMessage): "none" | "invalidate" | "reauthenticate" | "reload" | "refresh" {
  if (message.type === "logout") return "invalidate";
  if (message.type === "reauthentication-required") return "reauthenticate";
  if (!state.accountId) return "refresh";
  return state.accountId === message.accountId ? "none" : "reload";
}
