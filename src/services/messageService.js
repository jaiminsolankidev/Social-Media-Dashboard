import api from './api';
import { initialConversations, initialMessages } from '../data/demoMessages';

export const messageService = {
  /**
   * Fetch conversations for user
   */
  async getConversations(userId) {
    try {
      const response = await api.get('/conversations');
      const all = response.data || [];
      return all
        .filter((c) => c.participants.includes(userId))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } catch {
      return initialConversations.filter((c) => c.participants.includes(userId));
    }
  },

  /**
   * Create or find conversation between participants
   */
  async getOrCreateConversation(userAId, userBId) {
    const conversations = await messageService.getConversations(userAId);
    const existing = conversations.find(
      (c) => c.participants.includes(userAId) && c.participants.includes(userBId)
    );

    if (existing) return existing;

    const newConv = {
      id: `conv_${Date.now()}`,
      participants: [userAId, userBId],
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await api.post('/conversations', newConv);
      return res.data;
    } catch {
      return newConv;
    }
  },

  /**
   * Fetch messages for a conversation
   */
  async getMessages(conversationId) {
    try {
      const response = await api.get('/messages', {
        params: { conversationId },
      });
      return (response.data || []).sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } catch {
      return initialMessages.filter((m) => m.conversationId === conversationId);
    }
  },

  /**
   * Send a new message
   */
  async sendMessage({ conversationId, senderId, text }) {
    const newMessage = {
      id: `m_${Date.now()}`,
      conversationId,
      senderId,
      text: text.trim(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    const [msgRes] = await Promise.all([
      api.post('/messages', newMessage),
      api.patch(`/conversations/${conversationId}`, {
        updatedAt: newMessage.createdAt,
      }),
    ]);

    return msgRes.data;
  },

  /**
   * Mark message as read
   */
  async markMessageAsRead(messageId) {
    try {
      const res = await api.patch(`/messages/${messageId}`, { isRead: true });
      return res.data;
    } catch {
      return null;
    }
  },
};
