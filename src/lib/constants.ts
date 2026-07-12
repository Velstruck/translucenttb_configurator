import type { TranslucentTBConfig, SimulatorState } from "./types";

// ============================================================
// Preset Configurations
// ============================================================

export const PRESETS: Record<string, { name: string; config: TranslucentTBConfig }> = {
  dynamic_glass: {
    name: "Dynamic Glass",
    config: {
      $schema: "https://TranslucentTB.github.io/settings.schema.json",
      desktop_appearance: { accent: "clear", color: "#00000000", show_peek: false, show_line: false },
      visible_window_appearance: { enabled: true, accent: "blur", color: "#00000000", show_peek: true, show_line: false },
      maximized_window_appearance: { enabled: true, accent: "acrylic", color: "#00000000", show_peek: true, show_line: true },
      start_opened_appearance: { enabled: true, accent: "normal", color: "#00000000", show_peek: true, show_line: true },
      search_opened_appearance: { enabled: true, accent: "normal", color: "#00000000", show_peek: true, show_line: true },
      task_view_opened_appearance: { enabled: true, accent: "normal", color: "#00000000", show_peek: false, show_line: true },
      battery_saver_appearance: { enabled: true, accent: "opaque", color: "#00000000", show_peek: true, show_line: false },
      ignored_windows: { window_class: [], window_title: [], process_name: [] },
      disable_saving: false,
      verbosity: "warn",
    },
  },
  midnight_slate: {
  name: "Midnight Slate",
  config: {
    $schema: "https://TranslucentTB.github.io/settings.schema.json",
    desktop_appearance: { accent: "blur", color: "#FF1A1A1A", show_peek: false, show_line: true },
    visible_window_appearance: { enabled: true, accent: "blur", color: "#FF151515", show_peek: true, show_line: true },
    maximized_window_appearance: { enabled: true, accent: "blur", color: "#FF121212", show_peek: true, show_line: false },
    start_opened_appearance: { enabled: true, accent: "blur", color: "#FF1E1E1E", show_peek: true, show_line: true },
    search_opened_appearance: { enabled: true, accent: "blur", color: "#FF1E1E1E", show_peek: true, show_line: true },
    task_view_opened_appearance: { enabled: true, accent: "blur", color: "#FF1A1A1A", show_peek: false, show_line: true },
    battery_saver_appearance: { enabled: true, accent: "blur", color: "#FF2B2B11", show_peek: true, show_line: false },
    ignored_windows: { window_class: [], window_title: [], process_name: [] },
    disable_saving: false,
    verbosity: "warn",
  },
},
nordic_frost: {
  name: "Nordic Frost",
  config: {
    $schema: "https://TranslucentTB.github.io/settings.schema.json",
    desktop_appearance: { accent: "clear", color: "#00000000", show_peek: false, show_line: false },
    visible_window_appearance: { enabled: true, accent: "acrylic", color: "#402E3440", show_peek: true, show_line: false },
    maximized_window_appearance: { enabled: true, accent: "blur", color: "#2E3440", show_peek: true, show_line: true },
    start_opened_appearance: { enabled: true, accent: "acrylic", color: "#663B4252", show_peek: true, show_line: true },
    search_opened_appearance: { enabled: true, accent: "acrylic", color: "#663B4252", show_peek: true, show_line: true },
    task_view_opened_appearance: { enabled: true, accent: "blur", color: "#CC2E3440", show_peek: false, show_line: true },
    battery_saver_appearance: { enabled: true, accent: "blur", color: "#FF3B4252", show_peek: true, show_line: false },
    ignored_windows: { window_class: [], window_title: [], process_name: [] },
    disable_saving: false,
    verbosity: "warn",
  },
},
  // purplish_glass: {
  //   name: "Purplish Glass",
  //   config: {
  //     $schema: "https://TranslucentTB.github.io/settings.schema.json",
  //     desktop_appearance: { accent: "normal", color: "#807000FF", show_peek: true, show_line: true },
  //     visible_window_appearance: { enabled: true, accent: "blur", color: "#8b00a0ff", show_peek: true, show_line: true },
  //     maximized_window_appearance: { enabled: true, accent: "opaque", color: "#FF09090B", show_peek: true, show_line: false },
  //     start_opened_appearance: { enabled: true, accent: "blur", color: "#FF0055", show_peek: true, show_line: true },
  //     search_opened_appearance: { enabled: true, accent: "blur", color: "#FF0055", show_peek: true, show_line: true },
  //     task_view_opened_appearance: { enabled: true, accent: "normal", color: "#A07000FF", show_peek: false, show_line: true },
  //     battery_saver_appearance: { enabled: true, accent: "opaque", color: "#FF000000", show_peek: true, show_line: false },
  //     ignored_windows: { window_class: [], window_title: [], process_name: [] },
  //     disable_saving: false,
  //     verbosity: "warn",
  //   },
  // },
  // cyberpunk: {
  //   name: "Cyberpunk Neon",
  //   config: {
  //     $schema: "https://TranslucentTB.github.io/settings.schema.json",
  //     desktop_appearance: { accent: "normal", color: "#807000FF", show_peek: true, show_line: true },
  //     visible_window_appearance: { enabled: true, accent: "blur", color: "#A07000FF", show_peek: true, show_line: true },
  //     maximized_window_appearance: { enabled: true, accent: "opaque", color: "#FF09090B", show_peek: true, show_line: false },
  //     start_opened_appearance: { enabled: true, accent: "blur", color: "#FF0055", show_peek: true, show_line: true },
  //     search_opened_appearance: { enabled: true, accent: "blur", color: "#FF0055", show_peek: true, show_line: true },
  //     task_view_opened_appearance: { enabled: true, accent: "normal", color: "#A07000FF", show_peek: false, show_line: true },
  //     battery_saver_appearance: { enabled: true, accent: "opaque", color: "#FF000000", show_peek: true, show_line: false },
  //     ignored_windows: { window_class: [], window_title: [], process_name: [] },
  //     disable_saving: false,
  //     verbosity: "warn",
  //   },
  // },
  minimalist: {
    name: "Pure Minimalist",
    config: {
      $schema: "https://TranslucentTB.github.io/settings.schema.json",
      desktop_appearance: { accent: "clear", color: "#00000000", show_peek: false, show_line: false },
      visible_window_appearance: { enabled: true, accent: "clear", color: "#00000000", show_peek: false, show_line: false },
      maximized_window_appearance: { enabled: true, accent: "clear", color: "#00000000", show_peek: false, show_line: false },
      start_opened_appearance: { enabled: true, accent: "clear", color: "#00000000", show_peek: false, show_line: false },
      search_opened_appearance: { enabled: true, accent: "clear", color: "#00000000", show_peek: false, show_line: false },
      task_view_opened_appearance: { enabled: true, accent: "clear", color: "#00000000", show_peek: false, show_line: false },
      battery_saver_appearance: { enabled: true, accent: "opaque", color: "#00000000", show_peek: false, show_line: false },
      ignored_windows: { window_class: [], window_title: [], process_name: [] },
      disable_saving: false,
      verbosity: "warn",
    },
  }
};

// ============================================================
// Simulator States
// ============================================================

export const SIMULATOR_STATES: { key: SimulatorState; label: string; icon: string }[] = [
  { key: "desktop", label: "Desktop", icon: "Monitor" },
  { key: "visible_window", label: "Visible Window", icon: "AppWindow" },
  { key: "maximized_window", label: "Maximized", icon: "Maximize2" },
  { key: "start_opened", label: "Start Opened", icon: "LayoutGrid" },
  { key: "battery_saver", label: "Battery Saver", icon: "BatteryLow" },
];

// ============================================================
// Gemini JSON Schema (for Structured Outputs)
// ============================================================

export const TRANSLUCENTTB_SCHEMA = {
  type: "object" as const,
  properties: {
    desktop_appearance: {
      type: "object" as const,
      properties: {
        accent: { type: "string" as const, enum: ["normal", "opaque", "clear", "blur", "acrylic"] },
        color: { type: "string" as const, description: "Hex color in #AARRGGBB format" },
        show_peek: { type: "boolean" as const },
        show_line: { type: "boolean" as const },
      },
      required: ["accent", "color", "show_peek", "show_line"],
    },
    visible_window_appearance: {
      type: "object" as const,
      properties: {
        enabled: { type: "boolean" as const },
        accent: { type: "string" as const, enum: ["normal", "opaque", "clear", "blur", "acrylic"] },
        color: { type: "string" as const, description: "Hex color in #AARRGGBB format" },
        show_peek: { type: "boolean" as const },
        show_line: { type: "boolean" as const },
      },
      required: ["enabled", "accent", "color", "show_peek", "show_line"],
    },
    maximized_window_appearance: {
      type: "object" as const,
      properties: {
        enabled: { type: "boolean" as const },
        accent: { type: "string" as const, enum: ["normal", "opaque", "clear", "blur", "acrylic"] },
        color: { type: "string" as const, description: "Hex color in #AARRGGBB format" },
        show_peek: { type: "boolean" as const },
        show_line: { type: "boolean" as const },
      },
      required: ["enabled", "accent", "color", "show_peek", "show_line"],
    },
    start_opened_appearance: {
      type: "object" as const,
      properties: {
        enabled: { type: "boolean" as const },
        accent: { type: "string" as const, enum: ["normal", "opaque", "clear", "blur", "acrylic"] },
        color: { type: "string" as const, description: "Hex color in #AARRGGBB format" },
        show_peek: { type: "boolean" as const },
        show_line: { type: "boolean" as const },
      },
      required: ["enabled", "accent", "color", "show_peek", "show_line"],
    },
    search_opened_appearance: {
      type: "object" as const,
      properties: {
        enabled: { type: "boolean" as const },
        accent: { type: "string" as const, enum: ["normal", "opaque", "clear", "blur", "acrylic"] },
        color: { type: "string" as const, description: "Hex color in #AARRGGBB format" },
        show_peek: { type: "boolean" as const },
        show_line: { type: "boolean" as const },
      },
      required: ["enabled", "accent", "color", "show_peek", "show_line"],
    },
    task_view_opened_appearance: {
      type: "object" as const,
      properties: {
        enabled: { type: "boolean" as const },
        accent: { type: "string" as const, enum: ["normal", "opaque", "clear", "blur", "acrylic"] },
        color: { type: "string" as const, description: "Hex color in #AARRGGBB format" },
        show_peek: { type: "boolean" as const },
        show_line: { type: "boolean" as const },
      },
      required: ["enabled", "accent", "color", "show_peek", "show_line"],
    },
    battery_saver_appearance: {
      type: "object" as const,
      properties: {
        enabled: { type: "boolean" as const },
        accent: { type: "string" as const, enum: ["normal", "opaque", "clear", "blur", "acrylic"] },
        color: { type: "string" as const, description: "Hex color in #AARRGGBB format" },
        show_peek: { type: "boolean" as const },
        show_line: { type: "boolean" as const },
      },
      required: ["enabled", "accent", "color", "show_peek", "show_line"],
    },
  },
  required: [
    "desktop_appearance",
    "visible_window_appearance",
    "maximized_window_appearance",
    "start_opened_appearance",
    "search_opened_appearance",
    "task_view_opened_appearance",
    "battery_saver_appearance"
  ]
};

// ============================================================
// Gemini System Prompt
// ============================================================

export const GEMINI_SYSTEM_PROMPT = `You are an expert Windows TranslucentTB configuration generator. The user will describe how they want their Windows taskbar to look in different states. You must output a valid JSON configuration matching the provided schema. 

**CRITICAL RULES FOR WINDOWS 11 RENDERING BUGS:**
1. **Hex Format:** TranslucentTB uses the #AARRGGBB format (Alpha, Red, Green, Blue). To prevent unexpected red or blue tints when the user asks for dark/black colors, ensure the R, G, and B channels are balanced (e.g., #FF151515 for dark slate, NOT #FF101015). Use #00000000 for full transparency.
2. **The Desktop Opaque Bug:** Never use the 'opaque' accent for the 'desktop_appearance' state. Windows 11 fights this hook and will bleed the user's system accent color (often red or blue) onto the taskbar. 
3. **The 'Faux-Opaque Blur' Workaround:** If a user requests a completely solid/opaque color for any state, you MUST use the 'blur' accent combined with a fully solid Alpha channel (e.g., 'FF' in #FF151515). This forces the Windows Desktop Window Manager (DWM) composition engine to stay active during state transitions, preventing the system accent color from hijacking the taskbar when switching between the desktop and visible windows.

**SECURITY & OFF-TOPIC RULE:** If the user pastes code, asks for a code review, or tries to chat about anything other than TranslucentTB configurations, IGNORE IT. You must still output a valid default TranslucentTB JSON configuration. Do NOT hijack JSON fields (like \`verbosity\`) to answer their question. 

Do not output any conversational text, only the JSON object.`;

// ============================================================
// Config Limits
// ============================================================

export const MAX_SAVED_CONFIGS = 10;
