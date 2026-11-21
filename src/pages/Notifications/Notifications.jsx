import { useState, useEffect } from 'react';
import Notification from '../../components/Notification/Notification';
import Button from '../../components/common/Button/Button';
import { getNotifications, markAllNotificationsRead } from '../../utils/api';
import { Bell, CheckCheck } from 'lucide-react';
import styles from './Notifications.module.css';

/**
 * Notifications Center - Displays user activity alerts.
 */
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadNotifications() {
      try {
        setLoading(true);
        const data = await getNotifications();
        if (isMounted) setNotifications(data);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNotifications();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleMarkAllRead = async () => {
    const updated = await markAllNotificationsRead();
    setNotifications(updated);
  };

  const handleMarkOneRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <Bell size={24} className={styles.bellIcon} />
          <h2 className={styles.title}>Notifications</h2>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount} new</span>
          )}
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            icon={<CheckCheck size={16} />}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`${styles.tab} ${filter === 'all' ? styles.activeTab : ''}`}
          onClick={() => setFilter('all')}
        >
          All Activity
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'unread'}
          className={`${styles.tab} ${filter === 'unread' ? styles.activeTab : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread Only
        </button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className={styles.loaderArea}>
          <div className={styles.spinner} />
          <p>Loading notifications...</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>All caught up!</p>
          <p className={styles.emptyDesc}>No new notifications to display right now.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredNotifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkOneRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
