"use client";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import React from "react";
import { Skeleton } from "~/components/ui/skeleton";
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

interface PodiumSkeletonSlotProps {
  blockHeight: string;
}

function hasPodiumEntry(entry: PodiumEntry) {
  return entry.name?.trim().length > 0 && Number.isFinite(entry.score);
}

function PodiumSkeletonSlot({ blockHeight }: PodiumSkeletonSlotProps) {
  return (
    <div className="flex flex-col items-center justify-end gap-4">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton
        className={cn("w-26 rounded-t-lg rounded-b-none", blockHeight)}
      />
    </div>
  );
}

function PodiumSlot({ entry, rank, blockHeight, delay = 0 }: PodiumSlotProps) {
  const colors = MEDAL_COLORS[rank];

  return (
    <div className="flex flex-col items-center justify-end gap-4">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.45, duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center drop-shadow-md">
          <ModelLogo name={entry.name} size={80} />
        </div>
        <span
          className={cn(
            "absolute -top-3 -right-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm",
            colors.badge,
          )}
        >
          {rank}
        </span>
      </motion.div>

      <motion.div
        className={cn(
          "flex flex-col items-center justify-center w-26 rounded-t-lg border-t-2 border-l border-r shadow-inner",
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
        style={{
          transformOrigin: "bottom",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 92%, rgba(0,0,0,0.06) 98%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 92%, rgba(0,0,0,0.06) 98%, transparent 100%)",
        }}
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
          className="text-sm font-medium text-podium-block-subtext mt-0.5 px-1 text-center leading-tight truncate w-full"
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
  const hasFirst = hasPodiumEntry(first);
  const hasSecond = hasPodiumEntry(second);
  const hasThird = hasPodiumEntry(third);
  const isEmpty = !hasFirst && !hasSecond && !hasThird;

  return (
    <div className={cn("flex flex-col items-center gap-4 min-h-0", className)}>
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
      <div className="flex items-end gap-1.5 flex-1 min-h-0">
        {isEmpty ? (
          <PodiumSkeletonSlot blockHeight="h-28" />
        ) : (
          hasSecond && (
            <PodiumSlot
              entry={second}
              rank={2}
              blockHeight="h-28"
              delay={0.15}
            />
          )
        )}

        {isEmpty ? (
          <PodiumSkeletonSlot blockHeight="h-36" />
        ) : (
          hasFirst && (
            <PodiumSlot entry={first} rank={1} blockHeight="h-36" delay={0} />
          )
        )}

        {isEmpty ? (
          <PodiumSkeletonSlot blockHeight="h-22" />
        ) : (
          hasThird && (
            <PodiumSlot entry={third} rank={3} blockHeight="h-22" delay={0.3} />
          )
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
