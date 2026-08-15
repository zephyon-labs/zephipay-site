"use client";

import { useCallback, useEffect, useState } from "react";
import { address, createSolanaRpc } from "@solana/kit";
import { Button } from "@/components/ui/Button";
import {
  CIRCLE_DEVNET_USDC_MINT,
  SOLANA_DEVNET_GENESIS_HASH,
  SOLANA_DEVNET_RPC_URL,
  deriveCircleDevnetUsdcAta,
  detectPhantomProvider,
  formatSolBalance,
  formatUsdcBalance,
  shortAddress,
  solanaExplorerAddressUrl,
  walletConnectionFailure,
  type InjectedSolanaWallet,
} from "@/lib/devnetWallet";

declare global { interface Window { phantom?: { solana?: InjectedSolanaWallet }; solana?: InjectedSolanaWallet } }

type NetworkState = "idle" | "checking" | "connected" | "unavailable" | "wrong-network";
type Balances = { sol: string; usdc: string; ataExists: boolean };

export function DevnetTestBar() {
  const [expanded, setExpanded] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [network, setNetwork] = useState<NetworkState>("idle");
  const [balances, setBalances] = useState<Balances>();
  const [message, setMessage] = useState("Connect a wallet to test the live payment rail.");
  const [wallet, setWallet] = useState<InjectedSolanaWallet>();

  const refresh = useCallback(async (address: string) => {
    setNetwork("checking"); setMessage("Checking Devnet balances…");
    try {
      const rpc = createSolanaRpc(SOLANA_DEVNET_RPC_URL);
      const genesis = await rpc.getGenesisHash().send();
      if (genesis !== SOLANA_DEVNET_GENESIS_HASH) {
        setNetwork("wrong-network"); setBalances(undefined); setMessage("The RPC endpoint is not Solana Devnet."); return;
      }
      const owner = importedAddress(address), ata = importedAddress(await deriveCircleDevnetUsdcAta(address));
      const [balanceResult, accountResult] = await Promise.all([rpc.getBalance(owner, { commitment: "confirmed" }).send(), rpc.getAccountInfo(ata, { commitment: "confirmed" }).send()]);
      let rawUsdc = "0";
      if (accountResult.value) rawUsdc = (await rpc.getTokenAccountBalance(ata, { commitment: "confirmed" }).send()).value.amount;
      setBalances({ sol: formatSolBalance(Number(balanceResult.value)), usdc: formatUsdcBalance(rawUsdc), ataExists: Boolean(accountResult.value) });
      setNetwork("connected"); setMessage(accountResult.value ? "Balances are read from Solana Devnet." : "No Circle Devnet USDC account yet. Balance is 0 USDC.");
    } catch {
      setNetwork("unavailable"); setBalances(undefined); setMessage("Wallet connected. Devnet balances are temporarily unavailable; no payment was attempted.");
    }
  }, []);

  useEffect(() => {
    if (!wallet?.on) return;
    const disconnected = () => { setWalletAddress(undefined); setBalances(undefined); setNetwork("idle"); setMessage("Connect a wallet to test the live payment rail."); };
    const changed = (key?: { toBase58(): string } | null) => { const address = key?.toBase58(); setWalletAddress(address); setBalances(undefined); if (address) void refresh(address); else disconnected(); };
    wallet.on("disconnect", disconnected); wallet.on("accountChanged", changed);
    return () => { wallet.removeListener?.("disconnect", disconnected); wallet.removeListener?.("accountChanged", changed); };
  }, [refresh, wallet]);

  async function connect() {
    const provider = detectPhantomProvider(window);
    if (!provider) { setExpanded(true); setNetwork("unavailable"); setMessage("Phantom was not detected. Use its extension on HTTPS, localhost, or 127.0.0.1."); return; }
    setWallet(provider);
    try {
      const result = await provider.connect(), publicKey = result?.publicKey ?? provider.publicKey;
      if (!publicKey) throw new Error("Provider returned no public key.");
      const connectedAddress = publicKey.toBase58(); setWalletAddress(connectedAddress); await refresh(connectedAddress);
    } catch (error) { setNetwork("unavailable"); setMessage(walletConnectionFailure(error)); }
  }
  async function disconnect() { try { await wallet?.disconnect(); } finally { setWalletAddress(undefined); setBalances(undefined); setNetwork("idle"); setMessage("Wallet disconnected. No payment was attempted."); } }

  const connected = Boolean(walletAddress), status = networkLabel(network), summary = connected && balances ? `${shortAddress(walletAddress!)} · ${balances.sol} SOL · ${balances.usdc} USDC` : message;
  return <section aria-label="Solana Devnet testing" className="mt-4 overflow-hidden rounded-[1.4rem] border border-border-default bg-surface-glass shadow-[var(--shadow-soft)] backdrop-blur-xl">
    <div className="flex min-w-0 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex min-w-0 items-start gap-3">
        <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-secondary shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand-secondary)_15%,transparent)]" />
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-medium">Solana Devnet</h3><span className="rounded-full border border-border-default bg-background/60 px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-[.12em] text-foreground-secondary">Test network</span></div><p aria-live="polite" className="mt-1 max-w-xl break-words text-sm leading-5 text-foreground-secondary">{summary}</p></div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="text-xs text-foreground-muted"><span aria-hidden="true">●</span> {connected ? "Connected" : "Not connected"}</span>
        {!connected ? <Button variant="outline" onClick={connect}>Connect wallet</Button> : null}
        <button type="button" aria-expanded={expanded} aria-controls="devnet-test-details" onClick={() => setExpanded(value => !value)} className="min-h-11 rounded-xl px-3 text-sm font-medium text-foreground-secondary transition hover:bg-background/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">{expanded ? "Hide details" : "Devnet details"} <span aria-hidden="true">{expanded ? "↑" : "↓"}</span></button>
      </div>
    </div>
    {expanded ? <div id="devnet-test-details" className="border-t border-border-subtle p-4 sm:p-5">
      <p className="max-w-2xl text-sm leading-6 text-foreground-secondary">This testing layer shows the Solana Devnet activity behind ZephiPay. Everyday payments remain the primary experience.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Info label="Network" value="Solana Devnet" detail="Test network only" />
        <Info label="RPC status" value={status} detail={message} />
        <Info label="Wallet" value={walletAddress ? shortAddress(walletAddress) : "Not connected"} detail={walletAddress ?? "Connection is always user initiated."} copy={walletAddress} />
        <Info label="SOL balance" value={balances ? `${balances.sol} SOL` : "—"} detail="Devnet fee balance" />
        <Info label="Circle Devnet USDC" value={balances ? `${balances.usdc} USDC` : "—"} detail={balances && !balances.ataExists ? "Associated account does not exist" : "Read-only balance"} />
        <Info label="USDC mint" value={shortAddress(CIRCLE_DEVNET_USDC_MINT)} detail="Canonical Circle Devnet asset" copy={CIRCLE_DEVNET_USDC_MINT} />
      </div>
      <div className="mt-5 rounded-xl border border-border-subtle bg-background/45 p-4"><p className="text-xs font-medium uppercase tracking-[.14em] text-foreground-muted">Live payment status</p><p className="mt-2 text-sm font-medium">No live Devnet payment started</p><p className="mt-1 text-sm text-foreground-secondary">Wallet balances are read-only. The payment form above currently keeps its own clearly labeled payment lifecycle.</p></div>
      <div className="mt-5 flex flex-wrap gap-2">
        {walletAddress ? <><Button variant="outline" onClick={() => refresh(walletAddress)}>Refresh balances</Button><Button variant="outline" onClick={disconnect}>Disconnect</Button><a className="inline-flex min-h-11 items-center rounded-xl border border-border-default px-4 text-sm font-medium hover:bg-background/60" href={solanaExplorerAddressUrl(walletAddress)} target="_blank" rel="noreferrer">View wallet on Explorer ↗</a></> : <Button onClick={connect}>Connect wallet</Button>}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground-muted"><a className="underline underline-offset-4 hover:text-foreground" href="https://faucet.solana.com/" target="_blank" rel="noreferrer">Devnet SOL faucet ↗</a><a className="underline underline-offset-4 hover:text-foreground" href="https://faucet.circle.com/" target="_blank" rel="noreferrer">Circle testnet USDC faucet ↗</a></div>
    </div> : null}
  </section>;
}

function Info({ label, value, detail, copy }: { label: string; value: string; detail: string; copy?: string }) {
  const [copied, setCopied] = useState(false);
  async function copyValue() { if (!copy) return; try { await navigator.clipboard.writeText(copy); setCopied(true); window.setTimeout(() => setCopied(false), 1500); } catch { setCopied(false); } }
  return <div className="min-w-0 rounded-xl border border-border-subtle bg-background/55 p-4"><p className="text-xs uppercase tracking-[.13em] text-foreground-muted">{label}</p><div className="mt-2 flex min-w-0 items-center gap-2"><span className="min-w-0 truncate text-sm font-medium">{value}</span>{copy ? <button type="button" onClick={copyValue} aria-label={`Copy ${label}`} className="min-h-9 shrink-0 rounded-lg border border-border-default px-2 text-xs hover:bg-background">{copied ? "Copied" : "Copy"}</button> : null}</div><p className="mt-1 break-words text-xs leading-5 text-foreground-muted">{detail}</p></div>;
}

function networkLabel(state: NetworkState) { return state === "connected" ? "Connected to Devnet" : state === "checking" ? "Checking Devnet" : state === "wrong-network" ? "Wrong network" : state === "unavailable" ? "Unavailable" : "Not checked"; }
const importedAddress = address;
