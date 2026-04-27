import { useState, useCallback } from 'react';

const STORAGE_KEY = 'chats';

function loadChats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveChats(chats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

function generateId() {
  return crypto.randomUUID();
}

export function useChats() {
  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(null);

  const createChat = useCallback((firstMessage) => {
    const now = new Date().toISOString();
    const newChat = {
      id: generateId(),
      title: firstMessage.slice(0, 40),
      messages: [{ role: 'user', content: firstMessage }],
      createdAt: now,
      updatedAt: now,
    };
    setChats((prev) => {
      const updated = [newChat, ...prev];
      saveChats(updated);
      return updated;
    });
    setActiveChatId(newChat.id);
    return newChat;
  }, []);

  const selectChat = useCallback((id) => {
    setActiveChatId(id);
  }, []);

  const clearActive = useCallback(() => {
    setActiveChatId(null);
  }, []);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const sortedChats = [...chats].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return { chats: sortedChats, activeChat, activeChatId, createChat, selectChat, clearActive };
}
