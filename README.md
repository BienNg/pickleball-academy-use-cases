# PB Academy – User Flows

Modern Next.js app for Pickleball Academy user flows and use cases.

## Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **TailwindCSS**
- **shadcn-style UI** (Button, Card, Tabs, Badge, Dialog in `src/components/ui/`)
- Data-driven flows from `src/lib/flows.ts`

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Home lists all flows; click a flow to open the step-by-step view.

## Adding a new flow

1. Edit **`src/lib/flows.ts`**:
   - Add a new entry to the `flows` object with a unique slug (e.g. `"onboarding"`).
   - Set `title`, `subtitle`, and `steps` (each step: `party`, `title`, optional `description`, optional `visual`).

2. The flow is automatically available at **`/flows/<slug>`** and on the home page. No new pages or routes to create.

## Project structure

```
src/
  app/
    layout.tsx
    page.tsx              # Home: list of flows
    flows/[slug]/page.tsx  # Dynamic flow page
  components/
    ui/                    # Button, Card, Tabs, Badge, Dialog
    flow/                  # FlowLayout, Timeline, TimelineStep, PartyBadge, VisualPanel
  lib/
    flows.ts               # Flow definitions (single source of truth)
    party-config.ts        # Party design tokens (colors, gradients, icons)
    utils.ts
  styles/
    globals.css
```

## Design system

Party styling is centralized in **`src/lib/party-config.ts`**. No hardcoded party colors in components. Supported parties: STUDENT, COACH, HEAD_COACH, ADMIN, CSM, EDITOR, APP.

## Deploy (Vercel)

- Connect the repo to Vercel; default Next.js settings work.
- Build command: `npm run build`
- Output: default (Next.js)

Legacy static files (`css/`, `js/`, `index.html`, `app screenshots/`) are in `.vercelignore` and are not deployed. App images are in `public/images/`.
