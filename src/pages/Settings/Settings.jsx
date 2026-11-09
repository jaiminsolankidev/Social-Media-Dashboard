import { useState } from 'react';
import { User, Shield, Moon, Bell, LogOut } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Avatar from '../../components/common/Avatar/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../components/common/Toast/Toast';
import styles from './Settings.module.css';

/**
 * Account settings with theme switcher, privacy preferences, and notification controls
 */
export default function Settings() {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [isPrivate, setIsPrivate] = useState(currentUser?.isPrivate || false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleTogglePrivacy = async () => {
    const nextState = !isPrivate;
    setIsPrivate(nextState);
    try {
      await updateUserProfile({ isPrivate: nextState });
      showToast(
        nextState
          ? 'Account set to Private (Demo Mode).'
          : 'Account set to Public.',
        'info'
      );
    } catch {
      setIsPrivate(!nextState);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Settings</h1>

      {/* Account Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <User size={20} /> Account Overview
        </h2>

        <div className={styles.row}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Avatar
              src={currentUser?.avatar}
              alt={currentUser?.name}
              name={currentUser?.name}
              size="lg"
            />
            <div className={styles.rowText}>
              <span className={styles.rowTitle}>{currentUser?.name}</span>
              <span className={styles.rowDescription}>@{currentUser?.username} • {currentUser?.email}</span>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowText}>
            <span className={styles.rowTitle}>Session Management</span>
            <span className={styles.rowDescription}>Log out of your demo session on this browser</span>
          </div>
          <Button variant="danger" size="sm" icon={<LogOut size={16} />} onClick={logout}>
            Log Out
          </Button>
        </div>
      </section>

      {/* Privacy Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Shield size={20} /> Account Privacy
        </h2>

        <div className={styles.row}>
          <div className={styles.rowText}>
            <span className={styles.rowTitle}>Private Account</span>
            <span className={styles.rowDescription}>
              When private, only people you approve can see your photos and videos.
            </span>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={handleTogglePrivacy}
              aria-label="Toggle private account"
            />
            <span className={styles.slider} />
          </label>
        </div>

        <div className={styles.noteBox}>
          <strong>Note:</strong> This is a demonstration-level privacy toggle for the internship MVP. In a production environment, privacy rules are enforced at the database and API authorization layers.
        </div>
      </section>

      {/* Appearance Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Moon size={20} /> Appearance & Theme
        </h2>

        <div className={styles.row}>
          <div className={styles.rowText}>
            <span className={styles.rowTitle}>Dark Mode</span>
            <span className={styles.rowDescription}>
              Adjust the color theme of VYBE to reduce eye strain.
            </span>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={isDark}
              onChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <span className={styles.slider} />
          </label>
        </div>
      </section>

      {/* Notifications Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Bell size={20} /> Notification Preferences
        </h2>

        <div className={styles.row}>
          <div className={styles.rowText}>
            <span className={styles.rowTitle}>Email Notifications</span>
            <span className={styles.rowDescription}>
              Receive weekly digests and important security updates.
            </span>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications((prev) => !prev)}
              aria-label="Toggle email notifications"
            />
            <span className={styles.slider} />
          </label>
        </div>

        <div className={styles.row}>
          <div className={styles.rowText}>
            <span className={styles.rowTitle}>Push Notifications</span>
            <span className={styles.rowDescription}>
              Receive alerts for likes, comments, and direct messages.
            </span>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications((prev) => !prev)}
              aria-label="Toggle push notifications"
            />
            <span className={styles.slider} />
          </label>
        </div>
      </section>
    </div>
  );
}
