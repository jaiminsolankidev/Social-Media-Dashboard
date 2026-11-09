import { NavLink } from 'react-router-dom';
import {
  Home,
  Search,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  Bookmark,
  Settings,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import Logo from '../../common/Logo/Logo';
import Avatar from '../../common/Avatar/Avatar';
import Badge from '../../common/Badge/Badge';
import { useAuth } from '../../../hooks/useAuth';
import { useNotifications } from '../../../hooks/useNotifications';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Sidebar.module.css';

/**
 * Persistent Desktop & Tablet Navigation Sidebar
 */
export default function Sidebar({ onOpenCreateModal }) {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside className={styles.sidebar} aria-label="Main Navigation">
      <div>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <nav className={styles.navGroup}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <Home size={24} />
            </div>
            <span className={styles.navLabel}>Home</span>
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <Search size={24} />
            </div>
            <span className={styles.navLabel}>Search & Explore</span>
          </NavLink>

          <NavLink
            to="/reels"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <Film size={24} />
            </div>
            <span className={styles.navLabel}>Reels</span>
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <MessageCircle size={24} />
            </div>
            <span className={styles.navLabel}>Messages</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <Heart size={24} />
              {unreadCount > 0 && (
                <div className={styles.badgePosition}>
                  <Badge variant="danger">{unreadCount}</Badge>
                </div>
              )}
            </div>
            <span className={styles.navLabel}>Notifications</span>
          </NavLink>

          <button
            type="button"
            className={styles.navItem}
            onClick={onOpenCreateModal}
            aria-label="Create new post"
          >
            <div className={styles.iconWrapper}>
              <PlusSquare size={24} />
            </div>
            <span className={styles.navLabel}>Create</span>
          </button>

          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <Bookmark size={24} />
            </div>
            <span className={styles.navLabel}>Saved</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <Avatar
                src={currentUser?.avatar}
                alt={currentUser?.name || 'Profile'}
                name={currentUser?.name}
                size="xs"
              />
            </div>
            <span className={styles.navLabel}>Profile</span>
          </NavLink>
        </nav>
      </div>

      <div className={styles.bottomGroup}>
        <button
          type="button"
          className={styles.navItem}
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className={styles.iconWrapper}>
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </div>
          <span className={styles.navLabel}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }
        >
          <div className={styles.iconWrapper}>
            <Settings size={22} />
          </div>
          <span className={styles.navLabel}>Settings</span>
        </NavLink>

        <button
          type="button"
          className={styles.navItem}
          onClick={logout}
          aria-label="Log out"
        >
          <div className={styles.iconWrapper}>
            <LogOut size={22} color="var(--color-error)" />
          </div>
          <span className={styles.navLabel} style={{ color: 'var(--color-error)' }}>
            Log Out
          </span>
        </button>
      </div>
    </aside>
  );
}
