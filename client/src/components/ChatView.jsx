import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../styles/ChatView.css';

export default function ChatView({ chat, onSend, disabled }) {
  return (
    <div className="chat-view">
      <MessageList messages={chat.messages} />
      <MessageInput onSend={onSend} disabled={disabled} />
    </div>
  );
}
