import { randomUUID } from "node:crypto";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { webUuid, type WebSession } from "./handoffContract";

type Reference = { reference: string; expiresAt: number };
export function webSessionReference(session: SessionData): Reference | undefined {
  const value=session.zephipayWebSession as Reference | undefined;
  return value && webUuid(value.reference) && Number.isSafeInteger(value.expiresAt) ? value : undefined;
}
/** SDK encrypts this server-generated reference inside its own session. No email, cookie value,
 * access-token sid, browser storage, or user-supplied timestamp becomes canonical identity. */
export function withWebSessionReference(session: SessionData): SessionData {
  return {...session,zephipayWebSession:webSessionReference(session) ?? {reference:randomUUID(),expiresAt:session.internal.createdAt+604740}};
}
export function toWebSession(session: SessionData, revocation=false): WebSession {
  const ref=webSessionReference(session);
  if(!ref || !session.user.sub || (!revocation && (!session.tokenSet.idToken || !session.tokenSet.accessToken || ref.expiresAt<=Date.now()/1000)))
    throw new Error("Sign in again before controlled confirmation.");
  return {...ref,subject:session.user.sub,accessToken:revocation?"":session.tokenSet.accessToken,idToken:revocation?"":session.tokenSet.idToken!};
}
