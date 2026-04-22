# Chat Agent — Phase 1

A ChatGPT UI clone built with React + Vite (frontend) and Node + Express (backend).

Phase 1 covers the static layout: two-panel shell with a collapsible sidebar, responsive on mobile.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An OpenAI API key — get one at [platform.openai.com](https://platform.openai.com)

---

## Setup

**1. Install root dependencies**

```bash
npm install
```

**2. Install frontend dependencies**

```bash
cd client && npm install && cd ..
```

**3. Create your `.env` file**

```bash
cp .env.example .env
```

Then open `.env` and replace `your_openai_api_key_here` with your actual OpenAI API key:

```
OPENAI_API_KEY=sk-...
PORT=3001
```

---

## Run the app

You need **two terminals** open at the same time.

**Terminal 1 — Backend:**
```bash
npm run dev:server
```

You should see: `Server running on port 3001`

**Terminal 2 — Frontend:**
```bash
npm run dev:client
```

You should see a local URL — open it in your browser:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001](http://localhost:3001)

---

## Project structure

```
chat-agent/
  client/       # React + Vite frontend
  server/       # Node + Express backend
  .env.example  # Copy this to .env and add your API key
  package.json  # Root scripts (dev:server and dev:client)
```
