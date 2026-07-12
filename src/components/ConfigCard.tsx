"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Trash2,
  Eye,
  Clock,
  AlertTriangle,
  X,
} from "lucide-react";
import type { SavedConfig, SimulatorState } from "@/lib/types";
import { copyToClipboard, formatConfigJson, getActiveAppearance } from "@/lib/utils";
import TaskbarVisualizer from "@/components/TaskbarVisualizer";
import { SIMULATOR_STATES } from "@/lib/constants";

interface ConfigCardProps {
  config: SavedConfig;
  onDelete: (id: string) => Promise<void>;
  index: number;
}

export default function ConfigCard({ config, onDelete, index }: ConfigCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewState, setPreviewState] = useState<SimulatorState>("desktop");

  const handleCopy = async () => {
    const success = await copyToClipboard(formatConfigJson(config.config_json));
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(config.id);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const createdDate = new Date(config.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const appearance = getActiveAppearance(config.config_json, "desktop");
  const accentLabel = appearance.accent.charAt(0).toUpperCase() + appearance.accent.slice(1);

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className="group relative rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all hover:border-white/15 hover:shadow-lg hover:shadow-indigo-500/5"
      >
        {/* Preview thumbnail — mini taskbar mockup */}
        <div className="relative h-32 bg-gradient-to-br from-indigo-950/80 via-slate-900/80 to-purple-950/80 overflow-hidden">
          {/* Mini decorative blobs */}
          <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-indigo-500/15 blur-[30px]" />
          <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-purple-500/10 blur-[25px]" />

          {/* Mini taskbar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-5 flex items-center justify-center"
            style={{
              backgroundColor:
                appearance.accent === "clear"
                  ? "transparent"
                  : `rgba(0,0,0,0.4)`,
            }}
          >
            {appearance.show_line && (
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
            )}
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-2 w-2 rounded-sm bg-white/20" />
              ))}
            </div>
          </div>

          {/* Accent badge */}
          <div className="absolute top-3 right-3 rounded-md bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-0.5">
            <span className="text-[9px] font-medium text-white/60">
              {accentLabel}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white truncate">
            {config.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-gray-500">
            <Clock className="h-3 w-3" />
            {createdDate}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-[11px] font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <Eye className="h-3 w-3" />
              Preview
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-[11px] font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-gray-500 transition-all hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
            >
              <Trash2 className="h-3 w-3" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 z-50 flex flex-col rounded-2xl border border-white/10 bg-gray-950 shadow-2xl sm:inset-8 lg:inset-16"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <h3 className="text-sm font-semibold text-white">
                  {config.title}
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* State selector */}
              <div className="flex flex-wrap gap-2 border-b border-white/5 px-6 py-3">
                {SIMULATOR_STATES.map((simState) => (
                  <button
                    key={simState.key}
                    onClick={() => setPreviewState(simState.key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all border ${
                      previewState === simState.key
                        ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                        : "border-white/5 bg-white/[0.02] text-gray-500 hover:bg-white/5 hover:text-gray-300"
                    }`}
                  >
                    {simState.label}
                  </button>
                ))}
              </div>

              {/* Visualizer */}
              <div className="flex-1 overflow-auto p-6">
                <TaskbarVisualizer
                  appearance={getActiveAppearance(config.config_json, previewState)}
                  activeState={previewState}
                  className="mx-auto max-w-4xl"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-4"
            >
              <div className="rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Delete Configuration
                    </h3>
                    <p className="text-xs text-gray-500">This cannot be undone</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-5">
                  Are you sure you want to delete &ldquo;{config.title}&rdquo;?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500/20 border border-red-500/30 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/30 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <span className="animate-pulse">Deleting...</span>
                    ) : (
                      <>
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
