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

These live in `client/src/styles/index.css` and are the only place color values should be defined. Every component file should reference these by name, not repeat the hex.

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

**Values outside the token set.** Three colors are currently written as literals in component CSS rather than tokens. Noted here so they're not mistaken for one-offs — they should probably be tokenized when the styling gets a cleanup pass:

| Value | File | Used for |
|---|---|---|
| `#fff` | `MessageInput.css` | send button icon color |
| `rgba(0, 0, 0, 0.4)` | `Layout.css` | mobile sidebar overlay scrim |
| `rgba(0, 0, 0, 0.12)` | `Sidebar.css` | mobile sidebar drop shadow |

## Observed Values

*What the app currently uses — recorded as-is, not as a prescribed target. Where a set of values isn't a clean ramp, that's noted rather than smoothed over; tightening it is a separate exercise.*

**Type scale.** In use today: `12px, 14px, 15px, 16px, 28px`. Not an evenly-spaced ramp — `15px` is the workhorse (message text, input text), `28px` is the one heading (default-screen title), and `12/14/16px` cover secondary labels, buttons, and icons.

**Spacing.** In use today: `4px, 8px, 10px, 12px, 16px, 24px`. Close to a 4px base unit; `10px` is the one value that doesn't divide evenly into it (used in the message input box padding).

**Radii.** In use today: `4px, 6px, 8px, 16px, 18px`. Five values with no stated system — smaller controls (delete button, icon buttons) use `4–8px`; the message input box uses `16px`; the user bubble uses `18px`. Whether that split is intentional or accidental is worth a second look before extending it to new components.

**Layout constants.**
- Sidebar width: `260px` (tokenized as `--sidebar-width`)
- Content column max-width: `720px` — currently repeated as a literal in three files (`ChatView.css`, `MessageInput.css`, `DefaultScreen.css`) rather than defined once
- Mobile breakpoint: `768px`

## Component Anatomy

Facts about how each piece renders today, tied to the screenshot each is drawn from.

**Sidebar** (`ChatGPTUI.png`). Fixed `260px` on desktop; becomes a full-height fixed overlay below `768px`, sliding in via `transform: translateX()`. Contains a logo, a collapse toggle, a "New chat" button, and a scrollable, section-labeled list of past chats. The active chat gets a distinct background (`--bg-sidebar-active`); hovering any row gets a lighter one (`--bg-sidebar-hover`).

**Default screen** (`ChatGPTDefaultUI.png`). Centered vertically and horizontally. A `28px` heading sits above the input bar, which is capped at `720px` wide. No sidebar content is implied by this state — it's shown with the sidebar open in the reference, but the empty state itself doesn't depend on sidebar state.

**Message list** (`ChatGPTUI.png`, `ChatGPTUI2.png`). Vertically stacked, oldest message at top, `16px` gap between rows.

**User message vs. assistant message.** This is the one deliberate asymmetry in the whole layout: the user's message is right-aligned inside a rounded bubble (`--user-bubble-bg`, `18px` radius, capped at 70% width); the assistant's response is left-aligned plain text with no container at all — same max-width, same font size, no background, no border. The user's input gets contained; the model's response reads as continuous prose. This isn't an inconsistency to fix — it's the app telling you which voice is "yours" and which is the document you're reading.

**Message input** (all three screenshots). A pill-shaped box (`16px` radius) with an auto-growing textarea and a circular send button. The send button is the one place pure black (`--text-primary` as background) appears outside of text — it's the app's single accent moment, consistent with the "color means action" principle above.
