import Link from "next/link";
import { PersonalWorkspaceProps } from "./types";

export function PersonalWorkspace({
  summary,
  activity,
  actions,
}: PersonalWorkspaceProps) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">

      <div className="grid gap-4 border-b border-white/10 p-8 md:grid-cols-3">
        {summary.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">
              {card.title}
            </p>

            <p className="mt-3 text-3xl font-semibold text-white">
              {card.value}
            </p>

            <p className="mt-2 text-sm text-white/60">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 p-8 lg:grid-cols-[2fr_1fr]">

        <div>
          <h3 className="text-lg font-semibold text-white">
            Recent Activity
          </h3>

          <div className="mt-6 space-y-4">
            {activity.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">
                      {item.title}
                    </p>

                    {item.merchant && (
                      <p className="mt-1 text-sm text-white/60">
                        {item.merchant}
                      </p>
                    )}

                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-300">
                      {item.status}
                    </p>
                  </div>

                  <div className="text-right">
                    {item.amount && (
                      <p className="font-medium text-white">
                        {item.amount}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-white/50">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <h3 className="text-lg font-semibold text-white">
            Quick Actions
          </h3>

          <div className="mt-6 space-y-3">
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-cyan-400/40 hover:bg-white/[0.05]"
              >
                <span className="text-white">
                  {action.label}
                </span>

                <span className="text-white/40">
                  →
                </span>
              </Link>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}
