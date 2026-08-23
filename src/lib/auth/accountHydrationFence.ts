import type { AuthLifecycleState } from "@/lib/auth/authLifecycle";

export type AccountHydrationTicket = Readonly<{
  id: number;
  generation: number;
  accountId?: string;
  controller: AbortController;
}>;

export class AccountHydrationFence {
  private nextId = 0;
  private active?: AccountHydrationTicket;

  begin(authority: AuthLifecycleState): AccountHydrationTicket {
    this.invalidate();
    const ticket: AccountHydrationTicket = {
      id: ++this.nextId,
      generation: authority.generation,
      accountId: authority.accountId,
      controller: new AbortController(),
    };
    this.active = ticket;
    return ticket;
  }

  invalidate(): void {
    this.active?.controller.abort();
    this.active = undefined;
  }

  mayCommit(ticket: AccountHydrationTicket, authority: AuthLifecycleState): boolean {
    return this.active === ticket && !ticket.controller.signal.aborted && ticket.generation === authority.generation && ticket.accountId === authority.accountId;
  }

  finish(ticket: AccountHydrationTicket): void {
    if (this.active === ticket) this.active = undefined;
  }
}
