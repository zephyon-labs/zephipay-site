"use client";

import { useRef, useState } from "react";
import { RuntimeEngine, type RuntimeStageStatus } from "./RuntimeEngine";
import { RuntimeSummary } from "./RuntimeSummary";
import { runtimeStages } from "./runtime-data";

const STEP_DURATION_MS = 520;

type SimulationState = "idle" | "running" | "complete";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function delay(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export function RuntimeExplorer() {
  const [simulationState, setSimulationState] =
    useState<SimulationState>("idle");
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [executionTime, setExecutionTime] = useState("2.4 ms");
  const runIdRef = useRef(0);

  async function runSimulation() {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;

    setSimulationState("running");
    setActiveStageIndex(0);

    const startedAt = performance.now();

    for (let index = 0; index < runtimeStages.length; index += 1) {
      if (runIdRef.current !== runId) {
        return;
      }

      setActiveStageIndex(index);
      await delay(STEP_DURATION_MS);
    }

    if (runIdRef.current !== runId) {
      return;
    }

    const interfaceDuration = performance.now() - startedAt;
    const simulatedRuntimeDuration = Math.max(
      1.8,
      Math.min(4.9, interfaceDuration / 1000),
    );

    setExecutionTime(`${simulatedRuntimeDuration.toFixed(1)} ms`);
    setActiveStageIndex(runtimeStages.length);
    setSimulationState("complete");
  }

  function getStageStatus(index: number): RuntimeStageStatus {
    if (simulationState === "complete" || index < activeStageIndex) {
      return "complete";
    }

    if (simulationState === "running" && index === activeStageIndex) {
      return "running";
    }

    return "pending";
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(520px,1.16fr)] lg:items-start lg:gap-14">
      <div className="lg:sticky lg:top-32">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">
          Interactive demonstration
        </p>

        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Follow one transaction through the Runtime.
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-secondary">
          Run a simulated economic event and watch each specialized engine
          contribute to one coordinated, observable decision.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated/35">
          <div className="grid grid-cols-[92px_1fr] border-b border-border-subtle px-5 py-4 text-sm">
            <span className="text-foreground-tertiary">From</span>
            <span className="font-medium">Personal account</span>
          </div>

          <div className="grid grid-cols-[92px_1fr] border-b border-border-subtle px-5 py-4 text-sm">
            <span className="text-foreground-tertiary">To</span>
            <span className="font-medium">Verified merchant</span>
          </div>

          <div className="grid grid-cols-[92px_1fr] px-5 py-4 text-sm">
            <span className="text-foreground-tertiary">Amount</span>
            <span className="font-medium">$24.80 USDC</span>
          </div>
        </div>

        <button
          type="button"
          onClick={runSimulation}
          disabled={simulationState === "running"}
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition duration-200 hover:opacity-88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-55"
        >
          {simulationState === "running"
            ? "Runtime executing"
            : simulationState === "complete"
              ? "Run another simulation"
              : "Run simulation"}

          {simulationState !== "running" ? <ArrowIcon /> : null}
        </button>

        <p className="mt-4 max-w-md text-xs leading-5 text-foreground-tertiary">
          Demonstration only. No funds move and no external network request is
          made.
        </p>
      </div>

      <div>
        <div className="rounded-[2rem] border border-border-subtle bg-background/30 p-4 backdrop-blur-sm sm:p-6">
          {runtimeStages.map((stage, index) => (
            <RuntimeEngine
              key={stage.id}
              stage={stage}
              status={getStageStatus(index)}
              isLast={index === runtimeStages.length - 1}
            />
          ))}
        </div>

        {simulationState === "complete" ? (
          <div className="mt-6">
            <RuntimeSummary executionTime={executionTime} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
