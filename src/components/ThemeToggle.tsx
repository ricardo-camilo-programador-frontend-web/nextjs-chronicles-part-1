"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeOption = "light" | "dark" | "system";

const themeConfig: Record<ThemeOption, { icon: typeof Sun; label: string }> = {
  light: { icon: Sun, label: "Light" },
  dark: { icon: Moon, label: "Dark" },
  system: { icon: Monitor, label: "System" },
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full w-9 h-9"
        aria-hidden="true"
      />
    );
  }

  const currentTheme = (theme || "system") as ThemeOption;
  const { icon: Icon, label } = themeConfig[currentTheme] || themeConfig.system;

  const cycleTheme = () => {
    const order: ThemeOption[] = ["light", "dark", "system"];
    const currentIndex = order.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-full hover:bg-glass text-foreground transition-colors duration-200"
      aria-label={`Toggle theme: current is ${label}`}
      title={`Theme: ${label}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
