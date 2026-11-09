import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react';
import Avatar from '../../components/common/Avatar/Avatar';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { useNotifications } from '../../hooks/useNotifications';
import { userService } from '../../services/userService';
import { postService } from '../../services/postService';
import { formatRelativeTime } from '../../utils/formatDate';
import styles from './Notifications.module.css';

/**
 * Activity Notifications Center with Filter tabs and Mark as Read actions
 */
export default function Notifications() {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadMetadata() {
      try {
        const [userList, postList] = await Promise.all([
          userService.getUsers(),
          postService.getPosts(),
        ]);
        setUsers(userList);
        setPosts(postList);
      } catch (err) {
        console.warn('Error loading notifications metadata:', err);
      }
    }
    loadMetadata();
  }, []);

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [notifications, filter]);

  const getNotificationText = (type) => {
    switch (type) {
      case 'like':
        return 'liked your post.';
      case 'comment':
        return 'commented on your post.';
      case 'follow':
        return 'started following you.';
      case 'mention':
        return 'mentioned you in a post.';
      case 'message':
        return 'sent you a direct message.';
      default:
        return 'interacted with your content.';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={14} fill="var(--color-error)" color="var(--color-error)" />;
      case 'comment':
        return <MessageCircle size={14} color="var(--accent-primary)" />;
      case 'follow':
        return <UserPlus size={14} color="var(--color-success)" />;
      case 'mention':
        return <AtSign size={14} color="var(--color-warning)" />;
      default:
        return <Bell size={14} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notifications</h1>
        {unreadCount > 0 && (
          <button
            type="button"
            className={styles.markAllBtn}
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className={styles.filtersRow} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`${styles.filterTab} ${filter === 'all' ? styles.activeTab : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'unread'}
          className={`${styles.filterTab} ${filter === 'unread' ? styles.activeTab : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      <div className={styles.list}>
        {loading ? (
          <Loader size="md" text="Loading notifications..." />
        ) : filteredNotifications.length === 0 ? (
          <EmptyState
            icon={<Bell size={36} />}
            title={filter === 'unread' ? 'No Unread Notifications' : 'No Activity Yet'}
            description={
              filter === 'unread'
                ? 'You are all caught up! Check the All tab to review past activity.'
                : 'When other creators like your photos, comment, or follow you, you will see notifications here.'
            }
          />
        ) : (
          filteredNotifications.map((notification) => {
            const actor = users.find((u) => u.id === notification.actorId);
            const relatedPost = posts.find((p) => p.id === notification.postId);
            const destination = notification.postId
              ? `/#post-${notification.postId}`
              : `/profile/${actor?.username || ''}`;

            return (
              <Link
                key={notification.id}
                to={destination}
                className={`${styles.item} ${!notification.isRead ? styles.unreadItem : ''}`}
                onClick={() => {
                  if (!notification.isRead) markAsRead(notification.id);
                }}
              >
                <div className={styles.meta}>
                  <Avatar
                    src={actor?.avatar}
                    alt={actor?.name}
                    name={actor?.name}
                    size="md"
                  />
                  <div className={styles.textContainer}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={styles.actorName}>
                        {actor?.username || 'someone'}{' '}
                      </span>
                      <span>{getNotificationIcon(notification.type)}</span>
                      <span className={styles.actionText}>
                        {getNotificationText(notification.type)}
                      </span>
                    </div>
                    <span className={styles.time}>
                      {formatRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {relatedPost && (
                    <img
                      src={relatedPost.image}
                      alt="Thumbnail"
                      className={styles.postThumbnail}
                    />
                  )}
                  {!notification.isRead && <div className={styles.unreadDot} />}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
