# Progress Tracker: ChatGPT Clone

## Phase 1: Project Setup & Static Layout
**Status**: Complete

### Tasks
- [x] Initialize project structure (monorepo with client/ and server/ folders)
- [x] Set up Vite + React in client/
- [x] Set up Node + Express in server/
- [x] Create `.env` file with `OPENAI_API_KEY`
- [x] Build the static layout shell (sidebar + main chat area)
- [x] Implement responsive CSS (sidebar collapse on mobile)

### Manual Verification
- [x] `npm run dev` starts both the frontend and backend without errors
- [x] Visiting `http://localhost:5173` shows the two-panel layout
- [x] Resizing the browser below 768px collapses the sidebar
- [x] Sidebar toggle button shows/hides the sidebar on mobile
- [x] No console errors in the browser

---

## Phase 2: Default Screen & Chat Creation
**Status**: Not Started

### Tasks
- [ ] Build the DefaultScreen component ("What's on your mind today?")
- [ ] Build the MessageInput component (fixed bottom bar)
- [ ] Implement "New chat" button in sidebar
- [ ] Implement chat creation flow (typing a message creates a new chat)
- [ ] Store new chats in localStorage
- [ ] Display chat list in sidebar (title from first message)

### Manual Verification
- [ ] App loads with the default "What's on your mind today?" screen
- [ ] Typing a message and pressing Enter creates a new chat
- [ ] New chat appears in the sidebar with a title based on the first message
- [ ] Clicking "New chat" clears the main area and shows the default screen
- [ ] Refreshing the page preserves chats in the sidebar (localStorage)
- [ ] Chat list is ordered by most recent at top

---

## Phase 3: Chat Conversation & Message Display
**Status**: Not Started

### Tasks
- [ ] Build MessageList and MessageBubble components
- [ ] Display user messages right-aligned in bubbles
- [ ] Display assistant messages left-aligned without bubbles
- [ ] Clicking a chat in the sidebar loads its messages
- [ ] Auto-scroll to newest message
- [ ] Implement chat deletion from sidebar

### Manual Verification
- [ ] Selecting a chat from the sidebar displays its full message history
- [ ] User messages appear on the right with a styled bubble
- [ ] Assistant messages appear on the left, clean text (no bubble)
- [ ] Scrolling works properly for long conversations
- [ ] Deleting a chat removes it from sidebar and localStorage
- [ ] If the active chat is deleted, the default screen is shown

---

## Phase 4: OpenAI Integration & Streaming
**Status**: Not Started

### Tasks
- [ ] Create `/api/chat` endpoint in Express
- [ ] Integrate OpenAI Node SDK with streaming
- [ ] Implement SSE streaming from server to client
- [ ] Build `useStreamResponse` hook to consume the stream
- [ ] Append tokens to the assistant message in real-time
- [ ] Save completed responses to localStorage
- [ ] Disable input while response is streaming

### Automated Tests
- [ ] POST `/api/chat` returns a valid SSE stream with tokens and a `[DONE]` event
- [ ] API key is not present in any response headers or client-side bundle

### Manual Verification
- [ ] Tokens appear one-by-one in the chat window
- [ ] The full response is saved to localStorage after streaming completes
- [ ] Input bar is disabled during streaming
- [ ] Switching chats mid-stream does not corrupt data
- [ ] API errors display a user-friendly message in the chat

---

## Phase 5: Polish & Deploy to Render
**Status**: Not Started

### Tasks
- [ ] Final responsive design pass (test on mobile viewport)
- [ ] Match ChatGPT styling: colors, fonts, spacing, shadows
- [ ] Configure Express to serve Vite build output
- [ ] Create Render web service
- [ ] Set environment variables on Render
- [ ] Test production build locally before deploying
- [ ] Deploy and verify on Render

### Automated Tests
- [ ] `npm run build` completes without errors
- [ ] `client/dist/` directory is generated with index.html and assets

### Manual Verification
- [ ] `node server/index.js` serves the app on the configured port
- [ ] All features work in the production build (create, chat, stream, delete)
- [ ] App is accessible at the Render URL
- [ ] Responsive layout works on a real mobile device
- [ ] No API key leaks in client-side code or network tab
- [ ] Streaming works in production (SSE over HTTPS)

---

## Future Phases (Planned)

### Phase 6: Authentication
- Add user login/signup
- Move chat storage from localStorage to a database
- Per-user chat isolation

### Phase 7: Voice Input
- Add microphone button to input bar
- Speech-to-text integration
- Send transcribed text as a message

### Phase 8: Enhanced Features
- Markdown rendering in responses
- Chat search
- Message copy button
- Regenerate response
