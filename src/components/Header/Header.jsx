import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Bell, MessageCircle, Moon, Sun, Search } from 'lucide-react';
import styles from './Header.module.css';

/**
 * Reusable Header / Navbar component for the Social Media Dashboard.
 * Includes branding, global search, routing navigation, unread badge, and light/dark theme toggle.
 */
export default function Header({ unreadCount = 0, onSearch, theme = 'dark', onToggleTheme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={styles.navbar} aria-label="Main Navigation">
      <div className={styles.container}>
        {/* Brand / Logo */}
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>✨</span>
          <span className={styles.brandTitle}>Social Media Dashboard</span>
        </Link>

        {/* Global Search Bar */}
        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search posts or creators..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Search"
          />
        </div>

        {/* Navigation Items */}
        <nav className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}
            aria-label="Home"
          >
            <Home size={20} />
            <span className={styles.navLabel}>Home</span>
          </Link>

          <Link
            to="/notifications"
            className={`${styles.navItem} ${isActive('/notifications') ? styles.active : ''}`}
            aria-label="Notifications"
          >
            <div className={styles.iconWithBadge}>
              <Bell size={20} />
              {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
            </div>
            <span className={styles.navLabel}>Notifications</span>
          </Link>

          <Link
            to="/messages"
            className={`${styles.navItem} ${isActive('/messages') ? styles.active : ''}`}
            aria-label="Messages"
          >
            <MessageCircle size={20} />
            <span className={styles.navLabel}>Messages</span>
          </Link>

          <Link
            to="/profile"
            className={`${styles.navItem} ${isActive('/profile') ? styles.active : ''}`}
            aria-label="Profile"
          >
            <User size={20} />
            <span className={styles.navLabel}>Profile</span>
          </Link>

          {/* Theme toggle switch */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className={styles.themeToggle}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
