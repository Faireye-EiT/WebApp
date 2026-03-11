"use client";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";
import { MEDAL_COLORS, MODEL_LOGO_MAP } from "../const";

export interface PodiumEntry {
  name: string;
  score: number;
}

interface PodiumProps {
  title?: string;
  first: PodiumEntry;
  second: PodiumEntry;
  third: PodiumEntry;
  className?: string;
}

interface PodiumSlotProps {
  entry: PodiumEntry;
  rank: 1 | 2 | 3;
  blockHeight: string;
  delay?: number;
}

function PodiumSlot({ entry, rank, blockHeight, delay = 0 }: PodiumSlotProps) {
  const colors = MEDAL_COLORS[rank];
  const rankLabel = rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd";

  return (
    <div className="flex flex-col items-center justify-end gap-2">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.45, duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-14 h-14 flex items-center justify-center drop-shadow-md">
          <ModelLogo name={entry.name} size={50} />
        </div>
        <span
          className={cn(
            "absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm",
            colors.badge,
          )}
        >
          {rank}
        </span>
      </motion.div>

      <motion.span
        className={cn("text-xs font-semibold tracking-wide", colors.label)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.55, duration: 0.3 }}
      >
        {rankLabel}
      </motion.span>

      <motion.div
        className={cn(
          "flex flex-col items-center justify-center w-24 rounded-t-lg border-t-2 border-l border-r shadow-inner",
          blockHeight,
          colors.block,
        )}
        initial={{ scaleY: 0, opacity: 0.6 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{
          delay,
          duration: 0.55,
          type: "spring",
          stiffness: 120,
          damping: 14,
        }}
        style={{ transformOrigin: "bottom" }}
      >
        <motion.span
          className="text-2xl font-bold text-podium-block-text tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.55, duration: 0.3 }}
        >
          {Math.round(entry.score * 100)}
        </motion.span>
        <motion.span
          className="text-[10px] font-medium text-podium-block-subtext mt-0.5 px-1 text-center leading-tight truncate w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6, duration: 0.3 }}
        >
          {entry.name}
        </motion.span>
      </motion.div>
    </div>
  );
}

export function Podium({
  title = "Rankings",
  first,
  second,
  third,
  className,
}: PodiumProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Title */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="text-lg font-semibold text-foreground text-balance tracking-tight border-b border-border pb-2 px-6">
          {title}
        </h2>
      </motion.div>

      {/* Podium stage */}
      <div className="flex items-end gap-2">
        {second.name && second.score && (
          <PodiumSlot entry={second} rank={2} blockHeight="h-20" delay={0.15} />
        )}

        {first.name && first.score && (
          <PodiumSlot entry={first} rank={1} blockHeight="h-28" delay={0} />
        )}

        {third.name && third.score && (
          <PodiumSlot entry={third} rank={3} blockHeight="h-14" delay={0.3} />
        )}
      </div>
    </div>
  );
}

export function ModelLogo({
  name,
  size = 50,
}: {
  name: string;
  size?: number;
}) {
  const n = name.toLowerCase();
  const match = MODEL_LOGO_MAP.find(([keys]) =>
    (keys as string[]).some((k) => n.includes(k)),
  );
  if (match) {
    const icon = match[1] as React.ReactElement;
    return React.cloneElement(icon, { size } as React.Attributes);
  }
  return <Bot size={size} className="text-muted-foreground" />;
}
