"use client";

import { useEffect, useState } from "react";

type Account = { id: string; actorSubject: string; status: string };

export function AccountSession() {
  const [account, setAccount] = useState<Account | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/account", { cache: "no-store", credentials: "same-origin", signal: controller.signal })
      .then(async (response) => response.ok ? response.json() : null)
      .then((body) => setAccount(body?.account ?? null))
      .catch(() => undefined)
      .finally(() => setResolved(true));
    return () => controller.abort();
  }, []);

  if (account) {
    return (
      <div className="flex items-center gap-2 text-xs" aria-label="Signed-in account">
        <span className="hidden text-foreground-secondary xl:inline">Signed in · Verification pending · Beta access not evaluated</span>
        <form action="/api/auth/logout" method="post"><button className="rounded-full border border-border-default px-3 py-2 hover:bg-surface-elevated" type="submit">Log out</button></form>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2" aria-busy={!resolved}>
      <a className="text-sm text-foreground hover:underline" href="/auth/login">Sign in</a>
      <a className="rounded-full bg-brand-primary px-3 py-2 text-sm text-white" href="/auth/login?screen_hint=signup">Create account</a>
    </div>
  );
}
