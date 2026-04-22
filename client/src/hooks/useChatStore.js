import { useState, useEffect } from 'react';

const STORAGE_KEY = 'chats';

function loadChats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveChats(chats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

export function useChatStore() {
  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    saveChats(chats);
  }, [chats]);

  function createChat(firstMessage) {
    const id = crypto.randomUUID();
    const newChat = {
      id,
      title: firstMessage.slice(0, 40),
      messages: [{ role: 'user', content: firstMessage }],
      createdAt: Date.now(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(id);
    return id;
  }

  function addMessage(chatId, message) {
    setChats(prev => prev.map(c =>
      c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
    ));
  }

  function deleteChat(id) {
    setChats(prev => prev.filter(c => c.id !== id));
    setActiveChatId(prev => (prev === id ? null : prev));
  }

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  return { chats, activeChat, activeChatId, setActiveChatId, createChat, addMessage, deleteChat };
}
