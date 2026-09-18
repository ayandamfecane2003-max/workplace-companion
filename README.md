# Workplace Companion

Build a modern, responsive AI Workplace Productivity Assistant — a frontend-only SaaS web application for professionals. No backend, database, authentication, API integrations, or data storage. All AI outputs should be simulated/mock interactions on the frontend.

Design

Clean, modern, professional SaaS dashboard

Primary colours: burgundy red and black, with white/light neutral backgrounds for readability

Responsive on desktop, tablet, and mobile

Left sidebar navigation with icons

Modern cards, buttons, forms, tabs, and editable text areas

Professional typography and subtle hover/focus states

Main Features

1. Smart Email Generator

Input: recipient/context, subject, key points

Tone selector: Formal, Friendly, Persuasive

Generate a professional email

Display output in an editable text area

Actions: Copy, Edit, Clear

2. AI Task Planner

Input tasks, deadlines, priorities, and available working hours

Options: Daily Plan / Weekly Plan

Generate a structured schedule

Prioritise tasks using High, Medium, and Low priority

Display the plan in editable cards or a timeline

Actions: Edit, Copy, Clear

3. AI Research Assistant

Input a research topic, pasted article/text, or URL

Generate:

Summary

Key insights

Recommendations

Use a clean tabbed or card-based results layout

Make all generated content editable

Include Copy and Clear actions

For URL input, provide a clear frontend-only experience; do not create a backend scraper or external API.

Dashboard

Create a simple home dashboard showing:

Welcome message

Three feature cards: Email Generator, Task Planner, Research Assistant

Quick-action buttons

Recent activity should be temporary frontend/mock data only, not persisted

Responsible AI

Include a visible disclaimer:
“AI-generated content may contain errors or omissions. Review and verify important information before using it. Do not enter confidential or sensitive workplace information.”

Important Constraints

Frontend-only application

Do not store user data

No database or backend

No authentication/login system

No external API requirements

Use realistic mock AI responses to demonstrate the experience

Keep the interface polished, functional, and easy to navigate

Prioritise the core three features over additional functionality

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/23cbdc3e-10a7-46f1-91bb-991edec2d702).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
