/**
 * Centralized party design tokens – no hardcoded colors in components.
 */

export type PartyKey =
  | "STUDENT"
  | "COACH"
  | "HEAD_COACH"
  | "ADMIN"
  | "CSM"
  | "EDITOR"
  | "APP";

export const partyConfig: Record<
  PartyKey,
  { color: string; bg: string; gradient: string; icon: string }
> = {
  STUDENT: {
    color: "#0F5132",
    bg: "#E9F7EF",
    gradient: "from-[#E9F7EF] to-[#F8FFFB]",
    icon: "🎾",
  },
  COACH: {
    color: "#1F3A8A",
    bg: "#EEF2FF",
    gradient: "from-[#EEF2FF] to-[#F8FAFF]",
    icon: "🏅",
  },
  HEAD_COACH: {
    color: "#1E1E1E",
    bg: "#F7F6F2",
    gradient: "from-[#F7F6F2] to-[#FDFCF9]",
    icon: "👨‍💼",
  },
  ADMIN: {
    color: "#374151",
    bg: "#F3F4F6",
    gradient: "from-[#F3F4F6] to-[#F9FAFB]",
    icon: "⚙️",
  },
  CSM: {
    color: "#4F46E5",
    bg: "#EEF2FF",
    gradient: "from-[#EEF2FF] to-[#F8FAFF]",
    icon: "💬",
  },
  EDITOR: {
    color: "#475569",
    bg: "#F1F5F9",
    gradient: "from-[#F1F5F9] to-[#F8FAFC]",
    icon: "📝",
  },
  APP: {
    color: "#0D9488",
    bg: "#ECFEFF",
    gradient: "from-[#ECFEFF] to-[#F0FDFA]",
    icon: "📱",
  },
};

/** Map display party names (from flow data) to PartyKey */
export const partyNameToKey: Record<string, PartyKey> = {
  Student: "STUDENT",
  student: "STUDENT",
  Coach: "COACH",
  coach: "COACH",
  "Head Coach": "HEAD_COACH",
  "head-coach": "HEAD_COACH",
  Admin: "ADMIN",
  admin: "ADMIN",
  "Customer Success Manager": "CSM",
  CSM: "CSM",
  "customer-success": "CSM",
  "Content Manager": "EDITOR",
  Editor: "EDITOR",
  editor: "EDITOR",
  "content-manager": "EDITOR",
  App: "APP",
  app: "APP",
};

export function getPartyKey(partyName: string): PartyKey {
  return partyNameToKey[partyName] ?? "EDITOR";
}

export function getPartyConfig(partyName: string) {
  return partyConfig[getPartyKey(partyName)];
}
