# Design Spec: ChatGPT Clone

## Design Source

Everything in this document is drawn from three reference screenshots in `Screenshots/`:

- **`ChatGPTDefaultUI.png`** — the empty state. Centered heading ("What's on your mind today?") over a centered input bar. No sidebar visible in this crop.
- **`ChatGPTUI.png`** — a threaded conversation with the sidebar open, showing project folders, section labels ("Recent," "Your chats"), and the active-chat highlight.
- **`ChatGPTUI2.png`** — a conversation mid-response, showing the user bubble, plain assistant text, and the row of message action icons (copy, thumbs up/down, etc.) beneath an assistant reply.

When building a new screen, check these first. If a screenshot doesn't answer the question, fall back to the Design Principles below.

## Design Principles

*In the voice of the product's design team — what we believe, and what we give up in exchange.*

**The interface should disappear.**
People come here to think, not to admire our UI. Every element we add competes with the user's own words for attention. When in doubt, remove it. We accept looking plainer than our competitors — that's the trade.

**Color is a promise that something will happen.**
We stay greyscale so that when color appears, it means *act here*. One primary action per screen. The moment we spend color on decoration, we've spent the only signal we have.

**Let the writing be the design.**
Hierarchy comes from type and space, not from boxes, borders, and cards. A conversation is a document, and documents don't need chrome to be readable.

**Reuse before you invent.**
A new grey, a new radius, a new gap — each one is a small permanent tax on everyone who comes after you. If an existing token is close enough, it *is* the right value.

## Tokens (as built)

These live in `client/src/styles/index.css` and are the only place color values should be defined. Every component file should reference these by name, not repeat the hex. `--input-bg`, `--input-border`, and `--user-bubble-bg` are declared ahead of the Phase 2 components that will use them.

```css
:root {
  --sidebar-width: 260px;
  --bg-main: #ffffff;
  --bg-sidebar: #f9f9f9;
  --bg-sidebar-hover: #ececec;
  --bg-sidebar-active: #e5e5e5;
  --border-color: #e5e5e5;
  --text-primary: #0d0d0d;
  --text-secondary: #6b6b6b;
  --text-sidebar: #0d0d0d;
  --input-bg: #f4f4f4;
  --input-border: #e5e5e5;
  --user-bubble-bg: #f4f4f4;
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
}
```

**Values outside the token set.** Two colors are currently written as literals in component CSS rather than tokens. Noted here so they're not mistaken for one-offs — they should probably be tokenized when the styling gets a cleanup pass:

| Value | File | Used for |
|---|---|---|
| `rgba(0, 0, 0, 0.4)` | `Layout.css` | mobile sidebar overlay scrim |
| `rgba(0, 0, 0, 0.12)` | `Sidebar.css` | mobile sidebar drop shadow |

## Observed Values

*What the app currently uses — recorded as-is, not as a prescribed target. Where a set of values isn't a clean ramp, that's noted rather than smoothed over; tightening it is a separate exercise.*

**Type scale.** In use today: `12px, 14px, 18px, 20px, 28px`. Not an evenly-spaced ramp — `28px` is the one heading (default-screen title), and `12/14/18/20px` cover secondary labels, buttons, and icons. Values for message text and the input bar will be set when those components are built in Phase 2.

**Spacing.** In use today: `4px, 8px, 10px, 12px, 24px`. Close to a 4px base unit; `10px` is the one value that doesn't divide evenly into it (used in the mobile header padding).

**Radii.** In use today: `6px, 8px`. Both on small controls (sidebar toggle, new-chat button). The message input box and user bubble radii will be set when those components are built in Phase 2.

**Layout constants.**
- Sidebar width: `260px` (tokenized as `--sidebar-width`)
- Content column max-width: `680px`, set in `DefaultScreen.css`
- Mobile breakpoint: `768px`

## Component Anatomy

Facts about how each piece renders today, tied to the screenshot each is drawn from.

**Sidebar** (`ChatGPTUI.png`). Fixed `260px` on desktop; becomes a full-height fixed overlay below `768px`, sliding in via `transform: translateX()`. Contains a logo, a collapse toggle, and a "New chat" button. The chat list itself (active-state highlighting, hover state, section labels beyond the static "Recent" heading) is scaffolded but populated in Phase 2 — the static shell is built now, the data isn't wired up yet.

**Default screen** (`ChatGPTDefaultUI.png`). Centered vertically and horizontally. A `28px` heading sits above where the input bar will go, capped at `680px` wide. No sidebar content is implied by this state — it's shown with the sidebar open in the reference, but the empty state itself doesn't depend on sidebar state. The input bar itself — auto-growing textarea, send button — is a Phase 2 component; only the heading and layout shell exist so far.
