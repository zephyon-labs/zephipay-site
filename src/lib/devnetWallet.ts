import { findAssociatedTokenPda, TOKEN_PROGRAM_ADDRESS } from "@solana-program/token";
import { address } from "@solana/kit";

export const CIRCLE_DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
export const CIRCLE_DEVNET_USDC_DECIMALS = 6;
export const SOLANA_DEVNET_GENESIS_HASH = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG";
export const SOLANA_DEVNET_RPC_URL = "https://api.devnet.solana.com";

export async function deriveCircleDevnetUsdcAta(owner: string) {
  const [associatedAccount] = await findAssociatedTokenPda({ mint: address(CIRCLE_DEVNET_USDC_MINT), owner: address(owner), tokenProgram: TOKEN_PROGRAM_ADDRESS });
  return associatedAccount;
}

export function shortAddress(value: string, leading = 4, trailing = 5) {
  return value.length <= leading + trailing + 3 ? value : `${value.slice(0, leading)}...${value.slice(-trailing)}`;
}

export function formatSolBalance(lamports: number) {
  return formatBalance(lamports / 1_000_000_000, 4);
}

export function formatUsdcBalance(rawAmount: string) {
  if (!/^\d+$/.test(rawAmount)) throw new Error("Invalid USDC balance.");
  const padded = rawAmount.padStart(CIRCLE_DEVNET_USDC_DECIMALS + 1, "0");
  const whole = padded.slice(0, -CIRCLE_DEVNET_USDC_DECIMALS);
  const fraction = padded.slice(-CIRCLE_DEVNET_USDC_DECIMALS).replace(/0+$/, "").slice(0, 4);
  return fraction ? `${whole}.${fraction}` : whole;
}

export function solanaExplorerAddressUrl(address: string) {
  const canonical = String(importedAddress(address));
  return `https://explorer.solana.com/address/${encodeURIComponent(canonical)}?cluster=devnet`;
}

export function solanaExplorerTransactionUrl(signature: string) {
  if (!/^[1-9A-HJ-NP-Za-km-z]{64,96}$/.test(signature)) throw new Error("Invalid Solana transaction signature.");
  return `https://explorer.solana.com/tx/${encodeURIComponent(signature)}?cluster=devnet`;
}

const importedAddress = address;

export type InjectedSolanaWallet = {
  isPhantom?: boolean;
  publicKey?: { toBase58(): string } | null;
  connect(): Promise<{ publicKey?: { toBase58(): string } } | void>;
  disconnect(): Promise<void>;
  on?(event: "disconnect" | "accountChanged", listener: (key?: { toBase58(): string } | null) => void): void;
  removeListener?(event: "disconnect" | "accountChanged", listener: (key?: { toBase58(): string } | null) => void): void;
};

export function detectPhantomProvider(target: { phantom?: { solana?: InjectedSolanaWallet }; solana?: InjectedSolanaWallet }) {
  const modern = target.phantom?.solana;
  if (modern?.isPhantom && typeof modern.connect === "function") return modern;
  const legacy = target.solana;
  return legacy?.isPhantom && typeof legacy.connect === "function" ? legacy : undefined;
}

export function walletConnectionFailure(error: unknown) {
  const value = error && typeof error === "object" ? error as { code?: unknown; message?: unknown } : undefined;
  const message = typeof value?.message === "string" ? value.message.toLowerCase() : "";
  if (value?.code === 4001 || /reject|cancel|declin/.test(message)) return "Connection request cancelled. Your wallet remains unchanged.";
  if (value?.code === -32002 || /already.*pending|request.*pending/.test(message)) return "A Phantom connection request is already open. Finish it in the wallet, then try again.";
  return "Phantom could not connect. Unlock the extension and try again.";
}

function formatBalance(value: number, decimals: number) {
  if (!Number.isFinite(value) || value < 0) throw new Error("Invalid balance.");
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals }).format(value);
}
