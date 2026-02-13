/**
 * Flow data – single source of truth. Add new flows here; pages render from this config.
 */

export type VisualType = "app-screen" | "zalo-chat" | "zalo-chat-continued" | "camera-upload" | "payment-editor" | "editor-upload" | "dashboard-view" | "video-thumbnail" | "ai-voice-animation" | "video-thumbnail-vertical" | "clip-transfer-animation" | "social-publish-screen" | "curriculum-planning-board" | "shot-categories-animation" | "shot-breakdown-document" | "drill-progression" | "assessment-checklist" | "master-document" | "approval-stamp" | "course-structure-board" | "lesson-script-document" | "production-calendar" | "video-recording-court" | "video-editing-timeline" | "video-review-dashboard" | "app-course-library" | "coaching-transcript";

export type RoleCategory = "student" | "coach" | "head-coach" | "admin" | "customer-success" | "editor";

export interface FlowStepVisual {
  type: VisualType;
  src?: string;
}

export interface FlowStep {
  role: string;
  title: string;
  description?: string;
  visual?: FlowStepVisual;
  stepIcon?: string;
}

export interface FlowConfig {
  title: string;
  subtitle: string;
  steps: FlowStep[];
  // Metadata for vanilla JS app compatibility
  roles?: RoleCategory[];
  filter?: "coaching" | "content";
  image?: string;
  features?: string[];
  badge?: string;
  viewMode?: "Step-by-Step" | "Complete";
}

// Category labels for display
export const categoryLabels: Record<RoleCategory, string> = {
  'student': 'Student',
  'coach': 'Coach',
  'head-coach': 'Head Coach',
  'admin': 'Admin',
  'customer-success': 'Customer Success Manager',
  'editor': 'Editor'
};

// Role icons mapping - maps role names/abbreviations to their icons
export const roleIcons: Record<string, string> = {
  'Student': '🎾',
  'student': '🎾',
  'Coach': '👨‍🏫',
  'coach': '👨‍🏫',
  'Head Coach': '🧠',
  'head-coach': '🧠',
  'Admin': '⚙️',
  'admin': '⚙️',
  'Customer Success Manager': '💬',
  'customer-success': '💬',
  'CSM': '💬',
  'Editor': '✂️',
  'editor': '✂️'
};

// Role slug for design system styling
export const roleSlugs: Record<string, string> = {
  'Student': 'student',
  'student': 'student',
  'Coach': 'coach',
  'coach': 'coach',
  'Head Coach': 'head-coach',
  'head-coach': 'head-coach',
  'Admin': 'admin',
  'admin': 'admin',
  'Customer Success Manager': 'csm',
  'customer-success': 'csm',
  'CSM': 'csm',
  'Editor': 'editor',
  'editor': 'editor',
  'App': 'app',
  'app': 'app'
};

export function getRoleIcon(roleName: string): string {
  return roleIcons[roleName] || '👤';
}

export function getRoleSlug(roleName: string): string {
  return roleSlugs[roleName] || 'editor';
}

export const flows: Record<string, FlowConfig> = {
  "first-contact-academy": {
    title: "First contact with Academy",
    subtitle: "Student Requests a Coaching through Academy",
    roles: ['student', 'customer-success', 'coach', 'editor'],
    filter: 'coaching',
    image: '🎓',
    features: [
      'CSM consults and schedules first session',
      'Finds time slot, free coach and court',
      'Coach records the session',
      'CSM checks payment and sends recordings to Editor',
      'Editor uploads recordings to App'
    ],
    steps: [
      {
        role: "Student",
        title: "Requests a Coaching through Academy",
        description: undefined,
        visual: { type: "zalo-chat" },
      },
      {
        role: "CSM",
        title: "Consults",
        description: undefined,
        visual: { type: "zalo-chat-continued" },
      },
      {
        role: "CSM",
        title: "Schedules first session with coach",
        description: "Finds a time slot, free coach and court",
        visual: { type: "app-screen", src: "app screenshots/session booked.png" },
      },
      {
        role: "Coach",
        title: "First Session takes place",
        description:
          "Goes through all the shots the first time to rate the skill of every shot to create a roadmap",
        visual: { type: "app-screen", src: "app screenshots/dupr coach.png" },
      },
      {
        role: "Coach",
        title: "Records the session and sends the recording to CSM",
        description: undefined,
        visual: { type: "camera-upload" },
      },
      {
        role: "CSM",
        title: "Checks if student has paid and sends the Recordings to Editor",
        description: undefined,
        visual: { type: "payment-editor" },
      },
      {
        role: "Editor",
        title: "Uploads Recordings to App",
        description: undefined,
        visual: { type: "editor-upload" },
      },
    ],
  },
  "creating-session-success-clips": {
    title: "Creating Session Success Clips",
    subtitle: "Daily before-and-after transformation clips for students and social media",
    roles: ['editor', 'customer-success'],
    filter: 'content',
    image: '🎬',
    features: [
      'Daily content generation process',
      'Before-and-after transformation clips',
      'AI voiceover integration',
      'Social media distribution',
      'Student engagement through progress clips'
    ],
    steps: [
      {
        role: "Editor",
        title: "Reviews All Completed Sessions",
        description: "Editor reviews recordings from all sessions completed the previous day to identify potential transformation moments.",
        visual: { type: "dashboard-view" },
        stepIcon: '✂️'
      },
      {
        role: "Editor",
        title: "Selects Before & After Clip",
        description: "Editor selects one clip from the beginning of the session and one improved execution after coaching.",
        visual: { type: "video-thumbnail" },
        stepIcon: '✂️'
      },
      {
        role: "Editor",
        title: "Transcribes Coaching Moment",
        description: "Editor extracts and transcribes the specific coaching instruction related to the technical correction.",
        visual: { type: "coaching-transcript" },
        stepIcon: '✂️'
      },
      {
        role: "Editor",
        title: "Generates AI Voice Explanation",
        description: "Editor creates an AI voiceover explaining the technical issue and how it was corrected.",
        visual: { type: "ai-voice-animation" },
        stepIcon: '✂️'
      },
      {
        role: "Editor",
        title: "Produces 30-Second Transformation Clip",
        description: "Editor combines before, after, transcript insight, and AI voice into a polished 30-second vertical clip.",
        visual: { type: "video-thumbnail-vertical" },
        stepIcon: '✂️'
      },
      {
        role: "CSM",
        title: "Receives Final Clip",
        description: "Customer Success Manager receives the finished clip for review and distribution.",
        visual: { type: "clip-transfer-animation" },
        stepIcon: '💬'
      },
      {
        role: "CSM",
        title: "Sends to Student & Publishes",
        description: "CSM sends clip to the student and publishes it on social media channels.",
        visual: { type: "social-publish-screen" },
        stepIcon: '💬'
      },
    ],
  },
  "head-coach-creates-coaching-program": {
    title: "Head Coach Creates Complete Coaching Program",
    subtitle: "Designing a structured curriculum for every level, shot, and development stage",
    roles: ['head-coach'],
    filter: 'coaching',
    image: '🧠',
    badge: 'Internal System Flow',
    viewMode: 'Step-by-Step',
    features: [
      'Systematic curriculum design',
      'Standardized coaching framework',
      'Progressive skill development',
      'Consistent evaluation criteria',
      'Scalable training system'
    ],
    steps: [
      {
        role: "Head Coach",
        title: "Defines Player Level Framework",
        description: "Head Coach defines all academy levels (Beginner → Advanced → Competitive) with clear performance criteria and progression standards.",
        visual: { type: "curriculum-planning-board" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Breaks Down All Core Shots",
        description: "Head Coach lists and categorizes every fundamental and advanced shot required across all levels.",
        visual: { type: "shot-categories-animation" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Defines Technical Standards Per Shot",
        description: "For each shot, the Head Coach defines technical checkpoints, common mistakes, and measurable improvement indicators.",
        visual: { type: "shot-breakdown-document" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Designs Progressive Training Drills",
        description: "Head Coach creates structured drills for each level and shot, progressing from isolated technique to game-realistic scenarios.",
        visual: { type: "drill-progression" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Creates Evaluation & Level-Up Criteria",
        description: "Head Coach defines standardized evaluation tests and level-up requirements for consistent player assessment.",
        visual: { type: "assessment-checklist" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Compiles Master Coaching Document",
        description: "All levels, shots, drills, and evaluation systems are consolidated into a structured master curriculum document.",
        visual: { type: "master-document" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Program Approved & Locked",
        description: "The complete coaching program is finalized and becomes the official academy training framework.",
        visual: { type: "approval-stamp" },
        stepIcon: '🧠'
      },
    ],
  },
  "head-coach-creates-video-course": {
    title: "Creating Complete Video Course",
    subtitle: "Transforming the coaching program into structured in-app video lessons",
    roles: ['head-coach', 'editor'],
    filter: 'content',
    image: '📚',
    badge: 'Internal System Flow',
    viewMode: 'Step-by-Step',
    features: [
      'Curriculum-based video structure',
      'Level-based lesson organization',
      'Scripted and standardized teaching',
      'Professional editing and overlays',
      'Structured in-app learning library'
    ],
    steps: [
      {
        role: "Head Coach",
        title: "Defines Course Structure Based on Coaching Program",
        description: "Head Coach translates the full curriculum into structured video modules organized by level, shot, and skill progression.",
        visual: { type: "course-structure-board" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Writes Lesson Scripts & Teaching Points",
        description: "For each shot and drill, the Head Coach defines clear teaching points, cues, demonstrations, and common mistakes to cover on camera.",
        visual: { type: "lesson-script-document" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Plans Production Schedule",
        description: "Head Coach schedules filming sessions, books courts, prepares equipment, and coordinates with filming team.",
        visual: { type: "production-calendar" },
        stepIcon: '🧠'
      },
      {
        role: "Head Coach",
        title: "Records Video Lessons",
        description: "Head Coach demonstrates techniques on court and ensures technical accuracy and structure alignment.",
        visual: { type: "video-recording-court" },
        stepIcon: '🧠'
      },
      {
        role: "Editor",
        title: "Edits & Structures Lessons",
        description: "Editor trims footage, adds overlays, subtitles, shot labels, slow motion breakdowns, and academy branding.",
        visual: { type: "video-editing-timeline" },
        stepIcon: '✂️'
      },
      {
        role: "Head Coach",
        title: "Reviews & Approves Final Lessons",
        description: "Head Coach verifies technical correctness, clarity of instruction, and alignment with the official coaching program.",
        visual: { type: "video-review-dashboard" },
        stepIcon: '🧠'
      },
      {
        role: "Editor",
        title: "Uploads Course to App",
        description: "Finalized videos are uploaded and categorized by level, shot, and topic inside the academy app.",
        visual: { type: "app-course-library" },
        stepIcon: '✂️'
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

/** All roles in the system (display names) */
export const ALL_ROLES = [
  "Student",
  "Coach",
  "Head Coach",
  "Admin",
  "Customer Success Manager",
  "Editor",
] as const;

/** Maps shorthand role names in flow steps to role display names */
const ROLE_TO_DISPLAY: Record<string, string> = {
  Student: "Student",
  Coach: "Coach",
  "Head Coach": "Head Coach",
  Admin: "Admin",
  CSM: "Customer Success Manager",
  "Customer Success Manager": "Customer Success Manager",
  Editor: "Editor",
};

export function getFlowSlugsByRole(role: string): string[] {
  const slugs = getAllFlowSlugs();
  return slugs.filter((slug) => {
    const config = flows[slug];
    const roleLower = role.toLowerCase();
    return config.steps.some((step) => {
      const stepRole = ROLE_TO_DISPLAY[step.role] ?? step.role;
      return stepRole.toLowerCase() === roleLower;
    });
  });
}
