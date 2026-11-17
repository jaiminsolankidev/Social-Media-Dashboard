import { useState } from 'react';
import styles from './Profile.module.css';

/**
 * Reusable Profile component displaying user bio, avatar, statistics, and follow toggle.
 *
 * @param {Object} props
 * @param {Object} props.user - User information object
 * @param {boolean} [props.isCurrentUser=false] - Whether profile belongs to logged-in user
 * @param {Function} [props.onEditProfile] - Handler when "Edit Profile" is clicked
 * @param {Function} [props.onFollowChange] - Handler when follow state changes
 */
export default function Profile({
  user = {},
  isCurrentUser = false,
  onEditProfile,
  onFollowChange,
}) {
  const [isFollowing, setIsFollowing] = useState(Boolean(user?.isFollowing));
  const [followerCount, setFollowerCount] = useState(
    typeof user?.followers === 'number' ? user.followers : 1240
  );

  const name = user?.name || 'Jane Doe';
  const username = user?.username || 'janedoe';
  const avatar =
    user?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`;
  const bio = user?.bio || 'Digital creator, photographer, and open source enthusiast 📸✨';
  const website = user?.website || 'https://github.com';
  const location = user?.location || 'San Francisco, CA';
  const postsCount = user?.postsCount ?? (Array.isArray(user?.posts) ? user.posts.length : 48);
  const followingCount = user?.followingCount ?? 389;

  const handleFollowToggle = () => {
    const updated = !isFollowing;
    const count = updated ? followerCount + 1 : Math.max(0, followerCount - 1);
    setIsFollowing(updated);
    setFollowerCount(count);

    if (onFollowChange) {
      onFollowChange(user?.id, updated, count);
    }
  };

  return (
    <div className={styles.profileCard} aria-label={`Profile of ${name}`}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img src={avatar} alt={name} className={styles.avatar} />
        </div>

        <div className={styles.info}>
          <div className={styles.nameRow}>
            <div>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.username}>@{username}</p>
            </div>

            <div className={styles.actions}>
              {isCurrentUser ? (
                <button
                  type="button"
                  onClick={onEditProfile}
                  className={styles.secondaryBtn}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFollowToggle}
                  className={isFollowing ? styles.followingBtn : styles.primaryBtn}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>

          <p className={styles.bio}>{bio}</p>

          <div className={styles.metaRow}>
            {location && <span className={styles.metaItem}>📍 {location}</span>}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                🔗 {website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{postsCount}</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{followerCount.toLocaleString()}</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{followingCount.toLocaleString()}</span>
              <span className={styles.statLabel}>Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
