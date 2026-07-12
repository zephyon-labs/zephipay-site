export const duration = {
  fast: "150ms",
  normal: "240ms",
  slow: "360ms",
  ambient: "8s",
} as const;

export const easing = {
  standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const;

export const motion = {
  quick: `all ${duration.fast} ${easing.standard}`,
  standard: `all ${duration.normal} ${easing.standard}`,
  emphasized: `all ${duration.slow} ${easing.emphasized}`,
} as const;