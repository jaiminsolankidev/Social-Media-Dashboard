import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, ArrowLeft, MessageSquare } from 'lucide-react';
import Avatar from '../../components/common/Avatar/Avatar';
import Loader from '../../components/common/Loader/Loader';
import { messageService } from '../../services/messageService';
import { userService } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { formatRelativeTime, formatMessageTime } from '../../utils/formatDate';
import styles from './Messages.module.css';

/**
 * Direct messages two-panel layout with conversation selection and chat history
 */
export default function Messages() {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetConvId = searchParams.get('conv');

  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  // Load conversations and users
  useEffect(() => {
    async function initData() {
      if (!currentUser?.id) return;
      setLoading(true);
      try {
        const [convs, userList] = await Promise.all([
          messageService.getConversations(currentUser.id),
          userService.getUsers(),
        ]);
        setConversations(convs);
        setUsers(userList);

        if (targetConvId) {
          const match = convs.find((c) => c.id === targetConvId);
          if (match) setSelectedConversation(match);
        } else if (convs.length > 0) {
          setSelectedConversation(convs[0]);
        }
      } catch (err) {
        console.warn('Error loading conversations:', err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, [currentUser?.id, targetConvId]);

  // Load messages whenever selected conversation changes
  useEffect(() => {
    async function loadMessages() {
      if (!selectedConversation) {
        setMessages([]);
        return;
      }
      try {
        const msgs = await messageService.getMessages(selectedConversation.id);
        setMessages(msgs);
        // Mark any unread incoming messages as read
        const unreadIncoming = msgs.filter(
          (m) => m.senderId !== currentUser?.id && !m.isRead
        );
        unreadIncoming.forEach((m) => messageService.markMessageAsRead(m.id));
      } catch (err) {
        console.warn('Error loading messages:', err);
      }
    }
    loadMessages();
  }, [selectedConversation, currentUser?.id]);

  // Scroll to bottom of message list on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    setSearchParams({ conv: conv.id });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConversation || !currentUser?.id) return;

    const messagePayload = {
      conversationId: selectedConversation.id,
      senderId: currentUser.id,
      text: inputText.trim(),
    };

    setInputText('');

    try {
      const sent = await messageService.sendMessage(messagePayload);
      setMessages((prev) => [...prev, sent]);

      // Update conversation list preview
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? { ...c, updatedAt: sent.createdAt, lastMessage: sent.text }
            : c
        )
      );
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const getOtherParticipant = useCallback(
    (conv) => {
      const otherId = conv.participants.find((id) => id !== currentUser?.id);
      return users.find((u) => u.id === otherId);
    },
    [currentUser?.id, users]
  );

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter((c) => {
      const other = getOtherParticipant(c);
      return (
        other?.name?.toLowerCase().includes(q) ||
        other?.username?.toLowerCase().includes(q)
      );
    });
  }, [conversations, searchQuery, getOtherParticipant]);

  const activeOtherUser = selectedConversation
    ? getOtherParticipant(selectedConversation)
    : null;

  return (
    <div
      className={`${styles.container} ${
        selectedConversation ? styles.showChatMobile : ''
      }`}
    >
      {/* Left Panel: Conversation List */}
      <div className={styles.leftPanel}>
        <div className={styles.leftHeader}>
          <span className={styles.myUsername}>
            {currentUser?.username || 'Messages'}
          </span>
        </div>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search conversations"
          />
        </div>

        <div className={styles.conversationList} role="list">
          {loading ? (
            <Loader size="sm" text="Loading conversations..." />
          ) : filteredConversations.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No conversations found.
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const other = getOtherParticipant(conv);
              const isSelected = selectedConversation?.id === conv.id;

              return (
                <button
                  key={conv.id}
                  type="button"
                  className={`${styles.conversationItem} ${
                    isSelected ? styles.activeConversation : ''
                  }`}
                  onClick={() => handleSelectConversation(conv)}
                  role="listitem"
                >
                  <Avatar
                    src={other?.avatar}
                    alt={other?.name}
                    name={other?.name}
                    size="md"
                  />
                  <div className={styles.conversationMeta}>
                    <div className={styles.conversationTopRow}>
                      <span className={styles.otherUserName}>
                        {other?.name || other?.username || 'User'}
                      </span>
                      <span className={styles.time}>
                        {formatRelativeTime(conv.updatedAt)}
                      </span>
                    </div>
                    <p className={styles.lastMessage}>
                      {conv.lastMessage || 'Sent a message'}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Panel: Chat Window */}
      <div className={styles.rightPanel}>
        {selectedConversation && activeOtherUser ? (
          <>
            <div className={styles.chatHeader}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setSelectedConversation(null)}
                aria-label="Back to conversations list"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'none',
                }}
              >
                <ArrowLeft size={20} />
              </button>
              <Avatar
                src={activeOtherUser.avatar}
                alt={activeOtherUser.name}
                name={activeOtherUser.name}
                size="sm"
              />
              <div className={styles.chatHeaderText}>
                <Link
                  to={`/profile/${activeOtherUser.username}`}
                  className={styles.chatHeaderName}
                >
                  {activeOtherUser.name}
                </Link>
                <span className={styles.chatHeaderUsername}>
                  @{activeOtherUser.username}
                </span>
              </div>
            </div>

            <div className={styles.messagesArea}>
              {messages.map((msg) => {
                const isSentByMe = msg.senderId === currentUser?.id;
                return (
                  <div
                    key={msg.id}
                    className={`${styles.messageRow} ${
                      isSentByMe ? styles.sentRow : styles.receivedRow
                    }`}
                  >
                    <div
                      className={`${styles.bubble} ${
                        isSentByMe ? styles.sentBubble : styles.receivedBubble
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className={styles.bubbleTime}>
                      {formatMessageTime(msg.createdAt)}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form className={styles.inputBar} onSubmit={handleSendMessage}>
              <input
                type="text"
                className={styles.messageInput}
                placeholder="Message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                aria-label="Write a message"
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={!inputText.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.emptyChat}>
            <MessageSquare size={48} color="var(--accent-primary)" />
            <h3>Your Messages</h3>
            <p>Send private photos and messages to a friend or group.</p>
          </div>
        )}
      </div>
    </div>
  );
}
