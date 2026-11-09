import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { notificationService } from '../services/notificationService';
import { useAuthContext } from './AuthContext';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { currentUser } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!currentUser?.id) {
      setNotifications([]);
      return;
    }
    setLoading(true);
    try {
      const data = await notificationService.getNotifications(currentUser.id);
      setNotifications(data);
    } catch (err) {
      console.warn('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const markAsRead = async (id) => {
    // Functional state update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    try {
      await notificationService.markAsRead(id);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    if (!currentUser?.id) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await notificationService.markAllAsRead(currentUser.id);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const value = {
    notifications,
    unreadCount,
    loading,
    refreshNotifications: fetchNotifications,
    markAsRead,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationsContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationsContext must be used within a NotificationProvider');
  }
  return context;
}
