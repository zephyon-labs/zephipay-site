import { browserAuthenticationFailure, type BrowserAuthenticationFailure } from "@/lib/auth/authFailure";

type UnauthorizedListener = (failure: BrowserAuthenticationFailure) => void;
type FetchImplementation = typeof fetch;
export type AuthenticatedBodyView<T> = Readonly<{ response: Response; body: T }>;

type AuthorityOperations = Readonly<{
  isCurrent: () => boolean;
  assertCurrent: () => void;
  json: (input: RequestInfo | URL, init?: RequestInit) => Promise<AuthenticatedBodyResult<unknown>>;
  text: (input: RequestInfo | URL, init?: RequestInit) => Promise<AuthenticatedBodyResult<string>>;
}>;

export class AuthenticatedRequestInvalidatedError extends Error {
  constructor() {
    super("The authenticated request belongs to an obsolete session generation.");
    this.name = "AuthenticatedRequestInvalidatedError";
  }
}

export function authenticatedRequestWasInvalidated(error: unknown): error is AuthenticatedRequestInvalidatedError {
  return error instanceof AuthenticatedRequestInvalidatedError;
}

/**
 * A non-identity, request-lifecycle authority captured for one authenticated
 * browser generation. It grants no session or account authority; it only
 * prevents effects and follow-up requests from crossing lifecycle generations.
 */
export class AuthenticatedEffectAuthority {
  constructor(private readonly operations: AuthorityOperations) {}

  isCurrent(): boolean {
    return this.operations.isCurrent();
  }

  assertCurrent(): void {
    this.operations.assertCurrent();
  }

  run(effect: () => void): void {
    this.assertCurrent();
    effect();
    this.assertCurrent();
  }

  json(input: RequestInfo | URL, init: RequestInit = {}): Promise<AuthenticatedBodyResult<unknown>> {
    this.assertCurrent();
    return this.operations.json(input, init);
  }

  text(input: RequestInfo | URL, init: RequestInit = {}): Promise<AuthenticatedBodyResult<string>> {
    this.assertCurrent();
    return this.operations.text(input, init);
  }
}

export class AuthenticatedBodyResult<T> {
  constructor(
    readonly authority: AuthenticatedEffectAuthority,
    private readonly view: AuthenticatedBodyView<T>,
  ) {}

  apply(effect: (view: AuthenticatedBodyView<T>) => void): void {
    this.authority.run(() => effect(this.view));
  }

  followUpJson(input: RequestInfo | URL, init: RequestInit = {}): Promise<AuthenticatedBodyResult<unknown>> {
    return this.authority.json(input, init);
  }

  followUpText(input: RequestInfo | URL, init: RequestInit = {}): Promise<AuthenticatedBodyResult<string>> {
    return this.authority.text(input, init);
  }
}

export class AuthenticatedRequestCoordinator {
  private generation = 0;
  private readonly controllers = new Set<AbortController>();
  private readonly unauthorizedListeners = new Set<UnauthorizedListener>();

  constructor(private readonly fetchImplementation: FetchImplementation = ((...arguments_) => fetch(...arguments_))) {}

  invalidate(): void {
    this.generation += 1;
    for (const controller of this.controllers) controller.abort();
    this.controllers.clear();
  }

  subscribeToUnauthorized(listener: UnauthorizedListener): () => void {
    this.unauthorizedListeners.add(listener);
    return () => this.unauthorizedListeners.delete(listener);
  }

  authority(): AuthenticatedEffectAuthority {
    return this.captureAuthority();
  }

  async json(input: RequestInfo | URL, init: RequestInit = {}): Promise<AuthenticatedBodyResult<unknown>> {
    const authority = this.captureAuthority();
    return this.consume(authority, input, init, async (response) => response.json().catch(() => undefined));
  }

  async text(input: RequestInfo | URL, init: RequestInit = {}): Promise<AuthenticatedBodyResult<string>> {
    const authority = this.captureAuthority();
    return this.consume(authority, input, init, (response) => response.text());
  }

  private async consume<T>(
    authority: AuthenticatedEffectAuthority,
    input: RequestInfo | URL,
    init: RequestInit,
    readBody: (response: Response) => Promise<T>,
  ): Promise<AuthenticatedBodyResult<T>> {
    authority.assertCurrent();
    const controller = new AbortController();
    const suppliedSignal = init.signal;
    const abortFromCaller = () => controller.abort(suppliedSignal?.reason);
    if (suppliedSignal?.aborted) abortFromCaller();
    else suppliedSignal?.addEventListener("abort", abortFromCaller, { once: true });
    this.controllers.add(controller);

    try {
      const response = await this.fetchImplementation(input, { ...init, signal: controller.signal });
      authority.assertCurrent();
      if (response.status === 401) {
        const failure = browserAuthenticationFailure(response) ?? "signed-out";
        this.invalidate();
        for (const listener of this.unauthorizedListeners) listener(failure);
        throw new AuthenticatedRequestInvalidatedError();
      }
      const body = await readBody(response);
      authority.assertCurrent();
      return new AuthenticatedBodyResult(authority, { response, body });
    } finally {
      suppliedSignal?.removeEventListener("abort", abortFromCaller);
      this.controllers.delete(controller);
    }
  }

  private captureAuthority(): AuthenticatedEffectAuthority {
    const startedGeneration = this.generation;
    const authority: AuthenticatedEffectAuthority = new AuthenticatedEffectAuthority({
      isCurrent: () => startedGeneration === this.generation,
      assertCurrent: () => this.assertCurrent(startedGeneration),
      json: (input, init = {}) => this.consume(authority, input, init, async (response) => response.json().catch(() => undefined)),
      text: (input, init = {}) => this.consume(authority, input, init, (response) => response.text()),
    });
    return authority;
  }

  private assertCurrent(startedGeneration: number): void {
    if (startedGeneration !== this.generation) throw new AuthenticatedRequestInvalidatedError();
  }
}

export const authenticatedRequests = new AuthenticatedRequestCoordinator();
export const authenticatedAuthority = authenticatedRequests.authority.bind(authenticatedRequests);
export const authenticatedJson = authenticatedRequests.json.bind(authenticatedRequests);
export const authenticatedText = authenticatedRequests.text.bind(authenticatedRequests);
