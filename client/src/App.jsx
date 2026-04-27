import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DefaultScreen from './components/DefaultScreen';
import ChatWindow from './components/ChatWindow';
import { useChats } from './hooks/useChats';
import './styles/Layout.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { chats, activeChat, activeChatId, createChat, selectChat, clearActive } = useChats();

  function handleSend(message) {
    if (!activeChatId) {
      createChat(message);
    }
  }

  function handleNewChat() {
    clearActive();
    setSidebarOpen(false);
  }

  function handleSelectChat(id) {
    selectChat(id);
    setSidebarOpen(false);
  }

  return (
    <div className="app-layout">
      <Sidebar
        onNewChat={handleNewChat}
        onClose={() => setSidebarOpen(false)}
        onSelectChat={handleSelectChat}
        sidebarOpen={sidebarOpen}
        chats={chats}
        activeChatId={activeChatId}
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

        {activeChat
          ? <ChatWindow chat={activeChat} onSend={handleSend} />
          : <DefaultScreen onSend={handleSend} />
        }
      </div>
    </div>
  );
}
