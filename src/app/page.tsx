"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TaskbarVisualizer from "@/components/TaskbarVisualizer";
import PresetSelector from "@/components/PresetSelector";
import JsonViewer from "@/components/JsonViewer";
import { PRESETS } from "@/lib/constants";
import { getActiveAppearance } from "@/lib/utils";
import type { SimulatorState } from "@/lib/types";

export default function HomePage() {
  const [selectedPreset, setSelectedPreset] = useState("dynamic_glass");
  const [activeState, setActiveState] = useState<SimulatorState>("desktop");
  const { isSignedIn } = useAuth();

  const config = PRESETS[selectedPreset].config;
  const appearance = getActiveAppearance(config, activeState);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-medium text-indigo-300">
                TranslucentTB Configuration Builder
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Design Your Own{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Taskbar
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg">
              Create stunning TranslucentTB configurations with our visual builder.
              Preview in real-time, copy the JSON, and transform your Windows desktop.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Builder Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Left Controls */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PresetSelector
              selectedPreset={selectedPreset}
              activeState={activeState}
              onPresetChange={setSelectedPreset}
              onStateChange={setActiveState}
            />
          </motion.div>

          {/* Right Visualizer + JSON */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <TaskbarVisualizer
              appearance={appearance}
              activeState={activeState}
            />
            <JsonViewer config={config} />
          </motion.div>
        </div>

        {/* CTA Banner for logged-out users */}
        {!isSignedIn && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-8 sm:p-10">
              <div className="absolute top-0 right-0 h-64 w-64 bg-purple-500/10 blur-[80px] rounded-full" />
              <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Want a custom AI-generated setup?
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-400">
                      Describe your dream taskbar and let AI create the perfect config for you.
                    </p>
                  </div>
                </div>
                <Link
                  href="/sign-in"
                  className="group flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:brightness-110"
                >
                  Sign In to Try
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Windows 11 Bug Warning */}
      <div className="mt-12 mb-8 mx-auto max-w-4xl rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-yellow-500/10 p-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-yellow-500">Windows 11 Rendering Bugs & Quirks</h4>
            <div className="mt-2 text-sm text-yellow-500/80 space-y-2">
              <p>
                <strong>System Accent Bleed:</strong> Windows 11 DWM (Desktop Window Manager) aggressively fights taskbar styling on the Desktop state. If you use a solid (opaque) color on the Desktop, your system's accent color (usually red, blue, etc.) might bleed through. To fix this, use the <strong>Blur</strong> accent with a fully solid color (e.g., `#FF151515`).
              </p>
              <p>
                <strong>Color Tinting:</strong> TranslucentTB uses Alpha-Red-Green-Blue (<code>#AARRGGBB</code>). If you want true black/gray, ensure your R, G, and B channels are balanced (e.g., <code>#FF151515</code>). Imbalanced channels (like <code>#FF101015</code>) will tint your taskbar blue or red!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
