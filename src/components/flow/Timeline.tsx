"use client";

import { TimelineStep } from "./TimelineStep";
import type { FlowStep } from "@/lib/flows";

export interface TimelineProps {
  steps: FlowStep[];
  activeIndex: number;
  onStepSelect?: (index: number) => void;
  /** In step-by-step mode, only steps with index < visibleCount are "completed" and clickable */
  visibleCount?: number;
}

export function Timeline({
  steps,
  activeIndex,
  onStepSelect,
  visibleCount,
}: TimelineProps) {
  const effectiveVisible = visibleCount ?? steps.length;
  return (
    <div className="flex flex-1 flex-col gap-0 min-w-0 pl-6">
      {steps.map((step, index) => (
        <TimelineStep
          key={index}
          role={step.role}
          title={step.title}
          description={step.description}
          active={index === activeIndex}
          completed={index < effectiveVisible}
          isLast={index === steps.length - 1}
          onClick={() => {
            if (index < effectiveVisible) onStepSelect?.(index);
          }}
        />
      ))}
    </div>
  );
}
