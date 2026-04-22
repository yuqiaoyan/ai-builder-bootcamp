import MessageInput from './MessageInput';
import '../styles/DefaultScreen.css';

export default function DefaultScreen({ onSend, disabled }) {
  return (
    <div className="default-screen">
      <h1 className="default-heading">What's on your mind today?</h1>
      <MessageInput onSend={onSend} disabled={disabled} />
    </div>
  );
}
