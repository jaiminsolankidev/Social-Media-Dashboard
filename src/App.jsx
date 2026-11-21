import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import useLocalStorage from './hooks/useLocalStorage';
import { getNotifications } from './utils/api';

/**
 * Social Media Dashboard - Main Application Component.
 * Integrates:
 * - Routing between views (Home, Profile, Notifications, Messages)
 * - Light / Dark mode toggle with local storage persistence
 * - Global search synchronization
 * - Notification alerts count
 */
export default function App() {
  const [theme, setTheme] = useLocalStorage('smd_theme', 'dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch initial unread notifications count
  useEffect(() => {
    let isMounted = true;
    async function checkNotifications() {
      try {
        const notifs = await getNotifications();
        if (isMounted) {
          const unread = notifs.filter((n) => !n.isRead).length;
          setUnreadCount(unread);
        }
      } catch {
        // Fallback silently
      }
    }
    checkNotifications();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-layout" data-theme={theme}>
      {/* Top Navigation Bar */}
      <Header
        unreadCount={unreadCount}
        onSearch={setSearchTerm}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
