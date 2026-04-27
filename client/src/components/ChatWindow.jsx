import MessageInput from './MessageInput';
import '../styles/ChatWindow.css';

export default function ChatWindow({ chat, onSend }) {
  return (
    <div className="chat-window">
      <div className="message-list">
        {chat.messages.map((msg, i) => (
          <div key={i} className={`message message--${msg.role}`}>
            <div className="message-bubble">{msg.content}</div>
          </div>
        ))}
      </div>
      <MessageInput onSend={onSend} />
    </div>
  );
}
