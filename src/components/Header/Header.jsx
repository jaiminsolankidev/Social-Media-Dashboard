import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Bell, MessageCircle, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../hooks/useNotifications';
import styles from './Header.module.css';

/**
 * Reusable Header/Navbar component for the Social Media Dashboard.
 * Includes logo, quick navigation links, search input, dark mode toggle, and notification badge.
 */
export default function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { theme, toggleTheme } = useTheme?.() || { theme: 'light', toggleTheme: () => {} };
  const { unreadCount } = useNotifications?.() || { unreadCount: 0 };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
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
        {/* Logo / Brand */}
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>✨</span>
          <span className={styles.brandTitle}>VYBE</span>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search creators, hashtags..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            className={styles.searchInput}
            aria-label="Search"
          />
        </form>

        {/* Navigation Links & Actions */}
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

          {/* Theme toggle button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
