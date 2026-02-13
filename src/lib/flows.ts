/**
 * Flow data – single source of truth. Add new flows here; pages render from this config.
 */

export type VisualType = "app-screen" | "zalo-chat" | "zalo-chat-continued" | "camera-upload" | "payment-editor" | "editor-upload";

export interface FlowStepVisual {
  type: VisualType;
  src?: string;
}

export interface FlowStep {
  party: string;
  title: string;
  description?: string;
  visual?: FlowStepVisual;
}

export interface FlowConfig {
  title: string;
  subtitle: string;
  steps: FlowStep[];
}

export const flows: Record<string, FlowConfig> = {
  "first-contact": {
    title: "First Contact with Academy",
    subtitle: "Student Requests a Coaching through Academy",
    steps: [
      {
        party: "Student",
        title: "Requests a Coaching through Academy",
        description: undefined,
        visual: { type: "zalo-chat" },
      },
      {
        party: "CSM",
        title: "Consults",
        description: undefined,
        visual: { type: "zalo-chat-continued" },
      },
      {
        party: "CSM",
        title: "Schedules first session with coach",
        description: "Finds a time slot, free coach and court",
        visual: { type: "app-screen", src: "/images/session-booked.png" },
      },
      {
        party: "Coach",
        title: "First Session takes place",
        description:
          "Goes through all the shots the first time to rate the skill of every shot to create a roadmap",
        visual: { type: "app-screen", src: "/images/dupr-coach.png" },
      },
      {
        party: "Coach",
        title: "Records the session and sends the recording to CSM",
        description: undefined,
        visual: { type: "camera-upload" },
      },
      {
        party: "CSM",
        title: "Checks if student has paid and sends the Recordings to Editor",
        description: undefined,
        visual: { type: "payment-editor" },
      },
      {
        party: "Editor",
        title: "Uploads Recordings to App",
        description: undefined,
        visual: { type: "editor-upload" },
      },
    ],
  },
};

export function getFlowBySlug(slug: string): FlowConfig | null {
  return flows[slug] ?? null;
}

export function getAllFlowSlugs(): string[] {
  return Object.keys(flows);
}
