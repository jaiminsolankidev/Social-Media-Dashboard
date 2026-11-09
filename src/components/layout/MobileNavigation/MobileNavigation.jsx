import { NavLink } from 'react-router-dom';
import { Home, Search, PlusSquare, Film } from 'lucide-react';
import Avatar from '../../common/Avatar/Avatar';
import { useAuth } from '../../../hooks/useAuth';
import styles from './MobileNavigation.module.css';

/**
 * Mobile Bottom Navigation Bar
 */
export default function MobileNavigation({ onOpenCreateModal }) {
  const { currentUser } = useAuth();

  return (
    <nav className={styles.navBar} aria-label="Mobile Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
        }
        aria-label="Home"
      >
        <Home size={24} />
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
        }
        aria-label="Search and Explore"
      >
        <Search size={24} />
      </NavLink>

      <button
        type="button"
        className={styles.navItem}
        onClick={onOpenCreateModal}
        aria-label="Create Post"
      >
        <PlusSquare size={24} />
      </button>

      <NavLink
        to="/reels"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
        }
        aria-label="Reels"
      >
        <Film size={24} />
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
        }
        aria-label="Profile"
      >
        <Avatar
          src={currentUser?.avatar}
          alt={currentUser?.name || 'Profile'}
          name={currentUser?.name}
          size="xs"
        />
      </NavLink>
    </nav>
  );
}
