import { useEffect, useRef } from 'react';
import '../styles/MessageList.css';

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, i) => (
        <div key={i} className={`message-row ${msg.role}`}>
          {msg.role === 'user' ? (
            <div className="user-bubble">{msg.content}</div>
          ) : (
            <div className="assistant-message">{msg.content}</div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
