import type { ReactNode } from "react";

type ExperienceCanvasProps = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

export function ExperienceCanvas({
  left,
  center,
  right,
}: ExperienceCanvasProps) {
  return (
    <div className="mt-14 grid gap-5 xl:grid-cols-[1fr_0.72fr_1fr]">
      {left}
      {center}
      {right}
    </div>
  );
}
