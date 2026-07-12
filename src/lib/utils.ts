import type { SimulatorState, TranslucentTBConfig, TaskbarAppearance } from "./types";

// ============================================================
// Color Parsing — Converts #AARRGGBB to CSS rgba()
// ============================================================

export function parseColor(hex: string | undefined): string {
  if (!hex || hex === "#00000000") return "transparent";
  if (hex.length === 9 && hex.startsWith("#")) {
    const a = parseInt(hex.slice(1, 3), 16) / 255;
    const r = parseInt(hex.slice(3, 5), 16);
    const g = parseInt(hex.slice(5, 7), 16);
    const b = parseInt(hex.slice(7, 9), 16);
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }
  return hex;
}

// ============================================================
// Clipboard — With execCommand fallback
// ============================================================

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: hidden textarea + execCommand
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

// ============================================================
// className merger
// ============================================================

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================================
// Get active appearance for a given simulator state
// ============================================================

export function getActiveAppearance(
  config: TranslucentTBConfig,
  state: SimulatorState
): TaskbarAppearance {
  const desktop = config.desktop_appearance;

  if (state === "desktop") return desktop;

  const stateKey = `${state}_appearance` as keyof TranslucentTBConfig;
  const stateAppearance = config[stateKey];

  if (
    stateAppearance &&
    typeof stateAppearance === "object" &&
    "enabled" in stateAppearance &&
    (stateAppearance as any).enabled
  ) {
    const appearance = stateAppearance as any;
    return {
      accent: appearance.accent,
      color: appearance.color,
      show_peek: appearance.show_peek,
      show_line: appearance.show_line,
    };
  }

  return desktop;
}

// ============================================================
// Format JSON for display
// ============================================================

export function formatConfigJson(config: TranslucentTBConfig): string {
  return JSON.stringify(config, null, 2);
}
