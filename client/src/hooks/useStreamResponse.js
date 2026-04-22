import { useState, useRef } from 'react';

export function useStreamResponse() {
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef(null);

  async function streamResponse(messages, onToken, onDone, onError) {
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
        signal: controller.signal,
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') {
            onDone();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) { onError(parsed.error); return; }
            if (parsed.token) onToken(parsed.token);
          } catch {
            // ignore malformed lines
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') onError(err.message);
    } finally {
      setStreaming(false);
    }
  }

  function abort() {
    abortRef.current?.abort();
  }

  return { streaming, streamResponse, abort };
}
