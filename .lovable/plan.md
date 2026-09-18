# AI Workplace Productivity Assistant

## Overview
Build a polished, frontend-only productivity workspace at `/` with realistic simulated AI interactions. No data will leave the browser or persist after refresh.

## Experience
- Responsive shell with a burgundy-and-black left navigation, compact mobile navigation, and a restrained light workspace.
- Dashboard welcome area with three feature cards, quick actions, temporary recent activity, and the responsible-AI notice.
- Smart Email Generator with recipient/context, subject, key points, tone selection, simulated generation, editable output, copy, edit, and clear actions.
- AI Task Planner with task details, deadlines, priorities, working hours, daily/weekly modes, simulated structured schedules, editable timeline cards, copy, and clear actions.
- AI Research Assistant with topic, pasted text, or URL input; a clear frontend-only URL notice; editable Summary, Key Insights, and Recommendations tabs; copy and clear actions.
- Useful empty, generating, completed, copied, and validation states throughout.

## Visual Direction
- Professional editorial SaaS aesthetic using burgundy as the action color, black for structure, and warm-white/light-neutral work surfaces.
- Strong typography, fine borders, restrained shadows, compact cards, crisp icon controls, and subtle transitions.
- A small custom monogram mark rather than generic AI sparkle imagery.

## Technical Details
- React state only; no storage, authentication, database, API calls, server functions, or external integrations.
- Simulated generation uses deterministic mock responses based on entered fields.
- Semantic design tokens in the global stylesheet; accessible focus states and reduced-motion support.
- Add reusable frontend controls where needed and app-specific metadata for the home route.
- Verify the active states and all three workflows at desktop and mobile widths.
