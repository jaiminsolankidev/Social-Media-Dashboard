import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../common/Avatar/Avatar';
import { useAuth } from '../../../hooks/useAuth';
import { userService } from '../../../services/userService';
import styles from './RightSidebar.module.css';

const TRENDING_HASHTAGS = [
  'photography',
  'wanderlust',
  'architecture',
  'minimalism',
  'sourdough',
  'coffee',
  'cyberpunk',
  'pottery',
];

/**
 * Contextual Right Sidebar for suggestions, current user, and trending tags
 */
export default function RightSidebar() {
  const { currentUser, refreshUser } = useAuth();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadSuggestions() {
      try {
        const users = await userService.getUsers();
        if (isMounted) {
          // Exclude logged in user
          const others = users.filter((u) => u.id !== currentUser?.id);
          setSuggestions(others.slice(0, 5));
        }
      } catch (err) {
        console.warn('Could not load suggestions:', err);
      }
    }
    loadSuggestions();
    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);

  const handleToggleFollow = async (targetUser) => {
    if (!currentUser?.id) return;
    const isFollowing = currentUser.following?.includes(targetUser.id);
    try {
      if (isFollowing) {
        await userService.unfollowUser(currentUser.id, targetUser.id);
      } else {
        await userService.followUser(currentUser.id, targetUser.id);
      }
      refreshUser();
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    }
  };

  return (
    <aside className={styles.container} aria-label="Suggested and Trending">
      {/* Current User Card */}
      {currentUser && (
        <div className={styles.userCard}>
          <Link to="/profile" className={styles.userInfo}>
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.name}
              name={currentUser.name}
              size="md"
            />
            <div className={styles.userMeta}>
              <span className={styles.username}>{currentUser.username}</span>
              <span className={styles.name}>{currentUser.name}</span>
            </div>
          </Link>
          <Link to="/profile" className={styles.followButton}>
            View
          </Link>
        </div>
      )}

      {/* Suggested Users */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Suggested For You</span>
        <Link to="/explore" className={styles.followButton}>
          See All
        </Link>
      </div>

      <div className={styles.suggestionsList}>
        {suggestions.map((user) => {
          const isFollowing = currentUser?.following?.includes(user.id);
          return (
            <div key={user.id} className={styles.suggestionItem}>
              <Link to={`/profile/${user.username}`} className={styles.userInfo}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  name={user.name}
                  size="sm"
                />
                <div className={styles.userMeta}>
                  <span className={styles.username}>{user.username}</span>
                  <span className={styles.name}>{user.name}</span>
                </div>
              </Link>
              <button
                type="button"
                className={`${styles.followButton} ${
                  isFollowing ? styles.followingButton : ''
                }`}
                onClick={() => handleToggleFollow(user)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Trending Hashtags */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Trending Topics</span>
      </div>
      <div className={styles.hashtagsList}>
        {TRENDING_HASHTAGS.map((tag) => (
          <Link
            key={tag}
            to={`/explore?q=%23${tag}`}
            className={styles.hashtagChip}
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#about">About</a> • <a href="#help">Help</a> •{' '}
          <a href="#press">Press</a> • <a href="#api">API</a> •{' '}
          <a href="#jobs">Jobs</a> • <a href="#privacy">Privacy</a> •{' '}
          <a href="#terms">Terms</a>
        </div>
        <p>© {new Date().getFullYear()} VYBE FROM META-FREE INTERN LABS</p>
      </footer>
    </aside>
  );
}
