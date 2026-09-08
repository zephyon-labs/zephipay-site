// Controlled beta enables the existing Devnet Send path. Request mutations
// remain unavailable; existing payment and request recovery stays available.
export const ROUND_ONE_REQUESTS_AVAILABLE = false;
export const ROUND_ONE_DEVNET_EXECUTION_AVAILABLE = true;

export const ROUND_ONE_REQUEST_NOTICE = "Request payments are not included in Superteam Round 1. Existing requests remain available to view.";
export const ROUND_ONE_DEVNET_NOTICE = "Solana Devnet payments are available for controlled beta testing. Devnet assets have no real-world value.";
