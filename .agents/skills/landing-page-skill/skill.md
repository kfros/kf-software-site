---
name: static-landing-architect
description: Enforces constraints for KF Software static web development using Next.js and Tailwind CSS.
version: 1.0.0
triggers:
  - "modify landing page"
  - "update kf-software"
  - "change chillpup website"
  - "build static site"
  - "fix tailwind"
  - "contact form integration"
---

# Agent Skills & Constraints: KF Software Web Infrastructure

This document defines the specialized operational boundaries, architectural constraints, and code maintenance patterns for the `kf-software-landing` repository. All editing agents (including OpenAI Codex, Google Antigravity, and Claude Code) must strictly adhere to these rules.

## Core Philosophy: Architect-Controller
The human user acts as the Lead Architect and Controller. The AI agent acts as the Execution Unit.
* **Do not** alter core architectural layouts, project structures, or bundler outputs without explicit instructions.
* **Do not** introduce heavy dynamic client-side libraries unless specified.
* Keep implementations atomic, clean, and highly readable.

## Technical Constraints & Environment

### 1. Strict Static Generation (SSG)
* **Rule:** The project must always compile to 100% static assets via `next export` / `output: 'export'`.
* **Prohibited:** Any usage of `getServerSideProps`, Dynamic Server Runtime, or Node.js server-side features in `src/app/` routes.
* **Data Fetching:** All data configuration must be statically injected at build time.

### 2. Form Handling (Zero Serverless Runtime)
* Form submissions must never hit a custom Node.js server or Vercel serverless function.
* Use client-side `fetch` directly targeting the Web3Forms external API gateway.
* Ensure proper UI state transformations (`idle` -> `submitting` -> `success`) within the client component using React Reactivity (`useState`), avoiding page reloads.

### 3. Tailwind CSS & UI Design System
* Match the visual hierarchy of the provided UI spec: rounded corners (`rounded-xl` to `rounded-3xl`), soft shadows (`shadow-sm`, `shadow-md`), dark slate background elements for footer (`bg-brand-dark`).
* **Zero Dark Patterns Policy:** Interfaces must remain highly legible, accessible, with explicit text labels and clear transaction scopes. No manipulative UI tricks.

## Maintenance and Code Editing Skills

### `modify_page_content`
* When updating copy for `ChillPup` or `KF Software`, ensure values are synchronized across both the metadata engine (`layout.tsx`) and the landing UI components (`page.tsx`).
* Maintain strict typing for content schemas using TypeScript interfaces.

### `add_interactive_element`
* If asked to add animations, use Tailwind native transitions or standard CSS keyframes. 
* If a complex JS transition is requested, ensure components use `'use client'` strictly at the leaf nodes to maintain optimal static HTML generation for the rest of the layout.

### `verify_build_safety`
* Before finalizing any file modification, verify that the modification does not break the `next build` static export process. Look out for unoptimized `<Image>` tags—always use standard `<img>` or provide explicit width/height dimensions with `unoptimized: true` configured.