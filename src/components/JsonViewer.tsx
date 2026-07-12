"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { copyToClipboard, formatConfigJson } from "@/lib/utils";
import type { TranslucentTBConfig } from "@/lib/types";

interface JsonViewerProps {
  config: TranslucentTBConfig;
  className?: string;
}

/** Simple JSON syntax highlighter */
function highlightJson(json: string): string {
  return json.replace(
    /("(?:\\.|[^"\\])*")\s*:/g,
    '<span class="json-key">$1</span>:'
  )
  .replace(
    /:\s*("(?:\\.|[^"\\])*")/g,
    ': <span class="json-string">$1</span>'
  )
  .replace(
    /:\s*(\d+(?:\.\d+)?)/g,
    ': <span class="json-number">$1</span>'
  )
  .replace(
    /:\s*(true|false)/g,
    ': <span class="json-boolean">$1</span>'
  )
  .replace(
    /:\s*(null)/g,
    ': <span class="json-null">$1</span>'
  );
}

export default function JsonViewer({ config, className }: JsonViewerProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const jsonString = useMemo(() => formatConfigJson(config), [config]);
  const highlightedHtml = useMemo(() => highlightJson(jsonString), [jsonString]);

  const handleCopy = async () => {
    const success = await copyToClipboard(jsonString);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm overflow-hidden ${className || ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <Code2 className="h-4 w-4 text-indigo-400" />
          <span>TranslucentTB Config</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-gray-500" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
          )}
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Config</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* JSON content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-h-80 overflow-auto p-4">
              <pre className="text-xs leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
