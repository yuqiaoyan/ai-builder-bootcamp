# Product Spec: ChatGPT Clone

## Overview

A simple ChatGPT clone web application that allows users to have AI-powered conversations using the OpenAI API. The app closely mirrors the ChatGPT UI and is designed to be extended with new features over time (e.g., voice input, authentication).

## Target User

Single user (no authentication for MVP). Authentication will be added in a future phase.

## Core Requirements

### 1. Responsive Layout
- Desktop: sidebar visible on the left, chat area on the right
- Mobile: sidebar collapses; accessible via a toggle/hamburger button
- Clean, minimal design matching the ChatGPT aesthetic

### 2. Default State (No Active Chat)
- Center of screen shows "What's on your mind today?" heading
- Input bar centered below the heading
- Sidebar visible (desktop) or collapsed (mobile)

### 3. Sidebar - Chat List
- "New chat" button at the top of the sidebar
- Flat list of recent chats (no folders, no projects)
- Each chat displays its title (auto-generated from the first user message)
- Most recent chats appear at the top
- Clicking a chat loads its conversation into the main area
- Ability to delete a chat from the list
- Sidebar can be collapsed/expanded

### 4. Chat Conversation
- User messages appear right-aligned in a styled bubble
- Assistant messages appear left-aligned, no bubble (clean text)
- Messages display in chronological order (oldest at top)
- Responses stream in token-by-token (real-time streaming)
- No markdown rendering required -- plain text display
- Auto-scroll to the latest message as tokens stream in

### 5. Message Input
- Fixed input bar at the bottom of the chat area
- Placeholder text: "Ask anything"
- Send button (appears when text is entered)
- Submit on Enter key; Shift+Enter for new line
- Input disabled while a response is streaming

### 6. OpenAI Integration
- Default model: `gpt-4o`
- API key stored server-side (never exposed to browser)
- Streaming responses via server-sent events

### 7. Data Persistence
- All chat history stored in browser localStorage
- Chats persist across page refreshes
- No server-side storage for MVP

## Out of Scope (MVP)
- User authentication / multi-user support
- Projects or folders for organizing chats
- Markdown rendering in responses
- Search chats functionality
- Voice input
- File attachments
- Message editing or regeneration
- Copy/share/export features

## Future Considerations
- Authentication (next planned feature)
- Voice input
- Markdown rendering
- Chat search
- Database-backed persistence
