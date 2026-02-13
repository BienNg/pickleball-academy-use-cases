"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Timeline } from "./Timeline";
import { VisualPanel } from "./VisualPanel";
import { Button } from "@/components/ui/button";
import type { FlowConfig } from "@/lib/flows";

export interface FlowLayoutProps {
  flow: FlowConfig;
  className?: string;
}

type ViewMode = "complete" | "step-by-step";

export function FlowLayout({ flow, className }: FlowLayoutProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("complete");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const steps = flow.steps;
  const activeStep = steps[activeIndex];
  const hasVisual = activeStep?.visual != null;

  const handleStepSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    if (visibleCount < steps.length) {
      setVisibleCount((c) => c + 1);
      setActiveIndex(visibleCount);
    }
  }, [visibleCount, steps.length]);

  const handlePrev = useCallback(() => {
    if (visibleCount > 1) {
      setVisibleCount((c) => c - 1);
      setActiveIndex(visibleCount - 2);
    }
  }, [visibleCount]);

  const isStepByStep = viewMode === "step-by-step";
  const effectiveVisible = isStepByStep ? visibleCount : steps.length;
  const displayIndex = isStepByStep ? activeIndex : activeIndex;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Header */}
      <div className="mb-9 border-b border-[#E5E7EB] pb-7">
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1E1E1E] mb-2">
          {flow.title}
        </h1>
        <p className="text-[15px] font-normal text-[#6B7280] leading-snug">
          {flow.subtitle}
        </p>
      </div>

      {/* View mode + step nav */}
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] py-5">
        <div className="inline-flex rounded-lg bg-[#F3F4F6] p-1">
          <button
            type="button"
            onClick={() => setViewMode("complete")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium tracking-[-0.01em] transition-all duration-150",
              viewMode === "complete"
                ? "bg-[#1E1E1E] text-white"
                : "text-[#6B7280] hover:bg-white/60 hover:text-[#1E1E1E]"
            )}
          >
            Complete
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("step-by-step");
              setVisibleCount(1);
              setActiveIndex(0);
            }}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium tracking-[-0.01em] transition-all duration-150",
              viewMode === "step-by-step"
                ? "bg-[#1E1E1E] text-white"
                : "text-[#6B7280] hover:bg-white/60 hover:text-[#1E1E1E]"
            )}
          >
            Step-by-Step
          </button>
        </div>
        {isStepByStep && (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="default"
              onClick={handlePrev}
              disabled={visibleCount <= 1}
            >
              ← Previous
            </Button>
            <span className="min-w-[50px] rounded-md bg-[#F9FAFB] px-3 py-2 text-center text-[13px] font-medium text-[#6B7280]">
              <span className="font-semibold text-[#1E1E1E]">{visibleCount}</span>
              {" / "}
              {steps.length}
            </span>
            <Button
              variant="outline"
              size="default"
              onClick={handleNext}
              disabled={visibleCount >= steps.length}
            >
              Next →
            </Button>
          </div>
        )}
      </div>

      {/* Split: Visual left | Timeline right – stacked on mobile */}
      <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:flex-nowrap lg:items-start">
        {hasVisual && activeStep && (
          <VisualPanel
            party={activeStep.party}
            visual={activeStep.visual ?? null}
            active
            className="w-full lg:w-[360px] lg:flex-shrink-0 order-first lg:order-none"
          />
        )}
        <div className="flex-1 min-w-0 order-last lg:order-none">
          <Timeline
            steps={steps}
            activeIndex={displayIndex}
            onStepSelect={setActiveIndex}
            visibleCount={isStepByStep ? effectiveVisible : undefined}
          />
        </div>
      </div>
    </div>
  );
}
