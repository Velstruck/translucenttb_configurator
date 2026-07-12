// ============================================================
// TranslucentTB Configuration Types
// ============================================================

/** Accent style for the taskbar */
export type AccentState = "normal" | "opaque" | "clear" | "blur" | "acrylic";

export interface AppearanceRules {
  window_class?: Record<string, any>;
  window_title?: Record<string, any>;
  process_name?: Record<string, any>;
}

/** Core taskbar appearance (always enabled) */
export interface TaskbarAppearance {
  accent: AccentState;
  color: string; // #AARRGGBB format
  show_peek: boolean;
  show_line: boolean;
  blur_radius?: number;
}

/** Optional taskbar appearance with an enabled toggle */
export interface OptionalTaskbarAppearance extends TaskbarAppearance {
  enabled: boolean;
  rules?: AppearanceRules;
}

export interface IgnoredWindows {
  window_class?: string[];
  window_title?: string[];
  process_name?: string[];
}

/** Full TranslucentTB JSON configuration */
export interface TranslucentTBConfig {
  $schema?: string;
  desktop_appearance: TaskbarAppearance;
  visible_window_appearance?: OptionalTaskbarAppearance;
  maximized_window_appearance?: OptionalTaskbarAppearance;
  start_opened_appearance?: OptionalTaskbarAppearance;
  search_opened_appearance?: OptionalTaskbarAppearance;
  task_view_opened_appearance?: OptionalTaskbarAppearance;
  battery_saver_appearance?: OptionalTaskbarAppearance;
  ignored_windows?: IgnoredWindows;
  disable_saving?: boolean;
  verbosity?: string;
}

/** Simulator state names */
export type SimulatorState =
  | "desktop"
  | "visible_window"
  | "maximized_window"
  | "start_opened"
  | "search_opened"
  | "task_view_opened"
  | "battery_saver";

/** Database row for a saved config */
export interface SavedConfig {
  id: string;
  user_id: string;
  title: string;
  config_json: TranslucentTBConfig;
  created_at: string;
}

/** API response from the Gemini generate endpoint */
export interface GenerateConfigResponse {
  config: TranslucentTBConfig;
  error?: string;
}
