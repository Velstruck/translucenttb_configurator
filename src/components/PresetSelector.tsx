"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  AppWindow,
  Maximize2,
  LayoutGrid,
  BatteryLow,
  ChevronDown,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PRESETS, SIMULATOR_STATES } from "@/lib/constants";
import type { SimulatorState } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  AppWindow,
  Maximize2,
  LayoutGrid,
  BatteryLow,
};

interface PresetSelectorProps {
  selectedPreset: string;
  activeState: SimulatorState;
  onPresetChange: (presetKey: string) => void;
  onStateChange: (state: SimulatorState) => void;
}

export default function PresetSelector({
  selectedPreset,
  activeState,
  onPresetChange,
  onStateChange,
}: PresetSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Preset Dropdown */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
          <Palette className="h-4 w-4 text-indigo-400" />
          Theme Preset
        </label>
        <div className="relative">
          <select
            value={selectedPreset}
            onChange={(e) => onPresetChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-gray-900/80 px-4 py-3 pr-10 text-sm text-white backdrop-blur-sm transition-all focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-white/20 cursor-pointer"
          >
            {Object.entries(PRESETS).map(([key, preset]) => (
              <option key={key} value={key} className="bg-gray-900">
                {preset.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* State Simulator Buttons */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
          <Monitor className="h-4 w-4 text-indigo-400" />
          Simulate State
        </label>
        <div className="grid grid-cols-1 gap-2">
          {SIMULATOR_STATES.map((simState) => {
            const Icon = iconMap[simState.icon] || Monitor;
            const isActive = activeState === simState.key;
            return (
              <motion.button
                key={simState.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStateChange(simState.key)}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 border",
                  isActive
                    ? "border-indigo-500/40 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10"
                    : "border-white/5 bg-white/[0.02] text-gray-400 hover:bg-white/5 hover:text-gray-200 hover:border-white/10"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="state-active"
                    className="absolute inset-0 rounded-xl border border-indigo-500/30 bg-indigo-500/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Icon className={cn("relative z-10 h-4 w-4", isActive && "text-indigo-400")} />
                <span className="relative z-10">{simState.label}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Current config info */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Active Preset</span>
          <span className="font-medium text-indigo-400">
            {PRESETS[selectedPreset]?.name}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>Viewing State</span>
          <span className="font-medium text-purple-400">
            {SIMULATOR_STATES.find((s) => s.key === activeState)?.label}
          </span>
        </div>
      </div>
    </div>
  );
}
