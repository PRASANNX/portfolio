"use client";

import { useEffect } from "react";

interface ThemeWrapperProps {
  accentColor: string;
  children: React.ReactNode;
}

/**
 * Injects org-specific accent color CSS variables into the DOM.
 * Wraps any page that needs dynamic theming (public landing pages, portals).
 */
export function ThemeWrapper({ accentColor, children }: ThemeWrapperProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accentColor);

    // Calculate hover (darken by 20 units per RGB channel)
    const darken = (hex: string, amount: number) => {
      const num = parseInt(hex.replace("#", ""), 16);
      const r = Math.max(0, (num >> 16) - amount);
      const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
      const b = Math.max(0, (num & 0x0000ff) - amount);
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    };

    root.style.setProperty("--accent-hover", darken(accentColor, 20));
    root.style.setProperty("--accent-light", `${accentColor}1A`); // 10% opacity

    return () => {
      // Reset to default on unmount
      root.style.setProperty("--accent", "#FF5F1F");
      root.style.setProperty("--accent-hover", "#E54E1A");
      root.style.setProperty("--accent-light", "#FF5F1F1A");
    };
  }, [accentColor]);

  return <>{children}</>;
}
