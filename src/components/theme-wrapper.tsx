"use client";

import { useEffect } from "react";
import { BrandArchetype, getCSSVariablesForArchetype } from "@/lib/brand-psychology";

interface ThemeWrapperProps {
  accentColor?: string;
  archetype?: BrandArchetype;
  children: React.ReactNode;
}

/**
 * Injects org-specific accent color and archetype CSS variables into the DOM.
 * Wraps any page that needs dynamic theming (public landing pages, portals).
 */
export function ThemeWrapper({ accentColor, archetype = 'Outlaw', children }: ThemeWrapperProps) {
  useEffect(() => {
    const root = document.documentElement;
    const variables = getCSSVariablesForArchetype(archetype);

    // Apply all variables from archetype
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Override accent if provided specifically (backward compatibility or manual tweak)
    if (accentColor) {
      root.style.setProperty("--accent", accentColor);

      const darken = (hex: string, amount: number) => {
        try {
          const num = parseInt(hex.replace("#", ""), 16);
          const r = Math.max(0, (num >> 16) - amount);
          const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
          const b = Math.max(0, (num & 0x0000ff) - amount);
          return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
        } catch {
          return hex;
        }
      };

      root.style.setProperty("--accent-hover", darken(accentColor, 20));
      root.style.setProperty("--accent-light", `${accentColor}1A`);
    }

    return () => {
      // Reset is handled by the next ThemeWrapper or default styles
    };
  }, [accentColor, archetype]);

  return <>{children}</>;
}
