export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
    mono: 'var(--font-geist-mono), monospace',
  },

  size: {
    displayXl: "clamp(3rem, 7vw, 6.5rem)",
    displayLg: "clamp(2.5rem, 5vw, 5rem)",
    h1: "clamp(2.25rem, 4vw, 4rem)",
    h2: "clamp(1.875rem, 3vw, 3rem)",
    h3: "clamp(1.5rem, 2vw, 2rem)",
    title: "1.25rem",
    bodyLg: "1.125rem",
    body: "1rem",
    bodySm: "0.875rem",
    caption: "0.75rem",
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.05,
    heading: 1.15,
    body: 1.65,
    relaxed: 1.8,
  },

  tracking: {
    tight: "-0.04em",
    heading: "-0.025em",
    normal: "0",
    wide: "0.08em",
  },
} as const;