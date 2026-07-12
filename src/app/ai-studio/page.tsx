"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Save,
  Loader2,
  Wand2,
  AlertCircle,
} from "lucide-react";
import TaskbarVisualizer from "@/components/TaskbarVisualizer";
import JsonViewer from "@/components/JsonViewer";
import SaveModal from "@/components/SaveModal";
import { getActiveAppearance, copyToClipboard, formatConfigJson } from "@/lib/utils";
import type { TranslucentTBConfig, SimulatorState } from "@/lib/types";
import { SIMULATOR_STATES } from "@/lib/constants";

const examplePrompts = [
  "Make it fully transparent on the desktop, but neon purple when the start menu is open",
  "Dark opaque taskbar with a blue accent line, blurry when maximized",
  "Cyberpunk aesthetic: deep magenta acrylic with pink highlights",
  "Clean minimal look: invisible on desktop, subtle blur with windows open",
];

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [config, setConfig] = useState<TranslucentTBConfig | null>(null);
  const [activeState, setActiveState] = useState<SimulatorState>("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setConfig(null);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/generate-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate configuration.");
        return;
      }

      setConfig(data.config);
      setActiveState("desktop");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyJson = async () => {
    if (!config) return;
    const success = await copyToClipboard(formatConfigJson(config));
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async (title: string) => {
    if (!config) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/configs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, config_json: config }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save configuration.");
        return;
      }

      setSaveModalOpen(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const appearance = config
    ? getActiveAppearance(config, activeState)
    : null;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 h-[300px] w-[500px] bg-purple-500/10 blur-[100px] rounded-full" />

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-medium text-purple-300">
                AI-Powered Generator
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Describe Your Dream{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Taskbar
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
              Tell the AI what you want and it will generate a perfect
              TranslucentTB configuration for you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Prompt Input */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-5">
            <div className="flex gap-3">
              <div className="flex-1">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                  placeholder="Describe how you want your taskbar to look..."
                  rows={3}
                  maxLength={1000}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-600">
                    {prompt.length}/1000 · Press Enter to generate
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isLoading}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Generate
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Example prompts */}
            <div className="mt-4 flex flex-wrap gap-2">
              {examplePrompts.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(example)}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 text-[11px] text-gray-500 transition-all hover:bg-white/5 hover:text-gray-300 hover:border-white/10"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                <span className="text-xs">Dismiss</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save success toast */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3"
            >
              <Check className="h-4 w-4 text-emerald-400" />
              <p className="text-sm text-emerald-300">
                Configuration saved to your dashboard!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Skeleton */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="rounded-2xl border border-white/10 bg-gray-900/30 overflow-hidden">
                <div className="aspect-[16/10] animate-shimmer" />
              </div>
              <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                <Wand2 className="h-4 w-4 animate-pulse text-purple-400" />
                <span>AI is crafting your taskbar configuration...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated Result */}
        <AnimatePresence>
          {config && !isLoading && appearance && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              {/* State selector for preview */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-500 mr-1">
                  Preview State:
                </span>
                {SIMULATOR_STATES.map((simState) => (
                  <button
                    key={simState.key}
                    onClick={() => setActiveState(simState.key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all border ${
                      activeState === simState.key
                        ? "border-purple-500/40 bg-purple-500/15 text-purple-300"
                        : "border-white/5 bg-white/[0.02] text-gray-500 hover:bg-white/5 hover:text-gray-300"
                    }`}
                  >
                    {simState.label}
                  </button>
                ))}
              </div>

              {/* Visualizer */}
              <TaskbarVisualizer
                appearance={appearance}
                activeState={activeState}
              />

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyJson}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy JSON
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSaveModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:brightness-110"
                >
                  <Save className="h-4 w-4" />
                  Save to Dashboard
                </motion.button>
              </div>

              {/* JSON Viewer */}
              <JsonViewer config={config} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Windows 11 Bug Warning */}
      <div className="mt-8 mb-8 mx-auto max-w-6xl rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-yellow-500/10 p-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-yellow-500">Windows 11 Rendering Bugs & Quirks</h4>
            <div className="mt-2 text-sm text-yellow-500/80 space-y-2">
              <p>
                <strong>System Accent Bleed:</strong> Windows 11 aggressively fights taskbar styling on the Desktop state. If you request a solid (opaque) color on the Desktop, your system's accent color might bleed through. Our AI is instructed to use a <strong>Blur</strong> accent with a fully solid color to bypass this, but keep this in mind if you manually edit!
              </p>
              <p>
                <strong>Color Tinting:</strong> TranslucentTB uses Alpha-Red-Green-Blue (<code>#AARRGGBB</code>). The AI knows to balance the R, G, and B channels to prevent your dark taskbars from tinting blue or red.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      <SaveModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}
