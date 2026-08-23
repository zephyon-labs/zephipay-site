const activeLogoutDocuments = new WeakSet<Document>();

/**
 * Starts an exact-origin POST from a document-owned form that cannot be
 * removed when React tears down the authenticated subtree. This is transport
 * fencing only; the server wrapper and Auth0 logout remain authoritative.
 */
export function startLogoutTransport(beginLogout: () => void, targetDocument: Document = document): boolean {
  if (activeLogoutDocuments.has(targetDocument)) return false;

  const transport = targetDocument.createElement("form");
  transport.action = "/api/auth/logout";
  transport.method = "post";
  transport.hidden = true;
  targetDocument.body.appendChild(transport);
  activeLogoutDocuments.add(targetDocument);

  beginLogout();
  try {
    transport.submit();
    return true;
  } catch (error) {
    activeLogoutDocuments.delete(targetDocument);
    transport.remove();
    throw error;
  }
}
