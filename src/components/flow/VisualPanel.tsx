"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { getPartyConfig } from "@/lib/party-config";
import type { FlowStepVisual } from "@/lib/flows";

export interface VisualPanelProps {
  /** Party name for gradient background */
  party: string;
  /** What to render inside */
  visual: FlowStepVisual | null;
  /** When true, apply active scale/shadow */
  active?: boolean;
  className?: string;
}

export function VisualPanel({
  party,
  visual,
  active = false,
  className,
}: VisualPanelProps) {
  const config = getPartyConfig(party);
  const gradientClass = config
    ? `bg-gradient-to-br ${config.gradient}`
    : "bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]";

  return (
    <div
      className={cn(
        "flex-shrink-0 w-full max-w-[360px] self-start overflow-hidden rounded-3xl transition-all duration-150 ease-standard",
        "shadow-[0_10px_25px_rgba(0,0,0,0.06)]",
        "sticky top-8 max-lg:static max-lg:mx-auto",
        active && "shadow-[0_12px_30px_rgba(0,0,0,0.07)] scale-[1.02] max-lg:scale-100",
        gradientClass,
        className
      )}
    >
      <div className="p-6">
        {visual && <VisualContent visual={visual} />}
      </div>
    </div>
  );
}

function VisualContent({ visual }: { visual: FlowStepVisual }) {
  if (visual.type === "app-screen" && visual.src) {
    return (
      <div className="mx-auto w-full max-w-[280px] rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="relative overflow-hidden rounded-[20px] bg-white aspect-[9/19] min-h-[280px]">
          <div className="absolute left-1/2 top-0 z-10 h-6 w-[100px] -translate-x-1/2 rounded-b-[14px] bg-[#1a1a1a]" />
          <Image
            src={visual.src}
            alt="App screen"
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </div>
    );
  }

  if (visual.type === "zalo-chat") {
    return <ZaloChatMessages initialOnly />;
  }
  if (visual.type === "zalo-chat-continued") {
    return <ZaloChatMessages />;
  }

  if (visual.type === "camera-upload") {
    return (
      <div className="flex min-h-[180px] max-w-[280px] flex-row flex-wrap items-center justify-center gap-5 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <span className="animate-[camera-pulse_2s_ease-in-out_infinite] text-4xl">📹</span>
        <span className="animate-[arrow-flow_2s_ease-in-out_infinite] text-2xl text-[#6B7280] opacity-80">→</span>
        <span className="animate-[cloud-receive_2s_ease-in-out_infinite] text-4xl">☁️</span>
      </div>
    );
  }
  if (visual.type === "payment-editor") {
    return (
      <div className="flex min-h-[180px] max-w-[280px] flex-row flex-wrap items-center justify-center gap-5 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <span className="animate-[payment-complete_2.2s_ease-in-out_infinite] text-4xl">💳</span>
        <span className="animate-[arrow-flow_2.2s_ease-in-out_infinite_0.2s] text-2xl text-[#6B7280] opacity-80">→</span>
        <span className="animate-[send-to-editor_2.2s_ease-in-out_infinite_0.4s] text-4xl">📁</span>
        <span className="w-full text-center text-xs font-medium uppercase tracking-wide text-[#6B7280]">Editor</span>
      </div>
    );
  }
  if (visual.type === "editor-upload") {
    return (
      <div className="flex min-h-[180px] max-w-[280px] flex-row flex-wrap items-center justify-center gap-5 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <span className="animate-[edit-video_2.4s_ease-in-out_infinite] text-4xl">✂️</span>
        <span className="animate-[arrow-flow_2.4s_ease-in-out_infinite_0.3s] text-2xl text-[#6B7280] opacity-80">→</span>
        <span className="animate-[upload-to-app_2.4s_ease-in-out_infinite_0.6s] text-4xl">📱</span>
        <span className="w-full text-center text-xs font-medium uppercase tracking-wide text-[#6B7280]">App</span>
      </div>
    );
  }

  return null;
}

function ZaloChatMessages({ initialOnly = false }: { initialOnly?: boolean }) {
  return (
    <div className="mx-auto max-w-[280px] rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
      <div className="overflow-hidden rounded-[20px] bg-white aspect-[9/19] min-h-[320px] flex flex-col font-sans">
        <div className="flex min-h-14 items-center gap-3 bg-gradient-to-br from-[#0068FF] to-[#0052CC] px-4 py-3 text-white">
          <span className="text-xl opacity-90">←</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-semibold">Pickleball Academy</span>
            <span className="text-[11px] opacity-85">Zalo Official Account</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 bg-[#e8e8e8] p-4">
          <div className="flex flex-col items-end gap-1">
            <span className="max-w-[85%] rounded-[18px] rounded-br-md bg-gradient-to-br from-[#0068FF] to-[#0052CC] px-3.5 py-2.5 text-sm leading-snug text-white">
              Chào academy, tôi muốn đăng ký học tại academy! 🎾
            </span>
            <span className="text-[11px] text-[#888]">14:32</span>
          </div>
          {!initialOnly && (
            <>
              <div className="flex flex-col items-start gap-1">
                <span className="max-w-[85%] rounded-[18px] rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-snug text-[#1a1a1a]">
                  Chào bạn! Cảm ơn bạn đã quan tâm đến Pickleball Academy. Bạn có thể cho tôi biết trình độ hiện tại của bạn và mục tiêu học tập không?
                </span>
                <span className="text-[11px] text-[#888]">14:33</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="max-w-[85%] rounded-[18px] rounded-br-md bg-gradient-to-br from-[#0068FF] to-[#0052CC] px-3.5 py-2.5 text-sm leading-snug text-white">
                  Tôi là người mới bắt đầu, muốn học từ cơ bản đến nâng cao
                </span>
                <span className="text-[11px] text-[#888]">14:34</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="max-w-[85%] rounded-[18px] rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-snug text-[#1a1a1a]">
                  Tuyệt vời! Chúng tôi có các khóa học phù hợp cho người mới bắt đầu. Bạn có muốn tôi sắp xếp một buổi học thử với coach không?
                </span>
                <span className="text-[11px] text-[#888]">14:35</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
