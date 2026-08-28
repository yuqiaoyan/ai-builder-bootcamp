# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A ChatGPT UI clone built as an extensible base ("Base1"). Full spec in `Project Memory/product-spec.md`. Technical details in `Project Memory/tech-spec.md`. Build progress in `Project Memory/progress.md`. Visual design in `Project Memory/design.md`.

**Before making UI or styling changes, read `Project Memory/design.md`.** It defines the design principles and the token set — new styling should reuse existing tokens rather than introducing new colors, radii, or spacing values.

## Development Guidelines

- Limit comments inside the code
- Test all changes before marking complete
- Prefer to run single tests and not the whole suite for performance reasons
- Keep animations simple and working
- Focus on code clarity and extensibility
- Maintain clean separation between frontend (`client/`) and backend (`server/`)
- Follow React hooks patterns with functional components
- Keep component responsibilities single and focused

## Development Workflow

**Server Management:**
- Frontend (Vite, port 5173): HMR applies edits automatically — no action needed.
- Backend (port 3001): does not reload on its own. If nothing is running, start it. If it's already running and you just edited backend code, kill it and start a new one — don't leave the stale process running and launch a second one alongside it.
- Both commands run from the project root (`chat-demo-04-Phase4-OPUS/`):
  - Frontend: `npm run dev:client`
  - Backend: `npm run dev:server`

**Testing Approach:**
- After completing code changes, notify user that work is complete
- User will manually test by refreshing browser (Vite HMR handles updates)
- Write unit tests for utility functions (parsers, helpers, data transformations)
- Run single focused tests, not entire test suite

## Important Notes

**Credentials & API Keys:**
Any time there are credentials, API keys, etc make sure to store them in a `.env` file. Never commit `.env` files. Always provide `.env.example` templates.

**Windows Compatibility:**
Make sure all commands work within Windows terminal; this is being developed locally on Windows.

**gitignore Compliance:**
ALWAYS check .gitignore before staging files with git add. NEVER commit files that are listed in .gitignore.

## Project Memory Folder

The Project Memory folder is key to understanding the project and allows you to continue effectively.

**Base Project Files:**
- `product-spec.md` - Core requirements and goals for the foundational ChatGPT clone
- `tech-spec.md` - Key technical design decisions and system patterns to stay consistent
- `design.md` - Design principles, color/type/spacing tokens, and component anatomy derived from the reference screenshots
- `progress.md` - Current work focus, recent changes, what's left to build, current status and known issues

**Project Memory Updates occur when:**
- Discovering new project patterns
- After implementing significant changes
- When user requests with "update proj memory" (MUST review all files)
- After completing major phases of work
- When technical decisions are made

**Note:** When triggered by "update proj memory", review every memory bank file, even if some don't require updates. The project memory must be maintained with precision and clarity as effectiveness in building the project depends on it.

