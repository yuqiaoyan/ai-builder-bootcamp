import { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import DefaultScreen from './components/DefaultScreen';
import ChatView from './components/ChatView';
import { useChatStore } from './hooks/useChatStore';
import { useStreamResponse } from './hooks/useStreamResponse';
import './styles/Layout.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { chats, activeChat, activeChatId, setActiveChatId, createChat, addMessage, appendToken, deleteChat } = useChatStore();
  const { streaming, streamResponse } = useStreamResponse();
  const activeChatIdRef = useRef(activeChatId);
  activeChatIdRef.current = activeChatId;

  async function handleSend(text) {
    let chatId = activeChatIdRef.current;
    let messages;

    if (!chatId) {
      chatId = createChat(text);
      messages = [{ role: 'user', content: text }];
    } else {
      const chat = chats.find(c => c.id === chatId);
      messages = [...(chat?.messages || []), { role: 'user', content: text }];
      addMessage(chatId, { role: 'user', content: text });
    }

    await streamResponse(
      messages,
      token => appendToken(chatId, token),
      () => {},
      err => addMessage(chatId, { role: 'assistant', content: `Error: ${err}` })
    );
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

        {!activeChat && <DefaultScreen onSend={handleSend} disabled={streaming} />}
        {activeChat && <ChatView chat={activeChat} onSend={handleSend} disabled={streaming} />}
      </div>
    </div>
  );
}
