"use client";

import { cn } from "@/lib/utils";
import { getPartyConfig, type PartyKey } from "@/lib/party-config";

export interface PartyBadgeProps {
  party: string;
  className?: string;
}

export function PartyBadge({ party, className }: PartyBadgeProps) {
  const config = getPartyConfig(party);
  if (!config) return null;
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-150",
        className
      )}
      style={{ backgroundColor: config.color }}
    >
      {config.icon} {party}
    </span>
  );
}
