import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DefaultScreen from './components/DefaultScreen';
import ChatView from './components/ChatView';
import { useChatStore } from './hooks/useChatStore';
import './styles/Layout.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { chats, activeChat, activeChatId, setActiveChatId, createChat, addMessage, deleteChat } = useChatStore();

  function handleSend(text) {
    if (!activeChatId) {
      createChat(text);
    } else {
      addMessage(activeChatId, { role: 'user', content: text });
    }
  }

  function handleNewChat() {
    setActiveChatId(null);
  }

  return (
    <div className="app-layout">
      <Sidebar
        onNewChat={handleNewChat}
        onClose={() => setSidebarOpen(false)}
        sidebarOpen={sidebarOpen}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onDeleteChat={deleteChat}
      />

      <div
        className={`mobile-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <div className="mobile-header">
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
            title="Open sidebar"
          >
            ☰
          </button>
        </div>

        {!activeChat && <DefaultScreen onSend={handleSend} />}
        {activeChat && <ChatView chat={activeChat} onSend={handleSend} />}
      </div>
    </div>
  );
}
