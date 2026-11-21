import { useState, useEffect, useRef } from 'react';
import { getConversations, sendMessage, DEFAULT_CONVERSATIONS } from '../../utils/api';
import Button from '../../components/common/Button/Button';
import { Send, MessageSquare, Search } from 'lucide-react';
import styles from './Messages.module.css';

/**
 * Messages Page - Direct messaging conversations view.
 */
export default function Messages() {
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = window.localStorage.getItem('smd_conversations');
      return saved ? JSON.parse(saved) : DEFAULT_CONVERSATIONS;
    } catch {
      return DEFAULT_CONVERSATIONS;
    }
  });

  const [selectedConvId, setSelectedConvId] = useState(() => {
    return DEFAULT_CONVERSATIONS[0]?.id || null;
  });

  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadConversations() {
      try {
        const data = await getConversations();
        if (isMounted) {
          setConversations(data);
          if (data.length > 0) {
            setSelectedConvId((prev) => prev || data[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    }

    loadConversations();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedConvId]);

  const activeConversation = conversations.find((c) => c.id === selectedConvId);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConvId) return;

    const text = inputText.trim();
    setInputText('');

    try {
      const updatedConv = await sendMessage(selectedConvId, text);
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedConvId ? updatedConv : c))
      );
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const filteredConversations = conversations.filter((c) => {
    if (!search) return true;
    return c.user?.name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles.container}>
      {/* Left Conversations Sidebar */}
      <div className={styles.conversationsSidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Direct Messages</h2>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.conversationsList}>
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === selectedConvId;
            const lastMsg = conv.messages[conv.messages.length - 1];
            return (
              <button
                key={conv.id}
                type="button"
                className={`${styles.convItem} ${isSelected ? styles.selectedConv : ''}`}
                onClick={() => setSelectedConvId(conv.id)}
              >
                <img src={conv.user.avatar} alt={conv.user.name} className={styles.avatar} />
                <div className={styles.convDetails}>
                  <div className={styles.convNameRow}>
                    <strong className={styles.userName}>{conv.user.name}</strong>
                    <span className={styles.convTime}>{lastMsg?.time || ''}</span>
                  </div>
                  <p className={styles.lastMessage}>{lastMsg?.text || 'No messages yet'}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className={styles.chatPanel}>
        {activeConversation ? (
          <>
            <div className={styles.chatHeader}>
              <img
                src={activeConversation.user.avatar}
                alt={activeConversation.user.name}
                className={styles.avatar}
              />
              <div>
                <h3 className={styles.chatTitle}>{activeConversation.user.name}</h3>
                <span className={styles.chatStatus}>@{activeConversation.user.username}</span>
              </div>
            </div>

            <div className={styles.messagesArea}>
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageBubble} ${
                    msg.isOwn ? styles.ownMessage : styles.theirMessage
                  }`}
                >
                  <p className={styles.messageText}>{msg.text}</p>
                  <span className={styles.messageTime}>{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className={styles.inputBar}>
              <input
                type="text"
                placeholder="Write a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={styles.messageInput}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!inputText.trim()}
                icon={<Send size={16} />}
              >
                Send
              </Button>
            </form>
          </>
        ) : (
          <div className={styles.noChatSelected}>
            <MessageSquare size={48} className={styles.noChatIcon} />
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
