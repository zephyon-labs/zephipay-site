"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/utils/cn";

type AgentLoopStageId =
  | "discover"
  | "decide"
  | "authorize"
  | "pay"
  | "verify";

interface AgentLoopStage {
  id: AgentLoopStageId;
  number: string;
  title: string;
  summary: string;
  agentAction: string;
  runtimeAction: string;
  userControl: string;
  result: string;
}

const stages: AgentLoopStage[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    summary:
      "The agent identifies compatible services, providers, or payment opportunities.",
    agentAction:
      "Searches approved sources and compares available options.",
    runtimeAction:
      "Preserves the original intent and records which providers were considered.",
    userControl:
      "You define which categories, vendors, and resources the agent may explore.",
    result:
      "A list of compatible options moves forward for evaluation.",
  },
  {
    id: "decide",
    number: "02",
    title: "Decide",
    summary:
      "The agent selects the option that best matches the task and assigned rules.",
    agentAction:
      "Compares price, quality, response time, trust signals, and task requirements.",
    runtimeAction:
      "Keeps the selected provider connected to the original economic intent.",
    userControl:
      "You decide which factors matter and which providers are allowed.",
    result:
      "One preferred option is prepared for authorization.",
  },
  {
    id: "authorize",
    number: "03",
    title: "Authorize",
    summary:
      "Identity, permissions, spending limits, risk, and policy are checked.",
    agentAction:
      "Submits the proposed payment and supporting context for approval.",
    runtimeAction:
      "Evaluates identity, compliance, risk, policy, limits, and approval requirements.",
    userControl:
      "You choose whether every payment, larger payments, or only unusual actions require confirmation.",
    result:
      "The payment is approved, rejected, or returned for human review.",
  },
  {
    id: "pay",
    number: "04",
    title: "Pay",
    summary:
      "The approved payment is coordinated through the selected settlement rail.",
    agentAction:
      "Executes only the payment that passed the authorization process.",
    runtimeAction:
      "Coordinates settlement while preserving the full economic-event context.",
    userControl:
      "The agent cannot exceed the permissions, amount, recipient, or rules that were approved.",
    result:
      "Value moves and the execution reference is captured.",
  },
  {
    id: "verify",
    number: "05",
    title: "Verify",
    summary:
      "The Runtime confirms the outcome and preserves a deterministic receipt.",
    agentAction:
      "Receives the purchased resource or confirmation and continues the workflow.",
    runtimeAction:
      "Confirms settlement, records the outcome, and creates a verifiable economic record.",
    userControl:
      "You can inspect the payment, runtime decision, settlement reference, and final receipt.",
    result:
      "The task continues with a verified record of what happened.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function AgentEconomicLoop() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeStageId, setActiveStageId] =
    useState<AgentLoopStageId>("discover");
  const [autoplayEnabled, setAutoplayEnabled] =
    useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isFocusWithin, setIsFocusWithin] =
    useState(false);
  const [reducedMotion, setReducedMotion] =
    useState(false);

  const activeIndex = useMemo(
    () =>
      stages.findIndex(
        (stage) => stage.id === activeStageId,
      ),
    [activeStageId],
  );

  const activeStage = stages[activeIndex] ?? stages[0];

  const progress =
    ((activeIndex + 1) / stages.length) * 100;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function updateMotionPreference() {
      setReducedMotion(mediaQuery.matches);
    }

    updateMotionPreference();
    mediaQuery.addEventListener(
      "change",
      updateMotionPreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference,
      );
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      !autoplayEnabled ||
      !isInView ||
      isFocusWithin ||
      reducedMotion
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStageId((currentStageId) => {
        const currentIndex = stages.findIndex(
          (stage) => stage.id === currentStageId,
        );
        const nextIndex =
          (currentIndex + 1) % stages.length;

        return stages[nextIndex].id;
      });
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    autoplayEnabled,
    isFocusWithin,
    isInView,
    reducedMotion,
  ]);

  function selectStage(stageId: AgentLoopStageId) {
    setActiveStageId(stageId);
    setAutoplayEnabled(false);
  }

  function goToStage(index: number) {
    const stage = stages[index];

    if (stage) {
      setActiveStageId(stage.id);
      setAutoplayEnabled(false);
    }
  }

  const autoplayActive =
    autoplayEnabled &&
    isInView &&
    !isFocusWithin &&
    !reducedMotion;

  return (
    <div
      ref={containerRef}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null,
          )
        ) {
          setIsFocusWithin(false);
        }
      }}
      className="overflow-hidden rounded-[1.75rem] border border-border-default bg-surface-glass shadow-[var(--shadow-soft)] backdrop-blur-xl"
    >
      <div className="border-b border-border-subtle p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
              Agent economic loop
            </p>

            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Select a stage to see how an autonomous task becomes a
              verified economic event.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              aria-live="polite"
              className="rounded-full border border-border-subtle bg-background/55 px-3 py-1.5 text-xs text-foreground-muted"
            >
              {activeIndex + 1} of {stages.length}
            </span>

            <button
              type="button"
              disabled={reducedMotion}
              onClick={() =>
                setAutoplayEnabled((current) => !current)
              }
              className={cn(
                "rounded-full border px-3 py-1.5",
                "text-xs font-medium transition-colors",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-brand-primary/45",
                reducedMotion
                  ? "cursor-not-allowed border-border-subtle text-foreground-muted opacity-50"
                  : autoplayActive
                    ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary hover:bg-brand-primary/15"
                    : "border-border-default bg-background/55 text-foreground-secondary hover:text-foreground",
              )}
            >
              {reducedMotion
                ? "Autoplay disabled"
                : autoplayEnabled
                  ? "Pause autoplay"
                  : "Resume autoplay"}
            </button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Agent economic loop"
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          {stages.map((stage, index) => {
            const active = stage.id === activeStageId;
            const completed = index < activeIndex;

            return (
              <div
                key={stage.id}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() =>
                    selectStage(stage.id)
                  }
                  className={cn(
                    "inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5",
                    "text-xs font-medium transition-all duration-200",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-primary/45",
                    active
                      ? "border-brand-primary/40 bg-brand-primary/15 text-brand-secondary"
                      : completed
                        ? "border-brand-primary/20 bg-brand-primary/[0.07] text-brand-secondary"
                        : "border-border-default bg-background/45 text-foreground-secondary hover:text-foreground",
                  )}
                >
                  {completed ? (
                    <CheckIcon />
                  ) : (
                    <span className="text-[0.62rem] text-foreground-muted">
                      {stage.number}
                    </span>
                  )}

                  {stage.title}
                </button>

                {index < stages.length - 1 ? (
                  <span className="text-foreground-muted">
                    <ArrowIcon />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-border-subtle">
          <div
            className="h-full rounded-full bg-brand-secondary transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        role="tabpanel"
        className="relative overflow-hidden border-t border-brand-primary/15 bg-brand-primary/[0.025] p-6 transition-colors duration-500 sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-brand-primary/10 blur-3xl"
        />

        <div
          key={activeStage.id}
          className="relative animate-[agent-stage-enter_500ms_cubic-bezier(0.22,1,0.36,1)]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-8 select-none text-[8rem] font-semibold leading-none tracking-[-0.08em] text-brand-primary/[0.045] sm:text-[11rem]"
          >
            {activeStage.number}
          </span>

          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                {activeStage.number} · Active stage
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {activeStage.title}
              </h3>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-xs font-medium text-brand-secondary">
              <span
                aria-hidden="true"
                className="relative flex h-2.5 w-2.5 items-center justify-center"
              >
                <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-brand-primary/35" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand-secondary" />
              </span>

              Runtime active
            </span>
          </div>

          <div className="relative mt-5 border-l-2 border-brand-primary/55 pl-5">
            <p className="text-base font-medium leading-7 text-foreground sm:text-lg">
              {activeStage.summary}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <article className="rounded-2xl border border-border-subtle bg-background/50 p-4">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                Agent action
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                {activeStage.agentAction}
              </p>
            </article>

            <article className="rounded-2xl border border-border-subtle bg-background/50 p-4">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                Runtime action
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                {activeStage.runtimeAction}
              </p>
            </article>

            <article className="rounded-2xl border border-border-subtle bg-background/50 p-4">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
                Your control
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                {activeStage.userControl}
              </p>
            </article>
          </div>

          <div className="mt-5 rounded-2xl border border-border-subtle bg-background/35 px-4 py-3.5">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-foreground-muted">
              Result
            </p>

            <p className="mt-2 text-sm font-medium leading-6 text-foreground">
              {activeStage.result}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border-subtle pt-5">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() =>
                goToStage(activeIndex - 1)
              }
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                activeIndex === 0
                  ? "cursor-not-allowed border-border-subtle text-foreground-muted opacity-40"
                  : "border-border-default text-foreground-secondary hover:text-foreground",
              )}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                activeIndex === stages.length - 1
              }
              onClick={() =>
                goToStage(activeIndex + 1)
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all",
                activeIndex === stages.length - 1
                  ? "cursor-not-allowed border border-brand-primary/20 bg-brand-primary/[0.07] text-brand-secondary"
                  : "bg-foreground text-background hover:opacity-90",
              )}
            >
              {activeIndex === stages.length - 1
                ? "Loop complete"
                : "Next"}

              {activeIndex === stages.length - 1 ? (
                <CheckIcon />
              ) : (
                <ArrowIcon />
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes agent-stage-enter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
