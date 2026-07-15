"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference =
  | "light"
  | "dark"
  | "system"
  | "adaptive";

export type DayPeriod =
  | "morning"
  | "day"
  | "evening"
  | "night";

type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  dayPeriod: DayPeriod;
  setPreference: (preference: ThemePreference) => void;
};

const STORAGE_KEY = "zephyon-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getDayPeriod(date = new Date()): DayPeriod {
  const hour = date.getHours();

  if (hour >= 6 && hour < 10) {
    return "morning";
  }

  if (hour >= 10 && hour < 17) {
    return "day";
  }

  if (hour >= 17 && hour < 21) {
    return "evening";
  }

  return "night";
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(
  preference: ThemePreference,
  period: DayPeriod,
): ResolvedTheme {
  if (preference === "system") {
    return getSystemTheme();
  }

  if (preference === "adaptive") {
    return period === "morning" || period === "day"
      ? "light"
      : "dark";
  }

  return preference;
}

function applyTheme(
  preference: ThemePreference,
): {
  resolvedTheme: ResolvedTheme;
  dayPeriod: DayPeriod;
} {
  const dayPeriod = getDayPeriod();
  const resolvedTheme = resolveTheme(preference, dayPeriod);

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.period = dayPeriod;
  document.documentElement.style.colorScheme = resolvedTheme;

  return {
    resolvedTheme,
    dayPeriod,
  };
}

function isThemePreference(
  value: string | null,
): value is ThemePreference {
  return (
    value === "light" ||
    value === "dark" ||
    value === "system" ||
    value === "adaptive"
  );
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>("system");

  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>("dark");

  const [dayPeriod, setDayPeriod] =
    useState<DayPeriod>("night");

  const synchronizeTheme = useCallback(
    (nextPreference: ThemePreference) => {
      const next = applyTheme(nextPreference);

      setResolvedTheme(next.resolvedTheme);
      setDayPeriod(next.dayPeriod);
    },
    [],
  );

  useEffect(() => {
    const storedPreference =
      window.localStorage.getItem(STORAGE_KEY);

    const initialPreference = isThemePreference(storedPreference)
      ? storedPreference
      : "system";

    queueMicrotask(() => {
      setPreferenceState(initialPreference);
      synchronizeTheme(initialPreference);
    });
  }, [synchronizeTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const handleSystemThemeChange = () => {
      if (preference === "system") {
        synchronizeTheme("system");
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    };
  }, [preference, synchronizeTheme]);

  useEffect(() => {
    if (preference !== "adaptive") {
      return;
    }

    const updateAdaptiveTheme = () => {
      synchronizeTheme("adaptive");
    };

    const intervalId = window.setInterval(
      updateAdaptiveTheme,
      60_000,
    );

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateAdaptiveTheme();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      window.clearInterval(intervalId);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [preference, synchronizeTheme]);

  const setPreference = useCallback(
    (nextPreference: ThemePreference) => {
      window.localStorage.setItem(
        STORAGE_KEY,
        nextPreference,
      );

      setPreferenceState(nextPreference);
      synchronizeTheme(nextPreference);
    },
    [synchronizeTheme],
  );

  const value = useMemo(
    () => ({
      preference,
      resolvedTheme,
      dayPeriod,
      setPreference,
    }),
    [
      preference,
      resolvedTheme,
      dayPeriod,
      setPreference,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider.",
    );
  }

  return context;
}
