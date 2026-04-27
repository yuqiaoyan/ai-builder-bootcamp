import { useState, useRef, useEffect } from 'react';
import '../styles/MessageInput.css';

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  }

  return (
    <div className="input-bar">
      <div className="input-inner">
        <textarea
          ref={textareaRef}
          className="input-textarea"
          placeholder="Message ChatGPT"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="input-send-btn"
          onClick={submit}
          disabled={!value.trim()}
          title="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 4l8 8-8 8M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <p className="input-disclaimer">ChatGPT can make mistakes. Check important info.</p>
    </div>
  );
}
