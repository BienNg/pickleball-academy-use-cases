"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { getRoleConfig } from "@/lib/role-config";
import type { FlowStepVisual } from "@/lib/flows";

export interface VisualPanelProps {
  /** Role name for gradient background */
  role: string;
  /** What to render inside */
  visual: FlowStepVisual | null;
  /** When true, apply active scale/shadow */
  active?: boolean;
  className?: string;
}

export function VisualPanel({
  role,
  visual,
  active = false,
  className,
}: VisualPanelProps) {
  const config = getRoleConfig(role);
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

export function VisualContent({ visual }: { visual: FlowStepVisual }) {
  if (visual.type === "app-screen" && visual.src) {
    // Normalize src: Next.js Image requires paths starting with / for public folder
    // or full URLs (http:// or https://)
    let imageSrc = visual.src;
    if (!imageSrc.startsWith('/') && !imageSrc.startsWith('http://') && !imageSrc.startsWith('https://')) {
      imageSrc = `/${imageSrc}`;
    }
    
    return (
      <div className="mx-auto w-full max-w-[280px] rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-4 shadow-lg">
        <div className="relative overflow-hidden rounded-[20px] bg-white aspect-[9/19] min-h-[280px]">
          <div className="absolute left-1/2 top-0 z-10 h-6 w-[100px] -translate-x-1/2 rounded-b-[14px] bg-[#1a1a1a]" />
          <Image
            src={imageSrc}
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

  if (visual.type === "dashboard-view") {
    return (
      <div className="mx-auto w-full max-w-[320px] rounded-xl overflow-hidden bg-white shadow-md min-h-[280px] flex">
        <div className="w-[60px] bg-[#1a1a1a] flex-shrink-0" />
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="text-sm font-semibold text-[#1a1a1a]">Session Review</div>
          <div className="flex flex-col gap-3 animate-[scroll-sessions_8s_ease-in-out_infinite]">
            <div className="bg-[#e8f5e9] rounded-lg p-3 shadow-sm scale-[1.02]">
              <div className="w-full h-20 bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] rounded-md mb-2" />
              <div className="text-xs font-semibold text-[#1a1a1a] mb-1">Session 1 - John Doe</div>
              <div className="text-[10px] text-[#6b7280]">Yesterday 2:30 PM</div>
            </div>
            <div className="bg-[#f5f5f5] rounded-lg p-3">
              <div className="w-full h-20 bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] rounded-md mb-2" />
              <div className="text-xs font-semibold text-[#1a1a1a] mb-1">Session 2 - Jane Smith</div>
              <div className="text-[10px] text-[#6b7280]">Yesterday 4:15 PM</div>
            </div>
            <div className="bg-[#f5f5f5] rounded-lg p-3">
              <div className="w-full h-20 bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] rounded-md mb-2" />
              <div className="text-xs font-semibold text-[#1a1a1a] mb-1">Session 3 - Bob Lee</div>
              <div className="text-[10px] text-[#6b7280]">Yesterday 6:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "coaching-transcript") {
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center mb-4">
          Coaching Transcript
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl animate-[icon-pulse_2s_ease-in-out_infinite]">🎬</span>
          <span className="animate-[arrow-flow_2s_ease-in-out_infinite] text-lg text-[#6B7280] opacity-80">→</span>
          <span className="text-2xl animate-[icon-pulse_2s_ease-in-out_infinite_0.3s]">📝</span>
        </div>
        <div className="p-3 bg-[#f9fafb] rounded-lg min-h-[120px]">
          <div className="text-[13px] text-[#1a1a1a] leading-relaxed animate-[text-type_3s_ease-in-out_infinite]">
            &quot;Focus on keeping your wrist firm at contact...&quot;
          </div>
          <div className="mt-3 flex gap-1 items-end h-[40px]">
            <div className="w-1.5 h-4 bg-[#10b981] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite]" />
            <div className="w-1.5 h-6 bg-[#10b981] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.1s]" />
            <div className="w-1.5 h-8 bg-[#10b981] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.2s]" />
            <div className="w-1.5 h-6 bg-[#10b981] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.3s]" />
            <div className="w-1.5 h-4 bg-[#10b981] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.4s]" />
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "video-thumbnail") {
    return (
      <div className="mx-auto w-full max-w-[320px]">
        <div className="flex gap-3 bg-white rounded-xl p-4 shadow-md">
          <div className="flex-1 flex flex-col gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] text-center">Before</div>
            <div className="w-full aspect-video bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] rounded-lg animate-[video-fade-in_2s_ease-in-out_infinite]" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] text-center">After</div>
            <div className="w-full aspect-video bg-gradient-to-br from-[#c8e6c9] to-[#e8f5e9] rounded-lg border-2 border-[#4caf50]/30 animate-[video-slide-in_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "ai-voice-animation") {
    return (
      <div className="flex min-h-[200px] max-w-[280px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="text-[13px] text-[#1a1a1a] text-center p-3 bg-[#f5f5f5] rounded-lg animate-[text-type_3s_ease-in-out_infinite]">
          &quot;The key improvement was maintaining wrist stability...&quot;
        </div>
        <div className="flex gap-1 items-end justify-center h-[60px]">
          <div className="w-1.5 h-5 bg-[#4caf50] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite]" />
          <div className="w-1.5 h-9 bg-[#4caf50] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.1s]" />
          <div className="w-1.5 h-12 bg-[#4caf50] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.2s]" />
          <div className="w-1.5 h-9 bg-[#4caf50] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.3s]" />
          <div className="w-1.5 h-5 bg-[#4caf50] rounded-full animate-[soundwave-build_2s_ease-in-out_infinite_0.4s]" />
        </div>
        <div className="text-3xl animate-[icon-pulse_2s_ease-in-out_infinite]">🔊</div>
      </div>
    );
  }

  if (visual.type === "video-thumbnail-vertical") {
    return (
      <div className="mx-auto w-full max-w-[200px] flex flex-col gap-3">
        <div className="w-full aspect-[9/16] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-2 relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] rounded-lg" />
          <div className="absolute bottom-5 left-3 right-3 bg-black/70 text-white p-2 rounded-md text-[11px] animate-[subtitle-fade-in_2s_ease-in-out_infinite]">
            &quot;Focus on keeping your wrist firm...&quot;
          </div>
        </div>
        <div className="w-full h-1 bg-[#e0e0e0] rounded-full relative overflow-hidden">
          <div className="h-full w-[30%] bg-[#4caf50] rounded-full animate-[timeline-compress_3s_ease-in-out_infinite]" />
        </div>
        <div className="flex justify-end">
          <div className="text-[10px] text-[#6b7280]">0:30</div>
        </div>
        <div className="w-full h-0.5 bg-[#e0e0e0] rounded-full overflow-hidden">
          <div className="h-full w-0 bg-[#4caf50] animate-[progress-fill_2s_ease-in-out_infinite]" />
        </div>
      </div>
    );
  }

  if (visual.type === "clip-transfer-animation") {
    return (
      <div className="flex min-h-[160px] max-w-[280px] flex-row items-center justify-center gap-5 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="flex flex-col items-center gap-3 p-5 bg-white/90 rounded-xl min-w-[100px] relative">
          <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Editor</div>
          <div className="text-4xl animate-[clip-move-left_2s_ease-in-out_infinite]">🎬</div>
        </div>
        <span className="text-2xl text-[#6B7280] opacity-80">→</span>
        <div className="flex flex-col items-center gap-3 p-5 bg-white/90 rounded-xl min-w-[100px] relative animate-[receive-ping_2s_ease-in-out_infinite]">
          <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">CSM</div>
          <div className="absolute top-2 right-2 w-5 h-5 bg-[#ef4444] text-white rounded-full flex items-center justify-center text-[11px] font-semibold animate-[badge-ping_2s_ease-in-out_infinite]">1</div>
        </div>
      </div>
    );
  }

  if (visual.type === "social-publish-screen") {
    return (
      <div className="mx-auto w-full max-w-[360px]">
        <div className="flex gap-3 bg-white rounded-xl p-4 shadow-md">
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Send to Student</div>
            <div className="flex flex-col gap-2">
              <div className="bg-[#e3f2fd] text-[#1a1a1a] p-2.5 rounded-xl text-xs animate-[message-send_2s_ease-in-out_infinite]">
                Check out your improvement! 🎾
              </div>
              <div className="text-[11px] text-[#6b7280] p-1.5 bg-[#f5f5f5] rounded-md">📹 Clip attached</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Social Media Preview</div>
            <div className="bg-[#f9fafb] rounded-lg p-3 animate-[post-fade-in_2s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xl">🏫</div>
                <div className="text-xs font-semibold text-[#1a1a1a]">Pickleball Academy</div>
              </div>
              <div className="w-full h-[120px] bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] rounded-md mb-2" />
              <div className="flex gap-3 pt-2">
                <span className="text-base animate-[engagement-pulse_2s_ease-in-out_infinite]">❤️</span>
                <span className="text-base animate-[engagement-pulse_2s_ease-in-out_infinite_0.3s]">💬</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "curriculum-planning-board") {
    return (
      <div className="mx-auto w-full max-w-[320px]">
        <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center mb-5">
          Curriculum Planning Board
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-xl p-3 shadow-sm opacity-0 animate-[column-fade-in_0.6s_ease-out_0.1s_forwards]">
            <div className="text-sm font-semibold text-[#1a1a1a] mb-1 opacity-0 animate-[label-slide-up_0.4s_ease-out_0.2s_forwards]">Level 1</div>
            <div className="text-[10px] text-[#6b7280] mb-2 uppercase">Beginner</div>
            <div className="flex flex-col gap-2">
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.3s_forwards]">Basic grip & stance</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.4s_forwards]">Serve consistency</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.5s_forwards]">Court awareness</div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border-2 border-[#10b981] shadow-[#10b981]/15 opacity-0 animate-[column-fade-in_0.6s_ease-out_0.3s_forwards]">
            <div className="text-sm font-semibold text-[#1a1a1a] mb-1 opacity-0 animate-[label-slide-up_0.4s_ease-out_0.4s_forwards]">Level 2</div>
            <div className="text-[10px] text-[#6b7280] mb-2 uppercase">Advanced</div>
            <div className="flex flex-col gap-2">
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.5s_forwards]">Shot placement</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.6s_forwards]">Rally control</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.7s_forwards]">Strategy basics</div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-3 shadow-sm opacity-0 animate-[column-fade-in_0.6s_ease-out_0.5s_forwards]">
            <div className="text-sm font-semibold text-[#1a1a1a] mb-1 opacity-0 animate-[label-slide-up_0.4s_ease-out_0.6s_forwards]">Level 3</div>
            <div className="text-[10px] text-[#6b7280] mb-2 uppercase">Competitive</div>
            <div className="flex flex-col gap-2">
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.7s_forwards]">Advanced tactics</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.8s_forwards]">Match play</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded opacity-0 animate-[benchmark-fade-in_0.4s_ease-out_0.9s_forwards]">Performance metrics</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "shot-categories-animation") {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-8">
        <div className="text-xs font-semibold text-[#6b7280] opacity-0 animate-[core-fade-in_0.5s_ease-out_forwards]">
          Curriculum Core
        </div>
        <div className="relative w-[200px] h-[200px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_forwards]">
            Serve
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.2s_forwards]">
            Return
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.3s_forwards]">
            Dink
          </div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.4s_forwards]">
            Volley
          </div>
          <div className="absolute top-[20%] right-[20%] text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.5s_forwards]">
            Drive
          </div>
          <div className="absolute bottom-[20%] right-[20%] text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.6s_forwards]">
            Reset
          </div>
          <div className="absolute bottom-[20%] left-[20%] text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.7s_forwards]">
            Transition
          </div>
          <div className="absolute top-[20%] left-[20%] text-[10px] font-semibold text-[#1a1a1a] bg-white px-2.5 py-1.5 rounded-lg shadow-sm opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.8s_forwards]">
            Footwork
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold text-white bg-[#10b981] px-2.5 py-1.5 rounded-lg shadow-sm z-10 opacity-0 animate-[shot-expand_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.9s_forwards]">
            Strategy
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "shot-breakdown-document") {
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="text-sm font-semibold text-[#1a1a1a] mb-4 pb-3 border-b-2 border-[#e5e7eb] animate-[document-header-slide_0.4s_ease-out]">
          Shot Breakdown Document
        </div>
        <div className="flex flex-col gap-4">
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.1s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Technique</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.2s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Proper grip position
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.3s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Body positioning
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.4s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Follow-through motion
              </div>
            </div>
          </div>
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.2s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Key Cues</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.3s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Keep wrist firm
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.4s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Contact point timing
              </div>
            </div>
          </div>
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.3s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Common Errors</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.4s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Over-rotating
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.5s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Late contact
              </div>
            </div>
          </div>
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.4s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Evaluation Criteria</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] text-[#4b5563] pl-5 relative opacity-0 animate-[checklist-appear_0.4s_ease-out_0.2s_forwards]">
                <span className="absolute left-0 top-0.5 w-3 h-3 bg-[#10b981] rounded opacity-0 animate-[checkmark-animate_0.3s_ease-out_0.1s_forwards]"></span>
                Accuracy test
              </div>
              <div className="text-[11px] text-[#4b5563] pl-5 relative opacity-0 animate-[checklist-appear_0.4s_ease-out_0.3s_forwards]">
                <span className="absolute left-0 top-0.5 w-3 h-3 bg-[#10b981] rounded opacity-0 animate-[checkmark-animate_0.3s_ease-out_0.2s_forwards]"></span>
                Consistency score
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "drill-progression") {
    return (
      <div className="mx-auto w-full max-w-[360px]">
        <div className="flex items-center justify-center gap-2 mb-5 text-[11px] font-semibold text-[#6b7280]">
          <span className="px-2.5 py-1 bg-[#10b981] text-white rounded-md animate-[level-indicator-pulse_2s_ease-in-out_infinite]">Level 1</span>
          <span className="text-[#9ca3af] animate-[arrow-slide_1.5s_ease-in-out_infinite]">→</span>
          <span className="px-2.5 py-1 bg-[#f3f4f6] rounded-md">Level 2</span>
          <span className="text-[#9ca3af] animate-[arrow-slide_1.5s_ease-in-out_infinite]">→</span>
          <span className="px-2.5 py-1 bg-[#f3f4f6] rounded-md">Level 3</span>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm opacity-0 animate-[drill-swipe_0.6s_ease-out_0.1s_forwards]">
            <div className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider mb-3 text-center">Isolated Repetition</div>
            <div className="w-full h-24 bg-gradient-to-br from-[#e5e7eb] to-[#f3f4f6] rounded-lg relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#10b981] rounded-full opacity-30 animate-[drill-pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm opacity-0 animate-[drill-swipe_0.6s_ease-out_0.3s_forwards]">
            <div className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider mb-3 text-center">Controlled Rally</div>
            <div className="w-full h-24 bg-gradient-to-br from-[#e5e7eb] to-[#f3f4f6] rounded-lg relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#10b981] rounded-full opacity-30 animate-[drill-pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm opacity-0 animate-[drill-swipe_0.6s_ease-out_0.5s_forwards]">
            <div className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider mb-3 text-center">Live Point Scenario</div>
            <div className="w-full h-24 bg-gradient-to-br from-[#e5e7eb] to-[#f3f4f6] rounded-lg relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#10b981] rounded-full opacity-30 animate-[drill-pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "assessment-checklist") {
    return (
      <div className="mx-auto w-full max-w-[320px]">
        <div className="text-xs font-semibold text-[#1a1a1a] mb-5 text-center">Evaluation & Level-Up Criteria</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 opacity-0 animate-[metric-fade-in_0.5s_ease-out_0.1s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Skill Test Score</div>
            <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full w-0 animate-[progress-fill-animate_1.5s_ease-out_0.3s_forwards]" style={{ width: "75%" }}></div>
            </div>
            <div className="text-[11px] font-semibold text-[#1a1a1a] text-right">75/100</div>
          </div>
          <div className="flex flex-col gap-2 opacity-0 animate-[metric-fade-in_0.5s_ease-out_0.2s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Consistency Rate</div>
            <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full w-0 animate-[progress-fill-animate_1.5s_ease-out_0.4s_forwards]" style={{ width: "68%" }}></div>
            </div>
            <div className="text-[11px] font-semibold text-[#1a1a1a] text-right">68%</div>
          </div>
          <div className="flex items-center justify-between opacity-0 animate-[metric-fade-in_0.5s_ease-out_0.3s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider">Pass Threshold</div>
            <div className="flex items-center gap-2">
              <span className="text-base text-[#10b981] opacity-0 scale-0 animate-[checkmark-pulse_1s_ease-out_0.5s_forwards]">✓</span>
              <span className="text-[11px] font-semibold text-[#1a1a1a]">Met</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "master-document") {
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="flex flex-col items-center mb-6 pb-4 border-b-2 border-[#e5e7eb] animate-[branding-fade-in_0.5s_ease-out]">
          <div className="text-3xl mb-2 animate-[logo-appear_0.6s_ease-out]">🏫</div>
          <div className="text-sm font-semibold text-[#1a1a1a] text-center">Master Coaching Curriculum</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="opacity-0 animate-[toc-expand_0.5s_ease-out_0.1s_forwards]">
            <div className="text-xs font-semibold text-white bg-[#10b981] px-3 py-2 rounded-md mb-2">Levels</div>
            <div className="pl-3 flex flex-col gap-1.5 max-h-0 overflow-hidden animate-[toc-items-expand_0.4s_ease-out_0.3s_forwards]" style={{ maxHeight: "200px" }}>
              <div className="text-[11px] text-[#6b7280] p-1 rounded opacity-0 animate-[toc-item-fade_0.3s_ease-out_0.4s_forwards]">Level 1: Beginner</div>
              <div className="text-[11px] text-[#6b7280] p-1 rounded opacity-0 animate-[toc-item-fade_0.3s_ease-out_0.5s_forwards]">Level 2: Advanced</div>
              <div className="text-[11px] text-[#6b7280] p-1 rounded opacity-0 animate-[toc-item-fade_0.3s_ease-out_0.6s_forwards]">Level 3: Competitive</div>
            </div>
          </div>
          <div className="opacity-0 animate-[toc-expand_0.5s_ease-out_0.2s_forwards]">
            <div className="text-xs font-semibold text-[#1a1a1a] bg-[#f9fafb] px-3 py-2 rounded-md">Shot Library</div>
          </div>
          <div className="opacity-0 animate-[toc-expand_0.5s_ease-out_0.3s_forwards]">
            <div className="text-xs font-semibold text-[#1a1a1a] bg-[#f9fafb] px-3 py-2 rounded-md">Drill Library</div>
          </div>
          <div className="opacity-0 animate-[toc-expand_0.5s_ease-out_0.4s_forwards]">
            <div className="text-xs font-semibold text-[#1a1a1a] bg-[#f9fafb] px-3 py-2 rounded-md">Evaluation System</div>
          </div>
          <div className="opacity-0 animate-[toc-expand_0.5s_ease-out_0.5s_forwards]">
            <div className="text-xs font-semibold text-[#1a1a1a] bg-[#f9fafb] px-3 py-2 rounded-md">Coaching Standards</div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "approval-stamp") {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <div className="relative w-[200px] h-[200px] bg-white rounded-xl shadow-lg flex items-center justify-center animate-[document-final-appear_0.6s_ease-out]">
          <div className="absolute text-7xl opacity-5 animate-[logo-bg-fade_1s_ease-out_forwards]">🏫</div>
          <div className="text-lg font-bold text-[#10b981] uppercase tracking-widest relative z-10 opacity-0 scale-90 animate-[stamp-appear_0.5s_ease-out_0.3s_forwards]">
            Approved
          </div>
          <div className="absolute inset-[-10px] rounded-2xl bg-gradient-radial from-[#10b981]/20 to-transparent opacity-0 animate-[glow-pulse_2s_ease-in-out_infinite_0.8s]"></div>
        </div>
      </div>
    );
  }

  if (visual.type === "course-structure-board") {
    return (
      <div className="mx-auto w-full max-w-[320px]">
        <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center mb-5">
          Course Structure Board
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-xl p-3 shadow-sm opacity-0 animate-[column-fade-in_0.6s_ease-out_0.1s_forwards]">
            <div className="text-sm font-semibold text-[#1a1a1a] mb-2 text-center pb-2 border-b-2 border-[#e5e7eb]">Beginner</div>
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.2s_forwards]">Serve</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.3s_forwards]">Return</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.4s_forwards]">Dink</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.5s_forwards]">Volley</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.6s_forwards]">Strategy</div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border-2 border-[#10b981] shadow-[#10b981]/15 opacity-0 animate-[column-fade-in_0.6s_ease-out_0.3s_forwards]">
            <div className="text-sm font-semibold text-[#1a1a1a] mb-2 text-center pb-2 border-b-2 border-[#e5e7eb]">Intermediate</div>
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.4s_forwards]">Serve</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.5s_forwards]">Return</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.6s_forwards]">Dink</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.7s_forwards]">Volley</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.8s_forwards]">Strategy</div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-3 shadow-sm opacity-0 animate-[column-fade-in_0.6s_ease-out_0.5s_forwards]">
            <div className="text-sm font-semibold text-[#1a1a1a] mb-2 text-center pb-2 border-b-2 border-[#e5e7eb]">Advanced</div>
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.6s_forwards]">Serve</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.7s_forwards]">Return</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.8s_forwards]">Dink</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_0.9s_forwards]">Volley</div>
              <div className="text-[10px] text-[#4b5563] p-1.5 bg-[#f9fafb] rounded text-center opacity-0 animate-[row-slide-in_0.4s_ease-out_1s_forwards]">Strategy</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "lesson-script-document") {
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="text-sm font-semibold text-[#1a1a1a] mb-4 pb-3 border-b-2 border-[#e5e7eb] animate-[document-header-slide_0.4s_ease-out]">
          Lesson Script
        </div>
        <div className="flex flex-col gap-4">
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.1s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Objective</div>
            <div className="text-[11px] text-[#4b5563] p-2 bg-[#f9fafb] rounded opacity-0 animate-[typing-effect_0.8s_ease-out_0.3s_forwards]">
              Master proper serve technique with consistent placement
            </div>
          </div>
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.2s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Key Teaching Points</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.3s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Wrist firm at contact
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.4s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Follow-through complete
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.5s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Body positioning
              </div>
            </div>
          </div>
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.3s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Common Mistakes</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.4s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Over-rotating shoulders
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.5s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Late contact point
              </div>
            </div>
          </div>
          <div className="opacity-0 animate-[section-slide-in_0.5s_ease-out_0.4s_forwards]">
            <div className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Drill Integration</div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.5s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Target practice drill
              </div>
              <div className="text-[11px] text-[#4b5563] pl-4 relative opacity-0 animate-[bullet-fade-in_0.4s_ease-out_0.6s_forwards]">
                <span className="absolute left-0 text-[#10b981] font-bold">•</span>
                Progressive difficulty
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "production-calendar") {
    return (
      <div className="mx-auto w-full max-w-[320px]">
        <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center mb-5">
          Production Schedule
        </div>
        <div className="flex gap-2 justify-center">
          {[15, 16, 17, 18, 19, 20, 21].map((day, idx) => {
            const isFilming = [16, 18, 20].includes(day);
            const delay = (idx + 1) * 0.1;
            return (
              <div
                key={day}
                className={`flex-1 bg-white rounded-lg p-2 text-center shadow-sm relative transition-all hover:scale-105 hover:shadow-md opacity-0 ${
                  isFilming ? "border-2 border-[#10b981] bg-[#10b981]/5" : ""
                }`}
                style={{
                  animation: `calendar-day-appear 0.4s ease-out ${delay}s forwards`
                }}
              >
                <div className="text-sm font-semibold text-[#1a1a1a] mb-1">{day}</div>
                <div className="text-[10px] text-[#6b7280] uppercase">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                </div>
                {isFilming && (
                  <div className="absolute top-1 right-1 text-xs opacity-0 animate-[icon-appear_0.4s_ease-out_0.5s_forwards]">📹</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (visual.type === "video-recording-court") {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <div className="relative w-full max-w-[300px] h-[200px] bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-xl shadow-md overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `linear-gradient(to bottom, transparent 45%, #4caf50 45%, #4caf50 47%, transparent 47%),
                              linear-gradient(to right, transparent 48%, #4caf50 48%, #4caf50 50%, transparent 50%)`
          }} />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-10 bg-[#10b981] rounded-full animate-[coach-swing_3s_ease-in-out_infinite]" />
          <div className="absolute top-2.5 right-5 w-5 h-7 bg-[#333] rounded-sm">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-[#555] rounded-sm" />
          </div>
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-md text-[10px] text-white">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-[rec-blink_1.5s_ease-in-out_infinite]" />
            <span className="font-semibold tracking-wider">REC</span>
          </div>
        </div>
      </div>
    );
  }

  if (visual.type === "video-editing-timeline") {
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center mb-4">
          Video Editing Timeline
        </div>
        <div className="relative w-full h-30 bg-[#1a1a1a] rounded-lg mb-4 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]" />
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-[10px] opacity-0 animate-[subtitle-fade-in_1s_ease-out_0.5s_forwards]">
            &quot;Keep your wrist firm at contact&quot;
          </div>
        </div>
        <div className="relative w-full h-10 bg-[#f9fafb] rounded-lg overflow-hidden mb-2">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#10b981] rounded opacity-60" />
          <div className="absolute left-[30%] top-0 w-0.5 h-full bg-[#10b981] animate-[timeline-scrub_3s_ease-in-out_infinite]" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#6b7280]">
          <span className="opacity-0 animate-[icon-pulse_2s_ease-in-out_infinite_1s_forwards]">⏱️</span>
          <span>Slow Motion</span>
        </div>
      </div>
    );
  }

  if (visual.type === "video-review-dashboard") {
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center mb-4">
          Lesson Review
        </div>
        <div className="w-full h-35 bg-[#1a1a1a] rounded-lg mb-4 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]" />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {["Technical accuracy", "Instruction clarity", "Program alignment"].map((item, idx) => {
            const slideDelay = (idx + 1) * 0.2;
            const checkDelay = slideDelay + 0.2;
            return (
              <div
                key={item}
                className="flex items-center gap-2 opacity-0"
                style={{ animation: `checklist-slide-in 0.5s ease-out ${slideDelay}s forwards` }}
              >
                <div
                  className="w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center text-white text-xs opacity-0 scale-0"
                  style={{ animation: `checkmark-appear 0.4s ease-out ${checkDelay}s forwards` }}
                >
                  ✓
                </div>
                <div className="text-[11px] text-[#4b5563]">{item}</div>
              </div>
            );
          })}
        </div>
        <div className="text-center text-xs font-bold text-[#10b981] uppercase tracking-widest p-3 bg-[#10b981]/10 rounded-lg opacity-0 scale-90 animate-[badge-scale-in_0.6s_ease-out_1s_forwards]">
          APPROVED
        </div>
      </div>
    );
  }

  if (visual.type === "app-course-library") {
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="text-xs font-semibold text-[#1a1a1a] mb-4 text-center">
          Course Library
        </div>
        <div className="flex gap-2 mb-4 justify-center">
          {["Beginner", "Intermediate", "Advanced"].map((tab, idx) => {
            const delay = (idx + 1) * 0.1;
            return (
              <div
                key={tab}
                className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all opacity-0 ${
                  tab === "Beginner"
                    ? "bg-[#10b981] text-white shadow-[0_2px_6px_rgba(16,185,129,0.3)]"
                    : "bg-[#f9fafb] text-[#6b7280]"
                }`}
                style={{ animation: `tab-fade-in 0.4s ease-out ${delay}s forwards` }}
              >
                {tab}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["Serve Basics", "Return Technique", "Dink Mastery", "Volley Fundamentals"].map((title, idx) => {
            const delay = (idx + 1) * 0.1 + 0.2;
            return (
              <div
                key={title}
                className="opacity-0 transition-transform hover:scale-105"
                style={{ animation: `thumbnail-fade-in 0.5s ease-out ${delay}s forwards` }}
              >
                <div className="w-full h-20 bg-gradient-to-br from-[#e5e7eb] to-[#f3f4f6] rounded-lg mb-1" />
                <div className="text-[10px] text-[#4b5563] text-center font-medium">{title}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (visual.type === "animation") {
    // Cloud upload animation - Step 1
    return (
      <div className="flex min-h-[180px] max-w-[280px] flex-row items-center justify-center gap-5 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl animate-[data-flow-left_2s_ease-in-out_infinite]">📹</div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#10b981] to-transparent opacity-60"></div>
        </div>
        <span className="text-2xl text-[#6B7280] opacity-80 animate-[arrow-flow-subtle_2s_ease-in-out_infinite]">→</span>
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl animate-[data-flow-right_2s_ease-in-out_infinite]">☁️</div>
          <div className="w-12 h-0.5 bg-gradient-to-l from-[#10b981] to-transparent opacity-60"></div>
        </div>
      </div>
    );
  }

  if (visual.type === "cloud-link-paste") {
    // Step 2: Coach pastes cloud links
    return (
      <div className="flex min-h-[200px] max-w-[280px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl animate-[link-copy_2s_ease-in-out_infinite]">🔗</div>
          <span className="text-lg text-[#6B7280] opacity-80 animate-[arrow-flow-subtle_2s_ease-in-out_infinite]">→</span>
          <div className="text-2xl animate-[link-paste_2s_ease-in-out_infinite_0.3s]">📱</div>
        </div>
        <div className="w-full max-w-[200px] bg-[#f9fafb] rounded-lg p-3 border border-[#e5e7eb]">
          <div className="text-[11px] text-[#6b7280] font-mono truncate animate-[text-type_2s_ease-in-out_infinite]">
            drive.google.com/file/...
          </div>
        </div>
        <div className="text-xs text-[#6b7280] uppercase tracking-wider mt-2">Link Pasted</div>
      </div>
    );
  }

  if (visual.type === "editor-notification") {
    // Step 3: Editor receives notification
    return (
      <div className="flex min-h-[200px] max-w-[280px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="relative">
          <div className="text-4xl animate-[notification-pulse_2s_ease-in-out_infinite]">🔔</div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] rounded-full flex items-center justify-center text-white text-[10px] font-semibold animate-[badge-ping_2s_ease-in-out_infinite]">
            1
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-semibold text-[#1a1a1a]">New Session Ready</div>
          <div className="text-[11px] text-[#6b7280] text-center animate-[notification-fade_2s_ease-in-out_infinite]">
            Video footage available for download
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="text-2xl animate-[icon-pulse_2s_ease-in-out_infinite]">✂️</div>
          <span className="text-sm text-[#6B7280]">Editor</span>
        </div>
      </div>
    );
  }

  if (visual.type === "video-download") {
    // Step 4: Editor downloads video segments
    return (
      <div className="flex min-h-[200px] max-w-[280px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="flex items-center gap-3">
          <div className="text-3xl animate-[cloud-send_2s_ease-in-out_infinite]">☁️</div>
          <span className="text-2xl text-[#6B7280] opacity-80 animate-[arrow-flow-subtle_2s_ease-in-out_infinite]">↓</span>
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl animate-[video-receive_2s_ease-in-out_infinite]">📹</div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent opacity-60 animate-[download-progress_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-xs font-semibold text-[#1a1a1a]">Downloading...</div>
          <div className="text-[10px] text-[#6b7280]">Multiple video segments</div>
        </div>
      </div>
    );
  }

  if (visual.type === "video-editing-tool") {
    // Step 5: Video editing tool animation
    return (
      <div className="mx-auto w-full max-w-[320px] bg-white rounded-xl p-4 shadow-md">
        <div className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center mb-4">
          Video Editing Timeline
        </div>
        <div className="relative w-full h-20 bg-[#1a1a1a] rounded-lg mb-3 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-full flex items-center gap-1 px-2">
              <div className="h-12 bg-[#4caf50] rounded opacity-80 animate-[clip-trim_2s_ease-in-out_infinite]"></div>
              <div className="h-12 bg-[#4caf50] rounded opacity-80 animate-[clip-trim_2s_ease-in-out_infinite_0.2s]"></div>
              <div className="h-12 bg-[#4caf50] rounded opacity-80 animate-[clip-trim_2s_ease-in-out_infinite_0.4s]"></div>
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-[9px]">
            Stitching clips...
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="text-2xl animate-[scissors-cut_2s_ease-in-out_infinite]">✂️</div>
          <div className="text-[11px] text-[#6b7280]">Removing idle time</div>
        </div>
      </div>
    );
  }

  if (visual.type === "upload-to-app") {
    // Step 6: Uploading to app animation
    return (
      <div className="flex min-h-[200px] max-w-[280px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl animate-[video-upload-start_2s_ease-in-out_infinite]">📹</div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent opacity-60 animate-[upload-progress_2s_ease-in-out_infinite]"></div>
          </div>
          <span className="text-2xl text-[#6B7280] opacity-80 animate-[arrow-flow-subtle_2s_ease-in-out_infinite]">→</span>
          <div className="text-3xl animate-[app-receive_2s_ease-in-out_infinite]">📱</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-xs font-semibold text-[#1a1a1a]">Uploading...</div>
          <div className="text-[10px] text-[#6b7280]">Final session video</div>
        </div>
        <div className="w-full max-w-[180px] h-1 bg-[#e5e7eb] rounded-full overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full animate-[progress-bar_2s_ease-in-out_infinite]" style={{ width: "75%" }}></div>
        </div>
      </div>
    );
  }

  if (visual.type === "student-notification") {
    // Step 8: Student receives video and notification
    return (
      <div className="flex min-h-[220px] max-w-[280px] flex-col items-center justify-center gap-4 rounded-[20px] bg-white/80 px-6 py-8 mx-auto">
        <div className="relative">
          <div className="text-4xl animate-[notification-pulse_2s_ease-in-out_infinite]">📱</div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center text-white text-[10px] font-semibold animate-[badge-ping_2s_ease-in-out_infinite]">
            ✓
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-semibold text-[#1a1a1a]">Session Replay Available</div>
          <div className="text-[11px] text-[#6b7280] text-center animate-[notification-fade_2s_ease-in-out_infinite]">
            Your coaching session is ready to watch
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-16 h-10 bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] rounded-lg animate-[video-thumbnail-appear_2s_ease-in-out_infinite]"></div>
          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-semibold text-[#1a1a1a]">Session Video</div>
            <div className="text-[9px] text-[#6b7280]">Ready to play</div>
          </div>
        </div>
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
