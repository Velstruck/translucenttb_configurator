"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Volume2,
  Battery,
  ChevronUp,
  Search,
  MessageSquare,
  Sun,
} from "lucide-react";
import type { TaskbarAppearance, AccentState } from "@/lib/types";
import { parseColor, cn } from "@/lib/utils";

interface TaskbarVisualizerProps {
  appearance: TaskbarAppearance;
  activeState: string;
  className?: string;
}

// Windows 11 taskbar icons (centered)
const taskbarIcons = [
  { id: "search", icon: Search, label: "Search" },
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "weather", icon: Sun, label: "Weather" },
];

function getTaskbarClasses(accent: AccentState): string {
  switch (accent) {
    case "blur":
      return "taskbar-blur";
    case "acrylic":
      return "taskbar-acrylic";
    default:
      return "";
  }
}

function getStateLabel(state: string): string {
  const labels: Record<string, string> = {
    desktop: "Desktop",
    visible_window: "Visible Window",
    maximized_window: "Maximized Window",
    start_opened: "Start Menu Open",
    search_opened: "Search Open",
    task_view_opened: "Task View",
    battery_saver: "Battery Saver",
  };
  return labels[state] || state;
}

export default function TaskbarVisualizer({
  appearance,
  activeState,
  className,
}: TaskbarVisualizerProps) {
  const bgColor = parseColor(appearance.color);
  const isTransparent = appearance.accent === "clear" || appearance.color === "#00000000";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl",
        className
      )}
    >
      {/* Desktop wallpaper background */}
      <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
        {/* Wallpaper decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Aurora-style gradient blobs */}
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-[80px]" />
          <div className="absolute top-1/3 right-10 h-56 w-56 rounded-full bg-purple-500/15 blur-[60px]" />
          <div className="absolute bottom-20 left-1/3 h-48 w-48 rounded-full bg-cyan-500/10 blur-[70px]" />

          {/* Subtle stars / dots */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-white/30"
              style={{
                top: `${10 + Math.random() * 60}%`,
                left: `${5 + Math.random() * 90}%`,
                opacity: 0.2 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>

        {/* Desktop icons (top-left) */}
        <div className="absolute left-4 top-4 space-y-3">
          {["Recycle Bin", "Edge", "VS Code"].map((name) => (
            <div key={name} className="flex flex-col items-center gap-1 opacity-70">
              <div className="h-8 w-8 rounded-md bg-white/10 backdrop-blur-sm border border-white/10" />
              <span className="text-[9px] text-white/60 drop-shadow-sm">{name}</span>
            </div>
          ))}
        </div>

        {/* Simulated window when in maximized/visible state */}
        {(activeState === "maximized_window" || activeState === "visible_window") && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className={cn(
              "absolute rounded-lg border border-white/10 bg-gray-900/90 backdrop-blur-md shadow-xl",
              activeState === "maximized_window"
                ? "inset-0 bottom-10 rounded-none"
                : "left-[10%] top-[8%] right-[10%] bottom-[20%]"
            )}
          >
            {/* Title bar */}
            <div className="flex h-8 items-center justify-between border-b border-white/5 px-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-indigo-500/50" />
                <span className="text-[10px] text-white/50">Notepad</span>
              </div>
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
              </div>
            </div>
            {/* Window content lines */}
            <div className="space-y-2 p-4">
              {[60, 80, 45, 70, 35].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full bg-white/5"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Start menu overlay */}
        {activeState === "start_opened" && (
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[55%] rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Search bar */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2">
                <Search className="h-3.5 w-3.5 text-white/30" />
                <span className="text-[10px] text-white/30">Type here to search</span>
              </div>
            </div>

            {/* Pinned section */}
            <div className="px-5 pb-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold text-white/60">Pinned</span>
                <span className="text-[8px] text-indigo-400">All apps &rarr;</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {["Edge", "Word", "Excel", "PPT", "Mail", "Store", "Photos", "Settings", "Spotify", "Discord", "Steam", "Code"].map(
                  (app) => (
                    <div key={app} className="flex flex-col items-center gap-1">
                      <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/5" />
                      <span className="text-[7px] text-white/40">{app}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Recommended section */}
            <div className="px-5 py-3 border-t border-white/5">
              <span className="text-[10px] font-semibold text-white/60">Recommended</span>
              <div className="mt-2 space-y-1">
                {["Recent document.docx", "Screenshot_2024.png"].map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5">
                    <div className="h-4 w-4 rounded bg-white/10" />
                    <span className="text-[8px] text-white/40">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom user section */}
            <div className="flex items-center justify-between border-t border-white/5 px-5 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-indigo-500/40" />
                <span className="text-[9px] text-white/50">User</span>
              </div>
              <div className="h-4 w-4 rounded bg-white/5" />
            </div>
          </motion.div>
        )}

        {/* Battery saver indicator */}
        {activeState === "battery_saver" && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-4 right-4 flex items-center gap-2 rounded-lg bg-amber-500/20 border border-amber-500/30 px-3 py-1.5"
          >
            <Battery className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[10px] text-amber-300 font-medium">Battery Saver On</span>
          </motion.div>
        )}

        {/* Active state label */}
        <motion.div
          key={activeState}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-4 py-1"
        >
          <span className="text-[10px] font-medium text-white/70">
            {getStateLabel(activeState)}
          </span>
        </motion.div>

        {/* ========== TASKBAR ========== */}
        <motion.div
          layout
          className={cn(
            "absolute bottom-0 left-0 right-0 h-10 flex items-center justify-between px-3 transition-colors duration-300",
            getTaskbarClasses(appearance.accent)
          )}
          style={{
            backgroundColor:
              appearance.accent === "clear"
                ? "transparent"
                : appearance.accent === "normal"
                ? undefined
                : bgColor,
          }}
        >
          {/* Accent line on top of taskbar */}
          {appearance.show_line && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
            />
          )}

          {/* Left — Start button */}
          <div className="flex items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/10 transition-colors cursor-default">
              <svg
                className="h-4 w-4 text-white/80"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <rect x="1" y="1" width="6.5" height="6.5" rx="1" />
                <rect x="8.5" y="1" width="6.5" height="6.5" rx="1" />
                <rect x="1" y="8.5" width="6.5" height="6.5" rx="1" />
                <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="1" />
              </svg>
            </div>
          </div>

          {/* Center — Taskbar icons */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
            {taskbarIcons.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex h-7 w-8 items-center justify-center rounded-md hover:bg-white/10 transition-colors cursor-default"
                  title={item.label}
                >
                  <Icon className="h-3.5 w-3.5 text-white/70" />
                </div>
              );
            })}
          </div>

          {/* Right — System tray */}
          <div className="flex items-center gap-1">
            <ChevronUp className="h-3 w-3 text-white/40" />
            <div className="flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-white/10 transition-colors cursor-default">
              <Wifi className="h-3 w-3 text-white/60" />
              <Volume2 className="h-3 w-3 text-white/60" />
              <Battery className="h-3 w-3 text-white/60" />
            </div>
            <div className="ml-1 rounded-md px-2 py-1 hover:bg-white/10 transition-colors cursor-default">
              <div className="text-right leading-tight">
                <div className="text-[9px] text-white/60">2:30 PM</div>
                <div className="text-[8px] text-white/40">7/12/2026</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Show Peek indicator */}
        {appearance.show_peek && (
          <div className="absolute bottom-0 right-0 w-1.5 h-10 bg-white/10 hover:bg-white/20 transition-colors cursor-default" />
        )}
      </div>
    </div>
  );
}
