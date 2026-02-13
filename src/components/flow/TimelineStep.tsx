"use client";

import { cn } from "@/lib/utils";
import { PartyBadge } from "./PartyBadge";

export interface TimelineStepProps {
  party: string;
  title: string;
  description?: string;
  active?: boolean;
  completed?: boolean;
  isLast?: boolean;
  onClick?: () => void;
}

export function TimelineStep({
  party,
  title,
  description,
  active = false,
  completed = true,
  isLast = false,
  onClick,
}: TimelineStepProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "relative flex items-start gap-0 py-3.5 pl-9 pr-4 transition-all duration-150 ease-standard",
        "cursor-pointer rounded-r",
        active && "bg-black/[0.025]",
        !active && "hover:bg-black/[0.02]",
        !completed && "opacity-50 pointer-events-none h-0 py-0 pr-0 overflow-hidden"
      )}
    >
      {/* Vertical connector line – hidden on last step */}
      {!isLast && (
        <span
          className={cn(
            "absolute left-1.5 top-7 bottom-0 w-0.5 flex-shrink-0 transition-colors duration-150",
            active ? "bg-[#1E1E1E]" : "bg-[#E5E7EB]"
          )}
          aria-hidden
        />
      )}
      {/* Step circle */}
      <span
        className={cn(
          "absolute left-0 top-1.5 z-[2] rounded-full border-2 bg-white transition-all duration-150",
          active
            ? "h-[18px] w-[18px] border-[#1E1E1E] bg-[#1E1E1E]"
            : "h-3.5 w-3.5 border-[#E5E7EB]"
        )}
        aria-hidden
      />
      <div className="flex-1 pt-0">
        <PartyBadge party={party} className="mb-2" />
        <p
          className={cn(
            "text-[15px] leading-snug tracking-[-0.01em] text-[#1E1E1E]",
            active ? "font-semibold" : "font-medium"
          )}
        >
          {title}
        </p>
        {description && (
          <p className="mt-1 text-sm font-normal text-[#6B7280] leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
