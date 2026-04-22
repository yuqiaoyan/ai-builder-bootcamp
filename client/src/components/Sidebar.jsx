import '../styles/Sidebar.css';

export default function Sidebar({ onNewChat, onClose, sidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <svg className="sidebar-logo" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.13-3.884 10.079 10.079 0 0 0-11.51 4.556 9.962 9.962 0 0 0-3.244 6.606 10.079 10.079 0 0 0-6.698 4.918 9.956 9.956 0 0 0 1.22 11.65 9.958 9.958 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.129 3.884 10.079 10.079 0 0 0 11.51-4.556 9.962 9.962 0 0 0 3.244-6.606 10.079 10.079 0 0 0 6.699-4.918 9.956 9.956 0 0 0-1.22-11.65Z" fill="#000"/>
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
        <div className="sidebar-section-label">Recent</div>
        {/* Chat list items added in Phase 2 */}
      </div>
    </div>
  );
}
