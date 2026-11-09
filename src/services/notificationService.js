import api from './api';

export const notificationService = {
  /**
   * Fetch notifications for a user
   */
  async getNotifications(userId) {
    try {
      const response = await api.get('/notifications', {
        params: { userId },
      });
      return (response.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } catch {
      return [];
    }
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id) {
    try {
      const response = await api.patch(`/notifications/${id}`, { isRead: true });
      return response.data;
    } catch {
      return null;
    }
  },

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId) {
    const list = await notificationService.getNotifications(userId);
    const unread = list.filter((n) => !n.isRead);

    await Promise.all(
      unread.map((n) => api.patch(`/notifications/${n.id}`, { isRead: true }))
    );

    return true;
  },
};
