import '../styles/Sidebar.css';

export default function Sidebar({ onNewChat, onClose, onSelectChat, sidebarOpen, chats, activeChatId }) {
  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <svg className="sidebar-logo" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.13-3.884 10.079 10.079 0 0 0-11.51 4.556 9.962 9.962 0 0 0-3.244 6.606 10.079 10.079 0 0 0-6.698 4.918 9.956 9.956 0 0 0 1.22 11.65 9.958 9.958 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.129 3.884 10.079 10.079 0 0 0 11.51-4.556 9.962 9.962 0 0 0 3.244-6.606 10.079 10.079 0 0 0 6.699-4.918 9.956 9.956 0 0 0-1.22-11.65Z" fill="currentColor"/>
          <path d="M20.508 1.44a10.04 10.04 0 0 1 5.744 1.792l-8.534 4.927a1.67 1.67 0 0 0-.838 1.451V19.02l-3.634-2.098V9.341a10.066 10.066 0 0 1 7.262-7.9ZM6.011 9.67a10.042 10.042 0 0 1 1.76-2.86l.017 9.645a1.67 1.67 0 0 0 .835 1.451l9.39 5.42-3.637 2.098-7.006-4.045a10.067 10.067 0 0 1-1.36-11.709ZM12.26 32.163a10.04 10.04 0 0 1-5.743-1.791l8.534-4.928a1.67 1.67 0 0 0 .837-1.451V13.582l3.634 2.098v7.582a10.066 10.066 0 0 1-7.262 7.9Zm14.497-8.23a10.042 10.042 0 0 1-1.76 2.86l-.017-9.645a1.67 1.67 0 0 0-.835-1.452l-9.39-5.42 3.637-2.097 7.006 4.044a10.066 10.066 0 0 1 1.36 11.71Z" fill="white"/>
        </svg>
        <button className="sidebar-toggle" onClick={onClose} title="Close sidebar">
          ☰
        </button>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        New chat
      </button>

      <div className="sidebar-chat-list">
        {chats.length > 0 && (
          <>
            <div className="sidebar-section-label">Recent</div>
            {chats.map((chat) => (
              <button
                key={chat.id}
                className={`chat-list-item ${chat.id === activeChatId ? 'active' : ''}`}
                onClick={() => onSelectChat(chat.id)}
                title={chat.title}
              >
                <span className="chat-list-title">{chat.title}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
