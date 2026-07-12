export const colors = {
  background: {
    primary: "#05070A",
    secondary: "#0A0F16",
    tertiary: "#101722",
  },

  surface: {
    primary: "#0D141D",
    secondary: "#121C28",
    elevated: "#172434",
    glass: "rgba(18, 28, 40, 0.72)",
  },

  text: {
    primary: "#F4F8FC",
    secondary: "#AAB8C7",
    muted: "#718096",
    inverse: "#05070A",
  },

  brand: {
    primary: "#65B8FF",
    secondary: "#73E7FF",
    soft: "#A9D7FF",
    deep: "#1E5F96",
  },

  state: {
    success: "#4FD1A5",
    warning: "#F6C76B",
    error: "#F27C8A",
    info: "#7BB8FF",
  },

  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    default: "rgba(255, 255, 255, 0.14)",
    strong: "rgba(115, 231, 255, 0.28)",
  },

  glow: {
    primary: "rgba(101, 184, 255, 0.28)",
    secondary: "rgba(115, 231, 255, 0.18)",
  },
} as const;

export type ColorTokens = typeof colors;