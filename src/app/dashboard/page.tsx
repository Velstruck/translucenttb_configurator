"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  AlertCircle,
  Loader2,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import ConfigCard from "@/components/ConfigCard";
import type { SavedConfig } from "@/lib/types";
import { MAX_SAVED_CONFIGS } from "@/lib/constants";

export default function DashboardPage() {
  const [configs, setConfigs] = useState<SavedConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfigs = useCallback(async () => {
    try {
      const res = await fetch("/api/configs");
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load configurations.");
        return;
      }

      setConfigs(data.configs);
    } catch {
      setError("Network error. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/configs?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to delete configuration.");
        return;
      }

      setConfigs((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("Failed to delete. Please try again.");
    }
  };

  const isAtLimit = configs.length >= MAX_SAVED_CONFIGS;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/3 h-[300px] w-[500px] bg-indigo-500/8 blur-[100px] rounded-full" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 mb-4">
                <LayoutDashboard className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-xs font-medium text-indigo-300">
                  My Configurations
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Saved Configs
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                {configs.length} of {MAX_SAVED_CONFIGS} configurations saved
              </p>
            </div>

            <Link
              href="/ai-studio"
              className="group flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:brightness-110"
            >
              <Sparkles className="h-4 w-4" />
              Create New
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Limit banner */}
        {isAtLimit && (
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
            <p className="text-sm text-amber-300">
              You&apos;ve reached the maximum of {MAX_SAVED_CONFIGS}{" "}
              configurations. Delete an existing one to save a new one.
            </p>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <p className="text-sm text-red-300">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-xs text-red-400 hover:text-red-300"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            <p className="mt-4 text-sm text-gray-400">
              Loading your configurations...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && configs.length === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800/50 border border-white/5 mb-5">
              <FolderOpen className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-300">
              No saved configurations
            </h3>
            <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
              Head over to the AI Studio to generate your first TranslucentTB
              configuration and save it here.
            </p>
            <Link
              href="/ai-studio"
              className="mt-6 group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:brightness-110"
            >
              <Sparkles className="h-4 w-4" />
              Open AI Studio
            </Link>
          </motion.div>
        )}

        {/* Configs grid */}
        {!isLoading && configs.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {configs.map((config, i) => (
              <ConfigCard
                key={config.id}
                config={config}
                onDelete={handleDelete}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Usage bar */}
        {!isLoading && configs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-4"
          >
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Storage Used</span>
              <span>
                {configs.length} / {MAX_SAVED_CONFIGS}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(configs.length / MAX_SAVED_CONFIGS) * 100}%`,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  isAtLimit
                    ? "bg-gradient-to-r from-amber-500 to-red-500"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500"
                }`}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
