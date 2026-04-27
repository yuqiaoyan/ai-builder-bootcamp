# Tech Spec: ChatGPT Clone

## Architecture

```
Browser (React SPA)  <-->  Node/Express Backend  <-->  OpenAI API
```

- **Frontend**: React single-page application
- **Backend**: Node.js + Express API server
- **AI Provider**: OpenAI API (gpt-4o)
- **Data Storage**: Browser localStorage (MVP)
- **Hosting**: Render (single web service serving both frontend and API)

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React (Vite)            |
| Styling    | CSS (plain or CSS modules) |
| Backend    | Node.js + Express       |
| AI API     | OpenAI Node SDK         |
| Streaming  | Server-Sent Events (SSE)|
| Storage    | localStorage            |
| Hosting    | Render                  |

## Project Structure

```
/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatList.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── DefaultScreen.jsx
│   │   ├── hooks/
│   │   │   ├── useChats.js
│   │   │   └── useStreamResponse.js
│   │   ├── utils/
│   │   │   └── localStorage.js
│   │   ├── styles/
│   │   │   └── *.css
│   │   └── main.jsx
│   └── index.html
├── server/
│   ├── index.js             # Express server entry
│   └── routes/
│       └── chat.js          # /api/chat endpoint
├── .env                     # OPENAI_API_KEY (git-ignored)
├── package.json
└── README.md
```

## Key Technical Decisions

### 1. Monorepo with Single Render Service
- Vite builds the React app to `client/dist/`
- Express serves the static build AND the API routes
- Single Render web service, no separate frontend/backend deploys
- Build command: `npm run build` (installs deps + builds client)
- Start command: `node server/index.js`

### 2. Streaming Transport: fetch + `text/event-stream`

The browser does **not** use the native `EventSource` API (which only supports GET). Instead:

- Client calls `fetch("POST /api/chat", body)` and reads the response body as a `ReadableStream`
- Server responds with `Content-Type: text/event-stream` and streams newline-delimited SSE frames
- Client parses the stream manually using a `TextDecoder` + line-by-line reader in `useStreamResponse`

**SSE frame format** (one token per frame):
```
data: {"content":"token_text"}\n\n
```
Final frame when OpenAI stream ends:
```
data: [DONE]\n\n
```
Error frame if something goes wrong mid-stream:
```
data: {"error":"message"}\n\n
```

**Proxy buffering on Render**: Render's HTTP proxy can buffer SSE responses. To prevent this, the server must set:
```
X-Accel-Buffering: no
Cache-Control: no-cache
```

**Client abort behavior**: The client holds an `AbortController` ref. On unmount or chat switch, it calls `controller.abort()`, which cancels the `fetch` and triggers server-side cleanup (see stream lifecycle below).

**Reconnect policy**: No automatic reconnect. If the stream is interrupted, the partial assistant message stays in the UI with an error note. The user can send a new message manually.

### 3. Stream Lifecycle & Cancellation

Each streaming request is tracked by a `streamId` (a UUID generated client-side per send action).

**Client side (`useStreamResponse` hook)**:
- Stores the active `AbortController` and `streamId` in a ref
- On new message send: cancels any in-flight stream before starting the new one
- On chat switch: cancels the in-flight stream; the partial message is **discarded** (not saved to localStorage)
- On `[DONE]`: saves the completed assistant message to localStorage and clears the stream ref

**Server side (`/api/chat`)**:
- On `req.on('close')` (client disconnected or aborted): calls `openAIStream.controller.abort()` to stop the upstream OpenAI request immediately, preventing continued token billing

### 4. localStorage Data Model

```json
{
  "chats": [
    {
      "id": "uuid-string",
      "title": "First user message (truncated)",
      "messages": [
        { "role": "user", "content": "Hello" },
        { "role": "assistant", "content": "Hi there!" }
      ],
      "createdAt": "2026-04-16T00:00:00.000Z",
      "updatedAt": "2026-04-16T00:01:00.000Z"
    }
  ]
}
```

- Chats sorted by `updatedAt` descending
- Chat title auto-generated from first user message (first ~30 chars)
- Each chat stores its full message array

### 5. API Endpoint

**POST `/api/chat`**

Request body:
```json
{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi!" },
    { "role": "user", "content": "How are you?" }
  ]
}
```

The full message history is sent on every request. Context is unbounded for the demo — gpt-4o's 128k window is large enough that this won't be an issue in practice.

Response headers:
```
Content-Type: text/event-stream
Cache-Control: no-cache
X-Accel-Buffering: no
```

SSE stream of tokens per frame:
```
data: {"content": "token_text"}
```
Final frame:
```
data: [DONE]
```

### 6. Environment Variables

| Variable        | Description            | Required |
|-----------------|------------------------|----------|
| OPENAI_API_KEY  | OpenAI API key         | Yes      |
| PORT            | Server port (default 3001) | No   |

### 7. Render Deployment Config
- **Type**: Web Service
- **Build Command**: `npm install && cd client && npm install && npm run build`
- **Start Command**: `node server/index.js`
- **Environment Variables**: Set `OPENAI_API_KEY` in Render dashboard
- Express serves `client/dist/` as static files in production

## System Patterns

### State Management
- React `useState` and `useReducer` for local component state
- No global state library (unnecessary for MVP)
- Custom hooks (`useChats`, `useStreamResponse`) encapsulate logic

### Responsive Design
- CSS media queries for breakpoints
- Sidebar: 260px fixed width on desktop, full overlay on mobile
- Breakpoint: 768px

### Error Handling
- API errors displayed as a system message in the chat
- Network failures show a retry prompt
- OpenAI rate limits handled gracefully with user-facing message
