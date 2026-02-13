/**
 * Flow data – single source of truth. Add new flows here; pages render from this config.
 */

export type VisualType = "app-screen" | "zalo-chat" | "zalo-chat-continued" | "camera-upload" | "payment-editor" | "editor-upload" | "dashboard-view" | "video-thumbnail" | "ai-voice-animation" | "video-thumbnail-vertical" | "clip-transfer-animation" | "social-publish-screen";

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
  "creating-session-success-clips": {
    title: "Creating Session Success Clips",
    subtitle: "Daily before-and-after transformation clips for students and social media",
    steps: [
      {
        party: "Editor",
        title: "Reviews All Completed Sessions",
        description: "Editor reviews recordings from all sessions completed the previous day to identify potential transformation moments.",
        visual: { type: "dashboard-view" },
      },
      {
        party: "Editor",
        title: "Selects Before & After Clip",
        description: "Editor selects one clip from the beginning of the session and one improved execution after coaching.",
        visual: { type: "video-thumbnail" },
      },
      {
        party: "Editor",
        title: "Transcribes Coaching Moment",
        description: "Editor extracts and transcribes the specific coaching instruction related to the technical correction.",
        visual: { type: "app-screen" },
      },
      {
        party: "Editor",
        title: "Generates AI Voice Explanation",
        description: "Editor creates an AI voiceover explaining the technical issue and how it was corrected.",
        visual: { type: "ai-voice-animation" },
      },
      {
        party: "Editor",
        title: "Produces 30-Second Transformation Clip",
        description: "Editor combines before, after, transcript insight, and AI voice into a polished 30-second vertical clip.",
        visual: { type: "video-thumbnail-vertical" },
      },
      {
        party: "CSM",
        title: "Receives Final Clip",
        description: "Customer Success Manager receives the finished clip for review and distribution.",
        visual: { type: "clip-transfer-animation" },
      },
      {
        party: "CSM",
        title: "Sends to Student & Publishes",
        description: "CSM sends clip to the student and publishes it on social media channels.",
        visual: { type: "social-publish-screen" },
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
