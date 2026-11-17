import { useState } from 'react';
import styles from './Notification.module.css';

/**
 * Reusable Notification item component.
 *
 * @param {Object} props
 * @param {Object} props.notification
 * @param {Function} [props.onMarkAsRead]
 * @param {Function} [props.onClick]
 */
export default function Notification({
  notification,
  onMarkAsRead,
  onClick,
}) {
  const [isRead, setIsRead] = useState(Boolean(notification?.isRead));

  const actorName = notification?.actor?.name || notification?.user?.name || notification?.sender || 'Someone';
  const actorAvatar =
    notification?.actor?.avatar ||
    notification?.user?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(actorName)}`;
  const time = notification?.time || notification?.createdAt || 'Just now';
  const type = notification?.type || 'general'; // 'like' | 'comment' | 'follow' | 'message'
  const message = notification?.message || notification?.text || '';
  const postThumbnail = notification?.postThumbnail || notification?.postImage || null;

  const getTypeIcon = () => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👤';
      case 'message':
        return '✉️';
      default:
        return '🔔';
    }
  };

  const getActionLabel = () => {
    if (message) return message;
    switch (type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'left a comment on your post';
      case 'follow':
        return 'started following you';
      case 'message':
        return 'sent you a new message';
      default:
        return 'interacted with your profile';
    }
  };

  const handleClick = (e) => {
    if (!isRead) {
      setIsRead(true);
      if (onMarkAsRead) {
        onMarkAsRead(notification?.id);
      }
    }
    if (onClick) {
      onClick(notification, e);
    }
  };

  return (
    <div
      className={`${styles.item} ${isRead ? styles.read : styles.unread}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
      aria-label={`Notification: ${actorName} ${getActionLabel()}`}
    >
      <div className={styles.avatarWrapper}>
        <img src={actorAvatar} alt={actorName} className={styles.avatar} />
        <span className={styles.typeBadge} aria-hidden="true">
          {getTypeIcon()}
        </span>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>
          <strong className={styles.actorName}>{actorName}</strong> {getActionLabel()}
        </p>
        <span className={styles.time}>{time}</span>
      </div>

      {postThumbnail && (
        <img
          src={postThumbnail}
          alt="Post preview"
          className={styles.postThumbnail}
        />
      )}

      {!isRead && <span className={styles.unreadDot} aria-label="Unread" />}
    </div>
  );
}
