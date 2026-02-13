"use client";

import { cn } from "@/lib/utils";
import { getRoleConfig, type RoleKey } from "@/lib/role-config";

export interface RoleBadgeProps {
  role: string;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = getRoleConfig(role);
  if (!config) return null;
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-150",
        className
      )}
      style={{ backgroundColor: config.color }}
    >
      {config.icon} {role}
    </span>
  );
}
