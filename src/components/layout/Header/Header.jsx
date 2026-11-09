import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import Logo from '../../common/Logo/Logo';
import Badge from '../../common/Badge/Badge';
import { useNotifications } from '../../../hooks/useNotifications';
import styles from './Header.module.css';

/**
 * Responsive Mobile Top Header
 */
export default function Header() {
  const { unreadCount } = useNotifications();

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.actions}>
        <Link
          to="/notifications"
          className={styles.iconButton}
          aria-label="View notifications"
        >
          <Heart size={24} />
          {unreadCount > 0 && (
            <div className={styles.badgeWrapper}>
              <Badge variant="danger" dot />
            </div>
          )}
        </Link>
        <Link
          to="/messages"
          className={styles.iconButton}
          aria-label="View messages"
        >
          <MessageCircle size={24} />
        </Link>
      </div>
    </header>
  );
}
